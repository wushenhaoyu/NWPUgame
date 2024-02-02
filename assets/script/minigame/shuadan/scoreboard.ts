import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('scoreboard')
export class scoreboard extends Component {

    @property(Node)
    public manager: Node = null

    start() {

    }

    protected onEnable(): void {
        
        //renew the displaying score
        this.node.getChildByName("score").getComponent(Label).string = this.manager.getComponent("manager").currentScore.toString

    }

    update(deltaTime: number) {
        
    }
}


