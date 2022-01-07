
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import Layout from '@/layout';
// import RouterAider from '@components/RouterAider';
import Storage from '@/common/storage'
// import C from '@/common/constants'

Vue.use(VueRouter)
// 路由懒加载
const getComponent = component => () => import(`@/page/${component}`)

const routes = [
  {
    path: '/login',
    component: getComponent('LoginHtml/index')
  },
  {
    path: '/sign',
    component: getComponent('SignHtml/signMain')
  },
  {
    path: '/signMain',
    component: getComponent('SignHtml/signMain')
  },
  {
    path: '/',
    component: getComponent('HomeHtml/index'),
    redirect: '/homeHtml/radioactiveSourceMange/companyIntroduce',
    children: [
      {
        path: '/homeHtml/radioactiveSourceMange', // 放射源信息管理页面
        component: getComponent('RadioactiveSourceMange/Index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/radioactiveSourceMange/companyIntroduce',
        children: [
          {
            path: '/homeHtml/radioactiveSourceMange/companyIntroduce', // 涉源单位
            component: getComponent('RadioactiveSourceMange/CompanyIntroduce/index'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/companyIntroduceTab', // tab切换页面
            component: getComponent('RadioactiveSourceMange/CompanyIntroducePage/CompanyIntroduceTab'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/firstQuery', // 许可证首次申请查询
            component: getComponent('RadioactiveSourceMange/FirstQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/changeQuery', // 许可证变更申请查询
            component: getComponent('RadioactiveSourceMange/ChangeQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/againQuery', // 许可证重新申请查询
            component: getComponent('RadioactiveSourceMange/AgainQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/continueQuery', // 许可证延续申请查询
            component: getComponent('RadioactiveSourceMange/ContinueQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/cancellationQuery', // 许可证注销申请查询
            component: getComponent('RadioactiveSourceMange/CancellationQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          // 消息提示
          {
            path: '/homeHtml/radioactiveSourceMange/licenseExpiration', // 许可证到期提示
            component: getComponent('RadioactiveSourceMange/MessagePrompt/licenseExpiration'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/annualReportMissing', // 年报缺失提示
            component: getComponent('RadioactiveSourceMange/MessagePrompt/annualReportMissing'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/missingInformation', // 填报信息缺失提示
            component: getComponent('RadioactiveSourceMange/MessagePrompt/missingInformation'),
            meta: {
              isAuthenticated: true
            }
          },
          // 信息查询
          {
            path: '/homeHtml/radioactiveSourceMange/RadiationQuery', // 放射源查询
            component: getComponent('RadioactiveSourceMange/Information/RadiationQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/RadioactiveInformation', // 放射源基本信息
            component: getComponent('RadioactiveSourceMange/Information/RadioactiveInformation'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/UnsealedQuery', // 非密封性物质查询
            component: getComponent('RadioactiveSourceMange/Information/UnsealedQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/radioactiveSourceMange/RayDeviceQuery', // 射线装置查询
            component: getComponent('RadioactiveSourceMange/Information/RayDeviceQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          // 监督检查期限整改逾期企业
          {
            path: '/homeHtml/RadioactiveSourceMange/inspectOverdueEnterprise',
            component: getComponent('RadioactiveSourceMange/inspectOverdueEnterprise/index'),
            meta: {
              isAuthenticated: true
            }
          }
        ]
      },
      {
        path: '/homeHtml/alarmQuery', // 报警查询
        component: getComponent('AlarmQuery/Index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/alarmQuery/alarmQuery',
        children: [
          {
            path: '/homeHtml/alarmQuery/alarmQuery', // 报警查询
            component: getComponent('AlarmQuery/AlarmQuery'),
            meta: {
              isAuthenticated: true
            }
          }
        ]
      },
      // 统计分析
      {
        path: '/homeHtml/statisticalAnalysis', // 统计分析
        component: getComponent('AnalysisHtml/index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/AnalysisHtml/noRegionalstatistics',
        children: [
          // 核技术利用单位统计
          {
            path: '/homeHtml/AnalysisHtml/noRegionalstatistics', // 用途统计
            component: getComponent('AnalysisHtml/noRegionalstatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/noindustrystatistics', // 行业统计
            component: getComponent('AnalysisHtml/noindustrystatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/nochangetrend', // 变化趋势图
            component: getComponent('AnalysisHtml/nochangetrend'),
            meta: {
              isAuthenticated: true
            }
          },
          // 核技术利用单位统计跳转页面
          {
            path: '/homeHtml/AnalysisHtml/nucleartechnologyjump', // 用途统计
            component: getComponent('AnalysisHtml/nucleartechnologyjump'),
            meta: {
              isAuthenticated: true
            }
          },
          // 非密封放射性物质统计跳转页面
          {
            path: '/homeHtml/AnalysisHtml/unsealedradioactivejump', // 用途统计
            component: getComponent('AnalysisHtml/unsealedradioactivejump'),
            meta: {
              isAuthenticated: true
            }
          },
          // 射线装置统计跳转页面
          {
            path: '/homeHtml/AnalysisHtml/Raydevice', // 用途统计
            component: getComponent('AnalysisHtml/Raydevice'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/RadioactiveInformation', // 用途统计
            component: getComponent('AnalysisHtml/RadioactiveInformation'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/nucleartechnologyjump', // 用途统计
            component: getComponent('AnalysisHtml/nucleartechnologyjump'),
            meta: {
              isAuthenticated: true
            }
          },
          // tab切换页面-详情页面
          {
            path: '/homeHtml/AnalysisHtml/companyIntroduceTab',
            component: getComponent('AnalysisHtml/CompanyIntroduceTab'),
            meta: {
              isAuthenticated: true
            }
          },
          // 放射源统计
          {
            path: '/homeHtml/AnalysisHtml/souRegionalstatistics', // 区域统计
            component: getComponent('AnalysisHtml/souRegionalstatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/souRadiationQuery', // 区域统计点击进入具体查看
            component: getComponent('AnalysisHtml/souRegionalDetail/souRadiationQuery'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/RadioactiveInfoDetail', // 区域统计点击进入具体查看
            component: getComponent('AnalysisHtml/souRegionalDetail/RadioactiveInfoDetail'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/souindustrystatistics', // 行业统计
            component: getComponent('AnalysisHtml/souindustrystatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/souchangetrend', // 变化趋势图
            component: getComponent('AnalysisHtml/souchangetrend'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/souusagestatistics', // 行业统计
            component: getComponent('AnalysisHtml/souusagestatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/sounuclidestatistics', // 核素统计
            component: getComponent('AnalysisHtml/sounuclidestatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Unsealedradioactive', // 非密封放射性物质统计
            component: getComponent('AnalysisHtml/Unsealedradioactive'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Unindustrystatistics', //  非密封放射性物质统计行业统计
            component: getComponent('AnalysisHtml/Unindustrystatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Unchangetrend', //  非密封放射性物质统计变化趋势图
            component: getComponent('AnalysisHtml/Unchangetrend'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Regionalfield', //
            component: getComponent('AnalysisHtml/Regionalfield'),
            meta: {
              isAuthenticated: true
            }
          },
          // 射线装置统计
          {
            path: '/homeHtml/AnalysisHtml/Xraydevice', // 射线装置统计用途统计
            component: getComponent('AnalysisHtml/Xraydevice'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Industrystatistics', // 行业统计
            component: getComponent('AnalysisHtml/Industrystatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/ChangeTrend', // 许可证重新申请查询
            component: getComponent('AnalysisHtml/ChangeTrend'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Regionalfield', // 区域内场所统计
            component: getComponent('AnalysisHtml/Regionalfield'),
            meta: {
              isAuthenticated: true
            }
          },
          // 移动巡查统计
          {
            path: '/homeHtml/AnalysisHtml/Mobilepatrol', // 用途统计
            component: getComponent('AnalysisHtml/Mobilepatrol'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Mobindustrystatistics', // 行业统计
            component: getComponent('AnalysisHtml/Mobindustrystatistics'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/AnalysisHtml/Mobchangetrend', // 变化趋势图
            component: getComponent('AnalysisHtml/Mobchangetrend'),
            meta: {
              isAuthenticated: true
            }
          }

        ]
      },
      /* 信息管理  */
      {
        path: '/homeHtml/InformationManagement',
        component: getComponent('InformationManagement/Index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/InformationManagement/monitoringLocation',
        children: [
          {
            path: '/homeHtml/InformationManagement/monitoringLocation', // 监控位置管理
            component: getComponent('InformationManagement/monitoringLocation'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/InformationManagement/radiationDevice', // 辐射装置管理
            component: getComponent('InformationManagement/radiationDevice'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/InformationManagement/monitoringEquipment', // 监测设备管理
            component: getComponent('InformationManagement/monitoringEquipment'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/InformationManagement/monitorFactor', // 监测因子
            component: getComponent('InformationManagement/monitorFactor'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/InformationManagement/monitorFactorGroup', // 监测因子组
            component: getComponent('InformationManagement/monitorFactorGroup'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/InformationManagement/contactManager', // 联系人管理
            component: getComponent('InformationManagement/contactManager'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/InformationManagement/nuclideManagement', // 核素管理
            component: getComponent('InformationManagement/nuclideManagement'),
            meta: {
              isAuthenticated: true
            }
          }
        ]
      },
      // 实时监测
      {
        path: '/homeHtml/realTimeMonitoring', // 实时监测
        component: getComponent('RealtimeMonitor/index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/RealtimeMonitor/MapMonitor',
        children: [
          {
            path: '/homeHtml/RealtimeMonitor/RealtimeGlance', // 实时一览
            component: getComponent('RealtimeMonitor/RealtimeGlance'),
            meta: {
              isAuthenticated: true
            }
          },
          // 实时一览跳轉
          {
            path: '/homeHtml/RealtimeMonitor/RealtimeGlancejump', // 地图监测
            component: getComponent('RealtimeMonitor/RealtimeGlancejump'),
            meta: {
              isAuthenticated: true
            }
          }
        ]
      },
      // 地图监测
      {
        path: '/homeHtml/RealtimeMonitor/MapMonitor', // 地图监测
        component: getComponent('RealtimeMonitor/MapMonitor'),
        meta: {
          isAuthenticated: true
        }
      },
      // 知识库
      {
        path: '/homeHtml/KnowledgeBase', // 知识库
        component: getComponent('KnowledgeBase/index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/KnowledgeBase/RadiusElementInfo',
        children: [
          {
            path: '/homeHtml/KnowledgeBase/RadiusElementInfo', // 放射源核素信息
            component: getComponent('KnowledgeBase/OriginalInfo/RadiusElementInfo'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/CodeDividRule', // 源的分类规则
            component: getComponent('KnowledgeBase/OriginalInfo/CodeDividRule'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/NonBlockRadiusMaterial', // 非密封放射性物质核素信息
            component: getComponent('KnowledgeBase/OriginalInfo/NonBlockRadiusMaterial'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/NonBlockWorkClass', // 非密封放射性物质工作场所分级
            component: getComponent('KnowledgeBase/OriginalInfo/NonBlockWorkClass'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/XRayDeviceClass', // 射线装置分类
            component: getComponent('KnowledgeBase/OriginalInfo/XRayDeviceClass'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/RadiusCodeNum', // 放射源编码序列编号分配
            component: getComponent('KnowledgeBase/OriginalInfo/RadiusCodeNum'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/XRayDeviceClass', // 射线装置分类
            component: getComponent('KnowledgeBase/OriginalInfo/XRayDeviceClass'),
            meta: {
              isAuthenticated: true
            }
          },
          // --------------------------
          {
            path: '/homeHtml/KnowledgeBase/NonBlockMaterialUasge', // 非密封放射性物质用途
            component: getComponent('KnowledgeBase/RadiusUsage/NonBlockMaterialUasge'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/RadiusUage', // 放射源用途
            component: getComponent('KnowledgeBase/RadiusUsage/RadiusUage'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/KnowledgeBase/XRayUsageRU', // 放射源用途
            component: getComponent('KnowledgeBase/RadiusUsage/XRayUsageRU'),
            meta: {
              isAuthenticated: true
            }
          },
          // --------------------------
          {
            path: '/homeHtml/KnowledgeBase/MonitorExecuteInfo', // 监督执法信息
            component: getComponent('KnowledgeBase/MonitorExecuteInfo/MonitorExecuteInfo'),
            meta: {
              isAuthenticated: true
            }
          },
          // --------------------------
          {
            path: '/homeHtml/KnowledgeBase/PublicDocument', // 公共文档库
            component: getComponent('KnowledgeBase/PublicDocument/PublicDocument'),
            meta: {
              isAuthenticated: true
            }
          },
          // --------------------------
          {
            path: '/homeHtml/KnowledgeBase/XRayCodeRule', // 放射源编码规则
            component: getComponent('KnowledgeBase/XRayCodeRule/XRayCodeRule'),
            meta: {
              isAuthenticated: true
            }
          }

        ]
      },
      // 移动巡查

      {
        path: '/homeHtml/MobilePatrol', // 实时监测
        component: getComponent('MobilePatrol/index'),
        meta: {
          isAuthenticated: true
        },
        redirect: '/homeHtml/MobilePatrol/TaskManage',
        children: [
          {
            path: '/homeHtml/MobilePatrol/TaskManage', // 任务管理
            component: getComponent('MobilePatrol/TaskManage'),
            meta: {
              isAuthenticated: true
            }
          },
          {
            path: '/homeHtml/MobilePatrol/PatrolPlanCustom', // 移动巡查定制
            component: getComponent('MobilePatrol/PatrolPlanCustom'),
            meta: {
              isAuthenticated: true
            }
          }
        ]
      }
    ]
  }
]
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.isAuthenticated) {
    if (Storage.get('KEY_SESSION')) {
      next()
      return
    }
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
