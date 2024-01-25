import { _decorator, Component, Node,find } from 'cc';
const { ccclass, property } = _decorator;
import map from '../map/map'
import GameDataManager  from'../../data/GameDataManager'
import {timeTypeDef} from'../../data/GameDataManager'
const gameDataManager = GameDataManager.getInstance();

@ccclass('PlotDataControl')
export class PlotDataControl extends Component {
    public mapScript:map = null; //地图脚本
    public UINode:Node = null;
    start() {
        this.checkIsMapScriptNull();
        this.UINode = find('UI/UICanvas/UI');
    }
    checkIsMapScriptNull()
    {
        if(this.mapScript.name == "")
        {
            this.mapScript = find('gameworld/gameCanvas/Map').getComponent(map);
        }
    }
    checkPlot()//检查是否应该发生剧情了
    {
        let day = gameDataManager.getDay();
        let time = gameDataManager.getTime();
        switch(day) {
            case 1 :
                if(day == timeTypeDef.morning )
                this.Plot1_1();
                break;
        }
       
    }


    Plot1_1()
    {
        this.checkIsMapScriptNull() 
        this.mapScript.switchMap('dongmen','dongmen')// 切换地图
        this.UINode.active = false;
        

    }
}


