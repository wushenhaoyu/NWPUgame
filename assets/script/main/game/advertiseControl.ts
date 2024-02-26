import { _decorator, Component, Node,Prefab,instantiate} from 'cc';
import { advertisement } from '../res/advertisement';
import GameDataManager from '../../data/GameDataManager';
const { ccclass, property } = _decorator;
const gameDataManager = GameDataManager.getInstance();

@ccclass('advertiseControl')
export class advertiseControl extends Component {
    @property({type:Node})
    public list:Node = null;
    @property({type:Prefab})
    public ad:Prefab = null;
    @property({type:Node})
    public notice:Node = null;
    advertisementDictionary:string[] = ["shuadan","zhiyuan",]
    currentSelected:string = "";
    start() {
        gameDataManager.advertiseControl = this.node.getComponent(advertiseControl);
        for(var i = 0 ; i < 3 ; i ++)
        {
            let newNode = instantiate(this.ad);
            this.list.addChild(newNode);
            newNode.getComponent(advertisement).init(this.getRandomValueFromArray(this.advertisementDictionary));
        }
        this.node.on('select',(event)=>{
            this.currentSelected = event
            this.showNotice()
        },this)
    }
    shuadan()//选择刷单后对应逻辑
    {
        console.log('刷单')
    }
    zhiyuan()//选择志愿服务后对应逻辑
    {
        console.log('支援')
    }
    showNotice()//展示确认
    {
        this.notice.active =true;
    }
    hideNotice()
    {
        this.notice.active =false;
    }
    chooseOk()
    {
        switch(this.currentSelected)
        {
            case "shuadan":
                this.shuadan()
                break;
            case "zhiyuan":
                this.zhiyuan();
                break;
        }
        this.hideNotice()
    }
    chooseCancel()
    {
        this.notice.active = false;
    }

    update(deltaTime: number) {
        
    }

    getRandomValueFromArray<T>(arr: T[]): T | undefined {
        if (arr.length === 0) {
            return undefined;
        }
        
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}


