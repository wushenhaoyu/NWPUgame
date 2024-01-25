import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('Plot1_1')
export class Plot1_1 extends Npc {

    start() {

        this._npcName = 'Plot/Plot1_1';
        super.start();

    }
    

}


