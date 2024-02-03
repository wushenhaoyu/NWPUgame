import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
import GameDataManager from '../../../data/GameDataManager';

const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();
@ccclass('shiyou')
export class shiyou extends Npc {

    start() {

        this._npcName = 'shiyou';
        super.start();

    }

    selectionHandler(event: number){

        if(this.plotJump[event] != -1)
        {
            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]
            console.log(plotDataManager.plotdata[this._mapName][this._npcName].plot)
            this.whichEvent();
            this.plotfunc() 

        }

    }

    whichEvent()
    {
        switch(plotDataManager.plotdata[this._mapName][this._npcName].plot)
        {
            case 1 : //学生手册选择
            break;
            case 2 : // 饮用水选择
                console.log('触发饮用水事件')
                gameDataManager.plotDataControl.currentPlot = "water";
                
            break;
            case 3 : //网络选择
        }
    }
    

}


