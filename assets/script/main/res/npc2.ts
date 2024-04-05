import { _decorator, AnimationComponent, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('npc2')
export default class npc2 extends Component {
    animation: AnimationComponent = null;
    start() {
        this.animation = this.node.getComponent(AnimationComponent);
    }
    talk(e2)
    {
        console.log(e2)
        switch(e2)
        {
            case 0:
                this.animation.play("stand_right")
                break;
            case 1:
                this.animation.play("stand_up")
                break;
            case 2:
                this.animation.play("stand_left")
                break;
            case 3:
                this.animation.play("stand_down")
                break;
        }
         // 推迟修改到下一帧
    }

    update(deltaTime: number) {
        
    }
}


