import { _decorator, Component, Node, director, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('music')
export default class music extends Component {


    @property({type:Node})
    public settings:Node = null;
    public music:AudioSource = null;

    start() {

        this.node.on("pauseMusic", this.pauseMusic, this)
        this.music = this.node.getComponent(AudioSource)
        this.music.volume = 1;

    }

    protected onLoad(): void {
        
       director.addPersistRootNode(this.node); //背景音乐不会因切换场景而重新播放

    }

    stopMusic()
    {
        this.music.stop();
    }

    playMusic()
    {
        this.music.play();
    }

    pauseMusic() {

    this.music.pause()

    }

    update(deltaTime: number) {
        
    }
}


