import { _decorator, AnimationClip, AnimationComponent, Component, error, instantiate, Node, Prefab, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('npc_init')
export class npc_init extends Component {
    public model:string = "" //人物模型名称
    public script:Component = null;
    private animationClipListDictionary:string[] = ['stand_down','stand_up','stand_left','stand_right','walk_down','walk_up','walk_left','walk_right']
    start() {

    }

    init(model:string,name:string,scriptName:string,direction?:number){         //npc初始化方法
        this.node.name = name
        this.model = model
        
        let initialAnimation: string;  
        let animationComponent = this.node.getComponent(AnimationComponent)
        for (var i = 0 ; i < this.animationClipListDictionary.length ; i++)
        {
            resources.load('NPC/'+model+'/'+this.animationClipListDictionary[i],AnimationClip,null,(err,Clip)=>{ //加入动画，需要传入动画模型名称
                console.log(model)
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                animationComponent.addClip(Clip)
                
            })
        }

        resources.load('NPC/npcScript/'+scriptName,Prefab,null,(err,script)=>{  //加入个性化脚本，需要传入脚本名称
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                let scriptNode = instantiate(script)
                scriptNode.name = "script"          //统一个性脚本名称子节点为"script"
                scriptNode.components[0].init()
                this.node.addChild(scriptNode)
            })
        
        let animation = this.node.getComponent(AnimationComponent)
        
        if(!direction)
        {
            direction = 2
        }

        this.scheduleOnce(() => {
            if(direction==1)
                animation.play('stand_up')
            else if(direction==2)
                animation.play('stand_down')
            else if(direction==3)
                animation.play('stand_left')
            else if(direction==4)
                animation.play('stand_right')
            else if(direction==5)
                animation.play('walk_right')
            else if(direction==6)
                animation.play('walk_up')
            else if(direction==7)
                animation.play('walk_left')
            else if(direction==8)
                animation.play('walk_down')
            
        }, 3);
        
    }


    update(deltaTime: number) {
        
    }
}


