import { _decorator, Component, easing, Label, Node,Tween,tween, UIOpacity, Widget} from 'cc';
const { ccclass, property } = _decorator;
import GameDataManager from '../../data/GameDataManager';
const gameDataManager = GameDataManager.getInstance();
@ccclass('mapwindow')
export class mapwindow extends Component {
    c:Widget = null;
    opacity:UIOpacity = null;
    start() {
        this.node.on('map',this.begin,this);
        this.c = this.node.getComponent(Widget);
        this.opacity = this.node.getComponent(UIOpacity);
    }

    begin(e1)
    {   
        Tween.stopAll();
        this.c.top = 0;
        this.opacity.opacity = 255;
        this.node.getComponentInChildren(Label).string = gameDataManager.mapDictionary.get(e1) ;
        tween(this.c)
            .to(1.5,{'top':80},
            {
                easing: 'smooth',
                onComplete: () =>{
                tween(this.opacity)
                .delay(1.5)
                .to(1, { opacity:0},{
                    onComplete: () =>{
                        this.node.getParent().active = false;
                    }
                })
                .start();
                }
            }).start();
    }

    update(deltaTime: number) {
        
    }
}


