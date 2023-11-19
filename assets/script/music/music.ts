import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('music')
export class music extends Component {
    start() {

    }

    protected onLoad(): void {
        
        director.addPersistRootNode(this.node); //背景音乐不会因切换场景而重新播放

    }

    update(deltaTime: number) {
        
    }
}


