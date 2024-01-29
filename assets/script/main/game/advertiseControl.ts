import { _decorator, Component, Node,Prefab,instantiate} from 'cc';
import { advertisement } from '../res/advertisement';
const { ccclass, property } = _decorator;

@ccclass('advertiseControl')
export class advertiseControl extends Component {
    @property({type:Node})
    public list:Node = null;
    @property({type:Prefab})
    public ad:Prefab = null;
    start() {
        for(var i = 0 ; i < 3 ; i ++)
        {
            let newNode = instantiate(this.ad);
            this.list.addChild(newNode);
            newNode.getComponent(advertisement).init('zhiyuan');
        }
    }

    update(deltaTime: number) {
        
    }
}


