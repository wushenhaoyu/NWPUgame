import { _decorator, Component, director, Node } from 'cc';
import { playerData } from './playerData';
import { timeData } from './timeData';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    playerData:playerData = new playerData()
    timeData:timeData = new timeData()
    
    start() {
        director.addPersistRootNode (this.node)
    }

    update(deltaTime: number) {
        
    }
}


