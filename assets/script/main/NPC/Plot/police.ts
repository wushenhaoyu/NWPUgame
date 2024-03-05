import { _decorator, Component, Node, Tween } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
import GameDataManager from '../../../data/GameDataManager';
import { PlotDataControl } from '../../game/PlotDataControl';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('police')
export class police extends Npc {
    onLoad() {
        this._npcName = 'police';
        this.isPlot = true;
    }
    start() {
        super.start();
    }
    selectionHandler(event: number,type:number){
        if(this.plotJump[event] != -1)
        {
            console.log(event)
            switch(plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                 case 0:
                    
                    break;
                 case 1:
                    
                    break;

                case 3:
                    
                //todo add phone

            }
            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]
            if(type)
            {   //如果连续
                this.plotfunc();
            }
            else{//不连续就让text结束对话
                this.plotDatControl.UINode.active = true;
                this.text.emit('end')
            }
        }

    }

    /*
        模板在这自取

        selectionHandler(event: number,type:number){
        if(this.plotJump[event] != -1)
        {
            console.log(event)
            switch(plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {

            }
            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]
            if(type)
            {   
                this.plotfunc();
            }
            else{
                this.plotDatControl.UINode.active = true;
                this.text.emit('end')
            }
        }

    }
    
    
    */ 
    

}





