import { _decorator, Component, instantiate, JsonAsset, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { friend } from '../res/friend';
import PlotDataManager from '../../data/PlotDataManager';
import { message_picture } from '../res/message_picture';
import { message_text } from '../res/message-text';
const { ccclass, property } = _decorator;
const plotDataManager = PlotDataManager.getInstance();

interface PhonePlotContainer
{
    name: string,
    chatData: Chatdata[]
}

interface ChatDialogue
{
    type: number,           //0 words, 1 image
    content: string,        //chat content
    Speaker: boolean        //0 player, 1 npc
}

interface Chatdata
{
    id: number,             //id
    type: number,           //have choice?
    choice: string[],       //choices
    plotjump: number[],     //where choices lead to
    parent: number,         //what leads to this plot
    chat: ChatDialogue[]    //dialogues
}

@ccclass('messageControl')
export class messageControl extends Component {
    @property({type:Prefab})
    public friend:Prefab = null;
  //  @property({type:friend})
 //   public friendScript:friend = null;
    @property({type:Prefab})
    public messageTextFromOther:Prefab = null;
    @property({type:Prefab})
    public messageTextFromPlayer:Prefab = null;
    @property({type:Prefab})
    public messagePicFromOther:Prefab = null;
    @property({type:Prefab})
    public messagePicFromPlayer:Prefab = null;

    @property({type:Node})
    public friendListContent: Node = null

    @property({type:Node})
    public chatListContent: Node = null
    @property({type:Node})
    select1:Node = null;
    @property({type:Node})
    select2:Node = null;
    @property({type:Node})
    select3:Node = null;
    public  currentChatData:Chatdata = null;//当前的一小段对话
    public currentMessageName:string = "";//联系人json文件名称
    public currentChat:PhonePlotContainer = null;//json读的东西存起来
    public currentJump:number = 0;//有需要就转为0，1，2，没有就保持为0
    start() {

        for(var i = 0 ; i < plotDataManager.friendlist.length ; i ++)
        {
            let newNode = instantiate(this.friend);
            this.friendListContent.addChild(newNode);           //add friend node to friend list(UI)
            var friendScript =  newNode.getComponent(friend);
            friendScript.init(plotDataManager.friendlist[i]);   //insert datas to the new friend node
            const plotName = plotDataManager.friendlist[i];
            newNode.on(Node.EventType.TOUCH_END, () => this.switchMessage(plotName), this)
     
            resources.preload(`dialogue/Phone/${plotName}`, JsonAsset, (err, jsonAsset) => 
            {
                if (err) 
                {
                    console.error(err.message || err);
                    return;
                }
     
                resources.load(`dialogue/Phone/${plotName}`, JsonAsset, (err, jsonAsset) => 
                {            
                    if (err) 
                    {
                        console.error(err.message || err);
                        return;
                    }
     
                    const json = jsonAsset.json as PhonePlotContainer;
                    json.chatData.forEach((chatdata) => 
                    {
                        chatdata.chat.forEach((chatdialogue) => 
                        {
                            if (chatdialogue.type === 1) 
                            {
                                console.log("loadededededed")
                                resources.preload(`${chatdialogue.content}/spriteFrame`, SpriteFrame);
                            }
                        });
                    });
                });
            })
            
        
        }
     
     }




    switchMessage(name: string) {

        this.chatListContent.active = false; 
        this.currentMessageName = name;
        this.chatListContent.destroyAllChildren();
        const plot = plotDataManager.plotdata.Phone[name].plot;
        const dialogue = plotDataManager.plotdata.Phone[name].dialogue;
        resources.load(`dialogue/Phone/${name}`, JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.error(err.message || err);
            }
        
            this.currentChat= jsonAsset.json as PhonePlotContainer;
            const allChatDatas = [];
            this.currentChatData = this.currentChat.chatData[plot];
            
        
            while(this.currentChatData.parent !== null){
                this.currentChatData = this.currentChat.chatData[this.currentChatData.parent];
                allChatDatas.unshift(this.currentChatData);
            }
        
            Promise.all(allChatDatas.map((chatdata, index) => {
                return this.showMessage(this.currentChat.name, chatdata);
            })).then(() => {
                this.chatListContent.active = true; 
            });
        });

        
    }

    showMessage(name: string, chatdata: Chatdata): Promise<void>
    {
        const messages = chatdata.chat
        const promises = messages.map((message, index) => {
            return new Promise<void>((resolve, reject) => {
                console.log(message)
                const type = message.type
                const speaker = message.Speaker
                const content = message.content
                this.showSingleMssgae(type,speaker,name,content)
                resolve()
            })
        })

        return Promise.all(promises).then(() => undefined);
    }

    showSingleMssgae(type:number,speaker:boolean,name:string,content:string)
    {
        let chatNode: Node = null
        if(type == 1)
        {
            

                if(speaker == true)  //npc
                {
                    chatNode = instantiate(this.messagePicFromOther)
                    chatNode.getChildByName("name").getComponent(Label).string = name
                    chatNode.getComponent(message_picture).init(name,content)
                }
                else
                {
                    chatNode = instantiate(this.messagePicFromPlayer)
                    chatNode.getComponent(message_picture).init('单大狗',content)
                }

                this.chatListContent.addChild(chatNode)
            
        }
        else
        {
            if(speaker == true)
            {
                chatNode = instantiate(this.messageTextFromOther)
                chatNode.getComponent(message_text).init(name,content)
            }
            else
            {
                chatNode = instantiate(this.messageTextFromPlayer)
                chatNode.getComponent(message_text).init('单大狗',content)
            }
            this.chatListContent.addChild(chatNode)
        }
    }
    showCurrentMessage()
    {
        for(var i = 0 ; i < plotDataManager.plotdata.Phone[this.currentMessageName].index; i++)
        {
            let data = this.currentChatData
            this.showSingleMssgae(data.chat[i].type,data.chat[i].Speaker,this.currentMessageName,data.chat[i].content)
        }

    }
    showCurrentMessageOneByOne()//一个一个地
    {
        this.currentChatData
        let index = plotDataManager.plotdata.Phone[this.currentMessageName].index
        if(index >= this.currentChatData.chat.length )
        {
            if(this.currentChatData.type == 1)
            {
                 plotDataManager.plotdata.Phone[this.currentMessageName].plot = this.currentChatData.plotjump[this.currentJump]
                 plotDataManager.plotdata.Phone[this.currentMessageName].index = 0;
                 this.currentChatData =  this.currentChat.chatData[plotDataManager.plotdata.Phone[this.currentMessageName].plot];
                 this.currentJump = 0;
                 this.showCurrentMessageOneByOne();
            }else{
                //等待别的脚本操作plotdatamanager
                 return;
            }
            return
        }
        if( index == this.currentChatData.chat.length)
        {
            if(this.currentChatData.choice.length != 0)
            {
                switch(this.currentChatData.choice.length)
                {
                    case 3 :
                        this.select3.active = true;
                        this.select3.getComponentInChildren(Label).string = this.currentChatData.choice[2];
                    case 2 :
                        this.select2.active = true;
                        this.select3.getComponentInChildren(Label).string = this.currentChatData.choice[1];
                    case 1 :
                        this.select1.active = true;
                        this.select3.getComponentInChildren(Label).string = this.currentChatData.choice[0];
                }
            }
            else{
                plotDataManager.plotdata.Phone[this.currentMessageName].index++
                this.showCurrentMessageOneByOne()
            }
        }
        else{
            setTimeout(() => {
                this.showSingleMssgae(this.currentChatData.chat[index].type,this.currentChatData.chat[index].Speaker,this.currentMessageName,this.currentChatData.chat[index].content)
                this.showCurrentMessageOneByOne()
                plotDataManager.plotdata.Phone[this.currentMessageName].index++
            }, 3000);
        }
    }
    dealWithChioce(event,custom:string)
    {
        switch(custom)
        {
            case "1"://选择了1
                console.log('选择了1')
                this.currentJump = 0;
                break;
            case "2"://选择了2
                console.log('选择了2')
                this.currentJump = 1;
                break;
            case "3"://选择了3
                console.log('选择了3')
                this.currentJump = 2;
                break;
        }
        this.select1.active = false;
        this.select2.active = false;
        this.select3.active = false;
        plotDataManager.plotdata.Phone[this.currentMessageName].index++
        this.showCurrentMessageOneByOne()
    }
    update(deltaTime: number) {
        
    }
}


/*if(this.currentChatData != null)
        {
            if(plotDataManager.plotdata.Phone.kuaidi.index >= this.currentChatData.chat.length)//到头了，暂停或者出选项
            {
                
            }else
            {
                this.scoend += deltaTime;
                if(this.scoend >= this)
            }
        }*/