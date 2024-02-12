import { _decorator, Component, Label, Node, Overflow, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('message_text')
export class message_text extends Component {
    @property({type:Label})
    public Name:Label = null;
    @property({type:Label})
    public content:Label = null;
    start() {
    }
    init(name:string, content:string)
    {
        this.Name.string = name
        this.content.string = content;
        this.content.updateRenderData(true);
        let ui = this.content.node.getComponent(UITransform)
        if(ui.width > 360)
        {
            this.content.overflow = Overflow.RESIZE_HEIGHT;
            ui.width = 360;
        }
    }

    update(deltaTime: number) {
        
    }
}


