import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

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

        // if(this.plotJump[event] != -1)
        // {

        //     console.log("Plot1_1: " + event);

        //     plotDataManager.plotdata.Plot.Plot1_1.plot = this.plotJump[event]

        //     this.plotfunc()

        // }

        if(this.plotJump[event] != -1)
        {
            console.log("Plot1_1: " + event);

            plotDataManager.plotdata.Plot.Plot1_1.plot = this.plotJump[event]

            this.plotfunc()

        }

    }
    

}

