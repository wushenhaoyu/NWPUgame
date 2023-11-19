import { _decorator, Component, find, Node,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mapdata')
export class mapdata extends Component {
    public name1:string = "d100"
    public map1:string = "d100"
    onLoad() {
        director.addPersistRootNode (this.node)
    }
    start() {
        
    }
  public  getName()
    {
        return this.name1
    }
   public setName(name:string)
    {
        this.name1 = name
    }
   public getMap()
    {
        return this.map1
    }
   public setMap(map:string)
    {
        this.map1 = map
    }
    

    update(deltaTime: number) {
        
    }
}


