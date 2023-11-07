import { _decorator, Component, Node,director,PhysicsSystem2D, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hudong')
export class hudong extends Component {
    @property({type:Node})
    public player:Node = null
    p = PhysicsSystem2D.instance
    start() {
        this.node.on(NodeEventType.TOUCH_START,this.touchStart,this)
    }
    touchStart()
    {
        this.p.raycast(this.player.getPosition(),)
    }
    update(deltaTime: number) {
        
    }
}


