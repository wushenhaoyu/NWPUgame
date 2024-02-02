import { _decorator, Component, Label, Node, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game2')
export class game2 extends Component {

    @property(Node)
    public manager: Node = null;

    @property(Node)
    public calculator: Node = null;

    @property(Node)
    public modelBoard: Node = null;

    @property(Node)
    public answerBoard: Node = null;

    playerText = "";
    
    MAXNUMBER = 5;

    modelAnswer: number = null;

    start() {

        const buttons = this.calculator.children
        buttons.map((button) => {

            if(button.name != "del" && button.name != "ent")
            {

                button.on(Node.EventType.TOUCH_END, () => {
                    // console.log(button.name);
                    this.playerText += button.name;
                    this.answerBoard.getChildByName("Label").getComponent(Label).string = this.playerText;
                })

            }
            else if(button.name == "del")
            {
                button.on(Node.EventType.TOUCH_END, () => {
                    if(this.playerText.length > 0)
                    {
                        this.playerText = this.playerText.substring(0, this.playerText.length - 1);
                        this.answerBoard.getChildByName("Label").getComponent(Label).string = this.playerText;
                    }
                })
            }
            else if(button.name == "ent")
            {
                button.on(Node.EventType.TOUCH_END, () => {
                    if(this.playerText.length > 0)
                    {
                        if(this.playerText == this.modelAnswer.toString())
                        {
                            //win
                            this.manager.emit("gameEnd", "win")
                        }
                        else
                        {
                            //lose because of wrong answer
                            this.manager.emit("gameEnd", "lose")
                        }
                    }
                })
            }
        })

    }

    protected onEnable(): void {

        this.modelAnswer = Math.floor(Math.random() * 9 * Math.pow(10, this.MAXNUMBER)) + Math.pow(10, this.MAXNUMBER)
        this.modelBoard.getChildByName("Label").getComponent(Label).string = this.modelAnswer.toString();
    }

    protected onDisable(): void {
        
        this.modelBoard.getChildByName("Label").getComponent(Label).string = "";

        this.answerBoard.getChildByName("Label").getComponent(Label).string = "";

        this.playerText = "";

        this.modelAnswer = null

    }

    update(deltaTime: number) {
        
    }
}


