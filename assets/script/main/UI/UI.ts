import { _decorator, AnimationClip, AnimationComponent, Component, Node, NodeEventType, NodePool, Sprite, SpriteFrame, tween,Vec3 } from 'cc';
import PlayerDataManager from '../../data/PlayerDataManager';
const { ccclass, property } = _decorator;
const playerDataManager = PlayerDataManager.getInstance();
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
    @property({type:SpriteFrame})
    public male:SpriteFrame = null;
    @property({type:Sprite})
    public sprite:Sprite = null;
    @property({type:AnimationComponent})
    public animation:AnimationComponent = null;
    public animationIndex:number = 0;
    @property({type:AnimationClip})
    public stand_up:AnimationClip = null;
    @property({type:AnimationClip})
    public stand_left:AnimationClip = null;
    @property({type:AnimationClip})
    public stand_down:AnimationClip = null;
    @property({type:AnimationClip})
    public stand_right:AnimationClip = null;
    @property({type:AnimationClip})
    start() {
        console.log(playerDataManager.getGender())
        if(playerDataManager.getGender())
        {   
            this.img.getComponentInChildren(Sprite).spriteFrame = this.male;
            this.sprite.spriteFrame = this.male;
            for(var i = 0 ; i < this.animation.clips.length ; i++)
            {
                this.animation.removeClip(this.animation.clips[i],true)
            }
            this.animation.addClip(this.stand_up,'stand_up');
            this.animation.addClip(this.stand_right,'stand_right');
            this.animation.addClip(this.stand_left,'stand_left');
            this.animation.addClip(this.stand_down,'stand_down');
            this.animation.defaultClip = this.stand_down;
        }
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
    switchAnimation1()
    {
        this.animationIndex += 1;
        this.swicthAnimation();
    }
    switchAnimation2()
    {
        this.animationIndex -= 1;
        this.swicthAnimation();
    }
    swicthAnimation()
    {
        if(this.animationIndex <= -1)
            this.animationIndex = 3;
        if(this.animationIndex >= 4)
            this.animationIndex = 0;
        switch(this.animationIndex)
        {
            case 0: this.animation.play('stand_down')
            break;
            case 1: this.animation.play('stand_left')
            break;
            case 2: this.animation.play('stand_up')
            break;
            case 3: this.animation.play('stand_right')
            break;
        }
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


