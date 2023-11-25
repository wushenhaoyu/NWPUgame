import { _decorator, Component, Node,director, find } from 'cc';
const { ccclass, property } = _decorator;
import PlayerDataManager  from '../../data/PlayerDataManager';
const playerDataManager = PlayerDataManager.getInstance();
@ccclass('player')
export class player extends Component {
    @property({type:Node})
    public joystick:Node = null;
    start() {
       const UI = find('UI')
     // this.joystick = playerDataManager.joystick;
   /*  this.joystick = UI.getChildByPath('UICanvas/UI/unpersistUI/control/joystick')
       console.log(this.joystick)
        this.joystick.emit('agian',this.node);*/
    }
    

    update(deltaTime: number) {
        
    }
}


