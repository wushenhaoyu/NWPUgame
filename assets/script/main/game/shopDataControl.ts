import { _decorator, Component, Node, Prefab ,resources,JsonAsset ,error, instantiate, NodeEventType, Label, Sprite, tween, v2, v3} from 'cc';
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
    public layout1:Node = null;
    @property({type:Node})
    public layout2:Node = null;
    @property({type:Node})
    public layout3:Node = null;
    @property({type:Node})
    public layout4:Node = null;
    @property({type:Node})
    public BagUI:Node = null;
    @property({type:Label})
    public InfoTitle:Label = null;
    @property({type:Label})
    public InfoContent = null;
    @property({type:Sprite})
    public InfoIcon:Sprite = null;
    @property({type:Node})
    public bar1:Node = null;
    @property({type:Node})
    public bar2:Node = null;
    @property({type:Node})
    public bar3:Node = null;
    @property({type:Node})
    public bar4:Node = null;
    public selectedBar:number = 1;

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
                            return;
                        }
                        const name = data.name;
                        const json = jsonAsset.json[name];
                        console.log(json)
                        const itemClass = this.Factory.getItemClass(data.type);
                        if (itemClass) {
                            const itemInstance = new itemClass(json);
                            let node = instantiate(this.ItemStyle);
                            let script = node.getComponent(shopItem);
                            script.init(itemInstance);
                            this.layout1.addChild(node);
                        } else {
                            return null;
                        }   
                    });
                }
            }

        })

        this.node.on('buy', this.buy, this)
        this.bar1.on(NodeEventType.TOUCH_START,()=>{
            this.swicthBar(this.selectedBar,1)},this)
        this.bar2.on(NodeEventType.TOUCH_START,()=>{
            this.swicthBar(this.selectedBar,2)},this)
        this.bar3.on(NodeEventType.TOUCH_START,()=>{
            this.swicthBar(this.selectedBar,3)},this)
        this.bar4.on(NodeEventType.TOUCH_START,()=>{
            this.swicthBar(this.selectedBar,4)},this)

    }
    swicthBar(before:number,now:number)
    {
        if(before == now)
        {
            return
        }
        
        switch(now)
        {
            case 1 :
                
                this.selectedBar = 1;
                let childBefore1 = this.whichBar(before);
                let childNow1 = this.bar1;
                
                let indexBefore1 = this.node.children.indexOf(childBefore1);
                let indexNow1 = this.node.children.indexOf(childNow1);

                this.node.children[indexBefore1] = childNow1;
                this.node.children[indexNow1] = childBefore1;
                this.barShow(this.bar1)
                this.barHide(this.whichBar(before))

                this.layout1.parent.parent.active = true;
                this.whichLayOut(before).parent.parent.active = false;           
                break;
            case 2 :
                this.selectedBar = 2;
                let childBefore2 = this.whichBar(before);
                let childNow2 = this.bar2;
                
                let indexBefore2 = this.node.children.indexOf(childBefore2);
                let indexNow2 = this.node.children.indexOf(childNow2);

                this.node.children[indexBefore2] = childNow2;
                this.node.children[indexNow2] = childBefore2;
                this.barShow(this.bar2)
                this.barHide(this.whichBar(before))

                this.layout2.parent.parent.active = true;
                this.whichLayOut(before).parent.parent.active = false;
                break;
            case 3 :
                this.selectedBar = 3;
                let childBefore3 = this.whichBar(before);
                let childNow3 = this.bar3;
                
                let indexBefore3 = this.node.children.indexOf(childBefore3);
                let indexNow3 = this.node.children.indexOf(childNow3);

                this.node.children[indexBefore3] = childNow3;
                this.node.children[indexNow3] = childBefore3;
                this.barShow(this.bar3)
                this.barHide(this.whichBar(before))

                this.layout3.parent.parent.active = true;
                this.whichLayOut(before).parent.parent.active = false;
                break;
            case 4 :
                this.selectedBar = 4;
                let childBefore4 = this.whichBar(before);
                let childNow4 = this.bar4;
                
                let indexBefore = this.node.children.indexOf(childBefore4);
                let indexNow = this.node.children.indexOf(childNow4);

                this.node.children[indexBefore] = childNow4;
                this.node.children[indexNow] = childBefore4;
                this.barShow(this.bar4)
                this.barHide(this.whichBar(before))
                

                this.layout4.parent.parent.active = true;
                this.whichLayOut(before).parent.parent.active = false;
                break;

        }
    }
    whichBar(before:number):Node{
        switch(before)
        {
            case 1 :
                return this.bar1;
            case 2 :
                return this.bar2;
            case 3 :
                return this.bar3;
            case 4 :
                return this.bar4;
        }
        return
    }
    whichLayOut(before:number):Node{
        switch(before)
        {
            case 1 :
                return this.layout1;
            case 2 :
                return this.layout2;
            case 3 :
                return this.layout3;
            case 4 :
                return this.layout4;
        }
        return
    }
    barShow(bar:Node)
    {
        let position = bar.getPosition();
        tween(bar)
            .to(0.3,{position:v3(position.x,265,0)})
            .start()
    }
    barHide(bar:Node)
    {
        let position = bar.getPosition();
       bar.setPosition(v3(position.x,240,0));
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

        const canaAffort = money >= item.Value * itemNumber;

        if(canaAffort)
        {

            playerDataManager.loseMoney(item.Value * itemNumber);

            bagDataManager.addItem(item.Type, item.Name, itemNumber)
            



        }
        else
        {
            console.log(`不能购买`)
        }

    }



    update(deltaTime: number) {
        
    }
}


