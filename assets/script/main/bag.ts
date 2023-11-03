import { _decorator, Component, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bag')
export class bag extends Component {
    @property({type:Node})
    public back:Node = null;
    start() {
        this.back.on(NodeEventType.TOUCH_END,this.bagTouchEnd,this)

    }
    bagTouchEnd()
    {
        this.node.active = false
    }
    update(deltaTime: number) {
        
    }
}


