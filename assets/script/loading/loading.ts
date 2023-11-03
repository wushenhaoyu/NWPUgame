import { _decorator, Component, Node ,assetManager, ProgressBar,director, resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    start() {

    }
    //loadNextScene() {
        // 使用 cc.loader 加载你的下一个场景的资源
       // const Progress = this.node.getComponent(ProgressBar)
       // assetManager.loadResDir('next_scene', (completedCount, totalCount, item) => {
            // 更新进度条
        //    Progress.progress = completedCount / totalCount;

            // 当所有资源都加载完成时，跳转到下一个场景
         //   if (completedCount === totalCount) {
          //      director.loadScene('NextScene');
          //  }
       // });
   // }

    update(deltaTime: number) {
        
    }
}


