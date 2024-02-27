import { _decorator, Component, Node, director, Director, BoxCollider2D, Contact2DType,Sprite, Color} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pool')
export class pool extends Component {
    @property(Number)
    time = 5;


    start() {
        //检测与敌人节点碰撞
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.clsenemy, this)
    }

    clsenemy(self, other){
        director.once(Director.EVENT_AFTER_DRAW,()=>{other.node.destroy()});
    }

    

    update(deltaTime: number) {
        //定期消失
        this.time -= deltaTime;
        if(this.time <= 0){
                this.time = 5;
                this.node.getComponent(Sprite).color  = new Color(232, 139, 0);
                director.once(Director.EVENT_AFTER_DRAW,()=>{this.node.getComponent(BoxCollider2D).enabled = false});
            }
        }
        
    }


