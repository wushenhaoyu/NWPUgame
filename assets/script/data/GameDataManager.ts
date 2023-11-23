export default class GameDataManager {
    private static instance: GameDataManager;
    private day:number
    private start:string 
    private map:string 
    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.day = 1
        this.map = "dongmen"
        this.start = "dongmen"
    }
 
    public static getInstance(): GameDataManager {
        if (!GameDataManager.instance) {
            GameDataManager.instance = new GameDataManager();
        }
        return GameDataManager.instance;
    }
    public nextDay(){
        this.day++
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

