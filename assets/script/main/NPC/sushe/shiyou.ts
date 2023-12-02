import { _decorator, Component, JsonAsset, Node, resources } from 'cc';
const { ccclass, property } = _decorator;
import PlotDataManager from '../../../data/PlotDataManager';
import * as shiyouData from '../../../../resources/dialogue/sushe/shiyou.json';
const plotDataManager = PlotDataManager.getInstance();

@ccclass('shiyou')
export class shiyou extends Component {
    @property({type:Node})
    public text:Node = null;

    plots: Array<Object> = shiyouData.default.plot;

    start() {

        this.node.on("select1",this.init1,this)//接受带选择的
        this.node.on("select2",this.init2,this)//不带选择的
        
    }
    
    protected onEnable(): void {
        
        this.text.emit("plot", this.node,plotDataManager.plotdata.sushe.shiyou.plot); 

    }

    init1(plotID: number){

        plotDataManager.plotdata.sushe.shiyou.plot = plotID;

        this.text.emit("plot", this.node,plotDataManager.plotdata.sushe.shiyou.plot);

        if(this.plots[plotID].type == 0){

            this.closeplot()

        }

    }
    init2(plotID: number){
        //总体逻辑判断
        plotDataManager.plotdata.sushe.shiyou.plot = plotID;
    }
    closeplot() {
        this.node.active = false;
    }

    update(deltaTime: number) {
        
    }

}


