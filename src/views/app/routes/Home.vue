<template>
  <v-container class="home">
    <v-row justify="space-between">
      <Investments />
      <Earnings />
      <Exchange />
    </v-row>
  </v-container>
</template>

<script>
import Earnings from "./homeComponents/Earnings.vue";
import Investments from "./homeComponents/Investments.vue";
import Exchange from "./homeComponents/Exchange.vue";
export default {
  components: {
    Earnings,
    Investments,
    Exchange
  },
};
</script>

<style scoped>
@import "../../../assets/style/home.css";
</style>