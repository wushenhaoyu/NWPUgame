import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChatGPTControl')
export class ChatGPTControl extends Component {
    start() {

    }

    web(){
        
        var data = {
        }; 

        fetch('https://nwpu.space/test/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(value => console.log(value))
        .catch((error) => console.error('Error:', error));
    }
    update(deltaTime: number) {
        
    }
}


