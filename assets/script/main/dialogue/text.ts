import { _decorator, Component, JsonAsset, Label, Node, resources, Sprite,error,SpriteFrame,find,input, Button, NodeEventType, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import PlotDataManager from '../../data/PlotDataManager';
const plotDataManager = PlotDataManager.getInstance();
import GameDataManager from '../../data/GameDataManager';
const gameDataManager = GameDataManager.getInstance();
interface TextData  {
   Name: "",
   Text: "",
   Speaker: true,//是否为自己说
   Img:""
};

@ccclass('text')
export default class text extends Component {
    // @property({type:Node})
    // select1:Node = null;
    // @property({type:Node})
    // select2:Node = null;

    @property({type:Prefab})
    public selectChoicePrefab:Prefab = null;
    @property({type:Node})
    public select:Node= null;
    @property({type:Node})
    public plot:Node=null
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
   public plotScriptNode:Node = null;
   @property ({type:Label})
   public Text:Label = null;
   public control:number = 0; //0为普通对话，1为剧情
   textData:  TextData[] = [] //装对话的数组
   textIndex = -1; //索引
   textEnd = true; //是否到头
   nowText = ""; //即将播放的文字
   map:string = ""
   tt = 0;
   firstText: TextData = null;
   npcName: String = null; //正在互动的npc
   plotjump: Array<number> | number = null; //剧情的跳转
   @property ({type:Node})
   public startBtn:Node = null; //互动鍵

   @property ({type:Node})
   public choiceBoxes: Node = null; //互动選項




   start() {
       this.node.on("plot",this.initPlotData,this)  //监听特殊对话脚本回调
       this.node.on('npc',this.initstart,this)  
       this.map = gameDataManager.getMap();
       this.choiceBoxes.getChildByName("choicebox1").on(NodeEventType.TOUCH_START, this.initDialogueData, this) //普通对话回调
       this.choiceBoxes.getChildByName("choicebox2").on(NodeEventType.TOUCH_START, this.initplot, this)  //特殊对话回调
       this.choiceBoxes.getChildByName("choicebox3").on(NodeEventType.TOUCH_START, this.closeDialog, this)  //关闭对话框回调
   }
   initplot() //开启特殊对话脚本
   {
    

    const map =  this.plot.getChildByName(this.map);
    
    for (let i = 0; i < map.children.length; i++) {
        
        if (map.children[i].name == this.npcName) {
            
            map.children[i].active = true;

        }

    }

   }

   initPlotData(event: Node,event2: number){  //初始化特殊对话脚本 并判断是否带选择？
    this.control = 0;
    this.plotScriptNode = event;
    const i = event2; 
    
    resources.load('dialogue/'+this.map+'/'+this.plotScriptNode.name,JsonAsset,(err, jsonAsset) => {

        if (err) {
            error(err);
            return;
        }
        this.textData = jsonAsset.json.plot[i].dialog;
        this.firstText = this.textData[0];
        this.setTextData(this.firstText)
        this.textIndex = 0
        this.plotjump = jsonAsset.json.plot[i].plotjump;
        this.dialogue.active = true;
        this.dialogue.on(NodeEventType.TOUCH_START, this.nextTextData, this)
        this.choiceBoxes.active = false;
        if( jsonAsset.json.plot[i].type){

            this.initplotchoice(jsonAsset.json.plot[i].choice)
            this.control = 1;
        }
        // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
    })

   }

    initplotchoice(choices: Array<string>){

        for(let i = 0; i < choices.length; i++){

            const choiceNode = instantiate(this.selectChoicePrefab)
            this.select.getChildByName("selections").addChild(choiceNode)
            let choiceName = choiceNode.getComponentInChildren(Label)
            choiceName.string = choices[i]

        }

    }


   initstart(event) //初始话npc对话功能
   {
        this.map = gameDataManager.getMap();
        
       this.dialogue.active = true;

       this.unpersistUI.active = false;
       
       this.choiceBoxes.active = true;

       this.npcName = event;
   
       resources.load(`dialogue/${this.map}/${this.npcName}`,JsonAsset,(err, jsonAsset) => {
        if (err) {
            error(err);
            return;
        }
        this.firstText = jsonAsset.json.start ;
        
        this.choiceBoxes.getChildByName("choicebox2").getComponentInChildren(Label).string = jsonAsset.json.plot[0].name ;
        this.setTextData(this.firstText)
        // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
    })

   }

   initDialogueData(event = null)
   {

       
       this.control = 0;
       resources.load(`dialogue/${this.map}/${this.npcName}`,JsonAsset,(err, jsonAsset) => {
           if (err) {
               error(err);
               return;
           }
           this.textData = jsonAsset.json.dialog[0] ;


           this.firstText = this.textData[0];
           
           this.setTextData(this.firstText)
           // 现在，jsonData 包含了从JSON文件中读取的数据，可以在游戏中使用它
       })
       this.textIndex = 0
       this.dialogue.active = true;
       this.dialogue.on(NodeEventType.TOUCH_START, this.nextTextData, this)
       this.choiceBoxes.active = false;
   }
   
   nextTextData()
   {

          

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
    if(this.control){   
        //写显示选项并且能知道选择了哪个并返回给脚本结果 要通过监听来一开始就知道是哪个脚本发送的（还没写）
        
        this.select.active = true;

        const choices = this.select.getChildByName("selections").children

        
        for(let i = 0;i<choices.length;i++){
            
            choices[i].on(NodeEventType.TOUCH_START,() => this.selection(this.plotjump[i]),this)

        }
    }
    else{
        
        if(this.plotScriptNode != null)
        {
            this.plotScriptNode.emit("select2", this.plotjump)
        }
        
       this.dialogue.active = false
       this.unpersistUI.active = true
       this.choiceBoxes.active = false
       this.textIndex = 0;
       this.plotScriptNode = null;
        
    }

   }
   selection(index: number){
    this.select.active = false;
    this.control=0;
    this.plotScriptNode.emit(`select1`,index)
    const choices = this.select.getChildByName("selections").children
    choices.map((choice: Node, index: number) => {

        choice.destroy()  //重置選項

    })
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