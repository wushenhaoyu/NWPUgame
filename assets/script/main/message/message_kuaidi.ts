import { _decorator, Component, Node } from 'cc';
import PlotDataManager from '../../data/PlotDataManager';
const { ccclass, property } = _decorator;
const plotDataManager = PlotDataManager.getInstance()

@ccclass('message_kuaidi')
export class message_kuaidi extends Component {
    start() {
        this.node.on('select',this.dealWithSelection,this)
    }
    dealWithSelection(select:string,index:number)
    {
        switch(index)
        {
            case 7:
                switch(select)
                {
                    case "1":
                        //减少钱
                        break;

                }
                break;
        }
    }

    update(deltaTime: number) {
        
    }
}


