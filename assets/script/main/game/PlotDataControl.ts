import { _decorator, Component, Node,find, tween, Tween, UIOpacity, resources, TiledMapAsset } from 'cc';
const { ccclass, property } = _decorator;
import map from '../map/map'
import GameDataManager  from'../../data/GameDataManager'
import {timeTypeDef} from'../../data/GameDataManager'
const gameDataManager = GameDataManager.getInstance();
const plotDataManager = PlotDataManager.getInstance();
import music  from '../../music/music'
import {camera} from '../map/camera'
import text from '../dialogue/text'
import { Npc } from '../res/npc';
import PlotDataManager from '../../data/PlotDataManager';

@ccclass('PlotDataControl')
export class PlotDataControl extends Component {
    @property({type:Node})
    public musicNode:Node = null; 
    @property({type:Node})
    public text:Node = null;
    public textScript:text = null;
    public musicScript:music = null; //音乐脚本
    protected _cameraScript:camera = null; //
    protected _mapScript:map = null; //地图脚本
    public UINode:Node = null; //UI节点
    public stageByTime:number = 0;//当前剧情进行阶段（自由触发事件）
    public currentPlot:String = "";//当前进行的剧情
    start() {   
        this.node.on('ready',this.checkPlot,this)
        this.textScript = this.text.getComponent(text);
        this._mapScript = find('gameWorld/gameCanvas/Map').getComponent(map);
        this.UINode = find('UI/UICanvas/UI');
        this._cameraScript = find('gameWorld/gameCanvas/Map/door/gameCamera').getComponent(camera);
        this.musicScript = this.musicNode.getComponent(music)
        gameDataManager.plotDataControl = this.node.getComponent(PlotDataControl)
      /*  if(gameDataManager.isPlayerFirstPlay)
        {
            this.checkPlot();
        }*/
    }
    transition(firstCallback?, secondCallback?) {//渐变黑过场动画
        let Mask = find('UI/UICanvas/Mask');
        Mask.active = true;
    
        tween(Mask.getComponent(UIOpacity))
            .to(2, { opacity: 255 }, {
                onComplete: () => {
                    if (firstCallback && typeof firstCallback === 'function') {
                        firstCallback();
                    }
    
                    // 第一个onComplete事件的逻辑
                    // console.log('hide');
                    setTimeout(() => {
                        // console.log('show');
                        tween(Mask.getComponent(UIOpacity))
                            .to(2, { opacity: 0 },{
                                onComplete:()=>{
                                    Mask.active = false;
                                    // console.log('transitionOut')
                                    if (secondCallback && typeof secondCallback === 'function') {
                                        secondCallback();
                                    }

                                }
                            })
                            .start();
                    }, 2000);
                }
            })
            .start();
    }
    transitionIn(callback?)//渐黑转场
    {
        let Mask = find('UI/UICanvas/Mask');
        Mask.active = true;
        tween(Mask.getComponent(UIOpacity))
            .to(2,{opacity:255},{
                onComplete:()=>{
                    if(callback && typeof callback === 'function') {
                        callback()
                    }

                }
            }).start();

    }
    transitionOut(callback?)
    {
        let Mask = find('UI/UICanvas/Mask');
        tween(Mask.getComponent(UIOpacity))
            .to(2,{opacity:255},{
                onComplete:()=>{
                    if(callback && typeof callback === 'function') {
                        callback()
                    }
                    Mask.active = false;
                }
            }).start();
    }
    
   async checkPlotByTime()//通过时间检查是否应该发生剧情了 （强迫事件）
    {
        // console.log('checkByTime')
        gameDataManager.isPlayerFirstPlay = true;
        let day = gameDataManager.getDay();
        let time = gameDataManager.getTime();
        switch(day) {
            case 1 :    
                if(time == timeTypeDef.morning )
                {
                    this.Plot1_1();
                }
                if(time == timeTypeDef.night)
                {
                    resources.preload('map/aoxiangxueshengzhongxin',TiledMapAsset)
                }
                break;
            case 2:
                if(time == timeTypeDef.morning)
                {
                    // console.log('校园卡剧情')
                    this.schoolcard();
                }
                break;
            case 3:
                if(time == timeTypeDef.morning)
                {
                    // console.log('信用卡剧情')
                    this.credit();
                }
                break;
            case 5:
                if(time == timeTypeDef.morning)
                {
                    // console.log('警察剧情')
                    this.police()
                }


        }
       
    }
    checkPlot()
    {
        this.checkPlotByTime();
    }

    tweenStop()
    {
        Tween.stopAll();
    }

    Plot1_1()//进入学校的剧情控制
    {
        if(plotDataManager.plotdata.Plot.Plot1_1.isBegin == false)
        {
            plotDataManager.plotdata.Plot.Plot1_1.isBegin = true;
            this.musicScript.pauseMusic();
            this.UINode.active = false; //关闭UI
            this._cameraScript.changeControl();//将镜头控制权转为剧情控制
            this._cameraScript.move(0,2.5,10);
            find('UI/plot/Plot/Plot1_1').getComponent(Npc).plotfunc()
        }
    }

    water(npcName?: string)//饮用水的剧情
    {
        if(plotDataManager.plotdata.Plot.water.isBegin == false && !npcName)
        {
            plotDataManager.plotdata.Plot.water.isBegin = true;
            this.transition(null,()=>{
                gameDataManager.joystick.changeState(3);
                find('UI/plot/Plot/water').getComponent(Npc).plotfunc();
                console.log('进入喝水剧情')
            })
        }else if(npcName == 'suguanayi' && plotDataManager.plotdata.Plot.water.plot == 3)
        {
            this.transition(null,()=>{

                gameDataManager.joystick.changeState(3);
                find('UI/plot/Plot/water').getComponent(Npc).plotfunc();
            })

        }
        /*this.currentPlot = "water";
        if(this.isRecovered)
        {
            this.UINode.active = false;
            this.transition(()=>{
                this.getMapScript().tpPlotStart('water','water');
                gameDataManager.joystick.changeState(3);
                find('UI/plot/Plot/water').getComponent(Npc).plotfunc();
                this.isRecovered = false;
            })
        }
        else{
            gameDataManager.nextTime();
            this.UINode.active = true;
            this.isRecovered = true;
            this.currentPlot = "";
        }*/
    }
    schoolcard(npcName?: string)//校园卡的剧情
    {
        if(plotDataManager.plotdata.Plot.schoolcard.isBegin == false && !npcName)
        {
            plotDataManager.plotdata.Plot.schoolcard.isBegin = true
            this.getMapScript().switchMap('aoxiangxueshengzhongxin','jiaodongc1',()=>{
                // console.log('到翱翔学生中心',gameDataManager.getMap())
                gameDataManager.joystick.changeState(0)
                gameDataManager.plotDataControl.UINode.active = false
                //还差一个切换出生点
                find('UI/plot/Plot/schoolcard').getComponent(Npc).plotfunc()
            })
        }else if(npcName == 'shiyou' && plotDataManager.plotdata.Plot.schoolcard.plot == 3)
        {

            this.transition(null,()=>{

                gameDataManager.joystick.changeState(3);
                find('UI/plot/Plot/schoolcard').getComponent(Npc).plotfunc()
            })

        }
    }
    credit()//信征剧情
    {
        // switch(this.stageByTime) {
        //     case 0:

        // }

        if(plotDataManager.plotdata.Plot.credit.isBegin == false)
        {
            plotDataManager.plotdata.Plot.credit.isBegin = true;
            this.getMapScript().switchMap('aoxiangxueshengzhongxin','jiaodongc1',()=>{
            // console.log('到翱翔学生中心',gameDataManager.getMap())
            gameDataManager.joystick.changeState(0)
            gameDataManager.plotDataControl.UINode.active = false
            find('UI/plot/Plot/credit').getComponent(Npc).plotfunc();
         })
        }
    }
    police()
    {
        
        if(plotDataManager.plotdata.Plot.police.isBegin == false)
        {

            plotDataManager.plotdata.Plot.police.isBegin = true;

            gameDataManager.joystick.changeState(0)
            gameDataManager.plotDataControl.UINode.active = false
            //还差一个切换出生点
            find('UI/plot/Plot/police').getComponent(Npc).plotfunc();
         
        }

    }
    getCameraScript()
    {
        if(this._cameraScript.node == null)
        {
           this._cameraScript =  find('gameWorld/gameCanvas/Map/door/gameCamera').getComponent(camera)
        }
        return this._cameraScript;
    }
    getMapScript()
    {
        if(this._mapScript.node == null)
        {
            this._mapScript = find('gameWorld/gameCanvas/Map').getComponent(map);
        }
        return this._mapScript;
    }

    
}


