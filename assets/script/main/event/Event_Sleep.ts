import { _decorator, Component, error, JsonAsset, Label, Node, resources,tween, Sprite, SpriteFrame,find, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import GameDataManager from '../../data/GameDataManager'
const gameDataManager = GameDataManager.getInstance();
@ccclass('Event_Sleep')
export class Event_Sleep extends Component {
    @property({type:Node})
    public eventWindow:Node = null;
    start() {

    }

    update(deltaTime: number) {
        
    }

    load()//激活事件 每个必有
    {
        let node = this.eventWindow.getChildByName('main').getChildByName('window')
        resources.load('event/sleep',JsonAsset,null,(err,texture)=>{ //这行需要改
            if (err) {
                error("this is an error:", err);
                return;
            }

            let data =   texture.json 
            resources.load(data.iconPath,SpriteFrame,null,(err,sprite)=>{
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                node.getChildByName('icon').getComponent(Sprite).spriteFrame =  sprite
                })
            node.getChildByName('title').getComponent(Label).string = data.title
            node.getChildByName('description').getComponent(Label).string = data.description
            this.eventWindow.active = true;    
            })
            this.node.on('event',this.eventstart,this)
            //find('UI/UICanvas/UI/unpersistUI').active = false;  ####   eventWindow.ts里写了  ######

    }

    eventstart()//进行事件 每个必有
    {
        this.node.off('event')
        console.log('睡一觉！')
        gameDataManager.nextTime();
        console.log(gameDataManager.getDay(),gameDataManager.getTime())
        let Mask = find('UI/UICanvas/Mask')
        Mask.active = true;
        tween(Mask.getComponent(UIOpacity))
            .to(2,{opacity:255},{
                onComplete(){
                    console.log('hide')
                    setTimeout(()=>{
                        console.log('show')
                        tween(Mask.getComponent(UIOpacity))
                        .to(2,{opacity:0},{
                        onComplete(){
                            find('UI/UICanvas/UI/unpersistUI').active = true
                            Mask.active = false
                        }
                    })
                    .start()
                    },2000)
                    
                }
            }).start()
            



    }
}


