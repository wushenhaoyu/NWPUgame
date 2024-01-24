import { _decorator,resources,error,JsonAsset,sys} from 'cc';
const { ccclass, property } = _decorator;
import { TimeDataControl } from '../main/game/TimeDataControl';
export default class GameDataManager {
    public timeDataControl:TimeDataControl;
    private static instance: GameDataManager;
    private day:number
    private start:string 
    private map:string 
    public mapLoadListAlready:String[] = [];  //已经加载的地图，需要被卸载
    public mapLoadListIng:String[] = [];    //等待加载的地图
    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.day = 1
        this.map = "dachao"
        this.start = "dachao"
    }
 
    public static getInstance(): GameDataManager {
        if (!GameDataManager.instance) {
            GameDataManager.instance = new GameDataManager();
        }
        return GameDataManager.instance;
    }
    public save(callback?: () => void) {
        // 将数据保存到本地存储中
        sys.localStorage.setItem('game', this.toJSON());

        if (callback) {
            callback();
        }
    }

    private toJSON(): string {
        // 将数据转换为 JSON 字符串
        return JSON.stringify({
            day: this.day,
            map: this.map,
            start: this.start,
        });
    }
   
    public nextDay(){
        this.day++;
        this.timeDataControl.updateTime();
        
    }
    public getDay(){
        return this.day
    }
    public getMap(){
        return this.map
    }
    public getStart(){
        return this.start
    }
    public setMap(map:string,start:string){
        this.map = map
        this.start = start
    }
 }

