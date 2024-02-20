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

        this.shopUI.active = true;

    }

    selectionHandler(event: number,type:number){

        if(this.plotJump[event] != -1)
        {

            switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                case 1:
                    this.openShop();
                    break;
                case 2:
                    
            }

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


