import { _decorator, Component, Node ,Label,ProgressBar} from 'cc';
const { ccclass, property } = _decorator;
import PlayerDataManager from '../../data/PlayerDataManager';
const playerDataManager = PlayerDataManager.getInstance();
@ccclass('PlayerDataControl')
export class PlayerDataControl extends Component {
    @property({type:Label})
    public money:Label = null;
    @property({type:Label})
    public energy:Label = null;
    @property({type:ProgressBar})
    public energyBar:ProgressBar = null;
    start() {
        this.updatePlayerData();
        playerDataManager.coinNode = this.node.getComponent(PlayerDataControl);
    }
    updatePlayerData() {
        this.money.string = playerDataManager.getMoney().toString();
        this.energy.string = playerDataManager.getEnergy().toString();
        this.energyBar.progress = playerDataManager.getEnergy() / playerDataManager.getMaxEnergy();
    }

    update(deltaTime: number) {
        
    }
}


