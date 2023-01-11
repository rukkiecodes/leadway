<template>
  <v-card-title class="pl-0 d-flex align-center">
    <v-avatar size="34" class="mr-3">
      <v-img src="@/assets/images/XTVCBTC--big.svg" />
    </v-avatar>
    Bitcoin / U.S. Dollar
  </v-card-title>
  <v-card-title class="pl-0 text-h5 pb-0" id="btcPrice">
    <small style="font-size: 0.6rem">USD</small></v-card-title
  >
  <!-- v-card-title class="pl-0 text-body-1 pt-0 text-red-lighten-1">
    −70.00 −0.42%
  </v-card-title -->

  <canvas id="btcChart"></canvas>
</template>

<script>
export default {
  updated() {
    this.updateBitcoinPrice();
    this.printBtcChart();
  },

  mounted() {
    this.$nextTick(() => {
      this.updateBitcoinPrice();
      this.printBtcChart();
    });
  },

  methods: {
    async btcData() {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146"
      );
      const json = await response.json();
      const data = json.Data.Data;
      const times = data.map((obj) => obj.time);
      const prices = data.map((obj) => obj.high);
      return {
        times,
        prices,
      };
    },

    checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    },

    async printBtcChart() {
      let createBtcChart;
      let { times, prices } = await this.btcData();

      let btcChart = document.getElementById("btcChart").getContext("2d");

      let gradient = btcChart.createLinearGradient(0, 0, 0, 400);

      gradient.addColorStop(0, "rgba(247,147,26,.5)");
      gradient.addColorStop(0.425, "rgba(255,193,119,0)");

      Chart.defaults.global.defaultFontFamily = "Red Hat Text";
      Chart.defaults.global.defaultFontSize = 12;

      createBtcChart = new Chart(btcChart, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "$",
              data: prices,
              backgroundColor: gradient,
              borderColor: "rgba(247,147,26,1)",
              borderJoinStyle: "round",
              borderCapStyle: "round",
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 10,
              lineTension: 0.2,
            },
          ],
        },

        options: {
          title: {
            display: false,
            text: "Heckin Chart!",
            fontSize: 35,
          },

          legend: {
            display: false,
          },

          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },

          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {},
              },
            ],
            yAxes: [
              {
                display: false,
                gridLines: {},
              },
            ],
          },

          tooltips: {
            callbacks: {
              //This removes the tooltip title
              title: function () {},
            },
            //this removes legend color
            displayColors: false,
            yPadding: 10,
            xPadding: 10,
            position: "nearest",
            caretSize: 10,
            backgroundColor: "rgba(255,255,255,.9)",
            bodyFontSize: 15,
            bodyFontColor: "#303030",
          },
        },
      });
    },

    async updateBitcoinPrice() {
      let { times, prices } = await this.btcData();
      let currentPrice = prices[prices.length - 1].toFixed(2);

      document.getElementById("btcPrice").innerHTML = "$" + currentPrice;
    },
  },
};
</script>

<style scoped>
#btcChart {
  max-height: 250px;
}
</style>
