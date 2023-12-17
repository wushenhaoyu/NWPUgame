import { _decorator, Component, Label, Node, SpriteFrame,Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('advertisement')
export class advertisement extends Component {
    @property({type:Sprite})
    public icon:Sprite = null;
    @property({type:Label})
    public title:Label = null;
    @property({type:Sprite})
    public titleBarColor:Sprite = null;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


