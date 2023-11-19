import { _decorator, Component, Node,director,PhysicsSystem2D, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hudong')
export class hudong extends Component {
    @property({type:Node})
    public player:Node = null
    p = PhysicsSystem2D.instance
    start() {
        this.node.on("npc",this.initOperateBar,this)
       // this.node.on(NodeEventType.TOUCH_START,this.test,this)
    }
    test()
    {
        console.log("按了")
        this.node.emit('dialogue');
    }
    initOperateBar(event)
    {
        console.log("npc");
    }
    update(deltaTime: number) {
        
    }
}


