import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import GameDataManager from '../../../data/GameDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('suguanayi')
export class suguanayi extends Npc {

    start() {

        this._npcName = 'suguanayi';
        super.start();

    }

    selectionHandler(event: number,type:number){

        if(this.plotJump[event] != -1)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]
            switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                case 3://举报
                    console.log("举报")
                    this.plotDatControl.water(this._npcName)

                    break;
                

                    
            }
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
    


