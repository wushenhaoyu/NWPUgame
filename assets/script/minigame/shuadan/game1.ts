import { _decorator, Component, EventTouch, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game1')
export class game1 extends Component {

    @property(Prefab)
    public receipt: Prefab = null;

    receiptNode: Node = null; // 用于存储生成的receipt节点

    start() {

    }

    protected onLoad(): void {
        
        this.receiptNode = instantiate(this.receipt);
        this.node.addChild(this.receiptNode);
        this.receiptNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

    }

    update(deltaTime: number) {

        
    }

    onTouchMove(event: EventTouch)
    {

        console.log("hihi")
        let pos = event.getUILocation();
        this.receiptNode.setPosition(this.receiptNode.position.x, pos.y, 0); // 设置节点位置

    }
}


