import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('student2')
export class student2 extends Npc {

    start() {

        this._npcName = 'student2';
        super.start();

    }
    

}

