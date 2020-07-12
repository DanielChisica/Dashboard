<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card v-if="usersData.series.length>0"
                    title="Users behavior"
                    sub-title="24 Hours performance"
                    :chart-data="usersData"
                    :chart-options="usersChart.options">
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card v-if="preferencesData.series.length>0"
                    title="Email Statistics"
                    sub-title="Last campaign performance"
                    :chart-data="preferencesData"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card v-if="activityData.series.length>0"
                    title="2015 Sales"
                    sub-title="All products including Taxes"
                    :chart-data="activityData"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Tesla Model S
            <i class="fa fa-circle text-warning"></i> BMW 5 Series
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
  import {StatsCard, ChartCard} from "@/components/index";
  import Chartist from 'chartist';
  import axios from 'axios';

  export default {
    components: {
      StatsCard,
      ChartCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data() {
      return {
        statsCards: [],
        usersChart: {
          data: {
            labels: [],
            series: []
          },
          options: {
            low: 0,
            high: 1000,
            showArea: true,
            height: "245px",
            axisX: {
              showGrid: false
            },
            lineSmooth: Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false
          }
        },
        activityChart: {
          data: {
            labels: [],
            series: []
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: "245px"
          }
        },
        preferencesChart: {
          data: {
            labels: [],
            series: []
          },
          options: {}
        }
      }
    },
    async beforeMount() {
       await axios.get('https://my-json-server.typicode.com/DanielChisica/graphsAPI/db').then(response => {
        this.statsCards = response.data.stats
        this.usersChart.data.labels = response.data.users.periods
        this.usersChart.data.series = response.data.users.series
        this.activityChart.data.labels = response.data.activity.months
        this.activityChart.data.series = response.data.activity.series
        this.preferencesChart.data.labels = response.data.preferences.percentages
        this.preferencesChart.data.series = response.data.preferences.series

      })
    },
    computed:{
      usersData(){
        return this.usersChart.data
      },
      preferencesData(){
        return this.preferencesChart.data
      },
      activityData(){
        return this.activityChart.data
      }
    }
  };
</script>
<style>
</style>
