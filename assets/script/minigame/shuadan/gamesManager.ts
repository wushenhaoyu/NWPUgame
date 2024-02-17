import { _decorator, Component, game, Node, NodeEventType, toDegree } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gamesManager')
export class gamesManager extends Component {

    @property(Node)
    public homeScene = null;

    @property(Node)
    public scoreboard = null

    @property(Node)
    public game1Scene = null;

    @property(Node)
    public game2Scene = null;

    @property(Node)
    public game3Scene = null;

    @property(Node)
    public timeBar = null;

    @property(Node)
    public startbtn = null;

    currentScene: Node = null; //current displaying node

    gameCount: number; //how many game did the player finish

    MAXGAMECOUNT: number = 10; //maximum game the player can finish

    MAXGAMESCENE: number = 3; //maximum game scene the player can go to

    score: number; //current score


    start() {

        this.currentScene = this.homeScene //set the home scene as the current scene to display at the start of the game
        this.gameCount = 0
        this.score = 0

        const continueBtn = this.scoreboard.getChildByName("continueBtn")

        this.node.on('timeBarEnd', this.timeBarEndHandler, this)
        this.node.on('gameEnd', this.gameEndHandler, this)
        continueBtn.on(NodeEventType.TOUCH_END, this.continueHandler, this)

        this.startbtn.on(NodeEventType.TOUCH_END, this.startGame, this)

    }

    update(deltaTime: number) {
        
    }

    startGame()
    {

        if(this.gameCount < this.MAXGAMECOUNT)
        {
            this.timeBar.active = true //show the time bar when the game start
            // const gamescene = this.pickRandomGame()
            const gamescene = 2
            console.log(gamescene)
            this.changeScene(gamescene)
        }

    }

    timeBarEndHandler()
    {
        //lose
        this.lose()
    }

    gameEndHandler(state: string)
    {
        //win
        if(state == "win")
        {

            this.win()
            return
        }

        this.lose()



    }

    pickRandomGame()
    {

        return Math.floor(Math.random() * this.MAXGAMESCENE) + 1; //returns a random number between 1 and 3

    }

    changeScene(scene: number) {

        switch(scene)
        {
            case -1:
                this.currentScene.active = false;
                this.scoreboard.active = true
                this.currentScene = this.scoreboard;
                break 
            case 0:
                this.currentScene.active = false;
                this.homeScene.active = true;
                this.currentScene = this.homeScene;
                break; // 0 is home scene
            case 1:
                this.currentScene.active = false;
                this.game1Scene.active = true;
                this.currentScene = this.game1Scene;
                break; // 1 is game 1 scene
            case 2:
                this.currentScene.active = false;
                this.game2Scene.active = true;
                this.currentScene = this.game2Scene;
                break; // 2 is game 2 scene
            case 3:
                this.currentScene.active = false;
                this.game3Scene.active = true;
                this.currentScene = this.game3Scene;
                break; // 3 is game 3 scene

        }

    }

    win()
    {

        console.log("you win")
        this.timeBar.active = false //hide the time bar when the game end
        this.score += 100
        this.gameCount++;
        if(this.gameCount < this.MAXGAMECOUNT)
        {
    
            this.changeScene(-1); //change the game to a random new game
            return
    
        }
    
        this.changeScene(0); //change the game to the home scene

    }

    lose()
    {
        console.log("you lose")
        this.timeBar.active = false //hide the time bar when the game end
        this.changeScene(0) //change the game to the home scene
    }

    continueHandler()
    {

        console.log("continue")
        this.changeScene(this.pickRandomGame())
        this.timeBar.active = true //show the time bar when the game start

    }

    get currentScore()
    {
        return this.score
    }


}


