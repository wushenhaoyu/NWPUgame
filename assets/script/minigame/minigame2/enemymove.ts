import { _decorator, Component, Node ,director,Director,v3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemymove')
export class enemymove extends Component {

    @property(Node)
    target = null;

    sin = 0;
    cos = 0;

    speed = 80;
    pool = 1;

    start() {
        
    }

    crash(){
        this.node.destroy();
    }

    update(dt) {
        let x = this.node.getPosition().x;
        let y = this.node.getPosition().y;
        let tx = this.target.getPosition().x;
        let ty = this.target.getPosition().y;
        this.sin = (ty-y)/Math.sqrt((tx-x)*(tx-x)+(ty-y)*(ty-y));
        this.cos = (tx-x)/Math.sqrt((tx-x)*(tx-x)+(ty-y)*(ty-y));

        this.node.setPosition(v3(x+this.cos*this.speed*dt, y+this.sin*this.speed*dt,0));

        
    }
}


