import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import GameDataManager from '../../../data/GameDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('shuadan')
export class shuadan extends Npc {

    onLoad() {
        this._npcName = 'shuadan';
        this.isPlot = true;
    }
    start() {

        super.start();

    }

    selectionHandler(event: number,type:number){


        if(this.plotJump[event] != -1)
        {
            console.log(event)
            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]
            if(type)
            {   //如果连续
                this.plotfunc();
            }
            else{//不连续就让text结束对话
                this.plotDatControl.UINode.active = true;
                this.text.emit('end')
            }

        }

    }
    

}

