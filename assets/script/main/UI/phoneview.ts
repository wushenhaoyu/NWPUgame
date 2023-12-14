import { _decorator, Component, Node, ScrollView, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('phoneview')
export class phoneview extends Component {

    @property({type: Node})
    public page: Node = null;

    private scrollingSpeed: number = 0;
    private scrollView: ScrollView = null;
    private maxScrollOffset: number = 0;

    private previousX: number = 0;

    private currentPage: number = 1;
    private maxPage: number = 2;



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

            console.log('x:', -this.previousX, 'limit:', 195);
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
                console.log("scroll to 1")
                break;

            case 2:
                
                this.scrollView.scrollTo(new Vec2(0, 1), 0.1);
                console.log("scroll to 2")
                break;

            // case 2:
            //     this.scrollView.scrollTo(this.maxScrollOffset * 2, 0, 0.5);
            //     break;

            // case 3:

        }

    }

    dealWithApp(e,c)
    {

        console.log(c);
    }

}


