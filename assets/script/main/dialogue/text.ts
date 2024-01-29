import { _decorator, Component, JsonAsset, Label, Node, resources, Sprite,error,SpriteFrame,find,input, Button, NodeEventType, Prefab, instantiate, TextureCube } from 'cc';
const { ccclass, property } = _decorator;

import PlotDataManager from '../../data/PlotDataManager';
const plotDataManager = PlotDataManager.getInstance();
import GameDataManager from '../../data/GameDataManager';
const gameDataManager = GameDataManager.getInstance();
import { Npc } from '../NPC/npc'

interface TextData {

    Name: string,
    Text: string,
    Speaker: boolean, //是否為自己說
    Img: string,

}

interface SendData{

    type: number,
    name: string,
    choice: string[],
    dialog: TextData[],

}

@ccclass('text')
export default class text extends Component {

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
   @property ({type:Label})
   public Text:Label = null;
   @property ({type:Node})
   public mapNode = null;
   public control:number = 0; //0为普通对话，1为剧情
   textEnd = true; //是否到头
   nowText = ""; //即将播放的文字
   map:string = ""
   tt = 0;
   firstText: TextData = null;
   npcName: string = null; //正在互动的npc
   plotjump: Array<number> | number = null; //剧情的跳转
   @property ({type:Node})
   public startBtn:Node = null; //互动鍵
   
   @property ({type:Node})
   public choiceBoxes: Node = null; //互动選項
   
    private textIndex = -1; //索引
    private textData:  TextData[] = [] //装对话的数组
    private npcNode: Node = null;
    private npcComponent: Npc = null;
    private isPlotNpc: boolean = null;
    private choices: Array<string> = [];
    public isPurePlot: boolean = false; //是否为纯剧情？


   start() {

        this.node.on('npc',this.initstart,this)  

        this.node.on("conversation", this.startConversation, this)

        this.node.on("force close conversation", this.closeDialog, this)

        this.node.on('plot',this.initPlotStart,this)

        this.map = gameDataManager.getMap();
        this.choiceBoxes.getChildByName("choicebox1").on(NodeEventType.TOUCH_START, () => this.npcNode.emit('choicebox normal dialogue'), this) //普通对话回调
        this.choiceBoxes.getChildByName("choicebox2").on(NodeEventType.TOUCH_START, () => this.npcNode.emit('choicebox plot dialogue'), this)  //特殊对话回调
        this.choiceBoxes.getChildByName("choicebox3").on(NodeEventType.TOUCH_START, this.closeDialog, this)  //关闭对话框回调
        this.dialogue.on(NodeEventType.TOUCH_START, this.nextTextData, this)
        this.select.getChildByName("selections").on(NodeEventType.TOUCH_START, () => console.log("gggg"), this)
   }

    initplotchoice(choices: Array<string>){

        for(let i = 0; i < choices.length; i++){

            const choiceNode = instantiate(this.selectChoicePrefab)
            this.select.getChildByName("selections").addChild(choiceNode)
            let choiceName = choiceNode.getComponentInChildren(Label)
            choiceName.string = choices[i]
            choiceNode.on(NodeEventType.TOUCH_END,() => this.selection(i),this)

        }

    }
    initPlotStart(event:string)
    {
        if(this.npcNode == null)
        {
        this.npcNode = find(`UI/plot/Plot/${event}`)

        this.npcComponent = this.npcNode.getComponent(event) as Npc

        this.map = gameDataManager.getMap();

        this.dialogue.active = true;

        this.unpersistUI.active = false;

        this.npcName = event;

        //this.firstText = this.npcComponent.firstText;
        
       // this.setTextData(this.firstText);
        
        this.isPlotNpc = this.npcComponent.isPlotNpc;

        this.isPurePlot = true;

        //this.nowText = this.firstText.Text;
        }
    }



   initstart(event: string) //初始话npc对话功能 event = npcName
   {

       this.npcNode = find(`UI/plot/${event}`)

        this.npcComponent = this.npcNode.getComponent(event) as Npc

        this.map = gameDataManager.getMap();
        
        this.dialogue.active = true;

        this.unpersistUI.active = false;
        
        this.npcName = event;
        
        this.firstText = this.npcComponent.firstText;
        
        this.setTextData(this.firstText);
        
        this.isPlotNpc = this.npcComponent.isPlotNpc;

        this.nowText = this.firstText.Text;

        this.isPurePlot = false;

   }
   
   nextTextData()
   {

        

       if(this.textEnd)  //檢查對話是否完結
       {
               
            if(!this.choiceBoxes.active){

                if(++this.textIndex < this.textData.length)  //檢查是否為最後一句
                {
                    
                    this.setTextData(this.textData[this.textIndex])
 
                }
                else
                {
                    
                    this.closeDialog()
                
                }
                
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
        if(data.Img != "")
        {
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
    }    
    closeDialog(){
        if(this.control){   
            //写显示选项并且能知道选择了哪个并返回给脚本结果 要通过监听来一开始就知道是哪个脚本发送的（还没写）
            
            this.select.active = true;

            // if(this.npcName == "Plot1_1")
            // {
            //     this.selection(0)

            // }

            // const choices = this.select.getChildByName("selections").children

            
            // for(let i = 0;i<choices.length;i++){
                
            //     // choices[i].on(NodeEventType.TOUCH_END,() => this.selection(i),this)
            //     choices[i].on(NodeEventType.TOUCH_END,() => console.log("hihi"),this)

            // }

            

        }
        else{
            
            if(this.npcNode != null)
            {
                this.npcNode.emit("select2")
            }

            
            this.dialogue.active = false
            this.unpersistUI.active = true
            this.choiceBoxes.active = false
            this.textIndex = 0;
            this.npcNode = null;
           // gameDataManager.plotDataControl.isReovered = false;
            gameDataManager.plotDataControl.checkPlot();
            if(!this.isPurePlot)
            {
                this.npcWalkAgain()
            }
            this.textIndex = -1
                
            }


    }
    selection(index: number){
        console.log('yes')
        this.select.active = false;
        this.control=0;
        this.npcNode.emit(`select1`,index)
        const choices = this.select.getChildByName("selections").children
        choices.map((choice: Node, index: number) => {

            choice.destroy()  //重置選項

        })

   }

    npcWalkAgain(){
        if(!this.mapNode.name)
        {
            this.mapNode =  find('/gameWorld/gameCanvas/Map');
    
        }
        const npcNode = this.mapNode.components[1].npclist.find((npc: Node) => npc.name == this.npcName)
        
        if(npcNode.getComponent('npc1'))
        {

            npcNode.getComponent('npc1').restart()

        }

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
               if(this.textIndex == -1 && this.npcNode != null)
               {

                    this.choiceBoxes.active = true;
                    this.choiceBoxes.getChildByName("choicebox1").active = true; //if isPlotData open all, else dont open plot
                    this.choiceBoxes.getChildByName("choicebox3").active = true;

                    if(this.isPlotNpc)
                    {

                        this.choiceBoxes.getChildByName("choicebox2").active = true;
                        this.choiceBoxes.getChildByName("choicebox2").getComponentInChildren(Label).string = this.npcComponent.plotText[0].name ;

                    }

               }
           }
           this.tt = 0;
       }
   }

   startConversation(sendedTextData: SendData)
   {
        this.control = sendedTextData.type
        this.textIndex = 0
        this.textData = sendedTextData.dialog

        this.setTextData(this.textData[this.textIndex])
        this.choices = sendedTextData.choice;
        this.dialogue.active = true;
        this.choiceBoxes.active = false;

        this.initplotchoice(this.choices)


   }
















}