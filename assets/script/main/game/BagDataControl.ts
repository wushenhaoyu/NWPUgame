import { _decorator, Component, Node,Label ,Prefab,instantiate,Sprite,director,resources,error, SpriteFrame, ProgressBar} from 'cc';
const { ccclass, property } = _decorator;
import BagDataManager  from '../../data/BagDataManager';
import { Item } from '../../data/BagDataManager'; 
import PlayerDataManager  from '../../data/PlayerDataManager';
const bagDataManager = BagDataManager.getInstance();
const playerDataManager = PlayerDataManager.getInstance();
@ccclass('BagDataControl')
export class BagDataControl extends Component {
    @property(Label)
    public Name:Label = null
    @property(Sprite)
    infoImg: Sprite = null;
    @property(Label)
    infoName: Label = null;
    @property(Label)
    info: Label = null;
    @property(Prefab)
    gridPrefab: Prefab = null;
    @property(Node)
    emotion: Node = null;
    @property(Node)
    public bag:Node = null;
    @property(Node)
    public interactionButton:Node = null;
    selected:string = ""; 

    protected currentItems: Item[] = null

    onLoad(){

    }
    start() {
        // 获取背包物品数据
        this.initdata();
        // this.node.on('bag',this.updateBag,this);
        bagDataManager.bagUI = this.node.getComponent(BagDataControl)

    }
    initdata() {
        
        bagDataManager.getItems((items) => {

            this.currentItems = items
            
            for (var i = 0; i < items.length; i++) {
                const item = items[i];
                this.initPrefab(item);
            }
            this.updateEmotion()
            this.Name.string = playerDataManager.getname();
        });
    }
    updateEmotion(){
        switch (playerDataManager.getEmotion()) {
            case 0:
                resources.load('main/UI/emotion/emtion_03', SpriteFrame, (err, spriteFrame) =>{
                    this.emotion.getChildByName('emoji').getComponent(Sprite).spriteFrame = spriteFrame;
                })
                resources.load('loading/bar/colorbar_09', SpriteFrame, (err, spriteFrame) =>{
                   const bar = this.emotion.getChildByName('background').getChildByName('emotion');
                   bar.getComponent(Sprite).spriteFrame = spriteFrame;
                   bar.getComponent(ProgressBar).progress = 0.1;
                })
                
                break;
            case 1:
                resources.load('main/UI/emotion/emtion_04', SpriteFrame, (err, spriteFrame) =>{
                    this.emotion.getChildByName('emoji').getComponent(Sprite).spriteFrame = spriteFrame;
                })
                resources.load('loading/bar/colorbar_13', SpriteFrame, (err, spriteFrame) =>{
                   const bar = this.emotion.getChildByName('background').getChildByName('emotion');
                   bar.getComponent(Sprite).spriteFrame = spriteFrame;
                   bar.getComponent(ProgressBar).progress = 0.4;
                })
                break;
            case 2:
                resources.load('main/UI/emotion/emtion_02', SpriteFrame, (err, spriteFrame) =>{
                    this.emotion.getChildByName('emoji').getComponent(Sprite).spriteFrame = spriteFrame;
                    
                })
                resources.load('loading/bar/colorbar_05', SpriteFrame, (err, spriteFrame) =>{
                   const bar = this.emotion.getChildByName('background').getChildByName('emotion');
                   bar.getComponent(Sprite).spriteFrame = spriteFrame;
                   bar.getComponent(ProgressBar).progress = 0.7;
                })
                break;
            case 3:
                resources.load('main/UI/emotion/emtion_01', SpriteFrame, (err, spriteFrame) =>{
                    this.emotion.getChildByName('emoji').getComponent(Sprite).spriteFrame = spriteFrame;
                })
                resources.load('loading/bar/colorbar_01', SpriteFrame, (err, spriteFrame) =>{
                   const bar = this.emotion.getChildByName('background').getChildByName('emotion');
                   bar.getComponent(Sprite).spriteFrame = spriteFrame;
                   bar.getComponent(ProgressBar).progress = 1.0;
                })
                break;
            default:
                break;
        }
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
                    // if(item.canInteract) 劣化调整
                    if(false)
                    {
                        
                        this.interactionButton.getComponentInChildren(Label).string = item.actionText;
                        this.interactionButton.active = true;
                        this.interactionButton.on(Node.EventType.TOUCH_START, item.use(), this)

                    }
                }
            },this);
            const Img = gridNode.getChildByName('Img');
            Img.getComponent(Sprite).spriteFrame = spriteFrame;
            Img.getComponentInChildren(Label).string = item.Count.toString();
        })
    }

    update(deltaTime: number) {

    }

    public updateBag()
    {

        bagDataManager.getItems((items) => {

            this.currentItems = items
            this.bag.destroyAllChildren();
            
            for (var i = 0; i < items.length; i++) {
                const item = items[i];
                this.initPrefab(item);
            }

        });

    }
}


