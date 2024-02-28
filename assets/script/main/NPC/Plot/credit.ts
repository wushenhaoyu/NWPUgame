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
            console.log(event)
            switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                case 1://办卡了
                    /*this.plotDatControl.getMapScript().switchMap('sushe','sushe',()=>{
                        this.plotDatControl.UINode.active = false;
                    })*/
                    break;
                case 2://没办

                    
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

