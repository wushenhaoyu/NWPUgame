# NWPUgame
写了第一托大规模的屎给自己尝尝
备忘录：遇到tiled显示偏移问题首先修改为none，每个图片源文件都要修改
![Alt text](image.png)

如何部署剧情？
1.在plot/plot下写一个json文件
2.写一个对应名称的ts脚本到plot位置挂载写上相应逻辑
3.在plotDataManager中写相应记录
4.在plotDataControl中写剧情触发


部署联系人剧情
1.写json文件在dialogue/Phone
2.写对应名称ts脚本（放在scirpt/main/messgae中）并且变为预制体放在phone/messgae/friend
3.在plotDataManager中写相应的记录 可以是plot和index dialogue可能没用
