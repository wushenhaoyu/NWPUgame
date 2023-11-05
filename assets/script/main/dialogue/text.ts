import { _decorator, Component, JsonAsset, Label, Node, resources, Sprite,error,SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

interface TextData  {
    Name: "",
    Text: "",
    Spaeker: true,//是否为自己说
    Img:""
};

@ccclass('text')
export class text extends Component {
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
    tt = 0;
    start() {
        resources.load('dialogue/test/test',JsonAsset,(err, jsonAsset) => {
            if (err) {
                error(err);
                return;
            }
            const jsonData = jsonAsset.json;
            
            // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
        })
    }
    init(textDataArr)
    {

        this.textIndex = -1
        this.textData = textDataArr
        this.node.active = true;
        this.nextTextData();
        
    }
    nextTextData()
    {
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
        if (data.Spaeker)
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
        this.node.active = false
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


