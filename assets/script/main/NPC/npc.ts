import { _decorator, Component, error, find, JsonAsset, Node, resources, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../data/PlotDataManager';
const plotDataManager = PlotDataManager.getInstance();
import GameDataManager from '../../data/GameDataManager';
import text from '../dialogue/text';
const gameDataManager = GameDataManager.getInstance();

interface NpcDataContainer {
    name: string,
    uuid: number,
    isPlotNpc: boolean,
    mapName: string,
    start: TextData,
    plot: PlotTextData[],
    dialog: TextData[][],
}

interface TextData{

    Name: string,
    Text: string,
    Speaker: boolean,
    Img: string,

}

interface PlotTextData{

    id: number,
    type: number,
    name: string,
    script: string,
    choice: string[],
    plotjump: number[],
    dialog: TextData[],

}

interface SendData{

    type: number,
    name: string,
    choice: string[],
    dialog: TextData[],

}

export class Npc extends Component {
    @property({type:Node})
    public text:Node = null;

    @property({type:Node})
    public mapNode:Node = null;

    protected _npcData: NpcDataContainer;

    protected _npcName: string;

    protected _mapName: string;

    protected _isPlotNpc: boolean;

    protected plotJump: number[] = [];

    protected isPlot:boolean = false; //是否为纯剧情不带一点npc的



    start() {
        if(this.isPlot)
        {
            resources.load(`dialogue/Plot/${this._npcName}`,JsonAsset,(err, jsonAsset) => {
                if (err) {
                    error("this is an error:", err);
                    return;
                }
    
                this._npcData = jsonAsset.json as NpcDataContainer
                this._isPlotNpc = this._npcData.isPlotNpc;
                this._mapName = this._npcData.mapName;
    
                if(this._isPlotNpc)
                {
                    this.node.on("select1",this.selectionHandler,this)//接受带选择的
                    this.node.on("select2",this.endConverstion,this)//不带选择的
                    this.node.on('choicebox plot dialogue', this.plotfunc, this)
                }
        
                this.node.on('choicebox normal dialogue', this.normalfunc, this)
            })
        }
        else {

        resources.load(`dialogue/${this._npcName}`,JsonAsset,(err, jsonAsset) => {
            if (err) {
                error("this is an error:", err);
                return;
            }

            this._npcData = jsonAsset.json as NpcDataContainer
            this._isPlotNpc = this._npcData.isPlotNpc;
            this._mapName = this._npcData.mapName;

            if(this._isPlotNpc)
            {
                this.node.on("select1",this.selectionHandler,this)//接受带选择的
                this.node.on("select2",this.endConverstion,this)//不带选择的
                this.node.on('choicebox plot dialogue', this.plotfunc, this)
            }
    
            this.node.on('choicebox normal dialogue', this.normalfunc, this)
        })
    }

        
    }

  plotfunc(){ //from choicebox
        
    setTimeout(()=>{console.log(this._npcData)
        const currentPlot: PlotTextData = this._npcData.plot[plotDataManager.plotdata[this._mapName][this._npcName].plot]
        const dialogueData: SendData = {
            
            type: currentPlot.type,
            name: currentPlot.name,
            choice: currentPlot.choice,
            dialog: currentPlot.dialog,
            
        }
        this.text.emit("conversation", dialogueData);
        
        this.plotJump = currentPlot.plotjump

        if(this.isPlot)
        {

           // if(currentPlot.type == 0)
           // {

                this.text.getComponent(text).initPlotStart(this._npcName);
           // }
        }},100)
      

    }

    normalfunc(){  //from choicebox


        const currentDialog: TextData[] = this._npcData.dialog[plotDataManager.plotdata[this._mapName][this._npcName].dialogue]

        const dialogueData: SendData = {

            type: 0,
            name: null,
            choice: [],
            dialog: currentDialog,

        }
        this.text.emit("conversation", dialogueData);

    }



    selectionHandler(event: number){

        // if(this.plotJump[event] != -1)
        // {

        //     plotDataManager.plotdata[this._mapName][this._npcName].plot = event

        //     this.plotfunc()

        // }

    }

    endConverstion(){

        if(this.plotJump.length > 0)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[0]

        }

        this.node.active = false;
        if(!this.isPlot)
        {
            this.npcWalkAgain()
        }

    }

    update(deltaTime: number) {
        
    }

    npcWalkAgain(){
        if(!this.mapNode.name)
        {
            this.mapNode =  find('/gameWorld/gameCanvas/Map');
        }
        const npcNode = this.mapNode.components[1].npclist.find((npc: Node) => npc.name == this._npcName)
        if(npcNode.getComponent('npc1'))
        {

            npcNode.getComponent('npc1').restart()

        }

   }

   get firstText() : TextData
   {

       return this._npcData.start

   }

   get isPlotNpc() : boolean
   {

       return this._isPlotNpc;

   }

   get plotText() : PlotTextData[]
   {

        return this._npcData.plot;

   }


}


