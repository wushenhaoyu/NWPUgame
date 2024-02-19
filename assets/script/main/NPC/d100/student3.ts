import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('student3')
export class student3 extends Npc {
    start() {
        this._npcName = 'student3';
        super.start();
    }

    selectionHandler(event: number,type:number){

        if(this.plotJump[event] != -1)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]

            if(type)
            {   //如果连续
                this.plotfunc();
            }
            else{
                this.text.emit('end')
            }


        }

    }
}

