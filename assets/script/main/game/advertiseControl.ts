import { _decorator, Component, Node,Prefab,instantiate, director} from 'cc';
import { advertisement } from '../res/advertisement';
import GameDataManager from '../../data/GameDataManager';
import PlotDataManager from '../../data/PlotDataManager';
import { messageControl } from './messageControl';
const { ccclass, property } = _decorator;
const gameDataManager = GameDataManager.getInstance();
const plotDataManager = PlotDataManager.getInstance();

@ccclass('advertiseControl')
export class advertiseControl extends Component {
    @property({type:Node})
    public list:Node = null;
    @property({type:Prefab})
    public ad:Prefab = null;
    @property({type:Node})
    public notice:Node = null;
    @property({type:Node})
    public messageDataControl:Node = null;
    advertisementDictionary:string[] = ["shuadan","zhiyuan","xinyongka"]
    currentSelected:string = "";
    start() {
        gameDataManager.advertiseControl = this.node.getComponent(advertiseControl);
        // for(var i = 0 ; i < 3 ; i ++)
        // {
        //     let newNode = instantiate(this.ad);
        //     this.list.addChild(newNode);
        //     newNode.getComponent(advertisement).init(this.getRandomValueFromArray(this.advertisementDictionary));
        // }

        this.advertisementDictionary.map((ad, index) => {

            let newNode = instantiate(this.ad);
            this.list.addChild(newNode);
            newNode.getComponent(advertisement).init(ad)

        })
        this.node.on('select',(event)=>{
            this.currentSelected = event
            this.showNotice()
        },this)
    }
    shuadan()//选择刷单后对应逻辑
    {
        console.log('刷单')
        director.loadScene('minigame_2048',() =>{
            gameDataManager.plotDataControl.UINode.active = false;
        })
        //plotDataManager.friendlist.push("shuadan")
    }
    zhiyuan()//选择志愿服务后对应逻辑
    {
        console.log('支援')
        director.loadScene('star',() =>{
            gameDataManager.plotDataControl.UINode.active = false;
        })
    }
    xinyongka()//选择信用卡后对应逻辑
    {
        console.log('信用卡')
        plotDataManager.friendlist.push("xinyongka")
        this.messageDataControl.emit("addFriend", "xinyongka")
    }
    showNotice()//展示确认
    {
        this.notice.active =true;
    }
    hideNotice()
    {
        this.notice.getChildByName("unfirm").active =false;
        this.notice.getChildByName("firmed").active =false;
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
            case "xinyongka":
                this.xinyongka();
                break;
        }
        this.notice.getChildByName("unfirm").active =false;
        this.notice.getChildByName("firmed").active =true;
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


