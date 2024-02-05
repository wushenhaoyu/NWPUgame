import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { friend } from '../res/friend';
import PlotDataManager from '../../data/PlotDataManager';
const { ccclass, property } = _decorator;
const plotDataManager = PlotDataManager.getInstance();

@ccclass('messageControl')
export class messageControl extends Component {
    @property({type:Prefab})
    public friend:Prefab = null;
  //  @property({type:friend})
 //   public friendScript:friend = null;
    @property({type:Prefab})
    public messageTextFromOther:Prefab = null;
    @property({type:Prefab})
    public messageTextFromPlayer:Prefab = null;
    @property({type:Prefab})
    public messagePicFromOther:Prefab = null;
    @property({type:Prefab})
    public messagePicFromPlayer:Prefab = null;
    

    start() {
        for(var i = 0 ; i < plotDataManager.friendlist.length ; i ++)
        {
            let newNode = instantiate(this.friend);
            this.node.addChild(newNode);
            var friendScript =  newNode.getComponent(friend);
            friendScript.init(plotDataManager.friendlist[i]);
        }

    }

    update(deltaTime: number) {
        
    }
}


