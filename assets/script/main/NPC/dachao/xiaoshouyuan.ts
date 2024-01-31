import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('xiaoshouyuan')
export class xiaoshouyuan extends Npc {

    @property({type: Node})
    public shopUI: Node = null;

    start() {

        this._npcName = 'xiaoshouyuan';
        super.start();

    }

    plotfunc(): void {
        
        this.text.emit("force close conversation")

        this.shopUI.active = true;

    }

    selectionHandler(event: number){

        if(this.plotJump[event] != -1)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]

            this.plotfunc()

        }

    }
    

}


