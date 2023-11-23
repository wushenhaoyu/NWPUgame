export default class GameDataManager {
    private static instance: GameDataManager;
    private money:number
    private energy:number
    private energyMax:number
    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.money = 2000
        this.energy = 30
        this.energyMax = 30
    }
 
    public static getInstance(): GameDataManager {
        if (!GameDataManager.instance) {
            GameDataManager.instance = new GameDataManager();
        }
        return GameDataManager.instance;
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
