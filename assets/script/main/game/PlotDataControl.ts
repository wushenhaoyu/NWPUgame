import { _decorator, Component, Node,find, tween, Tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import map from '../map/map'
import GameDataManager  from'../../data/GameDataManager'
import {timeTypeDef} from'../../data/GameDataManager'
const gameDataManager = GameDataManager.getInstance();
import music  from '../../music/music'
import {camera} from '../map/camera'
import text from '../dialogue/text'
import { Npc } from '../res/npc';

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
    public stageByTime:number = 0;//当前剧情进行阶段（自由触发事件）
    public stageByString:number = 0;//当前剧情进行阶段（时间强制事件）
    public isReovered:boolean = true;//是否复原了
    public currentPlot:String = "";//当前进行的剧情
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
    transition(firstCallback?, secondCallback?) {
        let Mask = find('UI/UICanvas/Mask');
        Mask.active = true;
    
        tween(Mask.getComponent(UIOpacity))
            .to(2, { opacity: 255 }, {
                onComplete: () => {
                    if (firstCallback && typeof firstCallback === 'function') {
                        firstCallback();
                    }
    
                    // 第一个onComplete事件的逻辑
                    console.log('hide');
                    setTimeout(() => {
                        console.log('show');
                        tween(Mask.getComponent(UIOpacity))
                            .to(2, { opacity: 0 },{
                                onComplete:()=>{
                                    if (secondCallback && typeof secondCallback === 'function') {
                                        secondCallback();
                                    }
                                    Mask.active = false;

                                }
                            })
                            .start();
                    }, 2000);
                }
            })
            .start();
    }
    
    
    
    checkIsMapScriptNull()
    {
        if(this.mapScript.node == null)
        {
            this.mapScript = find('gameWorld/gameCanvas/Map').getComponent(map);
        }
    }
    checkPlotByString()//根据当前存储进行事件名推进剧情（自由事件）
    {
        console.log('checkByString:',this.currentPlot)
        switch(this.currentPlot)
        {
            case "water":
                this.water()
                break;
        }
    }
   async checkPlotByTime()//通过时间检查是否应该发生剧情了 （强迫事件）
    {
        console.log('checkByTime')
        gameDataManager.isPlayerFirstPlay = true;
        let day = gameDataManager.getDay();
        let time = gameDataManager.getTime();
        this.checkIsMapScriptNull() 
        switch(day) {
            case 1 :
                if(time == timeTypeDef.morning )
                {
                    this.Plot1_1();
                }
                break;
        }
       
    }
    checkPlot()
    {
        this.checkPlotByTime();
        this.checkPlotByString();
    }


    Plot1_1()//进入学校的剧情控制
    {
        switch(this.stageByTime)
        {
            case 0:
                if(this.isReovered)
                {
                    this.musicScript.pauseMusic();
                    this.UINode.active = false; //关闭UI
                    this.cameraScript.changeControl();//将镜头控制权转为剧情控制
                    this.cameraScript.move(0,1,4);
                    find('UI/plot/Plot/Plot1_1').getComponent(Npc).plotfunc()
                    this.isReovered = false
                    break;
                }
                else{
                    Tween.stopAll();
                   // this.UINode.active = true;
                    this.cameraScript.changeControl(); 
                    this.isReovered = true
                    this.stageByTime = 1;
                    //this.Plot1_1();
                   // this.musicScript.playMusic();
                   this.mapScript.switchMap('sushe','sushe',()=>{
                    console.log('切换地图')
                 })
                 break;
                }
                
            case 1:
                if(this.isReovered)
                {
                         this.isReovered = false; 
                         console.log(this.mapScript)
                         gameDataManager.joystick.changeState(0)
                         this.mapScript.tpPlotStart('Plot1_1','sheyou');
                         find('UI/plot/Plot/Plot1_1').getComponent(Npc).plotfunc();
                }
                else{
                   this.UINode.active = true;
                   this.musicScript.playMusic();
                   this.stageByTime = 2;
                   this.isReovered = true
                }
                break;


        }
            

    }

    water()//饮用水的剧情
    {
        this.currentPlot = "water";
        if(this.isReovered)
        {
            this.UINode.active = false;
            this.transition(()=>{
                this.mapScript.tpPlotStart('water','water');
                gameDataManager.joystick.changeState(3);
                find('UI/plot/Plot/water').getComponent(Npc).plotfunc();
                this.isReovered = false;
            })
        }
        else{
            gameDataManager.nextTime();
            this.UINode.active = true;
            this.isReovered = true;
            this.currentPlot = "";
        }
    }

    
}


