import { _decorator, Component, game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gamesManager')
export class gamesManager extends Component {

    @property(Node)
    public homeScene = null;

    @property(Node)
    public game1Scene = null;

    @property(Node)
    public game2Scene = null;

    @property(Node)
    public game3Scene = null;

    @property(Node)
    public timeBar = null;

    currentScene: Node = null; //current displaying node

    gameCount: number; //how many game did the player finish

    MAXGAMECOUNT: number = 10; //maximum game the player can finish

    MAXGAMESCENE: number = 3; //maximum game scene the player can go to

    score: number; //current score


    start() {

        this.currentScene = this.homeScene //set the home scene as the current scene to display at the start of the game
        this.gameCount = 0
        this.score = 0

        this.timeBar.on('timeBarEnd', this.timeBarEndHandler, this)

    }

    update(deltaTime: number) {
        
    }

    timeBarEndHandler()
    {
        //lose
        console.log("you lose")
        this.changeScene(this.homeScene) //change the game to the home scene
    }

    gameEndHandler()
    {
        //win
        console.log("you win")
        this.score += 100
        if(this.gameCount < this.MAXGAMECOUNT)
        {

            this.gameCount++;
            this.changeScene(this.pickRandomGame()); //change the game to a random new game
            return

        }

        this.changeScene(0); //change the game to the home scene

    }

    pickRandomGame()
    {

        return Math.floor(Math.random() * this.MAXGAMESCENE); //returns a random number between 0 and 2

    }

    changeScene(scene: number) {

        switch(scene)
        {

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
}


