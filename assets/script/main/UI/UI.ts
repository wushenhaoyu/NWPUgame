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
    @property({type:Node})
    public window:Node = null;
    @property({type:Node})
    public ok:Node = null;
    start() {
        this.img.on(NodeEventType.TOUCH_START,this.imgTouchStart,this)
        this.img.on(NodeEventType.TOUCH_END,this.imgTouchEnd,this)
        this.img.on(NodeEventType.TOUCH_CANCEL,this.imgTouchCancel,this)
        this.bag.on(NodeEventType.TOUCH_START,this.bagTouchStart,this)
        this.bag.on(NodeEventType.TOUCH_END,this.bagTouchEnd,this)
        this.bag.on(NodeEventType.TOUCH_CANCEL,this.bagTouchCancel,this)
        this.phone.on(NodeEventType.TOUCH_START,this.phoneTouchStart,this)
        this.phone.on(NodeEventType.TOUCH_END,this.phoneTouchEnd,this)
        this.phone.on(NodeEventType.TOUCH_CANCEL,this.phoneTouchCancel,this)
        this.setting.on(NodeEventType.TOUCH_START,this.settingTouchStart,this)
        this.setting.on(NodeEventType.TOUCH_END,this.settingTouchEnd,this)
        this.setting.on(NodeEventType.TOUCH_CANCEL,this.settingTouchCancel,this)
        this.ok.on(NodeEventType.TOUCH_START,this.okTouchStart,this)
        this.ok.on(NodeEventType.TOUCH_END,this.okTouchEnd,this)
        this.ok.on(NodeEventType.TOUCH_CANCEL,this.okTouchCancel,this)

    }

    update(deltaTime: number) {
        
    }
    okTouchStart(){
        tween(this.ok).to(0.25,{scale:new Vec3(0.90, 0.90, 1)})
        .start()
    }
    okTouchEnd(){
        tween(this.ok).to(0.25,{scale:new Vec3(1, 1, 1)})
       .start()
       this.window.getChildByName('notice').active = false
    }
    okTouchCancel(){
        tween(this.ok).to(0.25,{scale:new Vec3(1, 1, 1)})
      .start()
    }

    imgTouchStart(){
        tween(this.img).to(0.25,{scale:new Vec3(0.90, 0.90, 1)})
        .start()
    }
    imgTouchEnd(){
        tween(this.img).to(0.25,{scale:new Vec3(1, 1, 1)})
       .start()
       this.window.getChildByName('img').active = true;
    }
    imgTouchCancel(){
        tween(this.img).to(0.25,{scale:new Vec3(1, 1, 1)})
      .start()
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
        const bag = this.window.getChildByName("bag")
        bag.active = true

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
        const phone = this.window.getChildByName("phone")
        phone.active = true
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
        const setting = this.window.getChildByName("setting")
        setting.active = true
    }
    settingTouchCancel()
    {
        tween(this.setting).to(0.25,{scale:new Vec3(1, 1, 1)})
        .start()
    }
}


