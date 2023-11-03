import { _decorator, Component, Node, NodeEventType, NodePool, tween,Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {
    @property({type:Node})
    public bag:Node = null;
    @property({type:Node})
    public phone:Node = null;
    @property({type:Node})
    public setting:Node = null;
    @property({type:Node})
    public money:Node = null;
    @property({type:Node})
    public energy:Node = null;
    @property({type:Node})
    public time:Node = null;
    @property({type:Node})
    public img:Node = null;
    start() {
        this.bag.on(NodeEventType.TOUCH_START,this.bagTouchStart,this)
        this.bag.on(NodeEventType.TOUCH_END,this.bagTouchEnd,this)
        this.bag.on(NodeEventType.TOUCH_CANCEL,this.bagTouchCancel,this)
        this.phone.on(NodeEventType.TOUCH_START,this.phoneTouchStart,this)
        this.phone.on(NodeEventType.TOUCH_END,this.phoneTouchEnd,this)
        this.phone.on(NodeEventType.TOUCH_CANCEL,this.phoneTouchCancel,this)
        this.setting.on(NodeEventType.TOUCH_START,this.settingTouchStart,this)
        this.setting.on(NodeEventType.TOUCH_END,this.settingTouchEnd,this)
        this.setting.on(NodeEventType.TOUCH_CANCEL,this.settingTouchCancel,this)


    }

    update(deltaTime: number) {
        
    }
    bagTouchStart()
    {
        tween(this.bag).to(0.25,{scale:new Vec3(0.90, 0.90, 1)})
        .start()
    }
    bagTouchEnd()
    {
        tween(this.bag).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start()
    }
    bagTouchCancel()
    {
        tween(this.bag).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start
    }
    phoneTouchStart()
    {
        tween(this.phone).to(0.25,{scale:new Vec3(0.90, 0.90, 1)})
        .start()
    }
    phoneTouchEnd()
    {
        tween(this.phone).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start()
    }
    phoneTouchCancel()
    {
        tween(this.phone).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start()
    }
    settingTouchStart()
    {
        tween(this.setting).to(0.25,{scale:new Vec3(0.90, 0.90, 1)})
        .start()
    }
    settingTouchEnd()
    {
        tween(this.setting).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start()
    }
    settingTouchCancel()
    {
        tween(this.setting).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start()
    }
}


