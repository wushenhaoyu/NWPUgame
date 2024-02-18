import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('message_picture')
export class message_picture extends Component {
    @property({type:Label})
    public Name:Label = null;
    @property({type:Sprite})
    public content:Sprite = null;
    start() {
    }
    init(name:string , Img:string){
        this.Name.string = name;
        resources.load(Img + '/spriteFrame',SpriteFrame,(err,data)=>{
            var percent = data.width / data.height
            this.content.spriteFrame = data;
            let ui = this.content.node.getComponent(UITransform)
        if(ui.width > 360)
        {
            ui.width = 360;
            ui.height = 360 * percent
        }
        })

    }

    update(deltaTime: number) {
        
    }
}


