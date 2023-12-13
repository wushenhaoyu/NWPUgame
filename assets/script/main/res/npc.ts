import { _decorator, Component, Node, Prefab,instantiate,RigidBody2D,v2, BoxCollider2D, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('npc1')
export default class npc1 extends Component{
    // 在这里可以添加你自己的属性和方法
    detectionDistance: number = 50;
    speed:RigidBody2D = null;
    private isColliding: boolean = false;
    roation:number = 0;
    box:BoxCollider2D = null;

    constructor() {
        super();
    }

    init() {
        this.node.on('talk',this.talk,this)
       this.speed = this.node.getComponent(RigidBody2D);
       this.speed.linearVelocity = v2(100,0);
       this.speed.enabledContactListener = true;
    }
    talk()
    {
        
    }

    turn()
    {
        this.updateRoation();
        this.box.destroy();
        this.newCollision();
    }
    newCollision()
    {
        switch(this.roation)
        {
            case 0:
                this.speed.linearVelocity = v2(100,0);
                this.box = this.node.addComponent(BoxCollider2D);
                this.box.sensor = true;
                this.box.offset = v2(50,0);
                this.box.group = 32;
                this.box.on(Contact2DType.BEGIN_CONTACT,this.turn,this);

                break;
            case 1:
                this.speed.linearVelocity = v2(0,100);
                this.box = this.node.addComponent(BoxCollider2D);
                this.box.offset = v2(0,50);
                this.box.group = 32;
                this.box.on(Contact2DType.BEGIN_CONTACT,this.turn,this);
                break;
            case 2:
                this.speed.linearVelocity = v2(-100,0);
                this.box = this.node.addComponent(BoxCollider2D);
                this.box.offset = v2(-50,0);
                this.box.group = 32;
                this.box.on(Contact2DType.BEGIN_CONTACT,this.turn,this);
                break;
            case 3:
                this.speed.linearVelocity = v2(0,-100);
                this.box = this.node.addComponent(BoxCollider2D);
                this.box.offset = v2(0,-50);
                this.box.group = 32;
                this.box.on(Contact2DType.BEGIN_CONTACT,this.turn,this);
                break;
        }
        this.box.apply()
    }
    updateRoation()
    {
       this.roation += 1;
       if(this.roation == 4)
            this.roation = 0;
    }

    update(dt: number) {

        
    }


    
    
}
