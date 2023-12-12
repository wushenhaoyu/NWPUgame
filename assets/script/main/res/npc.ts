import { _decorator, Component, Node, Prefab,instantiate } from 'cc';
const { ccclass, property } = _decorator;


@ccclass
export default class npc extends Node{
    // 在这里可以添加你自己的属性和方法
    model:Node = null;

    // 构造函数
    constructor() {
        super();
    }

    initnpc(pre: Prefab){
        this.model = instantiate(pre);
        this.addChild(this.model);


    }

    
    
}
