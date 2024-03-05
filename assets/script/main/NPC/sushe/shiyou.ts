import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
import GameDataManager from '../../../data/GameDataManager';

const plotDataManager = PlotDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();
@ccclass('shiyou')
export class shiyou extends Npc {

    start() {

        this._npcName = 'shiyou';
        super.start();

    }

    selectionHandler(event: number,type:number){

        if(this.plotJump[event] != -1)
        {

            plotDataManager.plotdata[this._mapName][this._npcName].plot = this.plotJump[event]

            switch(plotDataManager.plotdata[this._mapName][this._npcName].plot)
            {
                case 1 : //学生手册选择
                
                break;
                case 2 : // 饮用水选择
                this.plotDatControl.water()//触发饮用水剧情
                    
                break;
                case 3 : //网络选择
                this.plotDatControl.schoolcard(this._npcName)//触发网络剧情
                
                break
            }
            console.log("see this in shiyou", event, type)


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


