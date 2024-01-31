import { _decorator, Component, EventTouch, instantiate, Node, Prefab, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game1')
export class game1 extends Component {

    @property(Prefab)
    public receipt: Prefab = null;

    @property(Node)
    public manager: Node = null

    score: number = null;

    MAXSCORE:number = 10; // 设置最大分数

    receiptNode: Node = null; // 用于存储生成的receipt节点

    isDragging: boolean = false; // 用于判断是否正在拖拽

    start() {

    }

    protected onLoad(): void {
        
        this.generateReceipt()  //generate first receipt
        this.score = 0; // 初始化分数为0
    }

    update(deltaTime: number) {

        if(this.receiptNode.position.y < -100)              //if the reciept is lower than y = - 100
        {

            this.dropReceipt(this.receiptNode)              //drop receipt animation
            this.score += 1                                 //add one score
            if(this.score > this.MAXSCORE)
            {

                this.node.destroyAllChildren()              //delete all receipt
                this.manager.emit('gameEnd', this.score)    //tell manager end the game
                return

            }
            console.log("score: " + this.score);            
            this.generateReceipt();                         //regenerate a new receipt

        }
        
    }

    onTouchMove(event: EventTouch)
    {
        if(this.isDragging)
        {
            
            // 获取触摸位置
            let delta = event.getUIDelta();             //get 相对位置
            const dy = delta.y;
    
            const x = this.receiptNode.position.x
            const y = this.receiptNode.position.y
    
            this.receiptNode.setPosition(x, y + dy, 0); // 设置节点位置

        }
    }

    onTouchStart()
    {

        this.isDragging = true

    }

    onTouchEnd()
    {

        this.isDragging = false

    }

    generateReceipt()
    {
        this.receiptNode = instantiate(this.receipt);
        this.node.addChild(this.receiptNode);
        this.receiptNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.receiptNode.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.receiptNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        tween(this.receiptNode)
            .to(0.1, {position: v3(this.receiptNode.position.x, this.receiptNode.position.x - 100, 0)})
            .start()
    }

    dropReceipt(oldReceipt: Node)
    {

        this.isDragging = false 
        tween(oldReceipt)
            .to(0.1, {position: v3(oldReceipt.position.x, -700, 0)})
            .start()

    }

}


