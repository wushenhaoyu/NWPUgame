import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import GameDataManager from '../../../data/GameDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('credit')
export class credit extends Npc {

    onLoad() {
        this._npcName = 'credit';
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
                    this.plotDatControl.getMapScript().switchMap('sushe','sushe',()=>{
                        this.plotDatControl.UINode.active = false;
                        gameDataManager.plotDataControl.UINode.active = true
                    })
                    break;
                case 2://没办
                    console.log("辦卡了")
                    this.plotDatControl.getMapScript().switchMap('sushe','sushe',()=>{
                        this.plotDatControl.UINode.active = false;
                        gameDataManager.plotDataControl.UINode.active = true
                    })

                    
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
    

}

