import { _decorator,PhysicsGroup, Component, Node, Prefab,instantiate,RigidBody2D,v2, BoxCollider2D, Contact2DType, ERigidBody2DType, size } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('npc1')
export default class npc1 extends Component{
    // 在这里可以添加你自己的属性和方法
    detectionDistance: number = 50;
    speed:RigidBody2D = null;
    private isColliding: boolean = false;
    roation:number = 2;
    box:BoxCollider2D = null;

    constructor() {
        super();
    }

    start() {
        this.node.on('talk', this.talk, this);

        // 获取 RigidBody2D 组件并确保存在
        this.speed = this.node.getComponent(RigidBody2D);
        if (!this.speed) {
            console.error('RigidBody2D component is missing or not yet initialized.');
            return;
        }
        // 尝试调用 newCollision 方法
        this.initCollision();
        console.log(PhysicsGroup);
        console.log(this.node)
    }
    talk()
    {

    }

    turn() {
        console.log(this.speed, this.speed.enabledContactListener);
        this.updateRoation();
    
        // 推迟修改到下一帧
        this.scheduleOnce(() => {
            this.changeCollision();
        }, 0);
    }
    initCollision()
    {
        this.box = this.node.addComponent(BoxCollider2D);
        this.box.size = size(44,72);
        this.box.sensor = true;
        this.box.group = 16;
        this.box.on(Contact2DType.BEGIN_CONTACT,this.turn,this);
        this.speed.enabledContactListener = true;
        this.box.apply()
        this.changeCollision()
    }
    changeCollision()
    {
        switch(this.roation)
        {
            case 0:
                console.log("向左")
                this.speed.linearVelocity = v2(2,0);
                this.box.offset = v2(this.getRandomInt(10,50),0);
                break;
            case 1:
                this.speed.linearVelocity = v2(0,2);
                this.box.offset = v2(0,this.getRandomInt(10,50));
                break;
            case 2:
                this.speed.linearVelocity = v2(-2,0);
                this.box.offset = v2(-this.getRandomInt(10,50),0);
                break;
            case 3:
                this.speed.linearVelocity = v2(0,-2);
                this.box.offset = v2(0,-this.getRandomInt(10,50));
                break;
        }
        this.box.apply();
    }
    updateRoation()
    {
        this.roation = this.getRandomInt(0, 3);

    }

    update(dt: number) {

        
    }

     getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
   
    
    
}
