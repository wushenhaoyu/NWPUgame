import { _decorator, Component,v2, SystemEvent,PhysicsSystem2D, director, EventTouch,find, Vec2,Node, Sprite, Vec3,input, Input,AnimationComponent, RigidBody2D, UIOpacity,v3 ,ERaycast2DType,EPhysics2DDrawFlags,physics, TiledMap } from 'cc';
const { ccclass, property } = _decorator;
import PlayerDataManager  from '../../data/PlayerDataManager';
const playerDataManager = PlayerDataManager.getInstance();
import GameDataManager  from '../../data/GameDataManager';
const gameDataManager = GameDataManager.getInstance();
import map  from '../map/map';
@ccclass('Joystick')
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
    Map:TiledMap = null;
    MapScript:map = null;
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
    animationComponent:AnimationComponent = null;
    speed:RigidBody2D = null;
    onLoad() {
       
    }
    start() {
        gameDataManager.joystick = this.node.getComponent(Joystick);
        this.animationComponent = this.player.getComponent(AnimationComponent);
        this.speed = this.player.getComponent(RigidBody2D);
        this.MapScript = this.player.getParent().getParent().getComponent(map);
      //  console.log(this.MapScript);
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
        const npc = this.MapScript.npclist
            for(var i =0; i< npc.length; i++)
            {
                const position = this.player.position
                console.log(Math.pow(position.x -npc[i].position.x,2)+Math.pow(position.y -npc[i].position.y,2))
                if(Math.pow(position.x -npc[i].position.x,2)+Math.pow(position.y -npc[i].position.y,2) < 20000)
            {
                this.dialogue.emit('npc', npc[i].name);
                this.MapScript.node.emit('talk',i,this.calculateDirection(position, npc[i].position));
                return;
            }
            }
    }
    calculateDirection(playerPosition, npcPosition) {
        // 计算玩家相对于 NPC 的方向
        const deltaX = playerPosition.x - npcPosition.x;
        const deltaY = playerPosition.y - npcPosition.y;
    
        // 比较差值的绝对值
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
    
        // 根据差值的绝对值判断方向
        if (absDeltaX > absDeltaY) {
            // 水平方向
            return deltaX > 0 ? 0 : 2; // 0：右，2：左
        } else {
            // 垂直方向
            return deltaY > 0 ? 1 : 3; // 3：下，1：上
        }
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

             if(this.an == an ) return;
             if(an == "")
             {
                this.animationComponent.pause();
             }
             this.an = an;
            this.animationComponent.play(this.an);
             
        }
    changeState(c:number){
        switch(c){
            case 0:
                this.animationComponent.play("1_up");
                this.animationComponent.pause();
                break;
            case 1:
                this.animationComponent.play("1_down");
                this.animationComponent.pause();
                break;
            case 2:
                this.animationComponent.play("1_left");
                this.animationComponent.pause();
                break;
            case 3:
                this.animationComponent.play("1_right");
                this.animationComponent.pause();
                break;
        }

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
        this.speed.linearVelocity = this.lv
    }

        
            this.setState(an)
        
        

    }
    else{
        const player = find('gameWorld/gameCanvas/Map/door/player');
        const Map = find('gameWorld/gameCanvas/Map/door')
        if(Map) this.Map = Map.getComponent(TiledMap);
        if(player) 
        {
            this.player = player
            this.animationComponent = this.player.getComponent(AnimationComponent);
            this.speed = this.player.getComponent(RigidBody2D);
            this.MapScript = this.player.getParent().getParent().getComponent(map);
        }
    }
}


}
