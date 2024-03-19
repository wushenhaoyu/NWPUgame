import { _decorator, Component, Label, Node, NodeEventType, VideoPlayer } from 'cc';
const { ccclass, property } = _decorator;
import GameDataManager from '../../data/GameDataManager';
@ccclass('VideoDataControl')
export class VideoDataControl extends Component {
    @property({type:VideoPlayer})
    public vedioView:VideoPlayer = null;
    @property({type:Node})
    public vedioNode:Node = null;
    start() {
        this.vedioNode.on(NodeEventType.TOUCH_START,this.pauseVideo,this)
    }
    beginVideo(url:string){
        this.vedioNode.active = true;
        this.vedioView.remoteURL = url;
        this.vedioView.play();
    }
    endVideo(){
        this.vedioView.stop();
        this.vedioView.remoteURL = ""
        this.vedioNode.active = false;
    }
    pauseVideo(){
        if(this.vedioView.isPlaying)
        {
            this.vedioView.pause()
            console.log('pause')
        }
        else{
            this.vedioView.play()
            console.log('play')
        }
    }

    update(deltaTime: number) {
        
    }
}


