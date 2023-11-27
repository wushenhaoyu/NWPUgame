import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../data/PlotDataManager';
const plotDataManager = PlotDataManager.getInstance();
import GameDataManager from '../../data/GameDataManager';
const gameDataManager = GameDataManager.getInstance();
@ccclass('frist')
export class frist extends Component {
    @property({type: Node})
    public UI:Node = null ;
    start() {
        this.UI.active = false ;
    }

    update(deltaTime: number) {
        
    }
}


