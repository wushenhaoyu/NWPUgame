import { _decorator, Component, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('setting')
export class setting extends Component {
    @property({type:Node})
    public back:Node = null;
    start() {
        this.back.on(NodeEventType.TOUCH_END,this.backTouchEnd,this)

    }
    backTouchEnd()
    {
        this.node.active = false
    }
    update(deltaTime: number) {
        
    }
}


