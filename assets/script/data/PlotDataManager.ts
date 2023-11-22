
export default class PlotDataManager {
    private static instance: PlotDataManager;
    public plotdata:{
        dongmen:{
            menwei:{
                plot:number
                dialogue:number
            }
        }
    }
    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.plotdata = {
        dongmen: {
            menwei: {
                plot: 0, // 初始值
                dialogue: 0, // 初始值
            },
        },
        }
    }

    public static getInstance(): PlotDataManager {
        if (!PlotDataManager.instance) {
            PlotDataManager.instance = new PlotDataManager();
        }
        return PlotDataManager.instance;
    }

    
}
