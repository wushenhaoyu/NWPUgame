import { _decorator, Component, Camera, TiledMap, Vec3, tween, v3 ,Node,v2, UITransform, RigidBody2D,view ,Tween} from 'cc';
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

    private camera: Camera = null;
    isPlot:boolean = false; //是否为剧情所控制？
    start() {

        this.node.on('map',this.init,this);

    }

    init()
    {
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
    if(!this.isPlot)
       {this.updateCameraPosition();}
    }
    updateCameraPosition() {
        this.playerCurrentPosition = this.player.getPosition();
        
        if(this.playerPosition.x !=this.playerCurrentPosition.x ||this.playerPosition.y !=this.playerCurrentPosition.y){
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
        this.playerPosition = this.playerCurrentPosition;
        this.node.setPosition(this. cameraPosition);
    }
       // console.log(this. cameraPosition,this.cameraMaxX1,this.cameraMaxY1,this.cameraMaxX2,this.cameraMaxY2)
       
       
    }
      }
}
