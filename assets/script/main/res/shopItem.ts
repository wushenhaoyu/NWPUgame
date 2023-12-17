import { _decorator, Component, Node ,Label, Sprite , error ,resources,JsonAsset, SpriteFrame, find, Button} from 'cc';
const { ccclass, property } = _decorator;
import {Item} from '../../data/BagDataManager';

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

    start() {

    }
    init(item:Item)
    {
        this.item = item;
        this.nameLabel.string = this.item.Name;
        this.costLabel.string = String(this.item.Value);
        this.shopDataControl = find('UI/UICanvas/UI/window/shop')
        resources.load(this.item.ImgUrl,SpriteFrame,(err, res) => {
            if (err) {
                error(err);
                return;
            }
            this.Img.spriteFrame = res;
        })


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
        console.log("wtf")
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


