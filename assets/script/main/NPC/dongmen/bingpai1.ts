import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('bingpai1')
export class bingpai1 extends Npc {

    start() {

        this._npcName = 'bingpai1';
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
                this.plotDatControl.UINode.active = true;
            }


        }

    }
    

}


