import { _decorator, Component, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('phone')
export class phone extends Component {
    @property({type:Node})
    public back:Node=null
    start() {
        this.back.on(NodeEventType.TOUCH_END,this.backTouchEnd,this)
    }
    backTouchEnd()
    {
        this.node.active =false;
    }
    update(deltaTime: number) {
        
    }
}


