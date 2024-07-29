import { _decorator, Component, Label, Node, Sprite,find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('eventWindow')
export class eventWindow extends Component {
    @property({type:Node})
    public icon:Node = null;
    @property({type:Node})
    public title:Node = null;
    @property({type:Node})
    public description:Node = null;
    start() {

    }

    update(deltaTime: number) {
        
    }
    offEvnet()
    {
        find('gameWorld/gameCanvas/Map').emit('offEvent')
        this.node.active = false;
        this.icon.getComponent(Sprite).spriteFrame = null;
        this.title.getComponent(Label).string = null;
        this.description.getComponent(Label).string = null;
    }
    recover()
    {
        this.node.active = false;
        this.icon.getComponent(Sprite).spriteFrame = null;
        this.title.getComponent(Label).string = null;
        this.description.getComponent(Label).string = null;
        find('UI/UICanvas/UI/unpersistUI').active = true
    }
}


