import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import GameDataManager from '../../../data/GameDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();

@ccclass('xiaoyuanka')
export class suguanayi extends Npc {

    start() {

        this._npcName = 'xiaoyuanka';
        super.start();

    }

    selectionHandler(event: number,type:number){

        if(this.plotJump[event] != -1)
        {

            console.log("see this", plotDataManager.plotdata[this._mapName][this._npcName].plot)
            switch( plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {

                // case 3://

                //     this.plotDatControl.water(this._npcName)
                //     gameDataManager.videoDataControl.beginVideo('https://nwpu.space:83/video/hezun.mp4/')
                //     break;
                

                    
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
    


