import { _decorator, Component, instantiate, Node , Prefab, v2, Vec3,Sprite, SpriteFrame, BoxCollider2D,Color, RigidBody2D, Vec2} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('clouds')
export class CreateClouds extends Component {

    @property(Prefab)
    cloudPf:Prefab = null;

    @property(Prefab)
    candyPf1:Prefab = null;

    @property(Prefab)
    candyPf2:Prefab = null;

    @property(Prefab)
    candyPf3:Prefab = null;
    

    @property(SpriteFrame)
    sf1 = null;


    @property(SpriteFrame)
    sf2 = null;

    @property(SpriteFrame)
    sf3 = null;

    cloudnode:Node = null;
    candynode:Node = null;
    time:number = 2;


    start() {
        //每2秒生成一朵云
        this.schedule(this.addcloud,this.time);
        //每2秒有概率生成道具
        this.schedule(this.addcandy,this.time);
    }

    addcloud()
    {
        //生成节点
        this.cloudnode = instantiate(this.cloudPf);
        this.node.addChild(this.cloudnode);
        let pic = this.cloudnode.getComponent(Sprite);
        let col = this.cloudnode.getComponent(BoxCollider2D);
        col.enabled = false;

        //让sensor可以进行碰撞事件
        this.cloudnode.getComponent(RigidBody2D).enabledContactListener = true;



        //随机决定云的类型
        let tmp = Math.floor(Math.random() * 3) + 1;
        if(tmp == 2) pic.spriteFrame = this.sf2;
        if(tmp == 3) pic.spriteFrame = this.sf3; 

        //随机决定云的颜色
        let cldcolor = Math.floor(Math.random() * 9) + 1;
        if(cldcolor == 1){
            this.cloudnode.name = "0";
            this.cloudnode.getComponent(Sprite).color = Color.YELLOW;
        }
        if(cldcolor == 2){
            this.cloudnode.name = "1";
            this.cloudnode.getComponent(Sprite).color = Color.RED;
        }
        if(cldcolor == 3){
            this.cloudnode.name = "2";
            this.cloudnode.getComponent(Sprite).color = Color.CYAN;
        }


        //随机决定云是否运动
        tmp = Math.floor(Math.random() * 8) + 1;
        let tmp2 = Math.floor(Math.random() * 5) + 1;
        if(tmp == 1) this.cloudnode.getComponent(RigidBody2D).linearVelocity = v2(-tmp2, -2);
        if(tmp == 2) this.cloudnode.getComponent(RigidBody2D).linearVelocity = v2(tmp2, -2);



        //生成从-500到500的随机数,并赋予节点坐标
        let pos:Vec3 = this.cloudnode.getPosition();
        pos.x = (Math.floor(Math.random() * 4) + 0)*300 - 500;
        pos.y = 400;
        this.cloudnode.setPosition(pos);


    }

    addcandy(){

        let tmp = Math.floor(Math.random() * 5) + 1;
        let typ = Math.floor(Math.random() * 3) + 1;

        if(tmp == 5)
        {
           //生成节点
           if(typ == 1) this.candynode = instantiate(this.candyPf1);
           if(typ == 2) this.candynode = instantiate(this.candyPf2);
           if(typ == 3) this.candynode = instantiate(this.candyPf3);
            this.node.addChild(this.candynode);

            //生成从-500到500的随机数,并赋予节点坐标
            let pos:Vec3 = this.candynode.getPosition();
            pos.x = (Math.floor(Math.random() * 4) + 0)*300 - 500;
            pos.y = 450;
            this.candynode.setPosition(pos); 
        }
        


    }

}


