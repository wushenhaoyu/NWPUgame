import { _decorator, Component, Node, NodeEventType, PhysicsSystem2D ,RigidBody2D, v2,BoxCollider2D} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('book_game')
export default class book_move extends Component {
    @property ({type:Node})
    left:Node = null;

    @property ({type:Node})
    right:Node = null;

    @property ({type:Node})
    target:Node = null;

    @property
    speed:number = 1;

    @property
    flag:number = 0;

    rb = null;
    maxnum = 2; //能跳的最大次数
    l = 0;
    r = 0;

    
    //游戏最多可以五段跳，每次跳加一，为5就不能跳，停在云上恢复
    start() {

        //物理调试
        let p = PhysicsSystem2D.instance
        p.enable = true;
       // p.debugDrawFlags = 1;

        //获取碰撞
        this.rb = this.target.getComponent(RigidBody2D);

        //碰撞检测
        //位于collidedetect.ts，检测是否停在云上

        
        //检测到点击屏幕左右侧分别触发的函数
        this.left.on(NodeEventType.TOUCH_START,this.movelefts,this);
        this.right.on(NodeEventType.TOUCH_START,this.moverights,this);
        this.left.on(NodeEventType.TOUCH_END,this.movelefte,this);
        this.right.on(NodeEventType.TOUCH_END,this.moverighte,this);
    }

    //向左跳跃
    movelefts(event)
    {
            this.l = 1;
            this.r = 0;
            if(this.flag != this.maxnum)
            {
                this.rb.linearVelocity = v2(0, 16);
                
                this.flag++;
   
            }
            
    }

    
    movelefte()
    {
        this.l = 0;
    }


    //向右跳跃
    moverights(event)
    {
            this.r = 1;
            this.l = 0;
            if(this.flag != this.maxnum)
            {
                this.rb.linearVelocity = v2(0, 16);
                
                this.flag++;
            }
    }

    moverighte()
    {

        this.r = 0;
    }

    update(dt)
    {
        if(this.l && this.rb.linearVelocity.x > -15){
            this.rb.linearVelocity = v2(this.rb.linearVelocity.x-6*dt, this.rb.linearVelocity.y);
        }

        if(this.r && this.rb.linearVelocity.x < 15){
            this.rb.linearVelocity = v2(this.rb.linearVelocity.x+6*dt, this.rb.linearVelocity.y);
        }
    }
}


