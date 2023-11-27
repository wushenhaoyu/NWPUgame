 import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';

const plotDataManager = PlotDataManager.getInstance();

@ccclass('menwei')
export class menwei extends Component {
    @property({type:Node})
    public text:Node = null;
    start() {
        this.node.on("select1",this.init1,this)//接受带选择的
        this.node.on("select2",this.init2,this)//不带选择的
        this.text.emit("plot", this.node,plotDataManager.plotdata.dongmen.menwei.plot); 
    }
    init1(){
        //总体逻辑判断
    }
    init2(){
        //总体逻辑判断
    }
    closeplot() {
        this.node.active = false;
    }

    update(deltaTime: number) {
        
    }
}

