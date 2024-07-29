import { _decorator, Component, instantiate, Node, Prefab,v3} from 'cc';
import { enemymove } from './enemymove';
const { ccclass, property } = _decorator;

@ccclass('createnemy')
export class createnemy extends Component {

    @property(Prefab)
    enemyPre = null;

    @property(Prefab)
    foodPre = null;

    @property(Node)
    tar = null;


    //敌人、食物的生成时间
    etime = 3;
    ftime = 8;

    enemynode:Node = null;
    foodnode:Node = null;
    start() {
        //生成敌人
        this.schedule(this.addenemy,this.etime);

        //生成食物
        this.schedule(this.addfood,this.ftime);
    }

    addenemy(){
        //添加敌人节点
        this.enemynode = instantiate(this.enemyPre);
        this.node.addChild(this.enemynode);

        //设置位置
        let entry = Math.floor(Math.random() * 7) + 0;
        let pos:number[][] = [[600,350],[600,-350],[-600,350],[-600,-350],[0,350],[0,-350],[600,0],[-600,0]]  

        let posi = v3(pos[entry][0],pos[entry][1]);
        this.enemynode.setPosition(posi);

        //设置target
        let targ = this.enemynode.getComponent(enemymove);
        targ.target = this.tar;

    }

    addfood(){
        //添加食物节点
        this.foodnode = instantiate(this.foodPre);
        this.node.addChild(this.foodnode);

        //设置位置
        let fpos = v3(Math.floor(Math.random() * 1100)  - 550, Math.floor(Math.random() * 640) - 320);
        this.foodnode.setPosition(fpos);

        

    }


    update(deltaTime: number) {
        
    }
}


