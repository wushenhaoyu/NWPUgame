import { _decorator, Component, Node,find, tween } from 'cc';
const { ccclass, property } = _decorator;
import map from '../map/map'
import GameDataManager  from'../../data/GameDataManager'
import {timeTypeDef} from'../../data/GameDataManager'
const gameDataManager = GameDataManager.getInstance();
import music  from '../../music/music'
import {camera} from '../map/camera'
import text from '../dialogue/text'
import { Npc } from '../NPC/npc';

@ccclass('PlotDataControl')
export class PlotDataControl extends Component {
    @property({type:Node})
    public musicNode:Node = null; 
    @property({type:Node})
    public text:Node = null;
    public textScript:text = null;
    public musicScript:music = null; //音乐脚本
    public cameraScript:camera = null; //
    public mapScript:map = null; //地图脚本
    public UINode:Node = null; //UI节点
    start() {   
        this.node.on('ready',this.checkPlot,this)
        this.textScript = this.text.getComponent(text);
        this.mapScript = find('gameWorld/gameCanvas/Map').getComponent(map);
        this.UINode = find('UI/UICanvas/UI');
        this.cameraScript = find('gameWorld/gameCanvas/Map/door/gameCamera').getComponent(camera);
        this.musicScript = this.musicNode.getComponent(music)
        gameDataManager.plotDataControl = this.node.getComponent(PlotDataControl)
      /*  if(gameDataManager.isPlayerFirstPlay)
        {
            this.checkPlot();
        }*/
    }
    
    checkIsMapScriptNull()
    {
        if(this.mapScript.name == "")
        {
            this.mapScript = find('gameWorld/gameCanvas/Map').getComponent(map);
        }
    }
   async checkPlot()//检查是否应该发生剧情了 
    {
        gameDataManager.isPlayerFirstPlay = true;
        let day = gameDataManager.getDay();
        let time = gameDataManager.getTime();
        this.checkIsMapScriptNull() 
        switch(day) {
            case 1 :
                if(time == timeTypeDef.morning )
                {
                    console.log('入学')
                    this.Plot1_1();
                }
                break;
        }
       
    }


    Plot1_1()
    {
        this.musicScript.stopMusic();
        console.log(this.mapScript);
        this.UINode.active = false; //关闭UI
        this.cameraScript.changeControl();//将镜头控制权转为剧情控制
        this.cameraScript.move(0,1,8);
        find('UI/plot/Plot/Plot1_1').getComponent(Npc).plotfunc()
        

    }
}

