import { _decorator, AnimationComponent, BoxCollider, Component, input, Label, macro, Node, NodeEventType, PhysicsSystem2D, RigidBody2D, v2, Vec3, view, View } from 'cc';
const { ccclass, property } = _decorator;
enum status{
    none = 0,
    left = 1,
    right = 2,
    speed = 3
}

@ccclass('daka_GameManager')
export class daka_GameManager extends Component {
    @property({type:Node})
    public player:Node = null;
    @property({type:Node})
    public left:Node = null;
    @property({type:Node})
    public right:Node = null;
    @property({type:Node})
    public collider:Node = null;
    @property({type:Label})
    public mile:Label = null;
    @property()
    public speed:number = 100;
    @property()
    public gameSpeed:number = 5;
    @property({type:Label})
    public timeLabel:Label = null;
    public currentGameSpeed:number = 5;
    status = status.none;
    control:boolean = true; //控制是否加速
    player_position:Vec3 = new Vec3(0,0,0);
    body:RigidBody2D = null;
    length:number = 0;
    time:number = 0;
    power:number = 100;
    isPeek:boolean = false;
    start() {
        view.setOrientation(macro.ORIENTATION_PORTRAIT)
        this.left.on(NodeEventType.TOUCH_START,this.left_start,this);
        this.left.on(NodeEventType.TOUCH_MOVE,this.left_move,this);
        this.left.on(NodeEventType.TOUCH_END,this.left_end,this);
        this.left.on(NodeEventType.TOUCH_CANCEL,this.left_end,this);

        this.right.on(NodeEventType.TOUCH_START, this.right_start, this);
        this.right.on(NodeEventType.TOUCH_MOVE, this.right_move, this);
        this.right.on(NodeEventType.TOUCH_END, this.right_end, this);
        this.right.on(NodeEventType.TOUCH_CANCEL, this.right_end, this);

        this.node.on('item',this.itemEffect,this)
        this.node.on('blockBegin',()=>{
            this.stop()
        },this)
        this.node.on('blockEnd',()=>{
            console.log('begin')
            this.begin()
        },this)
        this.node.on('personBegin',()=>{
            this.stop()
            this.begin()
        })

        this.body = this.player.getComponent(RigidBody2D)
    }

    
    itemEffect(event)
    {
        switch(event)
        {
            case 1 ://护盾
                break;
            case 2 ://补充体力

            break;

            case 3 ://加速

            break;

        }
    }
    left_start()
    {

        if(this.status == status.none)
        {
            this.status = status.left;
        }
        else if(this.status == status.right)
        {
            this.status = status.speed;
        }
    }
    left_move()
    {

    }
    left_end()
    {
        if(this.status == status.left)
        {
            this.status = status.none;
        }
        else if(this.status == status.speed)
        {
            this.status = status.right;
        }
    }
    right_start() {
        if (this.status === status.none) {
            this.status = status.right;
        } else if
        (this.status === status.left) {
        this.status = status.speed;
        }
    }
    right_move() {
        // 可以根据需要添加右移时的逻辑处理
    }
    
    right_end() {
        if (this.status === status.right) {
            this.status = status.none;
        } else if (this.status === status.speed) {
            this.status = status.left;
        }
    }
    stop()
    {
        this.control  = false;
        this.currentGameSpeed = 0;
        for(var i = 0 ; i < this.collider.children.length ; i++)
        {
            this.collider.children[i].getComponent(RigidBody2D).linearVelocity = v2(0,0)
        }
        this.player.getComponent(AnimationComponent).pause();
    }
    begin()
    {
        this.control = true;
        this.player.getComponent(AnimationComponent).play()
    }
    

    update(deltaTime: number) {
        if( this.control )
        {
            if(this.isPeek)
            {
                if(this.power > 1)
                {
                    this.power -= deltaTime;
                }
                else{
                    this.gameSpeed = 5;
                    if(this.currentGameSpeed > 5.2)
                    this.currentGameSpeed = 5
                    this.isPeek = false
                }
            }
            this.currentGameSpeed += deltaTime * this.gameSpeed;
            let body =  this.collider.getComponentsInChildren(RigidBody2D)
            for(var i = 0 ; i < body.length ; i++)
            {
                body[i].linearVelocity = v2(0,-this.currentGameSpeed)
            }
            if(this.currentGameSpeed >= this.gameSpeed )
            {
                this.control = false;
            }
        }
        if(this.length / 100 >= 3.2)
        {
            return;
        }
        this.time += deltaTime;
        this.timeLabel.string = "时间" + this.time.toFixed(1) + "/60S"
        if(this.currentGameSpeed != 0)
        {
            this.length += deltaTime * this.currentGameSpeed;
            this.mile.string = '距离：' + (this.length / 100).toFixed(2) + '/ 3.20Km'
        }
        if(this.isPeek)
        {
            this.gameSpeed = 8;
            this.control =true;
        }
        switch(this.status)
        {
            case 0 : 
            this.body.linearVelocity = v2(0 , 0)
            return;
            case 1 :
                    this.body.linearVelocity = v2(-this.speed , 0)
             break;
                
            //左转
            case 2:
                this.body.linearVelocity = v2(this.speed , 0)
                break;
            //右转
            case 3:
                if(this.power > 1)
                {
                    this.isPeek = true;
                }else{
                    this.isPeek = false;
                }
                
                
            //加速
        }
    
        
    }
}


