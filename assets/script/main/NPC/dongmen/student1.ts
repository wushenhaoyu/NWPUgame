import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import { Npc } from '../../res/npc';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('student1')
export class student1 extends Npc {

    start() {

        this._npcName = 'student1';
        super.start();

    }
    

}
