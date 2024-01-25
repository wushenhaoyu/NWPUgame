import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('home')
export class home extends Component 
{
    @property(Node)
    public startbtn: Node = null;

    @property(Node)
    public resumebtn: Node = null;

    @property(Node)
    public creditbtn: Node = null;

    @property(Node)
    public settingsbtn: Node = null;

    @property(Node)
    public settingsWindow: Node = null;

    start() {
        this.startbtn.on(Node.EventType.TOUCH_END, this.startgame, this);
        this.resumebtn.on(Node.EventType.TOUCH_END, this.resumegame, this);
        this.creditbtn.on(Node.EventType.TOUCH_END, this.showcredit, this); 
        this.settingsbtn.on(Node.EventType.TOUCH_END, this.showsettings, this);
    }

    update(deltaTime: number) {
        if(this.settingsWindow.active)
        {
            console.log(this.settingsWindow.position, this.settingsbtn.position)
        }
    }

    startgame()
    {

        director.loadScene('first', () => {});

    }

    resumegame()
    {

    }

    showcredit()
    {

    }

    showsettings()
    {
        this.settingsWindow.active = true;
        console.log("settings")
    }
}


