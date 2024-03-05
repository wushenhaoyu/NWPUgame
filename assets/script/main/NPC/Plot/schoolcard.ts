import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
import GameDataManager from '../../../data/GameDataManager';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('schoolcard')
export class schoolcard extends Npc {

    onLoad() {
        this._npcName = 'schoolcard';
        this.isPlot = true;
    }
    start() {
        super.start();
    }

    selectionHandler(event: number,type:number){
        if(this.plotJump[event] != -1)
        {
            console.log(event)
            switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                case 1://办卡了
                    console.log("辦卡了")
                    this.plotDatControl.getMapScript().switchMap('sushe','sushe',()=>{
                        this.plotDatControl.UINode.active = false;
                        gameDataManager.plotDataControl.UINode.active = true
                    })

                    break;
                case 2://没办
                    console.log("沒辦卡")
                    this.plotDatControl.getMapScript().switchMap('sushe','sushe',()=>{
                        this.plotDatControl.UINode.active = false;
                        gameDataManager.plotDataControl.UINode.active = true
                    })

                    
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
    
    

}


