import { _decorator,SystemEvent, Component,PhysicsGroup,CCLoader, Node ,TiledMap,PhysicsSystem2D,RigidBody2D,BoxCollider2D,ERigidBody2DType,size,Prefab,instantiate,v2,resources,TiledMapAsset,error, Contact2DType, Collider2D, IPhysics2DContact, Asset, AssetManager, director, Input, input, find} from 'cc';
const { ccclass, property } = _decorator;

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
export class map extends Component {
    @property({type:TiledMap})
    public map:TiledMap = null;
    @property({type:Node})
    public player:Node = null;
    StartPointData:StartPoint[] = [];
    TPPointData:TPPoint[] = [];
    public NPC:NPC[] = []
    map1:string = ""
    name1:string = ""
    onLoad(){
        /*this.node.on('switchMap', (eventData) => {
            this.map1 = eventData.map
            this.name1 =  eventData.name
            // 在这里可以使用参数进行进一步操作
        })*/
      // 在其他的脚本中// 根据常驻节点的名称查找它
      const mapdata:Node = find("mapdata");
     
    var component = mapdata.getComponent ('mapdata'); // 根据常驻节点上的脚本组件的名称获取它的引用
    this.name1 = component.getName(); // 调用 component 的 getName 方法
    this.map1 = component.getMap();
        
      
       

       

    }
     start() {
        if(!this.map1)
        {
            this.map1 = "door"
            this.name1 = "dongmen"
        }
        resources.load('map/map/'+this.map1, TiledMapAsset, (err, tiledMapAsset) => {
            if (err) {
                error(err);
                return;
            }
            
            this.map.tmxAsset = tiledMapAsset
            let p = PhysicsSystem2D.instance
            p.enable = true;
            this.map.se
            this.initmap()
        })
    }

    initmap()
    {
        this.setNPC()
        this.settensor()
        let p = PhysicsSystem2D.instance
        p.enable = true;
        let node = this.map.node.getChildByName('1');
      
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
                node.setPosition(birthpoint.x,birthpoint.y)
            
           

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
            body.group = 4;
            let collider = node.addComponent(BoxCollider2D);
            // 设置碰撞组件的大小和偏移量
            collider.size = size(object.width, object.height);
            collider.offset = v2(object.width / 2, object.height / 2);
            collider.group = 4;
            
        }
        console.log(PhysicsGroup)
    }
    settensor()
    {
        // 从对象层中获取起始点数据
const start = this.map.getObjectGroup('sensor');
const birthpoints = start.getObjects();


// 遍历起始点数据
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
    sensorCollider.offset = v2(birthpoint.width / 2, birthpoint.height / 2);
            sensorCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            body.enabledContactListener = true;
    // 添加碰撞事件，以侦听与玩家的接触
    /*sensorCollider.on(Contact2DType.BEGIN_CONTACT, (selfCollider:Collider2D, otherCollider:Collider2D,contact:IPhysics2DContact | null)=>{
        console.log('ok')
    }, this);*/

    // 将从对象层中读取的数据附加到节点，以在事件处理程序中使用
    sensorNode.name = birthpoint.name;
    
    
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
                console.log(prefab)
            
                // 预制体加载成功后，可以将其实例化并添加到场景中
                let  node = instantiate(prefab);
                // 可以设置节点的位置等属性
                // 添加到场景
                let object = NPC[i];
                this.map.node.addChild(node);
                node.name = NPC[i].name;
                let y = this.map.getMapSize().height * this.map.getTileSize().height - object.offset.y - object.height;
                node.setPosition(object.offset.x, y);
            });
        }
    }
}


onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    // 只在两个碰撞体开始接触时被调用一次
    for(var i =0 ; i < this.TPPointData.length ; i++)
    {
        if(this.TPPointData[i].name == selfCollider.node.name)
        {
            let p = PhysicsSystem2D.instance
            p.enable = false;
            this.switchMap(this.TPPointData[i].map,this.TPPointData[i].name)
        }
    }
}


    
switchMap(map:string,name:string)//切换地图
{
    /*director.preloadScene('main')
    this.node.off('switchMap')
    const eventData = {
        map: map,
        name: name,
    };
    this.map.node.emit('switchMap',eventData)*/
    const mapdata:Node = find("mapdata");
    var component = mapdata.getComponent ('mapdata'); 
    
     component.setName(name); // 调用 component 的 getName 方法
     component.setMap(map);
director.loadScene('main',() => {
    // 在目标场景加载后，将参数传递给目标场景
  
   
})


// 加载新地图
/*resources.load('map/map/'+map, TiledMapAsset, (err, tiledMapAsset) => {
    if (err) {
        error(err);
        return;
    }
        this.map.tmxAsset = tiledMapAsset
    
    
})*/


}

    update(deltaTime: number) {
        
    }

}


