import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('xiaoshouyuan')
export class xiaoshouyuan extends Component {
    @property({type:Node})
    public text:Node = null;

    @property({type:Node})
    public mapNode:Node = null;

    private npcName: String = "xiaoshouyuan";

    start() {
        this.node.on("select1",this.init1,this)//接受带选择的
        this.node.on("select2",this.init2,this)//不带选择的
    }
    
    protected onEnable(): void {
        this.text.emit("plot", this.node,plotDataManager.plotdata.dachao.xiaoshouyuan.plot); 
        
    }
    init1(event){
        if(event == 1)
        {
            this.closeplot();
        }
    }
    init2(){
        //总体逻辑判断
    }
    closeplot() {
        this.node.active = false;
        this.npcWalkAgain()
    }

    update(deltaTime: number) {
        
    }

    npcWalkAgain(){

        const npcNode = this.mapNode.getComponent('map').npclist.find((npc: Node) => npc.name == this.npcName)
        if(npcNode.getComponent('npc1'))
        {

            console.log(npcNode.getComponent('npc1'))
            npcNode.getComponent('npc1').restart()

        }

   }
}


