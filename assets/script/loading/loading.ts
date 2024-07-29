import { _decorator, Component, Node ,assetManager, ProgressBar,director, resources, TiledMapAsset,tween, find, Label, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import GameDataManager from '../data/GameDataManager';
import BagDataManager from '../data/BagDataManager';
import PlayerDataManager from '../data/PlayerDataManager';

const bagDataManager = BagDataManager.getInstance();
const playerDataManager = PlayerDataManager.getInstance();
const gameDataManager = GameDataManager.getInstance();
@ccclass('loading')
export class loading extends Component {
    @property(ProgressBar)
    public progressBar: ProgressBar = null;
    UINode:Node = null;
    public c:number = 0;
    @property({type:UIOpacity})
    public label:UIOpacity = null;


    start() {
        tween(this.label)
        .repeatForever(tween(this.label).to(1,{opacity:0},{
            easing: 'quadInOut'
        }).to(1,{opacity:255},{
            easing: 'quadInOut'
        }).start())
        .start()
        this.loadResources();
        let UI = find('UI/UICanvas/UI')
        if(UI != undefined)
        UI.active = false;

    }

    loadResources() {
        // 这里可以根据你的需要加载不同的资源
        // 这里只是一个示例，加载场景和地图资源
        bagDataManager.init(this.onBagLoaded.bind(this));
        playerDataManager.init(this.onPlayerLoaded.bind(this));
        director.preloadScene('main', this.onSceneLoaded.bind(this));
        resources.load('map/map/'+gameDataManager.getMap(),TiledMapAsset,(err,resources)=>{
            if(err) {
                console.error(`Failed to preload assets in folder map/map/: ${err}`);
                return;
            }
            this.onMapLoaded()
        })
    
    }

    onBagLoaded() {
        // 这里可以处理背包加载完成后的逻辑
        this.updateProgressBar(0.2);
    }

    onSceneLoaded() {
        // 这里可以处理场景加载完成后的逻辑
        this.updateProgressBar(0.3);
    }

    onMapLoaded() {
        
        // 这里可以处理地图加载完成后的逻辑
        this.updateProgressBar(0.3);
    }
    onPlayerLoaded() {
        // 这里可以处理玩家加载完成后的逻辑
        this.updateProgressBar(0.2);
    }

    updateProgressBar(p: number) {
        // 更新进度条的显示
        if (this.progressBar) {
            this.c += p;
            tween(this.progressBar)
                .to(1,{progress:this.c})
                .start()
           /*tween(this.progressBar).to(2,{progress:this.progressBar.progress += progress},{
                onComplete()
                {
                    console.log(this.progressBar.progress)
                }
            }).start();*/
        }
    }

    next() {
        // 所有资源加载完成，可以切换到下一个场景了
        director.loadScene('main', () => {
            find('UI/UICanvas/UI').active = true;
        });
    }

    update(deltaTime: number) {
        // 可以在这里实现加载过程中的逻辑更新
        if (this.progressBar.progress >= 1) {
            this.next();
        }

    }
}


