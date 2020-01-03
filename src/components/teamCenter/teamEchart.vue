<template>
  <div>
    <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>
<script>
import $echart from 'echarts'
export default {
  props: ['activeIndex', 'legendIndex'],
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
        itemStyleColor: '#0581DE'
      }
    }
  },
  mounted () {
    this.getLegenData(this.legendIndex)
    this.getData(this.activeIndex)
  },
  watch: {
    activeIndex (val) {
      this.getLegenData(this.legendIndex)
      this.getData(val)
    },
    legendIndex (val) {
      this.getLegenData(val)
      this.getData(this.activeIndex)
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
    getList (val) {
      let arr = []
      if (val == 1) {
        arr[0] = [5, 10, 26, 20, 40, 10, 22]
        arr[1] = [50, 20, 36, 10, 10, 20, 22]
        arr[2] = [10, 10, 16, 20, 14, 13, 12]
        arr[3] = [50, 20, 26, 30, 11, 10, 32]
      }
      else if (val == 2) {
        let arr1 = []
        let arr2 = []
        for (let i = 1; i < 31; i++) {
          arr1.push(i + 6)
          arr2.push(i + 8)
        }
        arr[0] = arr1
        arr[1] = arr2
        arr[2] = arr1.map(item => { return item + 2 })
        arr[3] = arr2.map(item => { return item + 1 })
      }
      else if (val == 3) {
        arr[0] = [5, 10, 26]
        arr[1] = [10, 20, 36]
        arr[2] = [14, 10, 16]
        arr[3] = [30, 22, 6]
      }
      else {
        arr[0] = [5, 10, 23, 20, 30, 4, 20, 5, 10, 23, 20, 30]
        arr[1] = [50, 20, 36, 10, 10, 20, 22, 20, 10, 26, 13, 15]
        arr[2] = [15, 10, 13, 10, 20, 14, 10, 15, 10, 13, 10, 10]
        arr[3] = [25, 10, 16, 13, 20, 10, 22, 10, 20, 16, 23, 25]
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