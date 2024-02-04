import { _decorator, Component, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('friend')
export class friend extends Component {
    @property({type:Node})
    public content:Node = null;
    @property({type:Label})
    public Name:Label = null;
    @property({type:Prefab})
    public messageTextFromOther:Prefab = null;
    @property({type:Prefab})
    public messageTextFromPlayer:Prefab = null;
    @property({type:Prefab})
    public messagePicFromOther:Prefab = null;
    @property({type:Prefab})
    public messagePicFromPlayer:Prefab = null;
    start() {
        this.node.on(Node.EventType.TOUCH_START,this.show,this)
    }
    show()
    {
        
    }
    init(name:string,)
    {
        this.Name.string = name;
    }

    update(deltaTime: number) {
        
    }
}


