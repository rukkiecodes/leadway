<template>
  <v-col cols="12" sm="6">
    <v-card class="rounded-xl card" flat>
      <v-card-text>
        <v-row no-gutters justify="space-between">
          <v-col cols="4">
            <v-card-title class="text-caption text-grey-darken-1 pb-0 px-0 text-uppercase">Investment</v-card-title>
            <v-card-text class="text-h5 text-grey-darken-3 pt-0 font-weight-black px-0">${{
            (profile?.investment != undefined && profile?.investment
              ? profile?.investment
              : 0
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}</v-card-text>
            <v-card-title class="text-caption text-grey-darken-1 pb-0 mt-n1 pt-0 px-0">Bitcoin(btc)</v-card-title>
            <v-card-text class="text-body-1 text-grey-darken-3 pt-0 font-weight-black px-0">{{
              profile?.investmentBTC != undefined && profile?.investmentBTC
              ? profile?.investmentBTC
              : 0
            
            }}</v-card-text>
          </v-col>
          <v-col cols="8" class="d-flex align-end">
            <Line :data="data" :options="options" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { mapState } from "vuex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  components: { Line },

  data: () => ({
    data: {
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "investments",
          backgroundColor: "#3F51B5",
          fill: false,
          type: "line",
          id: "y-axis-1",
          data: [0, 50, 20, 60, 20, 100, 150, 50, 60, 55, 100, 120],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
    },
  }),

  computed: {
    ...mapState(["profile"]),
  },
};
</script>

<style scoped>
@import "@/assets/style/home.css";
</style>