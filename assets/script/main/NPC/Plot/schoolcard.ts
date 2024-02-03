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

    selectionHandler(event: number){

        if(this.plotJump[event] != -1)
        {

            console.log("schoolcard: " + event);

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]

            this.whichEvent();

            this.plotfunc()

        }

    }

    whichEvent()
    {
        switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
        {
            case 1://办卡了
                plotDataManager.plotdata.aoxiangxueshengzhongxin.xiaoyuanka.plot = 4;
                break;
            case 2://没办
                gameDataManager.plotDataControl.stageByTime = 4;
        }
    }
    

}


