import { _decorator, Component, Node, ScrollView, Vec2 ,tween ,v3 ,Widget, UITransform, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('phoneview')
export class phoneview extends Component {

    @property({type: Node})
    public page: Node = null;
    @property({type:Node})
    public phone: Node = null;
    private scrollingSpeed: number = 0;
    private scrollView: ScrollView = null;
    private maxScrollOffset: number = 0;

    private previousX: number = 0;

    private currentPage: number = 1;
    private maxPage: number = 2;
    private leftOffset: number = 0;
    @property({type: Node})//广告
    public window1: Node = null;
    @property({type: Node})
    public window2: Node = null;//消息
    whichWindow:number = 0;//代表是哪个窗口打开了？


    start() {
        this.scrollView = this.node.getComponent(ScrollView);
        this.maxScrollOffset = this.scrollView.getMaxScrollOffset().x
        this.node.on(Node.EventType.TOUCH_END, this.scrollEnded, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.scrollEnded, this);
    }

    update(deltaTime: number) {

        if (this.scrollView.isScrolling()) {
            this.scrollingSpeed = (this.scrollView.getScrollOffset().x - this.previousX) / deltaTime;
            this.previousX = this.scrollView.getScrollOffset().x;

        }
        //195
    }

    scrollEnded()
    {

        if(this.scrollingSpeed > 350)
        {
            
            this.scrollToPage(this.currentPage + 1 > this.maxPage ? this.maxPage : this.currentPage + 1)
            
        }
        else if(this.scrollingSpeed < -350)
        {
            
            this.scrollToPage(this.currentPage - 1 < 1 ? 1 : this.currentPage - 1)
            
        }
        else if(-this.previousX >= this.maxScrollOffset / 2)
        {

            this.scrollToPage(this.currentPage - 1 < 1 ? 1 : this.currentPage - 1)

        }
        else if(-this.previousX < this.maxScrollOffset / 2)
        {

            this.scrollToPage(this.currentPage + 1 > this.maxPage ? this.maxPage : this.currentPage + 1)
        
        }

        this.previousX = 0;
        this.scrollingSpeed = 0;
        

    }

    scrollToPage(page: number)
    {

        switch(page){

            case 1:
                
                this.scrollView.scrollTo(this.scrollView.getMaxScrollOffset(), 0.1);
                break;

            case 2:
                
                this.scrollView.scrollTo(new Vec2(0, 1), 0.1);
                break;

            // case 2:
            //     this.scrollView.scrollTo(this.maxScrollOffset * 2, 0, 0.5);
            //     break;

            // case 3:

        }

    }
    back(){
        this.phone.active = false;
    }
    index(){
       this.hideWindow()
    }

    dealWithApp(e,customEventData)
    {
        
        const numericValue = parseInt(customEventData);
        if(this.whichWindow == 0 )
        {
            this.whichWindow = numericValue;
            const node =this.node.getParent();

            // 获取节点上的 Widget 组件
                const widget = node.getComponent(Widget);
                tween(widget)
                    .to(0.6, { horizontalCenter:-400 },{onComplete: () => {
                        this.showWindow()
                    }}) 
                    .start();
        }
    }
    showWindow()
    {
        switch(this.whichWindow)
        {
            case 1:
                this.window1.active = true;
                tween(this.window1.getComponent(UIOpacity))
                .to(0.4,{opacity: 255})
                .start()
                break;
            case 2:
                this.window2.active = true;
                tween(this.window2.getComponent(UIOpacity))
                .to(0.4,{opacity: 255})
                .start()
                break;


        }
    }
    hideWindow()
    {
        switch(this.whichWindow)
        {
            case 1:
                tween(this.window1.getComponent(UIOpacity))
                .to(0.4,{'opacity':0},
                {
                    onComplete: () =>{
                        this.window1.active = false;
                       const widget =this.node.getParent().getComponent(Widget);
                       tween(widget)
                       .to(0.6, { horizontalCenter:0})
                       .start();
                    }
                }).start();
                this.whichWindow = 0;
                break;
            case 2:
                tween(this.window2.getComponent(UIOpacity))
                .to(0.4,{'opacity':0},
                {
                    onComplete: () =>{
                        this.window2.active = false;
                       const widget =this.node.getParent().getComponent(Widget);
                       tween(widget)
                       .to(0.6, { horizontalCenter:0})
                       .start();
                    }
                }).start();
                this.whichWindow = 0;
                break;


        }
    }
}



