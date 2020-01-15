<template>
  <div>
    <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>
<script>
import $echart from 'echarts'
export default {
  props: ['activeIndex', 'legendIndex', 'percentList', 'list'],
  data () {
    return {
      axais: {
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#333'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#eee'],
            width: 1,
            type: 'solid'
          }
        }
      },
      xData: ["周一", "周二", "周三", "周四", "周五", "周六", '周日'],
      legendData: [],
      series: [],
      option: {
        title: { text: '' },
        tooltip: {
          trigger: 'axis',
          axisPointer: { //去掉移动的指示线
            type: 'none'
          },
        },
        grid: {
          left: '25',
          width: '100%',
          bottom: '30',
          right: '20'
        },
        legend: {
          data: [],
          splitLine: { // 设置网格
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#10BBA3'
            },
          },
          right: 20,
          top: '20',
          icon: 'circle',
          itemWidth: 8,  // 设置宽度
          itemHeight: 8, // 设置高度
          itemGap: 20,
          borderRadius: 8,
          textStyle: {
            padding: [3, 0, 0, 0]
          }
        },
        xAxis: {},
        yAxis: {},
        series: [],
        itemStyleColor: '#0581DE',
        index: 0,
        arrList: []
      }
    }
  },
  mounted () {
    this.getLegenData(this.legendIndex)
    this.getData(this.activeIndex)
  },
  watch: {
    activeIndex (val) {
      this.index = val
      this.getLegenData(this.legendIndex)
      this.getData(val)
    },
    legendIndex (val) {
      this.getLegenData(val)
      this.getData(this.activeIndex)
    },
    percentList (val) {
      if (val) {
        this.arrList = val
        this.getList(this.legendIndex)
        this.getLegenData(this.legendIndex)
        this.getData(this.activeIndex)
      } else {
        this.arrList = null
      }
    }
  },
  methods: {
    getLegenData (val) {
      this.xData = []
      if (val == 1) {
        this.legendData = ['本周', '上周']
        this.xData = ["周一", "周二", "周三", "周四", "周五", "周六", '周日']
      }
      else if (val == 2) {
        this.legendData = ['本月', '上个月']
        for (let i = 1; i < 30; i++) {
          this.xData.push(i + '号')
        }
      }
      else if (val == 3) {
        this.legendData = ['本季度', '上季度']
        this.xData = ["一", "二", "三"]
      }
      else {
        this.legendData = ['今年', '去年']
        for (let i = 1; i < 13; i++) {
          this.xData.push(i + '月')
        }
      }
    },
    getKey (index) {
      let label = ''
      if (index == 1) {
        label = 'total'
      }
      else if (index == 2) {
        label = 'put'
      }
      else if (index == 3) {
        label = 'view'
      }
      else {
        label = 'entry'
      }
      return label
    },
    getArray (obj) {
      let arr = []
      for (let i in obj) {
        if (i) {
          arr.push(obj[i])
        }
        else {
          return
        }
      }
      return arr
    },
    getList (val) {
      let arr = []
      if (this.arrList && this.arrList.total && this.activeIndex == 0) {
        arr[0] = this.getArray(this.arrList.total)
        arr[1] = this.getArray(this.arrList.put)
        arr[2] = this.getArray(this.arrList.view)
        arr[3] = this.getArray(this.arrList.entry)
        console.log(arr[0])
      }
      if (this.arrList && this.arrList.total && this.list) {
        let key = this.getKey(this.activeIndex)
        arr[0] = this.getArray(this.arrList[key])
        arr[1] = this.getArray(this.list[key])
      }
      return arr
    },
    getData (index) {
      let arr = []
      this.legendData.forEach((item, index) => {
        arr[index] = {
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          name: item,
          itemStyle: {},
          data: this.getList(this.legendIndex)[index]
        }
      })
      arr[1].itemStyle = {
        normal: { color: '#FE457D' }
      }
      if (index == 1) {
        this.itemStyleColor = '#0581DE'
        arr[0].itemStyle = {
          normal: { color: this.itemStyleColor }
        }
        this.series = arr
      }
      else if (index == 2) {
        this.itemStyleColor = '#C971D9'
        arr[0].itemStyle = {
          normal: { color: this.itemStyleColor }
        }
        this.series = arr
      }
      else if (index == 3) {
        this.itemStyleColor = '#F87220'
        arr[0].itemStyle = {
          normal: { color: this.itemStyleColor }
        }
        this.series = arr
      }
      else if (index == 4) {
        this.itemStyleColor = '#459522'
        arr[0].itemStyle = {
          normal: { color: this.itemStyleColor }
        }
        this.series = arr
      }
      else {
        this.legendData = ['简历总数', '报名总数', '面试总数', '入职总数']
        console.log(this.getList(this.legendIndex))
        this.series = [{
          name: '简历总数',
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          data: this.getList(this.legendIndex)[0],
          itemStyle: {
            normal: { color: '#0581DE' }
          }
        },
        {
          name: '报名总数',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          data: this.getList(this.legendIndex)[1],
          itemStyle: {
            normal: { color: '#7003FE' }
          }
        }, {
          name: '面试总数',
          symbol: 'circle',
          type: 'line',
          symbolSize: 8,
          data: this.getList(this.legendIndex)[2],
          itemStyle: {
            normal: { color: '#F87321' }
          }
        }, {
          name: '入职总数',
          symbol: 'circle',
          type: 'line',
          symbolSize: 8,
          data: this.getList(this.legendIndex)[3],
          itemStyle: {
            normal: { color: '#489723' }
          }
        }]
      }
      this.drawLine()
    },
    drawLine (series, legendData) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = $echart.init(document.getElementById('myChart'))
      let newXaxis = JSON.stringify(this.axais)
      this.option.yAxis = this.axais
      this.option.xAxis = Object.assign(JSON.parse(newXaxis), { data: this.xData })
      this.option.legend.data = this.legendData
      this.option = Object.assign(this.option, { series: this.series })
      myChart.setOption(this.option, true)
    }
  },
}
</script>