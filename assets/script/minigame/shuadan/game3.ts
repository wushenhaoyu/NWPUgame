import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game3')

export class game3 extends Component {

    @property(Node)
    public manager: Node = null

    @property(Node)
    public figures: Node = null

    @property(SpriteFrame)
    public good: SpriteFrame = null

    @property(SpriteFrame)
    public bad: SpriteFrame = null

    goodFigure: number = null;

    MAXSCORE: number = 20;

    currentScore: number = null;

    start() {

        const figureNodes = this.figures.children
        figureNodes.forEach((figure) => {
            figure.on(Node.EventType.TOUCH_START, () => {
                this.figureHandler(figure.getSiblingIndex())
            })
        })

    }

    protected onEnable(): void {
        this.currentScore = 0
        this.changeFigure()
    }

    update(deltaTime: number) {
        
    }

    changeFigure() {

        const randomNumber = Math.floor(Math.random() * 4)
        this.goodFigure = randomNumber

        this.figures.children.forEach((figure, index) =>{

            if(index === this.goodFigure)
            {

                figure.getComponent(Sprite).spriteFrame = this.good

            }
            else
            {

                figure.getComponent(Sprite).spriteFrame = this.bad
                    
            }

        })

    }

    figureHandler(index: number)
    {

        if(index === this.goodFigure)
        {
            //good
            console.log("good")
            this.currentScore ++
            if(this.currentScore >= this.MAXSCORE)
            {
                this.manager.emit("gameEnd", "win")
                return
            }

            this.changeFigure()
            return
            
        }

        //bad
        console.log("bad")
        this.manager.emit("gameEnd", "lose")

    }
}


