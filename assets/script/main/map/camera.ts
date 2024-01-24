import { _decorator, Component, Camera, TiledMap, Vec3, tween, v3 ,Node,v2, UITransform, RigidBody2D,view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('camera')
export class camera extends Component {
    @property({type:Node})
    public player:Node = null;
    @property({ type: TiledMap })
    tiledMap: TiledMap = null;
    cameraWidth:number = 0;
    cameraHeight:number = 0;
    mapWidth:number = 0;
    mapHeight:number = 0;
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

    start() {

        this.node.on('map',this.init,this);

    }

    init()
    {
        const tileSize = this.tiledMap.getTileSize();
        console.log(tileSize)
        this.playerHeight = this.player.getComponent(UITransform).height;
        this.playerWidth = this.player.getComponent(UITransform).width;
        console.log(this.tiledMap.getMapSize().width* tileSize.width / 2,this.tiledMap.getMapSize().height* tileSize.height / 2)
        this.cameraMaxX1 = view.getVisibleSize().width / 2 + this.playerWidth / 2;
        this.cameraMaxY1 = view.getVisibleSize().height / 2 + this.playerHeight / 2;
        this.cameraMaxX2 = this.tiledMap.getMapSize().width* tileSize.width  - view.getVisibleSize().width / 2 -  this.playerWidth / 2;
        this.cameraMaxY2 = this.tiledMap.getMapSize().height* tileSize.height  - view.getVisibleSize().height / 2 -  this.playerHeight / 2;
        console.log(this.cameraMaxX1,this.cameraMaxY1,this.cameraMaxX2,this.cameraMaxY2);
        if(this.cameraMaxX1 > this.cameraMaxX2 )
        {
            this.ifControlX = false;
            let position = this.node.getPosition();
            position.x = this.tiledMap.getMapSize().width* tileSize.width / 2;
            this.node.setPosition(position);
        }
        if(this.cameraMaxY1 > this.cameraMaxY2)
        {
            this.ifControlY = false;
            let position = this.node.getPosition();
            position.y = this.tiledMap.getMapSize().height* tileSize.height / 2;
            this.node.setPosition(position);
        }
    }

    update() {
    
       this.updateCameraPosition();
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
