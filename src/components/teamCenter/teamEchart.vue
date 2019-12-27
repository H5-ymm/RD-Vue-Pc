<template>
  <div>
    <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
  </div>
</template>
<script>
import $echart from 'echarts'
export default {
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
    }
  },
  mounted () {
    this.drawLine();
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = $echart.init(document.getElementById('myChart'))
      // 绘制图表
      let option = {
        title: { text: '' },
        tooltip: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '25',
          width: '100%'
        },
        legend: {
          data: ['简历总数', '报名总数', '面试总数', '入职总数'],
          splitLine: { // 设置网格
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#10BBA3'
            }
          },
          right: 20,
          to: 30,
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
        series: [{
          name: '简历总数',
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          data: [50, 20, 36, 10, 10, 20, 22],
          itemStyle: {
            normal: { color: '#0581DE' }
          }
        },
        {
          name: '报名总数',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          data: [5, 10, 26, 20, 40, 10],
          itemStyle: {
            normal: { color: '#7003FE' }
          }
        }, {
          name: '面试总数',
          symbol: 'circle',
          type: 'line',
          symbolSize: 8,
          data: [2, 30, 16, 20, 7, 23, 33],
          itemStyle: {
            normal: { color: '#F87321' }
          }
        }, {
          name: '入职总数',
          symbol: 'circle',
          type: 'line',
          symbolSize: 8,
          data: [5, 30, 16, 16, 30, 28, 44],
          itemStyle: {
            normal: { color: '#489723' }
          }
        }]
      }
      option.yAxis = this.axais
      let newXaxis = JSON.stringify(this.axais)
      option.xAxis = Object.assign(JSON.parse(newXaxis), { data: this.xData })
      console.log(option)
      myChart.setOption(option)
    }
  },
}
</script>