import { _decorator,resources,error,JsonAsset,native,sys,Node, Component, find } from 'cc';
import { BagDataControl } from '../main/game/BagDataControl';
const { ccclass, property } = _decorator;

@ccclass
export default class BagDataManager {
    protected static instance: BagDataManager;
    protected items: Item[] = [];
    protected constructor() {
        // 私有构造函数，防止外部直接实例化
        
    }
    public bagDataControl: BagDataControl = null ;

 
    public static getInstance(): BagDataManager {
        if (!BagDataManager.instance) {
            BagDataManager.instance = new BagDataManager();
        }
        return BagDataManager.instance;
    }
   
    init(callback?: () => void) {
        this.bagDataControl = find('UI/GameManager/BagDataControl')
        console.log("see this", this.bagDataControl)
        if(!this.items.length){
        resources.load('save/bag', JsonAsset, (err, jsonAsset) => {
            var i =0
            if (err) {
                error(err);
                return;
            }
    
            const bagData = jsonAsset.json;
            for (; i < bagData.length; i++) {
                this.setItem(bagData[i].type, bagData[i].name, bagData[i].count);
            }   
        });
    }

    if (callback) {
        callback();
    }
    }
    public save(callback?: () => void) {
        const jsonDataArray = this.items.map(item => item.toJSON());

        // 将 JSON 数据数组保存到本地存储中
        sys.localStorage.setItem('bag', JSON.stringify(jsonDataArray));

        if (callback) {
            callback();
        }
    }

    
    protected instantiateItem(itemType: string, itemData: any): Item | null {
        const itemFactory = ItemFactory.getInstance();
        const itemClass = itemFactory.getItemClass(itemType);

        if (itemClass) {
            const itemInstance = new itemClass(itemData);
            this.items.push(itemInstance);// 假设将实例化的物品添加到 BagDataManager 管理的物品数组中
            return itemInstance;
        } else {
            return null;
        }
    } 

    protected setItem(itemType: string, itemNameOrID: string | number, itemCount: number) {
        resources.load(`item/${itemType}`, JsonAsset, (err, jsonAsset) => {
            if (err) {
                error(err);
                return;
            }
            const data = jsonAsset.json;

            let item;
            if (typeof itemNameOrID === 'string') {
                // Handle string case (itemName)
                item = this.instantiateItem(data[itemNameOrID].type, data[itemNameOrID]);
            } else {
                // Handle number case (itemID)
                item = this.instantiateItem(data[itemNameOrID - 1].type, data[itemNameOrID - 1]);
            }
    
            item.Count = itemCount;
        });
    }
    

    public addItem(itemType: string, itemName: string, itemCount: number,callback?: () => void): void {

        const aimItem = this.items.find((item) => item.Name === itemName);
        if(typeof aimItem !== 'undefined')
        {

            aimItem.Count += itemCount;

        }
        else
        {

            this.setItem(itemType, itemName, itemCount);

        }
        if (callback) {
            callback();
        }

        this.bagDataControl = find('UI/GameManager/BagDataControl')

        this.bagDataControl.updateBag()


    }

    public removeItemsWithZeroCount(): void {
        this.items = this.items.filter(item => item.Count > 0);
    }
    getItems(callback?: (items: Item[]) => void): void {
        // 获取物品数据...
        const items = this.items;

        if (callback) {
            // 在获取物品数据后执行回调函数
            callback(items);
        }
    }
    
    
}

export class ItemFactory {
    private static instance: ItemFactory;
    private itemClassMap: { [key: string]: typeof Item } = {};

    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.registerItemClass('food', Food); // 在这里注册初始的物品类型和对应的类
    }

    public static getInstance(): ItemFactory {
        if (!ItemFactory.instance) {
            ItemFactory.instance = new ItemFactory();
        }
        return ItemFactory.instance;
    }

    private registerItemClass(itemType: string, itemClass: typeof Item): void {
        this.itemClassMap[itemType] = itemClass;
    }

    public getItemClass(itemType: string): typeof Item | null {
        const itemClass = this.itemClassMap[itemType];
        return itemClass || null;
    }
}


  

 export abstract class Item {
    protected _type: string; //物品类型
    protected _ImgUrl: string; //图片地址
    protected _Name: string; //英文名称
    protected _Count: number; //数量
    protected _Id: number; //ID
    protected _Info: string; //信息
    protected _canInteract: boolean; // 添加一个标志，表示物品是否可以使用
    protected _actionText: string;
    protected _value:number; //价值
    protected _Label:string;//中文名称
 
     constructor(data: any) {
         this._type = data.type|| "";
         this._ImgUrl = data.ImgUrl || "";
         this._Name = data.Name || "";
         this._Count = data.Count || 1;
         this._Id = data.Id || 0;
         this._Info = data.Info || "";
         this._canInteract = true; // 默认为可以使用
         this._actionText = data.actionText || "";
         this._value = data.value || 0;
         this._Label = data.Label || "";
     }
 
     // 抽象方法，需要在子类中实现
     abstract specialFunction(): void;
     abstract toJSON(): any;
     // 使用 getter 方法获取属性值
     get Type():string{
        return this._type;
     }
     get Value(): number {
        return this._value;
    }
    
     get ImgUrl(): string {
         return this._ImgUrl;
     }
 
     get Name(): string {
         return this._Name;
     }
 
     get Count(): number {
         return this._Count;
     }
     set Count(value: number) {
        if (value >= 0) {
            this._Count = value;
        } else {
  
        }
     }
     get Label(): string {
        return this._Label;
     }
 
     get Id(): number {
         return this._Id;
     }
 
     get Info(): string {
         return this._Info;
     }
 
     get canInteract(): boolean {
         return this._canInteract;
     }

     get actionText(): string {
         return this._actionText;
     }
 
     // 使用物品
     use() {
         if (this._canInteract) {
             
             this.specialFunction(); // 调用特殊功能
         } else {
             
         }
     }
 }

 
 


// 具体的物品子类
export class Food extends Item {
    constructor(data: any) {
        super(data);
    }
    toJSON(): any {
        return {
            type: this._type,
            ImgUrl: this._ImgUrl,
            Name: this._Name,
            Count: this._Count,
            Id: this._Id,
            Info: this._Info,
            canInteract: this._canInteract,
            actionText: this._actionText
            // 可以添加 Food 特有的属性
        };
    }

    specialFunction() {
       
    }
    
}


