import { _decorator, Component, Node, NodeEventType,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('login')
export class login extends Component {
    @property({type:Node})
    public loginbutton:Node = null;
    start() {
        this.loginbutton.on(NodeEventType.TOUCH_START,this.touchstart,this)
        this.loginbutton.on(NodeEventType.TOUCH_END,this.touchend,this)
        this.loginbutton.on(NodeEventType.TOUCH_CANCEL,this.touchcancel,this)
    }
    touchstart(){
        this.loginbutton.setScale(0.9,0.9)
    }
    touchcancel(){
        this.loginbutton.setScale(1,1)
    }
    touchend(){
        this.loginbutton.setScale(1,1)
        //director.loadScene('main')
    }
    update(deltaTime: number) {
        
    }
}


