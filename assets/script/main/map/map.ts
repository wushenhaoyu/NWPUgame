import { _decorator,SystemEvent, Component,PhysicsGroup, Node ,TiledMap,PhysicsSystem2D,RigidBody2D,BoxCollider2D,ERigidBody2DType,size,Prefab,instantiate,v2,resources,TiledMapAsset,error, Contact2DType, Collider2D, IPhysics2DContact, Asset, AssetManager, director, Input, input, find, Camera} from 'cc';
const { ccclass, property } = _decorator;
import GameDataManager from '../../data/GameDataManager';
import npc1 from '../res/npc1';
import npc2 from '../res/npc2';
const gameDataManager = GameDataManager.getInstance();
interface NPC{
    name:string,
    dialogue:number,
    model:string
};
interface StartPoint {
    x:number
    y:number
    name:string
};
interface TPPoint {//传送点
    name:string
    map:string
};
@ccclass('map')
export default class map extends Component {
    @property({type:Node})
    public mapwindow:Node = null;
    @property({type:Node})
    public camera:Node = null;
    @property({type:TiledMap})
    public map:TiledMap = null;
    @property({type:Node})
    public player:Node = null;
    StartPointData:StartPoint[] = [];
    TPPointData:TPPoint[] = [];
    public NPC:NPC[] = []//存储tiled中npc信息
    public npclist:Node[] = []; //存储实例化的npc节点
    public text:Node = null;
    map1:string = ""
    name1:string = ""
    onLoad(){
        /*this.node.on('switchMap', (eventData) => {
            this.map1 = eventData.map
            this.name1 =  eventData.name
            // 在这里可以使用参数进行进一步操作
        })*/
      // 在其他的脚本中// 根据常驻节点的名称查找它
      // 根据常驻节点上的脚本组件的名称获取它的引用
    this.name1 = gameDataManager.getStart(); // 调用 component 的 getName 方法
    this.map1 = gameDataManager.getMap();
   this.text =  find('UI/UICanvas/dialogue');//先找到dialogue
   this.node.on('talk',this.talk,this.map1);
        
       

       

    }
     start() {
        if(!this.map1)
        {
            this.map1 = "dongmen"
            this.name1 = "dongmen"
        }
        console.log(this.map);
        for(var i = 0 ; i < gameDataManager.mapLoadListAlready.length ; i++)
        {
            if(gameDataManager.mapLoadListAlready[i] == this.map1)
            {

            }
            else{
                resources.release('map/map'+gameDataManager.mapLoadListAlready[i],TiledMapAsset);
            }
           
        }
        const self = this;
        console.log(self.node.name)
        resources.load('map/map/'+this.map1, TiledMapAsset, (err, tiledMapAsset) => {
            if (err) {
                error(err);
                return;
            }
            console.log(self.node.name)
            self.map.tmxAsset = tiledMapAsset
          //  let p = PhysicsSystem2D.instance
          //  p.enable = true;
          //  p.debugDrawFlags = 1;

            
            this.camera.emit('map')
            gameDataManager.mapLoadListAlready = [];
            this.initmap()
        })
    }

    initmap()
    {
        this.setNPC()
        this.settensor()
        let p = PhysicsSystem2D.instance
        p.enable = true;
       console.log(this.map.node.children)
        let node = this.map.node.getChildByName('player');
      
        this.map.node.removeChild(node);
        this.map.node.insertChild(node, 1);
        
        const start = this.map.getObjectGroup('start');
        const birthpoints = start.getObjects();
        for (const birthpoint of birthpoints) {
            const StartPoint:StartPoint ={
                x:birthpoint.x,
                y:birthpoint.y,
                name:birthpoint.name
            }
            if(StartPoint.name == this.name1)
                {
                    node.setPosition(birthpoint.x,birthpoint.y)
                    gameDataManager.plotDataControl.node.emit('ready');
                }
            
           

            this.StartPointData.push(StartPoint)
        }
        let objectGroup = this.map.getObjectGroup("object");
        let objects = objectGroup.getObjects();
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            let node = new Node();
            this.node.addChild(node);
            let y = this.map.getMapSize().height * this.map.getTileSize().height - object.offset.y - object.height;
        node.setPosition(object.offset.x, y);
            let body = node.addComponent(RigidBody2D);
            body.type = ERigidBody2DType.Static;
            body.group = 8;
            let collider = node.addComponent(BoxCollider2D);
            // 设置碰撞组件的大小和偏移量
            collider.size = size(object.width, object.height);
            collider.offset = v2(object.width / 2, object.height / 2);
            collider.group = 8;
            
        }
        if(this.mapwindow.name == "")
        {
            this.mapwindow = find('UI/UICanvas/UI/window/map/mapwindow');
        }
        this.mapwindow.getParent().active = true;
        this.mapwindow.emit('map',this.map1);
    }
    settensor()
    {
        // 从对象层中获取起始点数据
const start = this.map.getObjectGroup('sensor');
const birthpoints = start.getObjects();


// 遍历起始点数据
var i = 0;
for (const birthpoint of birthpoints) {
    const TPPoint:TPPoint ={
        map:birthpoint.map,
        name:birthpoint.name
    }
    this.TPPointData.push(TPPoint)
    // 创建一个节点用于表示传感器
    const sensorNode = new Node();
    this.node.addChild(sensorNode);
    
    const body = sensorNode.addComponent(RigidBody2D);
    body.type = ERigidBody2DType.Static;
    body.group = 4;
   
    // 创建一个碰撞组件，通常使用 BoxCollider2D
    const sensorCollider = sensorNode.addComponent(BoxCollider2D);
    sensorCollider.group = 4
    // 将碰撞组件设置为传感器
    sensorCollider.sensor = true;
    
    // 设置碰撞组件的大小和位置，使用从对象层中读取的数据
    sensorCollider.size = size(birthpoint.width, birthpoint.height); // 设置传感器的大小
    sensorNode.setPosition(birthpoint.x, birthpoint.y); // 设置传感器的位置
    sensorCollider.offset = v2(birthpoint.width / 2, birthpoint.height / -2);
            sensorCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            body.enabledContactListener = true;
    // 添加碰撞事件，以侦听与玩家的接触
    /*sensorCollider.on(Contact2DType.BEGIN_CONTACT, (selfCollider:Collider2D, otherCollider:Collider2D,contact:IPhysics2DContact | null)=>{
        
    }, this);*/

    // 将从对象层中读取的数据附加到节点，以在事件处理程序中使用
    sensorNode.name = birthpoint.name;
    sensorCollider.name = birthpoint.map; 
    resources.preload('map/map'+birthpoint.name);
    gameDataManager.mapLoadListAlready[i] = birthpoint.name;//地图加载完毕向剧情节点发送
}



}

setNPC()
{
    const NPCList = this.map.getObjectGroup('NPC');
    if(NPCList)
    {
        const NPC = NPCList.getObjects();
        for (let i = 0; i < NPC.length; i++) {
         
            resources.load("NPC/npc"+NPC[i].model+"/npc"+NPC[i].model, Prefab, (err, prefab) => {
                if (err) {
                    error(err.message);
                    return;
                }
               
            
                // 预制体加载成功后，可以将其实例化并添加到场景中
                let  node = instantiate(prefab);
                // 可以设置节点的位置等属性
                // 添加到场景
                let object = NPC[i];
                // console.log(this.map)
                node.name = object.dialogue;
                this.map.node.addChild(node);
                if(object.move == 1)
                {node.addComponent(npc1);}
                else
                {node.addComponent(npc2);}
                let y = this.map.getMapSize().height * this.map.getTileSize().height - object.offset.y - object.height;
                node.setPosition(object.offset.x, y);
                this.npclist.push(node);
                this.map.node.insertChild(node, 2);
            });
        }
    }
} 

onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    // 只在两个碰撞体开始接触时被调用一次
    
    for(var i =0 ; i < this.TPPointData.length ; i++)
    {
        if(this.TPPointData[i].name == selfCollider.node.name&&this.TPPointData[i].map == selfCollider.name )
        {
            this.switchMap(this.TPPointData[i].map,this.TPPointData[i].name)
        }
    }
}
talk(e1,e2)
{
let script = this.npclist[e1].getComponent(npc1)
console.log(e1,script)
    if(script)
    {
        script.talk(e2)
        return
    }
    else{
        this.npclist[e1].getComponent(npc2).talk(e2)
    }

    
}


    
public switchMap(map:string,name:string)//切换地图
{
     gameDataManager.setMap(map,name);
director.loadScene('loading',() => {
})
}


    update(deltaTime: number) {
        
    }

}


