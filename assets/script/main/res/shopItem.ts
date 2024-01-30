import { _decorator, Component, Node ,Label, Sprite , error ,resources,JsonAsset, SpriteFrame, find, Button, NodeEventType} from 'cc';
const { ccclass, property } = _decorator;
import {Item} from '../../data/BagDataManager';
import { shopDataControl } from '../game/shopDataControl';

@ccclass('shopItem')
export default class shopItem extends Component {
    @property({type:Node})
    public itemNumberLabel:Node = null;
    public itemNumber:number = 1;
    public item:Item = null;
    @property({type:Label})
    public nameLabel:Label = null;
    @property({type:Label})
    public costLabel:Label = null;
    @property({type:Sprite})
    public Img:Sprite = null;

    public shopDataControl: Node = null;
    public shopDataControlScript:shopDataControl = null;
    start() {

    }
    init(item:Item)
    {
        this.item = item;
        this.nameLabel.string = this.item.Label;
        this.costLabel.string = String(this.item.Value);
        this.shopDataControl = find('UI/UICanvas/UI/window/shop')
        this.shopDataControlScript = this.shopDataControl.getComponent(shopDataControl)
        resources.load(this.item.ImgUrl,SpriteFrame,(err, res) => {
            if (err) {
                error(err);
                return;
            }
            this.Img.spriteFrame = res;
        })
        this.node.on(NodeEventType.TOUCH_START,()=>{
            this.shopDataControlScript.InfoIcon.spriteFrame = this.Img.spriteFrame;
            this.shopDataControlScript.InfoTitle.string = this.item.Label;
            this.shopDataControlScript.InfoContent.string = this.item.Info;
        },this)


    }

    add(){
        this.itemNumber +=1;
        if(this.itemNumber > 99)
        {
            this.itemNumber = 99;
        }
        this.itemNumberLabel.getComponent(Label).string = String(this.itemNumber);
    }
    minus()
    {
        this.itemNumber -=1;
        if(this.itemNumber <= 0)
        {
            this.itemNumber =1;
        }
        this.itemNumberLabel.getComponent(Label).string = String(this.itemNumber);

    }
    updateNumber(){
        this.itemNumber =  Number(this.itemNumberLabel.getComponent(Label).string);
    }
    
    buy(){

        this.shopDataControl.emit('buy', this.item, this.itemNumber)

    }


    update(deltaTime: number) {
        
    }
}


