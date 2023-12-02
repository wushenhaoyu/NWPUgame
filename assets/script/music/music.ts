import { _decorator, Component, Node, director, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('music')
export class music extends Component {


    @property({type:Node})
    public settings:Node = null;

    start() {

        this.node.on("switchMusic", this.switchMusic, this)

    }

    protected onLoad(): void {
        
        director.addPersistRootNode(this.node); //背景音乐不会因切换场景而重新播放

    }

    switchMusic() {

        const audio = this.node.getComponent(AudioSource)

        audio.volume = audio.volume == 0 ? 1 : 0

    }

    update(deltaTime: number) {
        
    }
}


