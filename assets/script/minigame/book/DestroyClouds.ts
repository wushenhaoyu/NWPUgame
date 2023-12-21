import { _decorator, BoxCollider2D, Component, Node, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('destroycloud')
export class destroyclouds extends Component {
    col = null;
    start() {
        this.col = this.node.getComponent(BoxCollider2D);
        this.col.on(Contact2DType.BEGIN_CONTACT,this.destroycloud,)

    }

    update(deltaTime: number) {
        
    }
}


