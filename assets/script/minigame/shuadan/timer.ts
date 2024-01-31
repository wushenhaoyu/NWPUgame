import { _decorator, Component, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('timer')
export class timer extends Component {

    @property(Node)
    private manager: Node = null;

    public ticking: boolean = true; // 是否正在计时

    public maxtime: number
    currenttime: number

    start() {

        this.maxtime = 10; // 设置最大时间
        this.currenttime = this.maxtime;

    }

    protected onLoad(): void {
        
        this.currenttime = this.maxtime;

    }

    update(deltaTime: number) {
        
        if(this.ticking){

            this.currenttime -= deltaTime;
            this.getComponent(ProgressBar).progress =  this.currenttime / this.maxtime; // 更新进度条的进度
            if(this.currenttime <= 0)
            {

                this.manager.emit("timeBarEnd");
                this.ticking = false; // 计时结束，停止计时

            }

        }

    }
}


