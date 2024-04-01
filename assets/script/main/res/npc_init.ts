import { _decorator, AnimationClip, AnimationComponent, Component, error, instantiate, Node, Prefab, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('npc_init')
export class npc_init extends Component {
    public model:string = "" //人物模型名称
    public script:Component = null;
    private animationClipListDictionary:string[] = ['stand_down','stand_up','stand_left','stand_right','walk_down','walk_up','walk_left','walk_right']
    start() {

    }

    init(model:string,name:string,scriptName:string){         //npc初始化方法
        this.node.name = name
        this.model = model

        let animationComponent = this.node.getComponent(AnimationComponent)
        for (var i = 0 ; i < this.animationClipListDictionary.length ; i++)
        {
            resources.load('NPC/'+model+'/'+this.animationClipListDictionary[i],AnimationClip,null,(err,Clip)=>{ //加入动画，需要传入动画模型名称
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                animationComponent.addClip(Clip)
            })
        }
        resources.load('npcScript/'+scriptName,Prefab,null,(err,script)=>{  //加入个性化脚本，需要传入脚本名称
                if (err) {
                    error("this is an error:", err);
                    return;
                }
                let scriptNode = instantiate(script)
                scriptNode.name = "script"          //统一个性脚本名称子节点为"script"
                this.node.addChild(scriptNode)
            })
        
    }

    update(deltaTime: number) {
        
    }
}


