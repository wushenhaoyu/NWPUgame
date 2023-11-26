import { _decorator, Component,sys, Node,director, find,resources,error,JsonAsset } from 'cc';
const { ccclass, property } = _decorator;
import { NATIVE } from 'cc/env';
enum emotion{
    angry = 0,
    sad = 1,
    happy = 2,
    surprise = 3
}
export default class GameDataManager {
    private static instance: GameDataManager;
    private money:number = 2000
    private energy:number = 30
    private energyMax:number = 30
    private emotion:emotion = emotion.surprise
    private grade:number = 0
    private constructor() {
        // 私有构造函数，防止外部直接实例化
   
    }
    public init(callback?: () => void) {
        // 判断是否存在本地存储中的数据
        const playerDataString = sys.localStorage.getItem('player');
       /* console.log('playerDataString', playerDataString);
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
                this.energy = playerData.energy;
                this.energyMax = playerData.energyMax;
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
            energy: this.energy,
            energyMax: this.energyMax,
            emotion: this.emotion,
            grade: this.grade
        };
    }
    public static getInstance(): GameDataManager {
        if (!GameDataManager.instance) {
            GameDataManager.instance = new GameDataManager();
        }
        return GameDataManager.instance;
    }
    getEmotion():emotion {
        return this.emotion;
    }
    getMaxEnergy():number {
        return this.energyMax
    }
    getEnergy():number {
        return this.energy
    }
    gainEnergy(amount:number){
        this.energy += amount
        if(this.energy > this.energyMax){
            this.energy = this.energyMax
        }
    }
    loseEnergy(amount:number){
        this.energy -= amount
        if(this.energy < 0){
            this.energy = 0
        }
    }
    getMoney():number {
        return this.money
    }
    gainMoney(money:number){
        this.money += money
    }
    loseMoney(money:number){
        this.money -= money
    }
    
 }
