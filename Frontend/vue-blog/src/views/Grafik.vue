<template>
  <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
</template>
<script>
import Axios from 'axios'
import stockInit from 'highcharts/modules/stock';
export default {
    name: "Demo",    
    data() {
      return {        
        stockOptions: {
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                    ]
                },
                style: {
                fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },    
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                 style: {
                    color: '#E0E0E3'
                 },
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value;
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        olor: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
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
                //compare: 'percent',
                showInNavigator: true,
                dataLabels: {
                    color: '#F0F0F3',
                    style: {
                        fontSize: '13px'
                    }
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
            fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            }
        },
        legend: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            },
            title: {
                style: {
                    color: '#C0C0C0'
                }
            }
        },
        credits: {
            style: {
                color: '#666'
            }
        },
        labels: {
            style: {
                color: '#707073'
            }
        },
        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },
        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },
        tooltip: {
            formatter: function () { 
                //(new Date(this.x)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]       
            return ['<b>' + this.x + '</b>'].concat(
                this.points ?
                    this.points.map(function (point) {
                        switch(point.series.name){
                            case 'Activ Power':
                                return point.series.name + ': ' + point.y + 'kWt';
                            case 'Reactiv Power':
                                return point.series.name + ': ' + point.y + 'kW';
                        }                        
                    }) : []
                );
            },
           
            valueDecimals: 2,
            split: true
        },
        series: [{
            data: [],
            name: 'Apple'
          }]
        },
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },
        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },
        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
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
            Axios.get('http://127.0.0.1:8000/api/v1/graf/').then((r) => {
            let activPower = [];
            let reactivPowe = [];            
            for (let i = 0; i < r.data.length; i++) {                            
                activPower.push([Date.parse(r.data[i].time)+7200000,+r.data[i].activPower]);
                reactivPowe.push([Date.parse(r.data[i].time)+7200000,+r.data[i].reactivPower]);                
            };
            _this.stockOptions.series = [{name:'Activ Power',data :activPower},{name:'Reactiv Power',data :reactivPowe}]
        })
      }
    }
  }
</script>
<style scoped>
.stock {
  width: 100%;
  margin: 0 auto
}
</style>