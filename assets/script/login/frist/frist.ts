import { _decorator, Component, Node, NodeEventType, Sprite ,Color,Label, director, input, Input, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import PlayerDataManager  from '../../data/PlayerDataManager';
const playerDataManager = PlayerDataManager.getInstance();

@ccclass('frist')
export class frist extends Component {
    @property({type: Node})
    public femaleButton:Node = null ;
    @property({type: Node})
    public maleButton:Node = null ;
    @property({type:Node})
    public bgfemale:Node = null;
    @property({type:Node})
    public bgmale:Node = null;
    selected:number = 0;
    @property({type: Node})
    public Start:Node = null;
    @property ({type:Label})
    public Label:Label = null;
    start() {
        this.femaleButton.on(NodeEventType.TOUCH_START,this.femaleSelect,this)
        this.maleButton.on(NodeEventType.TOUCH_START,this.maleSelect,this)
        this.Start.on(NodeEventType.TOUCH_START,this.startGame,this)
        input.on(Input.EventType.KEY_UP, this.showStart, this);
    
        
    }
    femaleSelect() {
        if(this.selected != 1)
        {
            this.selected = 1;
            this.bgfemale.getChildByName("bg").getComponent(Sprite).color = new Color(160,94,133,148)
            this.bgmale.getChildByName("bg").getComponent(Sprite).color = new Color(87,89,99,148)
            this.bgfemale.getChildByName("Sprite").getComponent(UIOpacity).opacity = 255;
            this.showStart()
        }
        else{
            this.selected = 0;
           
            this.bgfemale.getChildByName("bg").getComponent(Sprite).color = new Color(87,89,99,148)
            this.bgfemale.getChildByName("Sprite").getComponent(UIOpacity).opacity = 150;
    }
}
    maleSelect() {
        if(this.selected != 2)
        {
            this.selected = 2;
            this.bgmale.getChildByName("bg").getComponent(Sprite).color = new Color(93,96,167,147)
            this.bgfemale.getChildByName("bg").getComponent(Sprite).color = new Color(87,89,99,148)
            this.bgmale.getChildByName("Sprite").getComponent(UIOpacity).opacity = 255;
            this.showStart()
        }
        else{
            this.selected = 0;
            this.bgmale.getChildByName("bg").getComponent(Sprite).color = new Color(87,89,99,148)
            this.bgmale.getChildByName("Sprite").getComponent(UIOpacity).opacity = 150;
            
        }
    }
    showStart()
    {
        
        if(this.Label.string != ""&& this.selected != 0 ){
        this.Start.active = true;
        }
    }
    startGame()
    {
        if(this.Label.string != ""&& this.selected != 0)
        {
            playerDataManager.setinfo(this.Label.string,this.selected)
            //开始游戏
            director.loadScene('loading',()=>{
                
            })
        }
    }

    update(deltaTime: number) {
        
        this.showStart()

    }
}


