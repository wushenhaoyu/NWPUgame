export class playerData{
    money:number  //钱
    grade:number    //学分
    energy:number 
    cheated:number //被骗数
    constructor(money:number = 3000 ,grade:number = 0,energy:number = 100,cheated:number = 0)
    {
        this.money = money
        this.grade = grade
        this.energy = energy
        this.cheated = cheated
    }

}