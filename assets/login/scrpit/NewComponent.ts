import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property({type:Node})
    public gg:Node = null;
    start() {

    }

    update(deltaTime: number) {
        
    }
}


