import { _decorator, Component, SystemEvent, EventTouch, Vec2,Node, Sprite, Vec3,input, Input,AnimationComponent, RigidBody2D, UIOpacity,v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export class Joystick extends Component {
    @property({type:Node})
    player:Node = null;

    @property({ type: Node })
    background: Node = null;

    @property({ type: Node })
    handle: Node = null;

    @property({ type: Node })
    father: Node = null;

    private touchLocation: Vec2 = new Vec2();
    playerPosition:Vec3 = new Vec3();
    width:number =0;
    JoystickDirection = 0
    an = ""
    position = v3(0,0,0)
    handleposition = v3(0,0,0)
    bgposition = v3(0,0,0)
    onLoad() {
        // 监听触摸事件
        
        this.father.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.father.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.father.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.father.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.width = this.background.getComponent(Sprite).spriteFrame.width / 2;
        this.position = this.node.getPosition();
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
    
       // NONE: 0,
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
       let an = ""
       const lv = this.player.getComponent(RigidBody2D).linearVelocity;

        switch(this.JoystickDirection)
        {
            case 0:
                lv.x =0;
                lv.y =0;
                break;
            case 1:
                /*this.player.getPosition(this.playerPosition);
                this.playerPosition.y += 200 * dt;
                this.player.setPosition(this.playerPosition);*/
                lv.x = 0;
                lv.y = 400 * dt;
                an = "1_up"
                break;
            case 2:
                lv.x = 0;
                lv.y = -400 * dt;
                an = "1_down"
                break;
            case 3:
                lv.y = 0;
                lv.x = -400 * dt;
                an = "1_left"
                break;
            case 4:
                lv.y = 0;
                lv.x = 400 * dt;
                an = "1_right"
                break;
        }
        this.player.getComponent(RigidBody2D).linearVelocity = lv

        if(an)
        {
            this.setState(an)
        }

    }

}
