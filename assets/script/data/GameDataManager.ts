import { _decorator,resources,error,JsonAsset,sys,find, director, Vec3, v3} from 'cc';
const { ccclass, property } = _decorator;
import { TimeDataControl } from '../main/game/TimeDataControl';
import { PlotDataControl } from '../main/game/PlotDataControl';
import { Joystick } from '../main/UI/joystickcontrol';
import { advertiseControl } from '../main/game/advertiseControl';
import { VideoDataControl } from '../main/game/VideoDataControl';
export enum timeTypeDef{
    morning = 1,
    afternoon = 2,
    evening = 3,
    night = 4
}
export default class GameDataManager {
    public timeDataControl:TimeDataControl;
    private static instance: GameDataManager;
    private day:number
    private start:string 
    private map:string 
    private time:timeTypeDef = timeTypeDef.morning;
    public mapLoadListAlready:String[] = [];  //已经加载的地图，需要被卸载
    public mapLoadListIng:String[] = [];    //等待加载的地图
    public plotDataControl:PlotDataControl;
    public isPlayerFirstPlay:boolean = true;//玩家是否第一次进入游戏?
    public joystick:Joystick;
    public advertiseControl:advertiseControl = null;
    protected _storedCallback: Function | null = null;//存储回调函数
    private PositionRecord:Vec3 = null
    public videoDataControl:VideoDataControl = null;
    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.day = 7
        this.time = timeTypeDef.morning;
        this.map = "dongmen" //starting point
        this.start = "dongmen" //starting point
        this.mapDictionaryInit();
       // this.timeDataControl = find('UI/GameManager/TimeControl').getComponent('TimeDataControl')
       // this.plotDataControl = find('UI/GameManager/TimeControl').getComponent('PlotDataControl')
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
    public positionRecord(){ //记录当前玩家所在地图的位置，以便下次进入出生在同一位置
        let playerNode = find('gameWorld/gameCanvas/Map/door/player')
        this.PositionRecord = playerNode.position
    }
    public usePositionRecord(){ 
        if(this.PositionRecord != null){
          let position = this.PositionRecord.clone()
          this.PositionRecord = null
          console.log(position)
          return { success: true, position: position }
        } else {
          return { success: false, position: null }
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
    public nextTime(){
        this.plotDataControl.transition(()=>{
        if(this.time == timeTypeDef.evening)
        {
            this.nextDay();
            this.plotDataControl.getMapScript().switchLight();
            return
        }
        if(this.time == timeTypeDef.afternoon)
        {
            this.time = timeTypeDef.evening;
            this.plotDataControl.getMapScript().switchLight();
            return
        }
        if(this.time == timeTypeDef.morning)
        {
            this.time = timeTypeDef.afternoon;
            this.plotDataControl.getMapScript().switchLight();
            return
        }
        },()=>{this.plotDataControl.checkPlotByTime();});
        
    }
   
    public nextDay(){
        this.day++;
        this.time = timeTypeDef.morning;
        this.timeDataControl.updateTime();
        if(this.map == "sushe")
        {
            
        }
        else{
            this.setMap('sushe','sushe');
            director.loadScene('loading')
        }
        //回到寝室
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
    public getTime()
    {
        return this.time
    }
    public getFunction()//调用存储回调函数，并在调用完清空
    {
        const func = this._storedCallback;
        this._storedCallback = null
        return func;
    }
    public setFunction(callback: Function)//设置回调函数
    {
        this._storedCallback = callback;
    }















    mapDictionary:Map<string,string> = new Map();
    mapDictionaryInit()         //屎!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    {
        this.mapDictionary.set('aoxiangxueshengzhongxin','翱翔学生中心');
        this.mapDictionary.set('chaochang','星天苑操场');
        this.mapDictionary.set('d100','长安大道南段');
        this.mapDictionary.set('dachao','大学生超市');
        this.mapDictionary.set('dachaomengkou','星天苑南餐厅');
        this.mapDictionary.set('dongmen','正门');
        this.mapDictionary.set('feiji','通惠园');
        this.mapDictionary.set('jiaodongc1','教学东楼东侧');
        this.mapDictionary.set('jiaodongd','教学东楼西侧');
        this.mapDictionary.set('jiaodongc','教学东楼北侧');
        this.mapDictionary.set('jiaoxi','教学西楼');
        this.mapDictionary.set('jiaoxia','教学西楼A座');
        this.mapDictionary.set('jiaoxia1','教学西楼A座东侧');
        this.mapDictionary.set('jiaoxid','教学西楼D座');
        this.mapDictionary.set('qizhenhu','启真湖');
        this.mapDictionary.set('shuzihuadalou','数字化大楼');
        this.mapDictionary.set('sushe','你滴小窝');
        this.mapDictionary.set('tushuguan','启真楼');
        this.mapDictionary.set('xingtianyuanf','星天苑F座');
        this.mapDictionary.set('yinhelu','银河路');
        this.mapDictionary.set('youyongguan','游泳馆');
        this.mapDictionary.set('yuntianyuancanting','云天苑餐厅');
    }






 }

