import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('nvtongxue')
export class nvtongxue extends Npc {

    start() {

        this._npcName = 'nvtongxue';
        super.start();

    }

    selectionHandler(event: number){

        if(this.plotJump[event] != -1)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]

            this.plotfunc()

        }

    }
    

}


