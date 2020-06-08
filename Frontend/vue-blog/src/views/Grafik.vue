<template>
  <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
</template>

<script>
import Axios from 'axios'
import stockInit from 'highcharts/modules/stock'
export default {
    name: "Demo",
    data() {
      return {
        stockOptions: {
          yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },
          series: [{
            data: [],
            name: 'Apl'

          }]
        },
        polling: null
      }
    },
    created() {
      this.fetchData()
      this.polling = setInterval(this.fetchData, 10000)
    },
    beforeDestroy() {
      clearInterval(this.polling)
    },
    methods: {
      fetchData() {
        let _this = this

        Axios.get("https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/aapl-c.json").then((r) => {
          _this.stockOptions.series[0].data = r.data
        })
      }
    }
  }
</script>
<style scoped>
.stock {
  width: 70%;
  margin: 0 auto
}
</style>