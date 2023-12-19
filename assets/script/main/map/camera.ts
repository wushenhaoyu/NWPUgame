import { _decorator, Component, Camera, TiledMap, Vec3, tween, v3 ,Node,v2, UITransform, RigidBody2D } from 'cc';
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
    playerWidth:number = 0;
    playerHeight:number = 0;
    rigid:RigidBody2D = null;

    private camera: Camera = null;

    start() {
        this.node.on('map',this.init,this)
    }
    init()
    {
        this.rigid = this.player.getComponent(RigidBody2D)
        this.playerHeight = this.player.getComponent(UITransform).height;
        this.playerWidth = this.player.getComponent(UITransform).width;
        this.camera = this.getComponent(Camera);
        this.cameraHeight = this.camera.camera.height /2;
        this.cameraWidth = this.camera.camera.width /2;
        const tileSize = this.tiledMap.getTileSize();
        this.mapWidth = this.tiledMap.getMapSize().width* tileSize.width ;
        this.mapHeight = this.tiledMap.getMapSize().height* tileSize.height;
        console.log(this.tiledMap,this.tiledMap.getMapSize(),this.tiledMap.getTileSize())
    }

    update() {
       this.checkCameraBoundaries()
    }

    checkCameraBoundaries() {
        
       
        console.log(this.playerPosition.x,this.mapWidth)
        if (this.playerPosition.x - this.cameraWidth <= 0) {
            // 摄像机到达左边缘，限制其移动
            this.cameraPosition.x = this.cameraWidth - this.playerPosition.x + this.playerWidth;
        } else if (this.playerPosition.x + this.cameraWidth >= this.mapWidth) {
            // 摄像机到达右边缘，限制其移动
            this.cameraPosition.x = -this.playerPosition.x - this.cameraWidth + this.mapWidth - this.playerWidth;
        }
        
        // 检测上下边缘
        if (this.playerPosition.y - this.cameraHeight <= 0) {
            // 摄像机到达上边缘，限制其移动 
            this.cameraPosition.y = this.cameraHeight - this.playerPosition.y +this.playerHeight;
        } else if (this.playerPosition.y + this.cameraHeight >= this.mapHeight) {
            // 摄像机到达下边缘，限制其移动
            this.cameraPosition.y = -this.playerPosition.y - this.cameraHeight + this.mapHeight -this.playerHeight;
        }
        
        // 应用新的相机位置
      //  tween(this.camera.node)
        //    .to(1,{position:this.cameraPosition})
        this.node.setPosition(this.cameraPosition)
        this.playerPosition = this.player.getPosition();
    }
}
