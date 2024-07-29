
export default class PlotDataManager {
    private static instance: PlotDataManager;
    public plotdata:{
        dongmen:{
            menwei:{
                plot:number
                dialogue:number
            },
            kaishi:{
                plot:number
                dialogue:number
            },
            student1:{
                plot:number
                dialogue:number
            },
            guomalu:{
                plot:number
                dialogue:number
            },
            bingpai1:{
                plot:number
                dialogue:number
            },
            hezunjiangjie:{
                plot:number
                dialogue:number
            },
            bingpai2:{
                plot:number
                dialogue:number
            },
            canguan1:{
                plot:number
                dialogue:number
            },
            canguan2:{
                plot:number
                dialogue:number
            },
            canguan3:{
                plot:number
                dialogue:number
            },
            canguan4:{
                plot:number
                dialogue:number
            },
            paizhao:{
                plot:number
                dialogue:number
            },
            jiangjie:{
                plot:number
                dialogue:number
            },
            nvtongxue:{
                plot:number
                dialogue:number
            },
            xuexiaojiangjie:{
                plot:number
                dialogue:number
            },
            diaosujiangjie:{
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
            menwei:{
                plot:number
                dialogue:number
            },
            student1:{
                plot:number
                dialogue:number
            },
            guomalu:{
                plot:number
                dialogue:number
            },
            bingpai1:{
                plot:number
                dialogue:number
            },
            hezunjiangjie:{
                plot:number
                dialogue:number
            },
            bingpai2:{
                plot:number
                dialogue:number
            },
            canguan1:{
                plot:number
                dialogue:number
            },
            canguan2:{
                plot:number
                dialogue:number
            },
            canguan3:{
                plot:number
                dialogue:number
            },
            canguan4:{
                plot:number
                dialogue:number
            },
            paizhao:{
                plot:number
                dialogue:number
            },
            jiangjie:{
                plot:number
                dialogue:number
            },
            xuexiaojiangjie:{
                plot:number
                dialogue:number
            },
            jiaoxicjiangjie:{
                plot:number
                dialogue:number
            },
            jiaoxidjiangjie:{
                plot:number
                dialogue:number
            },
            diaosujiangjie:{
                plot:number
                dialogue:number
            },
            suguanayi:{
                plot:number,
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

            },
            hxtjiangjie:{
                plot: number,
                dialogue:number,
            },
            tuixiao:{
                plot: number,
                dialogue:number,
            },
            baodao:{
                plot: number,
                dialogue:number,
            },
            tushuguanjiangjie:{
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
                isBegin:boolean   //isBegin用来控制这个剧情发生过没有
            },
            water:{
                plot: number,
                dialogue:number,
                isBegin:boolean
            },
            schoolcard:{
                plot: number,
                dialogue:number,
                isBegin:boolean,
                isEnd: boolean
            },
            credit:{
                plot:number,
                dialogue:number,
                isBegin:boolean
            },
            police:{
                plot:number,
                dialogue:number,
                isBegin:boolean
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

            },
            xinyongka:{

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
                kaishi:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                xuexiaojiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                diaosujiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                student1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                guomalu:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                bingpai1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                bingpai2:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan2:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan3:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan4:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                paizhao:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                jiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                nvtongxue:{
                    plot:0,
                    dialogue:0
                },
                hezunjiangjie:{
                    plot:0,
                    dialogue:0
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
                menwei: {
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                xuexiaojiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                diaosujiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                jiaoxidjiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                jiaoxicjiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                student1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                guomalu:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                bingpai1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                bingpai2:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan1:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan2:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan3:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                canguan4:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                paizhao:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                jiangjie:{
                    plot: 0, // 初始值
                    dialogue: 0, // 初始值
                },
                hezunjiangjie:{
                    plot:0,
                    dialogue:0
                },
                suguanayi:{
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
                },
                hxtjiangjie:{
                    plot: 0,
                    dialogue:0,
                },
                tuixiao:{
                    plot: 0,
                    dialogue:0,
                },
                baodao:{
                    plot: 0,
                    dialogue:0,
                },
                tushuguanjiangjie:{
                    plot: 0,
                    dialogue:0,
                },
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
                    isBegin:false
                },
                water:{
                    plot: 0,
                    dialogue:0,
                    isBegin:false
                },
                schoolcard:{
                    plot: 0,
                    dialogue:0,
                    isBegin:false,
                    isEnd: false
                },
                credit:{
                    plot:0,
                    dialogue:0,
                    isBegin:false
                },
                police:{
                    plot:0,
                    dialogue:0,
                    isBegin:false
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

                },
                xinyongka:{

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
