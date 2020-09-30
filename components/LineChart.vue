<template>
  <div>
    <v-chart
    class="echarts"
      :option="bar"
      :loading="loading"
      @ready="onReady"
      @click="onClick"
      style="width: 700px; height: 400px;"
    />
  </div>
</template>
 
<script>
var date = ["8/30@9AM", "8/30@12PM", "8/30@3PM", "8/30@6PM", "8/30@9PM", "9/1@12AM", "9/1@3AM", "9/1@6AM", "9/1@9AM", "9/1@12PM", "9/1@3PM", "9/1@6PM", "9/1@9PM", "9/2@12AM", "9/2@3AM", "9/2@6AM", "9/2@9AM", "9/2@12PM", "9/2@3PM", "9/2@6PM", "9/2@9PM", "9/3@12AM", "9/3@3AM", "9/3@6AM", "9/3@9AM", "9/3@12PM", "9/3@3PM", "9/3@6PM", "9/3@9PM", "9/4@12AM", "9/4@3AM", "9/4@6AM", "9/4@9AM", "9/4@12PM", "9/4@3PM", "9/4@6PM", "9/4@9PM", "9/5@12AM", "9/5@3AM", "9/5@6AM"];

var data = [85.15, 97.07, 99.07, 84.52, 78.51, 75.38, 74.05, 78.64, 90.45, 96.75, 97.14, 82.51, 77.23, 75.45, 74.84, 80.29, 89.74, 95.16, 95.38, 80.96, 76.35, 74.34, 72.93, 75.94, 85.55, 93.33, 93.85, 78.26, 73.99, 71.69, 70.36, 75.02, 84.97, 93.81, 91.6, 78.17, 73.63, 71.29, 70.16, 74.55];

  export default {
    data: () => ({
      loading: false,
      graphic: null,
      bar: {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: 'Temperature vs Time',
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name: 'Temperature',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            // areaStyle: {
            //     color: this.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 0,
            //         color: 'rgb(255, 158, 68)'
            //     }, {
            //         offset: 1,
            //         color: 'rgb(255, 70, 131)'
            //     }])
            // },
            data: data
        }
    ]
}
    }),
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        }
        that.loading = !that.loading;
        that.bar.series[0].data = data;
      },
      onReady(instance, ECharts) {
        this.graphic = ECharts.graphic;
        console.log(instance, ECharts.graphic);
      },
      onClick(event, instance, ECharts) {
        console.log(arguments);
      }
    }
  };
</script>
 
<style>
  .echarts {
    width: 700px;
    height: 400px;
  }
</style>