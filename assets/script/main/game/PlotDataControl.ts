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
import BagDataManager from '../../data/BagDataManager';

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
    onLoad()
    {
        this.node.on('ready',this.checkPlot,this)
        this.textScript = this.text.getComponent(text);
        this._mapScript = find('gameWorld/gameCanvas/Map').getComponent(map);
        this.UINode = find('UI/UICanvas/UI');
        this._cameraScript = find('gameWorld/gameCanvas/Map/door/gameCamera').getComponent(camera);
        this.musicScript = this.musicNode.getComponent(music)
        gameDataManager.plotDataControl = this.node.getComponent(PlotDataControl)
    }
    start() {   
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
                break

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


