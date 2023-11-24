export default class BagDataManager {
    protected static instance: BagDataManager;
    protected constructor() {
        // 私有构造函数，防止外部直接实例化
       
    }
 
    public static getInstance(): BagDataManager {
        if (!BagDataManager.instance) {
            BagDataManager.instance = new BagDataManager();
        }
        return BagDataManager.instance;
    }

 
    
 }

 export abstract class Item {
    protected _ImgUrl: string;
    protected _Name: string;
    protected _Count: number;
    protected _Id: number;
    protected _Info: string;
    protected _canUse: boolean; // 添加一个标志，表示物品是否可以使用
 
     constructor(data: any) {
         this._ImgUrl = data.ImgUrl || "";
         this._Name = data.Name || "";
         this._Count = data.Count || 0;
         this._Id = data.Id || 0;
         this._Info = data.Info || "";
         this._canUse = true; // 默认为可以使用
     }
 
     // 抽象方法，需要在子类中实现
     abstract specialFunction(): void;
 
     // 使用 getter 方法获取属性值
     get ImgUrl(): string {
         return this._ImgUrl;
     }
 
     get Name(): string {
         return this._Name;
     }
 
     get Count(): number {
         return this._Count;
     }
 
     get Id(): number {
         return this._Id;
     }
 
     get Info(): string {
         return this._Info;
     }
 
     get canUse(): boolean {
         return this._canUse;
     }
 
     // 使用物品
     use() {
         if (this._canUse) {
             console.log(`Using ${this._Name}`);
             this.specialFunction(); // 调用特殊功能
         } else {
             console.log(`${this._Name} cannot be used.`);
         }
     }
 }
 


// 具体的物品子类
class food extends Item {
    constructor(data: any) {
        super(data);
    }

    specialFunction() {
        console.log(`${this.Name} has no special function.`);
    }
}


