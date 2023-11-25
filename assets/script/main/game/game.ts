import { _decorator, Component, director, Node ,Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    @property({type: Node})
    public UI: Node=null;
    @property({type: Node})
    public UIScript:Node=null;
    start() {
        director.addPersistRootNode(this.node);
        director.addPersistRootNode(this.UI);
        director.addPersistRootNode(this.UIScript);
    }
    update(deltaTime: number) {
        
    }
}


