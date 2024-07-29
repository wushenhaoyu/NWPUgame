import { _decorator, Component, Label, Node, SpriteFrame,Sprite, resources, JsonAsset,error, NodeEventType } from 'cc';
import GameDataManager from '../../data/GameDataManager';
const { ccclass, property } = _decorator;
const gameDataManager = GameDataManager.getInstance();
@ccclass('advertisement')
export class advertisement extends Component {
    @property({type:Sprite})
    public icon:Sprite = null;
    @property({type:Label})
    public title:Label = null;
    @property({type:Sprite})
    public titleBarColor:Sprite = null;
    @property({type:Sprite})
    public Img:Sprite = null;
    @property({type:Label})
    public content:Label = null;
    @property({type:Label})
    public reward:Label = null;
    public Name:string = ""
    start() {
        this.node.on(NodeEventType.TOUCH_START,()=>{
            gameDataManager.advertiseControl.node.emit('select',this.Name)
        },this)
    }
    init(name:string)
    {
        this.Name = name
        resources.load('phone/ad/json/'+name,JsonAsset,null,(err,json)=>{
            if (err) {
                error("this is an error:", err);
                return;
            }
            const data= json.json;
            resources.load(data.icon,SpriteFrame,null,(err,spriteFrame)=>{
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                this.icon.spriteFrame = spriteFrame
            })
            resources.load(data.Img + '/spriteFrame',SpriteFrame,null,(err,spriteFrame)=>{
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                this.Img.spriteFrame = spriteFrame
            })
            resources.load(data.titleBarColor,SpriteFrame,null,(err,spriteFrame)=>{
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                this.titleBarColor.spriteFrame = spriteFrame
            })
            this.content.string = data.content
            this.title.string = data.title
            this.reward.string = data.reward
        })
    }

    update(deltaTime: number) {
        
    }
}


