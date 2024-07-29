import { _decorator, Component, Node,NodeEventType,Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('img')
export class img extends Component {
    @property({type:Node})
    public back:Node = null;
    start() {
        this.back.on(NodeEventType.TOUCH_END,this.bagTouchEnd,this)

    }
    bagTouchEnd()
    {
        const button = this.back.getComponent(Button)
        this.node.active = false
    }
    update(deltaTime: number) {
        
    }
}


