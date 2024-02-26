import { _decorator, Component, Node ,Contact2DType, BoxCollider2D, Label, director, Director, PhysicsSystem2D, RigidBody2D, Sprite, Color} from 'cc';
import { pool } from './pool';
const { ccclass, property } = _decorator;

@ccclass('foodetect')
export class foodetect extends Component {

    @property(Node)
    lifenode = null;

    @property(Node)
    scorenode = null;

    @property(Node)
    pool = null;

    score = 0;
    life = 3;



    start() {
        //物理调试
        let p = PhysicsSystem2D.instance
        p.enable = true;
        p.debugDrawFlags = 1;

        //让sensor可以进行碰撞事件
        this.node.getComponent(RigidBody2D).enabledContactListener = true;


        //检测碰撞
        this.node.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT, this.getfood, this)
    }

    getfood(self, other:BoxCollider2D){
        //吃到食物
        if(other.group == 8){
            this.score += 10;
            this.scorenode.getComponent(Label).string = "score:" + this.score;
            director.once(Director.EVENT_AFTER_DRAW,()=>{other.node.destroy()});

            //恢复pool
            this.pool.getComponent(Sprite).color  = new Color(0, 0xF5, 0xFF);
            director.once(Director.EVENT_AFTER_DRAW,()=>{this.pool.getComponent(BoxCollider2D).enabled = true});
            this.pool.getComponent(pool).time = 5;
            

        }


        //碰到敌人
        if(other.group == 4){
            this.life-=1;
            this.lifenode.getComponent(Label).string = "life:" + this.life;
            if(this.life <= 0) this.over();
            director.once(Director.EVENT_AFTER_DRAW,()=>{other.node.destroy()});

            this.node.getComponent(Sprite).color = Color.RED;
            setTimeout(() => {this.node.getComponent(Sprite).color = Color.WHITE;
                
            }, 500);
        }
    }

    over(){
        //这里写结束之后
        this.scorenode.getComponent(Label).string = "over!!";
    }

    update(deltaTime: number) {
        
    }
}


