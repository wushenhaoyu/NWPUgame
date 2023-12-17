import { _decorator, Component, Node, Prefab ,resources,JsonAsset ,error, instantiate} from 'cc';
const { ccclass, property } = _decorator;
//此脚本为控制大超脚本，放在widnow/shop中
import BagDataManager, {ItemFactory,Item} from '../../data/BagDataManager'
import shopItem from '../res/shopItem'
import PlayerDataManager from '../../data/PlayerDataManager';
import { bag } from '../UI/bag';

const playerDataManager = PlayerDataManager.getInstance();
const bagDataManager = BagDataManager.getInstance();


@ccclass('shopDataControl')
export class shopDataControl extends Component {
    public json = null;
    public Factory:ItemFactory = null; 
    @property ({type:Prefab})
    public ItemStyle:Prefab = null;
    @property({type:Node})
    public layout:Node = null;
    @property({type:Node})
    public BagUI:Node = null;

    start() {
        this.Factory = ItemFactory.getInstance();
        resources.load(`shop/dachao`,JsonAsset,(err, jsonAsset) => {
            if (err) {
                error(err);
                return;
            }
            this.json = jsonAsset.json
            for (var i = 0; i < this.json.length; i++) {
                for (var j = 0; j < this.json[i].length; j++) {
                let data = this.json[i][j]
                    resources.load(`item/${data.type}`, JsonAsset, (err, jsonAsset) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        const name = data.name;
                        const json = jsonAsset.json[name];
                        const itemClass = this.Factory.getItemClass(data.type);
                        if (itemClass) {
                            const itemInstance = new itemClass(json);
                            let node = instantiate(this.ItemStyle);
                            let script = node.getComponent(shopItem);
                            console.log(itemInstance)
                            script.init(itemInstance);
                            this.layout.addChild(node);
                        } else {
                            console.error(`初始化商品实例失败`);
                            return null;
                        }
                    });
                }
            }

        })

        this.node.on('buy', this.buy, this)

    }

    // protected onEnable(): void {
        
    //     this.bagUI.active = true

    //     console.log()

    // }

    // protected onDisable(): void {
        

    //     this.bagUI.active = false

    // }

    back()
    {
        this.node.active = false;
    }

    buy(item: Item, itemNumber: number)
    {

        const money = playerDataManager.getMoney();

        const canaAffort = money >= item.Value;

        if(canaAffort)
        {

            playerDataManager.loseMoney(item.Value);

            let bagData: Item[] = [];

            bagDataManager.addItem(item.Type, item.Name, itemNumber,()=>{
            this.BagUI.emit('bag')
            })
            



        }
        else
        {
            console.log(`不能购买`)
        }

    }



    update(deltaTime: number) {
        
    }
}


