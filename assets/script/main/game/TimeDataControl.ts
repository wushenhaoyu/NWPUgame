import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import GameDataManager from '../../data/GameDataManager';
const gameDataManager = GameDataManager.getInstance();
@ccclass('Time')
export class TimeDataControl extends Component {
    @property({type:Label})
    public time:Label = null;
    start() {
        this.updateTime();
    }
    updateTime()
    {
        this.time.string = gameDataManager.getDay().toString() + "天" ;
    }

    update(deltaTime: number) {
        
    }
}


