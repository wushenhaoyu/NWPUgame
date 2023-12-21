import { _decorator, BoxCollider2D, v2,Component,error, Node ,Contact2DType, Director,director, Color, RigidBody2D, Label, Sprite, SpriteFrame, resources} from 'cc';
import book_move from './book_move';
const { ccclass, property } = _decorator;

@ccclass('collidedetect')
export class collidedetect extends Component {

    @property({type:Node})
    movenode:Node = null;

    @property({type:Node})
    label:Node = null;

    @property({type:SpriteFrame})
    Frame1:SpriteFrame = null;

    @property({type:SpriteFrame})
    Frame2:SpriteFrame = null;

    @property({type:SpriteFrame})
    Frame3:SpriteFrame = null;

    colliders = null;
    flag = 0;
    score:number = -1;
    deletenode = null;
    color:number = 0;

    start() {
        
        //获取碰撞节点
        this.flag = this.movenode.getComponent(book_move).flag;
        this.colliders= this.node.getComponents(BoxCollider2D);

        //让sensor可以进行碰撞事件
        this.node.getComponent(RigidBody2D).enabledContactListener = true;


        //停在云上则执行，恢复剩余跳跃量
        this.colliders[1].on(Contact2DType.BEGIN_CONTACT,this.onCollision, this);
        this.colliders[0].on(Contact2DType.BEGIN_CONTACT,this.onCollision, this);
        this.colliders[2].on(Contact2DType.BEGIN_CONTACT,this.onCollision2, this);
        
        
    }

    //碰撞检测的执行
    onCollision(self,other:BoxCollider2D){
        console.log(other.group);
        
        //检测云，如果与玩家颜色相同或者颜色为白色，则可以实体化
        if(other.group == 16)
        {
            if(other.node.name == "cloud" || other.node.name == this.color.toString()){
                let cl = other.node.getComponent(BoxCollider2D);
                cl.enabled = true;
            }
            
        }

        //踩在云上
        if(other.group == 4){
            //停在云上则恢复跳跃次数，并增加分数
            this.movenode.getComponent(book_move).flag = 0;
            this.score++;
            this.label.getComponent(Label).string = "score:"+this.score.toString();

            //停在云上则弹起
            self.node.getComponent(RigidBody2D).linearVelocity = v2(self.node.getComponent(RigidBody2D).linearVelocity.x, Math.abs(self.node.getComponent(RigidBody2D).linearVelocity.y/2));
            
            //云变色
            if(other.node.name == "cloud"){
                if(this.color == 0) other.node.getComponent(Sprite).color = Color.YELLOW;
                if(this.color == 1) other.node.getComponent(Sprite).color = Color.RED;
                if(this.color == 2) other.node.getComponent(Sprite).color = Color.CYAN;

                other.node.name = this.color.toString();
            }
        }

        

    }

    //吃到糖果
    onCollision2(self,other){
            let nsf = new SpriteFrame();

            //加分
            this.score+=5;
            this.label.getComponent(Label).string = "score:"+this.score.toString();
            

            this.deletenode = other.node;
            director.once(Director.EVENT_AFTER_DRAW,this.candies,this);



            //吃到不同糖果变颜色
            if(other.node.name == "candy_yellow") {
                this.node.getComponent(Sprite).spriteFrame = this.Frame1;
                this.color = 0;
                
            }

    
            if(other.node.name == "candy_red") {
                this.node.getComponent(Sprite).spriteFrame = this.Frame2;
                this.color = 1;
                
            }

            if(other.node.name == "candy_blue") {
                this.node.getComponent(Sprite).spriteFrame = this.Frame3;
                this.color = 2;
                
            }



        
    }

    candies(){
        this.deletenode.destroy();
        
    }

    over(){
        //这里写游戏结束之后的操作
        this.label.getComponent(Label).string = "gameover!!";
    }


    update(dt)
    {
        if(this.node.getPosition().y < -1000)  this.over();
    }

}


