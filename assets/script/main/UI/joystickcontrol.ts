import { _decorator, Component,v2, SystemEvent,PhysicsSystem2D, director, EventTouch,find, Vec2,Node, Sprite, Vec3,input, Input,AnimationComponent, RigidBody2D, UIOpacity,v3 ,ERaycast2DType,EPhysics2DDrawFlags,physics, TiledMap } from 'cc';
const { ccclass, property } = _decorator;
import PlayerDataManager  from '../../data/PlayerDataManager';
const playerDataManager = PlayerDataManager.getInstance();
@ccclass
export class Joystick extends Component {
    @property({type:Node})
    player:Node = null;

    @property({ type: Node })
    background: Node = null;

    @property({ type: Node })
    handle: Node = null;
    @property({ type: Node })
    public dialogue: Node = null;
    @property({ type: Node })
    father: Node = null;
    @property({type:Node})
    button:Node = null;
    @property({type:TiledMap})
    map:TiledMap = null;
    p = PhysicsSystem2D.instance
    private touchLocation: Vec2 = new Vec2();
    playerPosition:Vec3 = new Vec3();
    width:number =0;
    JoystickDirection = 0
    an = ""
    position = v3(0,0,0)
    handleposition = v3(0,0,0)
    bgposition = v3(0,0,0)
    angle:number = 0; //表示人物朝向
    npc = null;
    npcPosition :Vec3[] = []
    lv:Vec2 = new Vec2();
    onLoad() {
        // 监听触摸事件
       this.p.enable = true;
     //  this.p.debugDrawFlags = EPhysics2DDrawFlags.All;
      // playerDataManager.joystick = this.node;
        this.node.on('again',this.getPlayerAgain,this)
        this.father.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.father.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.father.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.father.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.width = this.background.getComponent(Sprite).spriteFrame.width / 2;
        this.position = this.node.getPosition();
        this.button.on(Node.EventType.TOUCH_START, this.hudong, this)
    }
    hudong() //检测是否附件有npc互动
    {
        const npc = this.map.getObjectGroup('NPC').getObjects()
       
        if(!this.npcPosition.length)
        {

            for(var i =0; i< npc.length; i++)
            {
                this.npcPosition.push(v3(npc[i].x,npc[i].y,0) ) 
            }

        }


        const position = this.player.position

        for(var i =0; i< this.npcPosition.length; i++)
        {
            if(Math.pow(position.x -this.npcPosition[i].x,2)+Math.pow(position.y -this.npcPosition[i].y,2) < 20000)
            {
                this.dialogue.emit('npc', npc[i].dialogue);
        
            }
        }
     /*   var x= 0;
        var y = 0;
        if(this.angle == 1 )
        {
            y = 400;
        }
        else if(this.angle == 2)
        {
            y = -400;
        }
        if(this.angle == 3 )
        {
            x = -400;
        }
        else if(this.angle == 4)
        {
            x = -400;
        }
        console.log(this.player)
       const position = this.player.getPosition()
       console.log(position)
      let res =  this.p.raycast(position,v3(position.x + x, position.y +y,0),ERaycast2DType.All)
        if(res)
        {
            console.log(res)
            this.node.emit('dialogue');
            if(res[0].collider.group == 8){
                console.log("检测到npc")
                this.node.emit('npc',res[0].collider.node );
            }
        }*/
    }
    getPlayerAgain(event)
    {
        
       this.player = event
    }
    onTouchStart(event: EventTouch) {
    
        this.touchLocation = event.getLocation();
        const opacity = this.node.getComponent(UIOpacity)
        opacity.opacity = 255;
    }

    onTouchMove(event: EventTouch) {
        const touch = event.getLocation();
        const direction = touch.subtract(this.touchLocation);
        const length = direction.length();
        const radius = this.width;
    
        if (length <= radius) {
            this.handle.setPosition(touch.x, touch.y, this.handle.position.z);
            this.getJoystickDirection()
        } else {
            const newDirection = direction.normalize().multiplyScalar(radius);
            this.handle.setPosition(newDirection.x,newDirection.y);
           this.getJoystickDirection()
        }
     
        // 更新摇杆的朝向和速度，可以根据需要自定义逻辑
        // 这里可以根据操纵点的位置计算角色移动的方向和速度
        // 例如，根据操控点的位置计算角色移动的方向和速度
        // const moveDirection = this.handle.position.normalize();
        // const moveSpeed = length / radius;
    }
    
       // d4p2RJhN1GOJNou5w69Nor
       //NONE: 0,
      //  UP: 1,
       // DOWN: 2,
       // LEFT: 3,
      //  RIGHT: 4,
      

      getJoystickDirection() {
        // 获取摇杆背景和操纵点的位置
        this.bgposition = this.background.getPosition();
        this.handleposition = this.handle.getPosition();

      
        // 计算操纵点相对于背景的偏移
        const offset = this.handleposition.subtract(this.bgposition);
      
        // 计算偏移的角度（弧度）
        const angle = Math.atan2(offset.y, offset.x);
      
        // 根据角度判断方向
        const threshold = Math.PI / 4;
        
if (angle > threshold && angle < 3 * threshold) {
    this.JoystickDirection = 1; // 
  
  
} else if (angle <= -1 * threshold && angle > -3 * threshold) {
   this.JoystickDirection = 2; 
   
  
} else if (angle <=  threshold && angle > -1 * threshold) {
    this.JoystickDirection = 4; // 
  
   
} else {
    this.JoystickDirection = 3; // 
   
   
}
        
      }

      setState(an){
        let animationComponent = this.player.getComponent(AnimationComponent);
             if(this.an == an ) return;
             this.an = an;
            animationComponent.play(this.an);
             
        }
    
    onTouchEnd() {
        // 当触摸结束时，将操纵点重置到摇杆背景中央
        this.handle.setPosition(new Vec3(0, 0, 0));
        this.JoystickDirection = 0;
        const opacity = this.node.getComponent(UIOpacity)
        opacity.opacity = 0;
    }

    
    update(dt: number) {
        if(this.player.name != ""){
        let an = ""
        this.lv = this.player.getComponent(RigidBody2D).linearVelocity;
        if(this.lv){
        switch(this.JoystickDirection)
        {
            case 0:
                this.lv.x =0;
                this.lv.y =0;
                break;
            case 1:
                /*this.player.getPosition(this.playerPosition);
                this.playerPosition.y += 200 * dt;
                this.player.setPosition(this.playerPosition);*/
                this.lv.x = 0;
                this.lv.y = 400 * dt;
                this.angle = 1;
                an = "1_up"
                break;
            case 2:
                this.lv.x = 0;
                this.lv.y = -400 * dt;
                an = "1_down"
                this.angle = 2;
                break;
            case 3:
                this.lv.y = 0;
                this.lv.x = -400 * dt;
                an = "1_left"
                this.angle = 3;
                break;
            case 4:
                this.lv.y = 0;
                this.lv.x = 400 * dt;
                an = "1_right"
                this.angle = 4;
                break;
        }
        this.player.getComponent(RigidBody2D).linearVelocity = this.lv
    }

        if(an)
        {
            this.setState(an)
        }

    }
    else{
        const player = find('gameWorld/gameCanvas/Map/door/1');
        const map = find('gameWorld/gameCanvas/Map/door')
        this.map = map.getComponent(TiledMap);
        this.player = player
    }
}


}
