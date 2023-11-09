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
    textData:  TextData[] = [] //装对话的数组
    textIndex = -1; //索引
    textEnd = true; //是否到头
    nowText = ""; //即将播放的文字
    map:string = ""
    tt = 0;
    firstText: TextData = null;
    @property ({type:Node})
    public startBtn:Node = null; //互动鍵

    @property ({type:Node})
    public choiceBoxes: Node = null; //互动選項




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
     console.log('jasdash')
        var component = mapdata.getComponent ('mapdata'); // 根据常驻节点上的脚本组件的名称获取它的引用
        this.map = component.getMap();
        // this.node.on('dialogue',this.initDialogueData,this)
        this.startBtn.on(NodeEventType.TOUCH_START, this.initstart, this) //點擊互動開始對話

        //this.dialogue.on(NodeEventType.TOUCH_START, this.nextTextData, this) //點擊對話框，觸發下一段對話

        this.choiceBoxes.getChildByName("choicebox1").on(NodeEventType.TOUCH_START, this.init, this)
        this.choiceBoxes.getChildByName("choicebox2").on(NodeEventType.TOUCH_START, this.initDialogueData, this)
        this.choiceBoxes.getChildByName("choicebox3").on(NodeEventType.TOUCH_START, this.closeDialog, this)
    }

    initstart()
    {
        this.dialogue.active = true;

        this.unpersistUI.active = false;
        
        this.choiceBoxes.active = true;

        this.initDialogueData();
    }

    initDialogueData(event = null)
    {

        // console.log("clicked")

        this.map = "dongmen"



        resources.load('dialogue/'+this.map+"/menwei",JsonAsset,(err, jsonAsset) => {
            if (err) {
                error(err);
                return;
            }
            this.textData = jsonAsset.json as TextData[];
            console.log(this.textData)
            console.log(this.textIndex)

            this.firstText = this.textData[0];
            
            this.setTextData(this.firstText)
            // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
        })
    }
    init()
    {

        this.textIndex = 0
        this.dialogue.active = true;
        this.nextTextData();
        this.dialogue.on(NodeEventType.TOUCH_START, this.nextTextData, this)
        this.choiceBoxes.active = false;
    }
    nextTextData()
    {

            console.log("next")

            if(this.textEnd)  //檢查對話是否完結
            {
                
                if(++this.textIndex < this.textData.length)  //檢查是否為最後一句
                {
                    
                    this.setTextData(this.textData[this.textIndex])

                }
                else
                {
                    
                    this.closeDialog()
                
                }
            }
            else
            {
                this.Text.string = this.nowText
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

        // if(this.Text.string.length < this.nowText.length)
        // {
        //     this.Text.string = this.nowText
        // }
      
    }
    closeDialog(){
        this.dialogue.active = false
        this.unpersistUI.active = true
        this.choiceBoxes.active = false

        this.textIndex = 0;

    }

    update(deltaTime: number) {

        // console.log(this.nowText)
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


