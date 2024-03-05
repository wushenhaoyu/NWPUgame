import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('water')
export class water extends Npc {

    onLoad() {
        this._npcName = 'water';
        this.isPlot = true;
    }
    start() {

        super.start();

    }

    selectionHandler(event: number,type:number){

        if(this.plotJump[event] != -1)
        {

            switch(plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                
            }

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]
            console.log("see this in water", event, type)

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


