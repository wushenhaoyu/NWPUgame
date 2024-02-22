import { _decorator, Component, Node,director, find, AnimationClip, AnimationComponent } from 'cc';
const { ccclass, property } = _decorator;
import PlayerDataManager  from '../../data/PlayerDataManager';
const playerDataManager = PlayerDataManager.getInstance();
@ccclass('player')
export class player extends Component {
    @property({type:Node})
    public joystick:Node = null;
    @property({type:AnimationClip})
    public stand_up:AnimationClip = null;
    @property({type:AnimationClip})
    public stand_left:AnimationClip = null;
    @property({type:AnimationClip})
    public stand_down:AnimationClip = null;
    @property({type:AnimationClip})
    public stand_right:AnimationClip = null;
    @property({type:AnimationClip})
    public walk_up:AnimationClip = null;
    @property({type:AnimationClip})
    public walk_left:AnimationClip = null;
    @property({type:AnimationClip})
    public walk_down:AnimationClip = null;
    @property({type:AnimationClip})
    public walk_right:AnimationClip = null;
    @property({type:AnimationComponent})
    public animation:AnimationComponent = null;
    start() {
      if(playerDataManager.getGender())
        { 
      for(var i = 0 ; i < this.animation.clips.length ; i++)
      {
          this.animation.removeClip(this.animation.clips[i],true)
      }
      this.animation.addClip(this.stand_up,'stand_up');
      this.animation.addClip(this.stand_right,'stand_right');
      this.animation.addClip(this.stand_left,'stand_left');
      this.animation.addClip(this.stand_down,'stand_down');
      this.animation.addClip(this.walk_up,'walk_up');
      this.animation.addClip(this.walk_right,'walk_right');
      this.animation.addClip(this.walk_left,'walk_left');
      this.animation.addClip(this.walk_down,'walk_down');

    }
  }
    

    update(deltaTime: number) {
        
    }
}


