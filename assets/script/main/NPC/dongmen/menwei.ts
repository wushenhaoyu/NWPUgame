import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('menwei')
export class menwei extends Npc {

    start() {

        this._npcName = 'menwei';
        super.start();

    }
    

}


