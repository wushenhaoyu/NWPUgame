import { _decorator, Component, Node,Label ,Prefab,instantiate,Sprite,director,resources,error, SpriteFrame} from 'cc';
const { ccclass, property } = _decorator;
import BagDataManager  from '../../data/BagDataManager';
import Item from '../../data/BagDataManager'; 
const bagDataManager = BagDataManager.getInstance();
@ccclass('BagDataControl')
export class BagDataControl extends Component {
    @property(Sprite)
    infoImg: Sprite = null;
    @property(Label)
    infoName: Label = null;
    @property(Label)
    info: Label = null;
    @property(Prefab)
    gridPrefab: Prefab = null;
    @property(Node)
    public bag:Node = null;
    selected:string = ""; 
    onLoad(){
        bagDataManager.init(() => {
            this.initdata();
            
        });
        director.addPersistRootNode (this.node)
    }
    start() {
        // 获取背包物品数据
       
    }
    initdata() {
        bagDataManager.getItems((items) => {
            console.log(items[0],items);
            console.log(items.length)
            
            for (var i = 0; i < items.length; i++) {
                const item = items[i];
                console.log("item");
                this.initPrefab(item);
            }
        });
    }
    
    initPrefab(item:any) {
        resources.load(item.ImgUrl,SpriteFrame,(err, spriteFrame) => {
        if (err) {
            error(err);
            return;
        }
        const gridNode = instantiate(this.gridPrefab);
        gridNode.parent = this.bag;
        gridNode.name = item.Name;
        gridNode.on(Node.EventType.TOUCH_START, () => {
            if(this.selected != item.Name) {
                if(this.selected){
                    this.bag.getChildByName(this.selected).children[0].active = false;
                }
            this.selected = item.Name;
            this.bag.getChildByName(this.selected).children[0].active = true;
            this.infoImg.spriteFrame = spriteFrame;
            this.infoName.string = item.Name;
            this.info.string = item.Info;
            gridNode.children[0].active = true;
            }
        },this);
        const Img = gridNode.getChildByName('Img');
        Img.getComponent(Sprite).spriteFrame = spriteFrame;
        Img.getComponentInChildren(Label).string = item.Count.toString();
        console.log(gridNode)
        })
        
    }

    update(deltaTime: number) {
        
    }
}


