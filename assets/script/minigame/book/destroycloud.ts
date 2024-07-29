import { _decorator, BoxCollider2D, Collider2D, Component, Node ,Contact2DType, director, RigidBody, RigidBody2D, Label} from 'cc';
const { ccclass, property } = _decorator;
import book_move from './book_move';

@ccclass('destroyclouds')
export class destroyclouds extends Component {




    colliders = null;

    start() {
        
        //获取碰撞节点
        this.colliders= this.node.getComponent(BoxCollider2D);


        this.colliders.on(Contact2DType.BEGIN_CONTACT,this.onCollision, this);
        
        
    }

    //碰撞检测的执行
    onCollision(self,other:BoxCollider2D){


    }
}


