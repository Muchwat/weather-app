<template>
  <div>
    <v-chart
      class="echarts"
      :option="bar"
      style="width: 700px; height: 400px;"
    />
  </div>
</template>
 
<script>
export default {
  data: () => ({
    loading: false,
    graphic: null,
    bar: {
      tooltip: {
        trigger: "axis",
        show: false,
        position: function(pt) {
          return [pt[0], "10%"];
        }
      },
      title: {
        left: "left",
        top: '10',
        text: "Daily forecast (Temperature)",
        textStyle: {
          color: "black",
          fontSize: "14"
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          restore: {
            title: "Restore",
            show: true
          },
          saveAsImage: {
            title: "Save PNG",
            color: "#fff",
            show: true
          }
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"]
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10,
          handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "80%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }
      ],
      series: [
        {
          name: "Temperature",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            color: "rgb(255, 70, 131)"
          },
          data: []
        }
      ]
    }
  }),
  computed: {
    dates() {
      return this.$store.state.dates;
    },
    temps() {
      return this.$store.state.temps;
    }
  },
  watch: {
    dates(newDates, oldCount) {
      this.bar.xAxis.data = newDates;
    },
    temps(newTemps, oldCount) {
      this.bar.series[0].data = newTemps;
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