import { _decorator, Component, Node, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('map')
export default class Map extends Component {
    @property
    speed:number = 0;
    np:Vec3 = v3(0,0,0)

    

    start() {

    }

    update(dt) {
        this.np = this.node.getPosition()
        this.np.y -= this.speed * dt;


        

        if(this.np.y < -1500) 
        {
            this.np.y += 4350; 
        }

        this.node.setPosition(this.np);
    }
}


