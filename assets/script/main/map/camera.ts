import { _decorator, Component, Camera, TiledMap, Vec3, tween, v3 ,Node,v2, UITransform, RigidBody2D,view ,Tween, easing} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('camera')
export  class camera extends Component {
    @property({type:Node})
    public player:Node = null;
    @property({ type: TiledMap })
    tiledMap: TiledMap = null;
    cameraWidth:number = 0;     //摄像机宽
    cameraHeight:number = 0;    //摄像机高
    mapWidth:number = 0;    //地图宽
    mapHeight:number = 0;   //地图高
    cameraPosition:Vec3 = v3(0,0,0)
    playerPosition:Vec3 = v3(0,0,0)
    playerCurrentPosition:Vec3 = v3(0,0,0);
    playerWidth:number = 0;
    playerHeight:number = 0;
    rigid:RigidBody2D = null;
    cameraMaxX1:number = 0;
    cameraMaxY1:number = 0;
    cameraMaxX2:number = 0;
    cameraMaxY2:number = 0;
    ifControlX:boolean = true; //是否X方向移动(因为有的地图太小了)  T_T
    ifControlY:boolean = true;  //是否Y方向移动
    isPlot:boolean = false; //是否为剧情所控制？
    camera:Camera = null;
    start() {

        this.node.on('map',this.init,this);

    }

    init()
    {
        this.camera = this.node.getComponent(Camera)
        this.node.on('begin',this.beginTalkWithNpc,this)
        this.node.on('end',this.endTalkWithNpc,this)
        const tileSize = this.tiledMap.getTileSize();
        this.cameraWidth =view.getVisibleSize().width
        this.cameraHeight = view.getVisibleSize().height
        this.mapHeight = this.tiledMap.getMapSize().height* tileSize.height
        this.mapWidth = this.tiledMap.getMapSize().width* tileSize.width
        this.playerHeight = this.player.getComponent(UITransform).height;
        this.playerWidth = this.player.getComponent(UITransform).width;
        this.cameraMaxX1 = this.cameraWidth / 2 + this.playerWidth / 2;
        this.cameraMaxY1 =  this.cameraHeight  / 2 + this.playerHeight / 2;
        this.cameraMaxX2 = this.mapWidth  - this.cameraWidth / 2 -  this.playerWidth / 2;
        this.cameraMaxY2 = this.mapHeight  -  this.cameraHeight  / 2 -  this.playerHeight / 2;
        if(this.cameraMaxX1 > this.cameraMaxX2 )
        {
            this.ifControlX = false;
            let position = this.node.getPosition();
            position.x = this.mapWidth / 2;
            this.node.setPosition(position);
        }
        if(this.cameraMaxY1 > this.cameraMaxY2)
        {
            this.ifControlY = false;
            let position = this.node.getPosition();
            position.y = this.mapHeight / 2;
            this.node.setPosition(position);
        }
        this.updateCameraPosition()
    }
    beginTalkWithNpc(event: Vec3) {
        this.changeControl(); // 将控制权交给剧情
        //this.node.getComponent(Camera).orthoHeight = 200; // 设置摄像机高度为200
    
        // 获取玩家和NPC位置信息
        const playerPosition = this.player.getPosition();
        const npcPosition = event;
    
        // 计算玩家和NPC位置的中间点
        const middlePosition = new Vec3();
        Vec3.lerp(middlePosition, playerPosition, npcPosition, 0.5); // 中间点位置 = (玩家位置 + NPC位置) / 2
        // 将摄像机位置设置为中间点位置
        //this.node.getComponent(Camera).node.setPosition(middlePosition);
        const tween1 = tween(this.camera).to(1,{orthoHeight:150},{easing:easing.quadOut});
        const tween2 = tween(this.node).to(1,{position:middlePosition},{easing:easing.quadOut});
        tween1.start();
        tween2.start();
    }
    endTalkWithNpc(event: Vec3) {
        console.log('end')
        this.playerCurrentPosition = this.player.getPosition();
        
 
           // console.log(this.playerPosition.x !=this.playerCurrentPosition.x ,this.playerPosition.y !=this.playerCurrentPosition.y)
       this. cameraPosition = this.playerCurrentPosition;
      // console.log(this.cameraPosition)
      if(this.ifControlX || this.ifControlY)
      {
        if(this.ifControlX ){
                if (this. cameraPosition.x > this.cameraMaxX2) {
                    this. cameraPosition.x = this.cameraMaxX2;
                }
                if (this. cameraPosition.x < this.cameraMaxX1) {
                    this. cameraPosition.x = this.cameraMaxX1;
                }
            }
            else{
                this.cameraPosition.x = this.node.position.x;
            }
        if(this.ifControlY){
            if (this. cameraPosition.y > this.cameraMaxY2) {
            this. cameraPosition.y = this.cameraMaxY2;
            }
            if (this. cameraPosition.y < this.cameraMaxY1) {
            this. cameraPosition.y = this.cameraMaxY1;
            }
        }
        else{
            this.cameraPosition.y = this.node.position.y;
        }
    }
    else{
        this.cameraPosition.x = this.mapWidth / 2;
        this.cameraPosition.y = this.mapHeight / 2; 
    }

    this.playerPosition = this.playerCurrentPosition;
    const tween1 =  tween(this.node).to(1,{position:this.cameraPosition},{easing:easing.quadOut})
    const tween2 = tween(this.camera).to(1,{orthoHeight:360})
    tween1.start();
    tween2.start()
    setTimeout(()=>{this.changeControl()},500)
       // console.log(this. cameraPosition,this.cameraMaxX1,this.cameraMaxY1,this.cameraMaxX2,this.cameraMaxY2)
       
       
   
    }
    

    changeControl()//移交镜头控制权
    {
        this.isPlot = !this.isPlot;
    }
     /**
     *
     * @zh
     * 移动镜头要保证isPlot为true时才能进行结束后应及时将控制器返回给玩家即isPlot = false
     * @param x x轴移动的比例
     * @param y y轴移动的比例y
     * @param time 持续时间单位为second
     * @example
     * move(0.5,0.5,1)
     * x轴0.5个屏幕 y轴0.5个屏幕 1秒钟
     */

   async  move(x: number, y: number, time: number, callback?: () => void) {
        const onCompleteCallback = () => {
          //this.isPlot = false;
          if (callback) {
            callback();
          }
        };
        let p = new Vec3()
        p =   await  Vec3.add(p,this.cameraPosition,v3(x * this.cameraWidth  , y * this.cameraHeight, 0))
        this.isPlot = true;
          tween(this.node)
          .to(time, { position: p })
          .call(onCompleteCallback) 
          .start()
      }
    update() {
        if(this.isPlot)
        {
            return
        }
       this.updateCameraPosition();
    }
    updateCameraPosition() {
        this.playerCurrentPosition = this.player.getPosition();
        
        if(this.playerPosition.x !=this.playerCurrentPosition.x ||this.playerPosition.y !=this.playerCurrentPosition.y){
       this. cameraPosition = this.playerCurrentPosition;
      if(this.ifControlX || this.ifControlY)
      {
        if(this.ifControlX ){
                if (this. cameraPosition.x > this.cameraMaxX2) {
                    this. cameraPosition.x = this.cameraMaxX2;
                }
                if (this. cameraPosition.x < this.cameraMaxX1) {
                    this. cameraPosition.x = this.cameraMaxX1;
                }
            }
            else{
                this.cameraPosition.x = this.node.position.x;
            }
        if(this.ifControlY){
            if (this. cameraPosition.y > this.cameraMaxY2) {
            this. cameraPosition.y = this.cameraMaxY2;
            }
            if (this. cameraPosition.y < this.cameraMaxY1) {
            this. cameraPosition.y = this.cameraMaxY1;
            }
        }
        else{
            this.cameraPosition.y = this.node.position.y;
        }
        this.playerPosition = this.playerCurrentPosition;
        this.node.setPosition(this. cameraPosition);
    }

       
       
    }
      }
}
