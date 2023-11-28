import { _decorator, Component, Node, NodeEventType, Sprite, resources, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('setting')
export class setting extends Component {
    @property({type:Node})
    public back:Node = null;

    @property({type:Node})
    public music:Node = null;

    @property({type:Node})
    public sound:Node = null;

    @property({type:Node})
    public achievement:Node = null;

    @property({type:Node})
    public ranking:Node = null;

    @property({type:Node})
    public musicManager:Node = null;


    // private soundOff:SpriteFrame = null;
    // private soundOn:SpriteFrame = null;
    // private musicOff:SpriteFrame = null;
    // private musicOn:SpriteFrame = null;

    private isMusicOn:boolean = true;
    private isSoundOn:boolean = true;

    start() {
        this.back.on(NodeEventType.TOUCH_END,this.backTouchEnd,this)

        this.sound.on(NodeEventType.TOUCH_END,this.soundTouchEnd,this)

        this.music.on(NodeEventType.TOUCH_END,this.musicTouchEnd,this)

        this.achievement.on(NodeEventType.TOUCH_END,this.achievementTouchEnd,this)

        this.ranking.on(NodeEventType.TOUCH_END,this.rankingTouchEnd,this)

    }
    backTouchEnd()
    {
        this.node.active = false
    }

    soundTouchEnd()
    {

        const soundSprite = this.sound.getComponent(Sprite)

        let url:String = null;

        if(this.isSoundOn)
        {

            url = 'main/UI/icon1/UiIconsPack_Transparent_Icons_24'

        }
        else
        {

            url = 'main/UI/icon1/UiIconsPack_Transparent_Icons_25'

        }

        resources.load(url, SpriteFrame, (err: any, spriteFrame) => {

            soundSprite.spriteFrame = spriteFrame;

        });

        this.isSoundOn = !this.isSoundOn;

    }

    musicTouchEnd()
    {

        const musicSprite = this.music.getComponent(Sprite)

        let url:String = null;

        if(this.isMusicOn)
        {

            url = 'main/UI/icon1/UiIconsPack_Transparent_Icons_26'

        }
        else
        {

            url = 'main/UI/icon1/UiIconsPack_Transparent_Icons_27'

        }

        resources.load(url, SpriteFrame, (err: any, spriteFrame) => {

            musicSprite.spriteFrame = spriteFrame;

        });

        this.isMusicOn = !this.isMusicOn;

        this.musicManager.emit('switchMusic')

    }

    achievementTouchEnd()
    {



    }

    rankingTouchEnd()
    {



    }

    update(deltaTime: number) {
        
    }
}


