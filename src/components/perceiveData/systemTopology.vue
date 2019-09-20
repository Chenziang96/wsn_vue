<template>
  <div id="main" style=""></div>
</template>

<script>

  export default {
    name: "systemTopology",
    data() {
      return {
       items : [
          {
            name: "应用1",
            // category: 0,
            active: true,
            back_active: true,
            speed: '50kb/s',
            target: '应用2',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/application.png?raw=true',
            symbolSize: [60,60],
            value: [0, 0],
            targetValue: [100, -60],
          }, {
            name: "应用2",
            // category: 0,
            active: true,
           back_active: true,
            target: '应用3',
            speed: '50kb/s',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/application.png?raw=true',
            symbolSize: [60, 60],
            value: [100, 0],
            targetValue: [100, -60],
          },
          {
            name: "应用3",
            // category: 0,
            active: true,
            back_active: true,
            value: [200, 0],
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/application.png?raw=true',
            symbolSize: [60, 60],
            target: '后端平台',
            targetValue: [100, -60],
          },
          {
            name: "后端平台",
            // category: 4,
            active: true,
            back_active: false,
            target: '应用3',
            speed: '50kb/s',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/server.png?raw=true',
            symbolSize: [80, 80],
            value: [100, -60],
            targetValue: [100, -60],
          },
          {
            name: "汇集网关1",
            // category: 1,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '应用1',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/exchange.png?raw=true',
            symbolSize: [60, 50],
            value: [50, -130],
            targetValue: [100, -60],
          },
          {
            name: "汇集网关2",
            // category: 1,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '应用2',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/exchange.png?raw=true',
            symbolSize: [60, 50],
            value: [100, -130],
            targetValue: [100, -60],
          },
          {
            name: "汇集网关3",
            // category: 1,
            speed: '50kb/s',
            active: false,
            back_active: false,
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/exchange.png?raw=true',
            symbolSize: [60, 50],
            target: '应用3',
            value: [150, -130],
            targetValue: [100, -60],
          },
          {
            name: "控制中心1",
            // category: 2,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '汇集网关1',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/controlCenter.png?raw=true',
            symbolSize: [40, 40],
            value: [0, -200],
            targetValue: [50, -130],
          },
          {
            name: "控制中心2",
            // category: 2,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '汇集网关2',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/controlCenter.png?raw=true',
            symbolSize: [40, 40],
            value: [100, -200],
            targetValue: [100, -130],
          },
          {
            name: "控制中心3",
            // category: 2,
            speed: '50kb/s',
            active: false,
            back_active: false,
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/controlCenter.png?raw=true',
            symbolSize: [40, 40],
            target: '汇集网关3',
            value: [200, -200],
            targetValue: [150, -130],
          },
          {
            name: "交换机1",
            // category: 2,
            speed: '50kb/s',
            active: false,
            back_active: false,
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/exchange.png?raw=true',
            symbolSize: [40, 40],
            target: '汇集网关3',
            value: [10, -250],
            targetValue: [0, -200],
          },
          {
            name: "交换机2",
            // category: 2,
            speed: '50kb/s',
            active: false,
            back_active: false,
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/exchange.png?raw=true',
            symbolSize: [40, 40],
            target: '汇集网关3',
            value: [100, -250],
            targetValue: [100, -200],
          },
          {
            name: "交换机3",
            // category: 2,
            speed: '50kb/s',
            active: false,
            back_active: false,
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/exchange.png?raw=true',
            symbolSize: [40, 40],
            target: '汇集网关3',
            value: [200, -250],
            targetValue: [200, -200],
          },
          {
            name: "感知节点1",
            // category: 3,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '控制中心1',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/sun.png?raw=true',
            symbolSize: [50,50],
            value: [0, -300],
            targetValue: [10, -250],
          },
          {
            name: "感知节点2",
            // category: 3,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '控制中心1',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/video.png?raw=true',
            symbolSize: [50,50],
            value: [20, -300],
            targetValue: [10, -250],
          },
          {
            name: "感知节点3",
            // category: 3,
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '控制中心1',
            value: [80, -300],
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/wifi.png?raw=true',
            symbolSize: [50,50],
            targetValue: [100, -250],
          },
          {
            name: "感知节点4",
            speed: '50kb/s',
            active: false,
            back_active: false,
            target: '控制中心2',
            symbol: 'image://https://github.com/Chenziang96/cza/blob/master/photo.png?raw=true',
            symbolSize: [50,50],
            value: [200, -300],
            targetValue: [200, -250],
          },
        ],
      }
    },
    mounted() {
      var temp= JSON.parse(sessionStorage.getItem('systemTopology'));
      console.log(temp);
      if(temp==null){
        sessionStorage.setItem('systemTopology',JSON.stringify(this.items));
      }else{
        this.items = temp;
      }
      this.drawTopology();
    },
    methods: {
      drawTopology() {
        let myChart = this.$echarts.init(document.getElementById('main'));
        const curveness = 0.08;
        const linesData = [];
        // const categories = [{
        //   name: '应用层',
        //   itemStyle: {
        //     normal: {
        //       color: '#01acca',
        //     }
        //   },
        //   label: {
        //     normal: {
        //       fontSize: '14'
        //     }
        //   },
        // }, {
        //   name: '服务层',
        //   itemStyle: {
        //     normal: {
        //       color: '#ffb402',
        //     }
        //   },
        //   label: {
        //     normal: {
        //       fontSize: '14'
        //     }
        //   },
        // },
        //   {
        //     name: '网络层',
        //     itemStyle: {
        //       normal: {
        //         color: '#16e628',
        //       }
        //     },
        //     label: {
        //       normal: {
        //         fontSize: '14'
        //       }
        //     },
        //   },
        //   {
        //     name: '感知层',
        //     itemStyle: {
        //       normal: {
        //         color: '#c1223e',
        //       }
        //     },
        //     label: {
        //       normal: {
        //         fontSize: '14'
        //       }
        //     },
        //   },
        //   {
        //     name: '后端平台',
        //     itemStyle: {
        //       normal: {
        //         color: '#b32b96',
        //       }
        //     },
        //     label: {
        //       normal: {
        //         fontSize: '14'
        //       }
        //     },
        //   },
        // ];


        const items = this.items;
        const data = items;

        items.forEach(function (el) {
          if (el.active) {
            linesData.push([{
              coord: el.value,
            }, {
              coord: el.targetValue,
            },
            ])
          }
        })

        items.forEach(function (el) {
          if (el.back_active) {
            linesData.push([{
              coord: el.targetValue,
            }, {
              coord: el.value,
            },
            ])
          }
        })

        const links = items.map((el) => {
          return {
            source: el.name,
            target: el.target,
            speed: el.speed,
            lineStyle: {
              normal: {
                color: el.speed ? '#12b5d0' : '#ff0000',
                curveness: curveness,
              }
            },
          }
        })

        let option = {
          tooltip:{
            trigger:'item',
          },
          legend: [{
            tooltip: {
              show: true
            },
            textStyle: {
              color: '#999'
            },
            selectedMode: false,
            right: 0,
            // data: categories.map(function (el) {
            //   return el.name
            // })
            data: ['h1', 'h2', 'h3']
          }],
          grid: { //图片左边距
            top: 100
          },
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: {
            show: false,
            type: 'value'
          },
          graphic: [
            {
              type: 'group',
              left: '0%',
              top: 300,
              children: [
                {
                  type: 'rect',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  shape: {
                    width: 80,
                    height: 25
                  },
                  style: {
                    fill: '#fff',
                    stroke: '#555',
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: 'rgba(0,0,0,0.3)'
                  }
                },
                {
                  type: 'text',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  style: {
                    fill: '#333',
                    text: [
                      '网络层'
                    ].join('\n'),
                    font: '14px Microsoft YaHei'
                  }
                }
              ]
            },
            {
              type: 'group',
              left: '0%',
              top: 15,
              children: [
                {
                  type: 'rect',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  shape: {
                    width: 80,
                    height: 25
                  },
                  style: {
                    fill: '#fff',
                    stroke: '#555',
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: 'rgba(0,0,0,0.3)'
                  }
                },
                {
                  type: 'text',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  style: {
                    fill: '#333',
                    text: [
                      '应用层'
                    ].join('\n'),
                    font: '14px Microsoft YaHei'
                  }
                }
              ]
            },
            {
              type: 'group',
              left: '0%',
              top: 170,
              children: [
                {
                  type: 'rect',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  shape: {
                    width: 80,
                    height: 25
                  },
                  style: {
                    fill: '#fff',
                    stroke: '#555',
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: 'rgba(0,0,0,0.3)'
                  }
                },
                {
                  type: 'text',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  style: {
                    fill: '#333',
                    text: [
                      '服务层'
                    ].join('\n'),
                    font: '14px Microsoft YaHei'
                  }
                }
              ]
            },
            {
              type: 'group',
              left: '0%',
              top: 460,
              children: [
                {
                  type: 'rect',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  shape: {
                    width: 80,
                    height: 25
                  },
                  style: {
                    fill: '#fff',
                    stroke: '#555',
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: 'rgba(0,0,0,0.3)'
                  }
                },
                {
                  type: 'text',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  style: {
                    fill: '#333',
                    text: [
                      '感知层'
                    ].join('\n'),
                    font: '14px Microsoft YaHei'
                  }
                }
              ]
            }
          ],
          series: [{
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 60,
            showAllSymbol: true,
            z: 3,
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 14
                },
                formatter: function (params) {
                  let txt = ''
                  if (params.data.speed !== undefined) {
                    txt = params.data.speed
                  }
                  return txt
                },
              }
            },
            // links:{
            //   data:links
            // },
            // lineStyle: {
            //   normal: {
            //     opacity: 0.9,
            //     width: 2,
            //     curveness: 0
            //   }
            // },
            label: {
              normal: {
                show: true,
                position: 'bottom',
                color: 'black'

              }
            },
            itemStyle: {
              normal: {
                shadowColor: 'none'
              },
              emphasis: {}
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: 'none'
              },
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: 8,
            data: data,
            // categories: categories
          }
            , {
              name: 'A',
              type: 'lines',
              coordinateSystem: 'cartesian2d',
              z: 1,
              effect: {
                show: true,
                smooth: false,
                trailLength: 0,
                symbol: "arrow",
                color: 'rgba(55,155,255,0.5)',
                symbolSize: 12
              },
              lineStyle: {
                normal: {
                  curveness: curveness
                }
              },
              data: linesData
            }
          ]
        }
        myChart.setOption(option);

      },
    },
  }
</script>

<style scoped>
#main{
  width: 1000px;
  height:600px;
  margin: 10px auto;
  border: 1px solid black;
  padding-left: 15px;
}
</style>
