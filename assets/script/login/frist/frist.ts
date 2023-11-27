import { _decorator, Component, Node, NodeEventType, Sprite ,Color,Label, director } from 'cc';
const { ccclass, property } = _decorator;

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
    
        
    }
    femaleSelect() {
        if(this.selected == 0)
        {
            this.selected = 1;
            this.bgfemale.getComponent(Sprite).color = new Color(160,94,133,148)
            this.showStart()
        }
        else{
            this.selected = 0;
            this.bgfemale.getComponent(Sprite).color = new Color(87,89,99,148)
    }
}
    maleSelect() {
        if(this.selected == 0)
        {
            this.selected = 2;
            this.bgmale.getComponent(Sprite).color = new Color(93,96,167,147)
            this.showStart()
        }
        else{
            this.selected = 0;
            this.bgmale.getComponent(Sprite).color = new Color(87,89,99,148)
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
            //开始游戏
            director.loadScene('loading')
        }
    }

    update(deltaTime: number) {
        
    }
}


