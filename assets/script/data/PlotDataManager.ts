
export default class PlotDataManager {
    private static instance: PlotDataManager;
    public plotdata:{
        dongmen:{
            menwei:{
                plot:number
                dialogue:number
            },
            student1:{
                plot:number
                dialogue:number
            },
            suguanayi:{
                plot:number,
                dialogue:number
            }
        }
        d100:{
            nvtongxue:{
                plot:number
                dialogue:number
            },
            student3:{
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
        tushuguan:{
            student2:{

                plot: number,
                dialogue:number,

            }
        },
        dachao:{

            xiaoshouyuan:{

                plot: number,
                dialogue:number,

            }

        },
        Plot:{
            Plot1_1:{
                plot: number,
                dialogue:number,
            },
            water:{
                plot: number,
                dialogue:number,
            },
            schoolcard:{
                plot: number,
                dialogue:number,
            },
            credit:{
                plot:number,
                dialogue:number
            }
        },
        aoxiangxueshengzhongxin:{
            xiaoyuanka:{

                plot: number,
                dialogue:number,

            }
        },
        Phone:{
            kuaidi:{

                plot: number,
                dialogue:number,
                index:number

            }
        }
    }
    public friendlist:string[]=['kuaidi']
    private constructor() {
        // 私有构造函数，防止外部直接实例化
        this.plotdata = {
            dongmen: {
                menwei: {
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                student1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                suguanayi:{
                    plot:0,
                    dialogue:0
                }
            },
            d100:{
                nvtongxue:{
                    plot:0,
                    dialogue:0
                },
                student3:{
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
            tushuguan:{
                student2:{
    
                    plot: 0,
                    dialogue:0,
    
                }
            },
            dachao:{

                xiaoshouyuan:{

                    plot: 0,
                    dialogue: 0,

                }

            },
            Plot:{
                
                Plot1_1:{
                    plot: 0,
                    dialogue:0,
                },
                water:{
                    plot: 0,
                    dialogue:0,
                },
                schoolcard:{
                    plot: 0,
                    dialogue:0,
                }
            },
            aoxiangxueshengzhongxin:{
                xiaoyuanka:{
    
                    plot: 0,
                    dialogue:0,
    
                }
            },
            Phone:{

                kuaidi:{

                    plot: 0,
                    dialogue:0,
                    index:0

                }
            }
        }
    }

    public static getInstance(): PlotDataManager {
        if (!PlotDataManager.instance) {
            PlotDataManager.instance = new PlotDataManager();
        }
        return PlotDataManager.instance;
    }

    
}
