import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, Prefab, random, RigidBody2D, v2 } from 'cc';
import { daka_GameManager } from './daka_GameManager';
const { ccclass, property } = _decorator;

@ccclass('daka_maker')
export class daka_maker extends Component {
    @property({type:Prefab})
    public item:Prefab = null
    @property({type:Prefab})
    public block1:Prefab = null
    @property({type:Prefab})
    public block2:Prefab = null
    @property({type:Prefab})
    public person:Prefab = null
    @property({type:Node})
    public collider:Node = null;
    @property({type:daka_GameManager})
    public gamemanager:daka_GameManager = null;
    start() {
        this.personInit()
    }
    /**********************************     item     ************************************ */
    initItem()
    {
        let node = instantiate(this.item);
        this.collider.addChild(node)
        let box = node.getComponent(BoxCollider2D)
        box.on(Contact2DType.BEGIN_CONTACT,this.itemBegin,this)
        node.getComponent(RigidBody2D).linearVelocity = v2(0,-this.gamemanager.currentGameSpeed)
        box.tag = this.whichItem(this.GetRandomNum(0,100));
        
    }

   itemBegin(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
   {
    let node = selfCollider.node;
    this.gamemanager.node.emit('item',selfCollider.tag)
    let rigidBody = node.getComponent(RigidBody2D);
    if (rigidBody) {
        rigidBody.enabled = false;
        rigidBody.destroy();
    }
    selfCollider.destroy();
    node.destroy();
    
   }
   whichItem(tag:number)
   {
    if(0<=tag&&tag<10)
    {
        return 1;
    }
    else if(10<=tag&&tag<50)
    {
        return 2;
    }
    else if(50<=tag&&tag<=100)
    {
        return 3;
    }
   }
    /**********************************     item     ************************************ */


    /**********************************     block1     ************************************ */

    block1Init()
    {
        let node = instantiate(this.block1);
        this.collider.addChild(node)
        let box = node.getComponent(BoxCollider2D)
        node.getComponent(RigidBody2D).linearVelocity = v2(0,-this.gamemanager.currentGameSpeed)
        box.on(Contact2DType.BEGIN_CONTACT,this.blockBegin,this)
        box.on(Contact2DType.END_CONTACT,this.blockEnd,this)
    }

    blockBegin()
    {      
        this.gamemanager.node.emit('blockBegin')
    }
    blockEnd()
    {
        this.gamemanager.node.emit('blockEnd')
    }
    /**********************************     block1     ************************************ */
    /**********************************     block2     ************************************ */
    block2Init()
    {
        let node = instantiate(this.block2);
        this.collider.addChild(node)
        let box = node.getComponent(BoxCollider2D)
        node.getComponent(RigidBody2D).linearVelocity = v2(0,-this.gamemanager.currentGameSpeed)
        box.on(Contact2DType.BEGIN_CONTACT,this.blockBegin,this)
        box.on(Contact2DType.END_CONTACT,this.blockEnd,this)
    }
    /**********************************     block2     ************************************ */
    /**********************************     person     ************************************ */
    personInit()
    {
        let node = instantiate(this.person);
        this.collider.addChild(node)
        let box = node.getComponent(BoxCollider2D)
        node.getComponent(RigidBody2D).linearVelocity = v2(0,-this.gamemanager.currentGameSpeed)
        box.on(Contact2DType.BEGIN_CONTACT,this.personBegin,this)
    }
    personBegin()
    {
        this.gamemanager.node.emit('personBegin')
    }

    /**********************************     person     ************************************ */
   public GetRandomNum(Min, Max):number {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

    update(deltaTime: number) {
    }
}




