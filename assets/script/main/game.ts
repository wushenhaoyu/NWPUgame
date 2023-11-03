import { _decorator, Component, Node ,Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    public position=new Vec3(0,0,0)
    @property({type:Node})
    public player:Node = null;
    @property({type:Node})
    public camera:Node = null;
    start() {

    }

    update(deltaTime: number) {
        this.position = this.player.getWorldPosition();
        console.log(this.position )
        this.camera.setWorldPosition(this.position );
    }
}


