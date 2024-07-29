import { _decorator, Component, Node ,NodeEventType, Vec2, v3,UITransform,math} from 'cc';
import { camera } from '../../main/map/camera';
const { ccclass, property } = _decorator;

@ccclass('btnmove')
export class btnmove extends Component {

    @property(Node)
    heronode = null;

    sin = 0;
    cos = 0;
    speed = 120;

    //事件检测
    start() {
        this.node.on(NodeEventType.TOUCH_START, this.stouchs,this);
        this.node.on(NodeEventType.TOUCH_CANCEL || NodeEventType.TOUCH_END , this.stouche,this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.stouchm,this);

    }

    //开始移动遥杆
    stouchs(event){
        let loc = event.getUILocation()
        let pos =     this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(loc.x,loc.y,0));
        this.node.setPosition(v3(pos.x,pos.y,0));
    }

    //移动中
    stouchm(event){
        let loc = event.getUILocation()
        let pos =     this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(v3(loc.x,loc.y,0));

        
        this.cos = pos.x/Math.sqrt(pos.x*pos.x+pos.y*pos.y);
        this.sin = pos.y/Math.sqrt(pos.x*pos.x+pos.y*pos.y)
        if(pos.x*pos.x+pos.y*pos.y < 10000) this.node.setPosition(pos);
        else this.node.setPosition(v3(this.cos*100,this.sin*100,0))
        
    }

    //移动结束
    stouche(event){
        let pos =     this.node.getComponent(UITransform).convertToNodeSpaceAR(event.getLocation());
        this.node.setPosition(v3(pos.x,pos.y,0));

    }

    update(dt) {
        // this.speed += 3*dt;
        let x = this.heronode.getPosition().x;
        let y = this.heronode.getPosition().y;

        this.heronode.setPosition(v3(x+this.cos*this.speed*dt, y+this.sin*this.speed*dt, 0))
    }
}


