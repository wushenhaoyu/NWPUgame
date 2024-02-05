import { _decorator, Component, instantiate, JsonAsset, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { friend } from '../res/friend';
import PlotDataManager from '../../data/PlotDataManager';
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

    start() {

        for(var i = 0 ; i < plotDataManager.friendlist.length ; i ++)
        {
            let newNode = instantiate(this.friend);
            this.friendListContent.addChild(newNode);           //add friend node to friend list(UI)
            var friendScript =  newNode.getComponent(friend);
            friendScript.init(plotDataManager.friendlist[i]);   //insert datas to the new friend node
            const plotName = plotDataManager.friendlist[i];
            newNode.on(Node.EventType.TOUCH_END, () => this.switchMessage(plotName), this)
     
            resources.preload(`dialogue/Phone/${plotName}`, JsonAsset, (err) => 
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

    update(deltaTime: number) {
        
    }



    switchMessage(name: string) {

        this.chatListContent.active = false; 

        this.chatListContent.destroyAllChildren();
        const plot = plotDataManager.plotdata.Phone[name].plot;
        const dialogue = plotDataManager.plotdata.Phone[name].dialogue;
        resources.load(`dialogue/Phone/${name}`, JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.error(err.message || err);
            }
        
            const json = jsonAsset.json as PhonePlotContainer;
            const allChatDatas = [];
            let lastChatData = json.chatData[plot];
            allChatDatas.push(lastChatData);
        
            while(lastChatData.parent !== null){
                lastChatData = json.chatData[lastChatData.parent];
                allChatDatas.unshift(lastChatData);
            }
        
            Promise.all(allChatDatas.map((chatdata, index) => {
                return this.showMessage(json.name, chatdata);
            })).then(() => {
                this.chatListContent.active = true; 
            });
        });

        
    }

    // showMessage(name: string, chatdata: Chatdata)
    // {

    //     const messages = chatdata.chat

    //     messages.forEach((message, index) => {

    //         const type = message.type
    //         const speaker = message.Speaker
    //         const content = message.content
    //         let chatNode: Node = null

    //         if(type == 1)
    //         {

    //             resources.load(`${content}`, SpriteFrame, (err, spriteFrame) => {
    //                 if (err) {
                        
    //                 }

    //                 if(speaker == true)  //npc
    //                 {
    //                     chatNode = instantiate(this.messagePicFromOther)
    //                     chatNode.getChildByName("name").getComponent(Label).string = name
    //                 }
    //                 else
    //                 {

    //                     chatNode = instantiate(this.messagePicFromPlayer)
    //                     chatNode.getChildByName("name").getComponent(Label).string = "单大狗"
                        
    //                 }
                    
    //                 chatNode.getChildByName("bg").getChildByName("content").getComponent(Sprite).spriteFrame = spriteFrame
    //                 this.chatListContent.addChild(chatNode)

    //             })


    //         }
    //         else
    //         {
    //             if(speaker == true)
    //             {

    //                 chatNode = instantiate(this.messageTextFromOther)
    //                 chatNode.getChildByName("name").getComponent(Label).string = name

    //             }
    //             else
    //             {

    //                 chatNode = instantiate(this.messageTextFromPlayer)
    //                 chatNode.getChildByName("name").getComponent(Label).string = "单大狗"
                    
    //             }
                
    //             chatNode.getChildByName("bg").getChildByName("content").getComponent(Label).string = content
    //             this.chatListContent.addChild(chatNode)
    //         }

    //     })

    // }

    showMessage(name: string, chatdata: Chatdata): Promise<void>
    {
        const messages = chatdata.chat
        const promises = messages.map((message, index) => {
            return new Promise<void>((resolve, reject) => {
                const type = message.type
                const speaker = message.Speaker
                const content = message.content
                let chatNode: Node = null

                if(type == 1)
                {
                    resources.load(`${content}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                        if (err) {
                            console.error(err.message || err)
                            reject(err)
                            return
                        }

                        if(speaker == true)  //npc
                        {
                            chatNode = instantiate(this.messagePicFromOther)
                            chatNode.getChildByName("name").getComponent(Label).string = name
                        }
                        else
                        {
                            chatNode = instantiate(this.messagePicFromPlayer)
                            chatNode.getChildByName("name").getComponent(Label).string = "单大狗"
                        }

                        chatNode.getChildByName("bg").getChildByName("content").getComponent(Sprite).spriteFrame = spriteFrame
                        this.chatListContent.addChild(chatNode)
                        resolve()
                    })
                }
                else
                {
                    if(speaker == true)
                    {
                        chatNode = instantiate(this.messageTextFromOther)
                        chatNode.getChildByName("name").getComponent(Label).string = name
                    }
                    else
                    {
                        chatNode = instantiate(this.messageTextFromPlayer)
                        chatNode.getChildByName("name").getComponent(Label).string = "单大狗"
                    }

                    chatNode.getChildByName("bg").getChildByName("content").getComponent(Label).string = content
                    this.chatListContent.addChild(chatNode)
                    resolve()
                }
            })
        })

        return Promise.all(promises).then(() => undefined);
    }
}


