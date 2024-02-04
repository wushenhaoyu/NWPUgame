import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('message_picture')
export class message_picture extends Component {
    @property({type:Label})
    public Name:Label = null;
    @property({type:Sprite})
    public content:Sprite = null;
    start() {
        this.init('老师','main/UI/Smartphone1/spriteFrame');
    }
    init(name:string , Img:string){
        this.Name.string = name;
        resources.load(Img,SpriteFrame,(err,data)=>{
            console.log(data);
            this.content.spriteFrame = data;
            let ui = this.content.node.getComponent(UITransform)
        if(ui.width > 400)
        {
            ui.width = 400;
        }
        })

    }

    update(deltaTime: number) {
        
    }
}


