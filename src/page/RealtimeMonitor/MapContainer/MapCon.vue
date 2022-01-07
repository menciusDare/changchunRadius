<template>
  <div id="map_container"></div>
</template>

<script>
import {BMPGL} from './bmpgl'
import {initMap} from '../../../../static/js/map'
import {EventBus} from '../../../common/eventbus'
import zhongdian0 from '../../../assets/images/MapMonitor/zhongOnline.png'
import zhongdian1 from '../../../assets/images/MapMonitor/zhongNoOnline.png'
import zhongdian2 from '../../../assets/images/MapMonitor/zhongBao.png'
import nozhongdian0 from '../../../assets/images/MapMonitor/noZhongOnline.png'
import nozhongdian1 from '../../../assets/images/MapMonitor/noZhongNoOnline.png'
import nozhongdian2 from '../../../assets/images/MapMonitor/noZhongBao.png'
import yidong0 from '../../../assets/images/MapMonitor/yidongOnline.png'
import yidong1 from '../../../assets/images/MapMonitor/yidongNoOnline.png'
import yidong2 from '../../../assets/images/MapMonitor/yidongBao.png'
import MapMonitor from '../../../common/api/RealtimeMonitor/MapMonitor'
export default {
  name: 'MapCon',
  data () {
    return {
      myMap: '',
      viewMap: '',
      point: [
        {
          geometry: {
            type: 'Point',
            coordinates: [125.35, 43.88],
            pointStatus: 'zhongBao'
          }
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [125, 43],
            pointStatus: 'zhongNoOnline'
          }
        }
      ],
      ponintBao: [
        {
          geometry: {
            type: 'Point',
            coordinates: [125.35, 43.88],
            pointStatus: 'zhongBao'
          }
        }
      ],
      imgList: {
        zhongdian1: zhongdian0,
        zhongdian2: zhongdian1,
        zhongdian3: zhongdian2,
        nozhongdian1: nozhongdian0,
        nozhongdian2: nozhongdian1,
        nozhongdian3: nozhongdian2,
        yidong1: yidong0,
        yidong2: yidong1,
        yidong3: yidong2
      },
      id: '',
      coordinates: []
    }
  },
  methods: {
    drawMap () {
      BMPGL('GfjNXG12fQDSzMYNKlCwGKljCjGE3LFE').then((BMapGL) => {
        // 创建地图实例
        // 百度地图API功能
        var map = initMap({
          tilt: '67',
          heading: 0,
          center: [125.35, 43.88],
          zoom: 11,
          style: 'whiteStyle',
          skyColors: [
            // 地面颜色
            'rgba(226, 237, 248, 0)',
            // 天空颜色
            'rgba(186, 211, 252, 1)'
          ]
        })
        this.myMap = map
        var view = new mapvgl.View({
          map: this.myMap
        })
        console.log(view)
        this.viewMap = view
        this.drawMapPoint()
      })
    },
    drawMapPoint () {
      var data = []
      // view.removeAllLayers()
      this.companyList.forEach(item => {
        data.push(
          {
            geometry: {
              type: 'Point',
              coordinates: [item.longitude, item.latitude]
            },
            data: item
          })
      })
      // 报警
      var bubbleLayer = new mapvgl.CircleLayer({
        // 绘制带泡泡的圆
        type: 'bubble',
        // 扩散半径，支持直接设置和回调两种形式，size为点的大小
        radius (size) {
          console.log(size)
          return 3 * size
        },
        color: 'rgba(242, 14, 37, 1)',
        // 扩散时间
        duration: 1,
        // 渐隐时间
        trail: 1
      })
      this.viewMap.addLayer(bubbleLayer)
      let bapjing = data.filter(item => item.data.unitState == '3')
      bubbleLayer.setData(bapjing)
      // unitState 1-在线 2-离线 3-报警
      var pointLayer = new mapvgl.IconLayer({
        width: 21,
        height: 24,
        offset: [0, -20],
        icon: (item) => {
          if (item.data.moveType == '1') {
            return this.imgList[`nozhongdian${item.data.unitState}`]
          } else if (item.data.moveType == '2') {
            return this.imgList[`zhongdian${item.data.unitState}`]
          } else if (item.data.moveType == '3') {
            return this.imgList[`yidong${item.data.unitState}`]
          }
        },
        enablePicked: true, // 是否可以拾取
        selectedIndex: -2, // 选中项
        selectedColor: 'rgba(8, 130, 253, 1)', // 选中项颜色
        autoSelect: true, // 根据鼠标位置来自动设置选中项
        onClick: (e) => { // 点击事件
          if (e.dataItem) {
            this.showPopMain(e.dataItem.geometry.coordinates, e.dataItem.data.unitId)
          }
        }
      })
      this.viewMap.addLayer(pointLayer)
      pointLayer.setData(data)
    },
    showPopMain (coordinates, id) {
      const lat = coordinates[1]
      const lon = coordinates[0]
      const pointArray = new BMapGL.Point(lon, lat)
      this.myMap.setCenter(pointArray, {
        tilt: this.myMap.getTilt(),
        zoom: 11
      })
      this.id = id
      this.coordinates = coordinates
      this.loadingShowPop()
    },
    loadingChangeCenter () {
      EventBus.$on('changeCenter', (point) => {
        const lat = point.point[1]
        const lon = point.point[0]
        const pointArray = new BMapGL.Point(lon, lat)
        this.myMap.setCenter(pointArray, {
          tilt: this.myMap.getTilt(),
          zoom: 11
        })
        this.id = point.id
        this.coordinates = point.point
        console.log("loadingChangeCenter")
        this.loadingShowPop()
      })
    },
    loadingShowPop () {
      console.log("showPop")
      EventBus.$emit('showPop', {
        id: this.id,
        coordinates: this.coordinates
      })
    }
  },
  mounted () {
    this.drawMap()
    this.loadingChangeCenter()
  },
  watch: {
    companyList: {
      handler: function () {
        if (this.viewMap != '') {
          this.viewMap.removeAllLayers()
          if (this.companyList.length > 0) {
            console.log(this.viewMap.getAllLayers())
            this.drawMapPoint()
          }
          // setTimeout(() => {
          //
          // }, 1000)
          EventBus.$emit('loadingMapChangePopStatus', false)
        }
        // console.log(this.viewMap.getAllLayers())
        // this.viewMap.removeAllLayers()
        // this.viewMap.hide()

        // this.drawMapPoint('isPop')
      },
      immediate: true
    }
  },
  props: {
    companyList: Array,
    changePopMain: Function
  },
  beforeDestroy () {
    EventBus.$off('changeCenter')
  }
}
</script>

<style scoped>
</style>
