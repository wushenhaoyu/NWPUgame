import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
import GameDataManager from '../../../data/GameDataManager';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('xiaoshouyuan')
export class xiaoshouyuan extends Npc {

    @property({type: Node})
    public shopUI: Node = null;

    start() {

        this._npcName = 'xiaoshouyuan';
        super.start();

    }
    openShop()
    {
        this.text.emit("force close conversation")

        this.shopUI.active = true;

    }

    selectionHandler(event: number){

        if(this.plotJump[event] != -1)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]

            this.whichEvent(event)

            this.plotfunc()

        }

    }

    whichEvent(event?:number)
    {
        switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
        {
            case 1://办卡了
                this.openShop();
                break;
            case 2://没办
                
        }
    }
    

}


