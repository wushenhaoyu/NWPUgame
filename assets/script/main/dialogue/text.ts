import { _decorator, Component, JsonAsset, Label, Node, resources, Sprite,error,SpriteFrame,find,input, Button, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

interface TextData  {
    Name: "",
    Text: "",
    Speaker: true,//是否为自己说
    Img:""
};

@ccclass('text')
export class text extends Component {
    @property({type:Node})
    public dialogue = null;
    @property ({type:Node})
    public unpersistUI = null;
    @property ({type:Sprite})
    public otherImg:Sprite = null;
    @property ({type:Sprite})
    public selfImg:Sprite = null;
    @property ({type:Label})
    public Name:Label = null;
    @property ({type:Label})
    public Text:Label = null;
    textData:TextData[] = [] //装对话的数组
    textIndex = -1; //索引
    textEnd = true; //是否到头
    nowText = ""; //即将播放的文字
    map:string = ""
    tt = 0;

    @property ({type:Button})
    public startBtn:Button = null;


    start() {
       /* resources.load('dialogue/test/test',JsonAsset,(err, jsonAsset) => {
            if (err) {
                error(err);
                return;
            }
            const jsonData = jsonAsset.json;
            
            // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
        })*/
        const mapdata:Node = find("mapdata");
     
        var component = mapdata.getComponent ('mapdata'); // 根据常驻节点上的脚本组件的名称获取它的引用
        this.map = component.getMap();
        // this.node.on('dialogue',this.initDialogueData,this)
        this.startBtn.node.on(Button.EventType.CLICK, this.initDialogueData, this) //點擊互動開始對話

        this.dialogue.on(NodeEventType.TOUCH_END, this.nextTextData, this) //點擊對話框，觸發下一段對話

    }
    initDialogueData(event)
    {

        this.dialogue.active = true;

        this.unpersistUI.active = false;

        this.map = "dongmen"

        resources.load('dialogue/'+this.map+"/menwei",JsonAsset,(err, jsonAsset) => {
            if (err) {
                error(err);
                return;
            }
            this.textData = jsonAsset.json;
            console.log(this.textData)
            this.init()
            // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
        })
    }
    init()
    {

        this.textIndex = -1
        this.dialogue.active = true;
        this.nextTextData();
        
    }
    nextTextData()
    {

            console.log("next")
            if(++this.textIndex < this.textData.length)
            {
                this.setTextData(this.textData[this.textIndex])
            }
            else
            {
                this.closeDialog()
            }
    }

    setTextData(data:TextData){
        this.selfImg.spriteFrame = null;
        this.otherImg.spriteFrame = null;
        if(!this.textEnd) return;
        this.textEnd = false;
        this.Name.string = data.Name;
        this.Text.string = '';
        this.nowText = data.Text
        const img = data.Img + '/spriteFrame'
       resources.load(img,SpriteFrame,null,(error,texture)=>{
        if (data.Speaker)
        {
            this.selfImg.spriteFrame = texture
        }
        else
        {
            this.otherImg.spriteFrame = texture
        }
       })
      
    }
    closeDialog(){
        this.dialogue.active = false
        this.unpersistUI.active = true
    }

    update(deltaTime: number) {
        if(!this.nowText) return;
        this.tt += deltaTime;
        if(this.tt >=0.1)
        {
            if(this.Text.string.length < this.nowText.length)
            {
                this.Text.string = this.nowText.slice(0,this.Text.string.length+1)
            }
            else{
                this.textEnd = true;
                this.nowText = null;
            }
            this.tt = 0;
        }
    }
}


