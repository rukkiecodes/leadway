<template>
  <v-col cols="12">
    <v-card class="rounded-xl card" flat>
      <v-card-title>
        <v-btn
          :class="active ? 'text-indigo font-weight-bold' : 'text-grey'"
          variant="text"
          class="text-body-2 text-uppercase"
          @click="active = true"
          >btc/usd</v-btn
        >
        <v-btn
          :class="
            !active ? 'text-indigo font-weight-bold' : 'text-grey-darken-3'
          "
          variant="text"
          class="ml-2 text-body-2 text-uppercase"
          @click="active = false"
          >eth</v-btn
        >
      </v-card-title>

      <v-card-text v-show="active">
        <BTC />
      </v-card-text>
      <v-card-text v-show="!active">
        <ETH />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import BTC from "./exchangeComponents/BTC.vue";
import ETH from "./exchangeComponents/ETH.vue";
export default {
  components: {
    BTC,
    ETH
  },

  data: () => ({
    active: true,
  }),
};
</script>

<style scoped>
@import "../../../../assets/style/home.css";
</style>