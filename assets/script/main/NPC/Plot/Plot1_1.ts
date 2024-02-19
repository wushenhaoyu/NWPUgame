import { _decorator, Component, Node, Tween } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
import GameDataManager from '../../../data/GameDataManager';
import { PlotDataControl } from '../../game/PlotDataControl';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('Plot1_1')
export class Plot1_1 extends Npc {
    onLoad() {
        this._npcName = 'Plot1_1';
        this.isPlot = true;
    }
    start() {
        super.start();
    }
    selectionHandler(event: number,type:number){
        if(this.plotJump[event] != -1)
        {
            console.log(event)
            switch(plotDataManager.plotdata.Plot.Plot1_1.plot)
            {
                 case 0:
                    this.plotDatControl.tweenStop()
                    this.plotDatControl.getCameraScript().changeControl();
                    this.scheduleOnce(() => {
                        this.plotDatControl.getMapScript().switchMap('sushe','sushe',()=>{
                            this.node.getComponent(Npc).plotfunc();
                         })
                    }, 0);
                     break;
                 case 1:
            }
            plotDataManager.plotdata.Plot.Plot1_1.plot = this.plotJump[event]
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


