<template>
  <v-card-title class="d-flex align-center">
    <v-avatar size="34" class="mr-3">
      <v-img src="https://res.cloudinary.com/rukkiecodes/image/upload/v1674077189/XTVCETH--big_usxuh5.svg" />
    </v-avatar>
    Ethereum / U.S. Dollar
  </v-card-title>
  <v-card-title class="text-h5 pb-0" id="ethPrice">
    <small style="font-size: 0.6rem">USD</small></v-card-title
  >
  <!-- v-card-title class="pl-0 text-body-1 pt-0 text-red-lighten-1">
    −70.00 −0.42%
  </v-card-title -->
  <canvas id="ethereumChart"></canvas>
</template>
  
  <script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.updateEthereumPrice();
      this.printEthereumChart();
    });
  },

  methods: {
    async ethereumData() {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146"
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

    async updateEthereumPrice() {
      let { times, prices } = await this.ethereumData();
      let currentPrice = prices[prices.length - 1].toFixed(2);

      document.getElementById("ethPrice").innerHTML = "$" + currentPrice;
    },

    async printEthereumChart() {
      let createethereumChart;
      let { times, prices } = await this.ethereumData();

      let ethereumChart = document
        .getElementById("ethereumChart")
        .getContext("2d");

      let gradient = ethereumChart.createLinearGradient(0, 0, 0, 400);

      gradient.addColorStop(0, "rgba(78,56,216,.5)");
      gradient.addColorStop(0.425, "rgba(118,106,192,0)");

      Chart.defaults.global.defaultFontFamily = "Red Hat Text";
      Chart.defaults.global.defaultFontSize = 12;

      createethereumChart = new Chart(ethereumChart, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "$",
              data: prices,
              backgroundColor: gradient,
              borderColor: "rgba(118,106,192,1)",
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
  },
};
</script>

<style scoped>
#ethereumChart {
  max-height: 250px;
}
</style>
