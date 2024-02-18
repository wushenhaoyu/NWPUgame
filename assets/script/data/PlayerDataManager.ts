import { _decorator, Component,sys, Node,director, find,resources,error,JsonAsset } from 'cc';
const { ccclass, property } = _decorator;
import { NATIVE } from 'cc/env';
enum emotion{
    angry = 0,
    sad = 1,
    happy = 2,
    surprise = 3
}
export default class PlayerDataManager {
    private static instance: PlayerDataManager;
    private name: string = "faker";
    private gender: number = 1; //1female, 2male
    private money:number = 2000
    private emotion:emotion = emotion.surprise
    private grade:number = 0
    public coinNode:Component = null;
    private constructor() { 
        // 私有构造函数，防止外部直接实例化
   
    }
    public init(callback?: () => void) {
        // 判断是否存在本地存储中的数据
        const playerDataString = sys.localStorage.getItem('player');
       /* 
        if (playerDataString) {
            // 如果本地存储中有数据，则解析为对象
            const playerData = JSON.parse(playerDataString);
            this.money = playerData.money;
            this.energy = playerData.energy;
            this.energyMax = playerData.energyMax;
            this.emotion = playerData.emotion;
            this.grade = playerData.grade;
        } else {*/
            // 如果本地存储中没有数据，则从 resources 中加载数据
            resources.load('save/player', JsonAsset, (err, jsonAsset) => {
                if (err) {
                    error(err);
                    return;
                }
                const playerData = jsonAsset.json;
                this.money = playerData.money;
                this.emotion = playerData.emotion;
                this.grade = playerData.grade;
            });
            
        

        if (callback) {
            callback();
        }
    }

    public save(callback?: () => void) {
        // 将数据保存到本地存储中
        sys.localStorage.setItem('player', this.toJSON());

        if (callback) {
            callback();
        }
    }
    public toJSON(): any { //转化为json格式
        return {
            money: this.money,
            emotion: this.emotion,
            grade: this.grade
        };
    }
    public static getInstance(): PlayerDataManager {
        if (!PlayerDataManager.instance) {
            PlayerDataManager.instance = new PlayerDataManager();
        }
        return PlayerDataManager.instance;
    }
    getEmotion():emotion {
        return this.emotion;
    }
   
    getMoney():number {
        return this.money
    }
    gainMoney(money:number){
        this.money += money
    }
    loseMoney(money:number){
        this.money -= money
        this.coinNode.updatePlayerData()
    }
    setinfo(name:string, gender:number)
    {
        this.name = name;
        this.gender = gender;
    }
    gerGender(){
        return this.gender;
    }
    getname()
    {
        return this.name;
    }
    
 }
