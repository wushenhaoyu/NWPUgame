
export default class PlotDataManager {
    private static instance: PlotDataManager;
    public plotdata:{
        dongmen:{
            menwei:{
                plot:number
                dialogue:number
            }
        }
        d100:{
            nvtongxue:{
                plot:number
                dialogue:number
            }
        }
        sushe:{
            shiyou:{
                plot: number,
                dialogue:number,
            }
        },
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
            d100:{
                nvtongxue:{
                    plot:0,
                    dialogue:0
                }
            },
            sushe:{
                shiyou:{
                    plot: 0,
                    dialogue:0,
                }
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
