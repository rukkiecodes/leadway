<template>
  <v-navigation-drawer border="0" width="300" location="right" :color="color" v-model="drawer.rightDrawer">
    <template v-slot:prepend>
      <div class="pa-1">
        <v-toolbar density="compact" color="transparent">
          <v-toolbar-title class="text-body-2 font-weight-regular">
            Transactions
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn :disabled="allTransactions.length <= 0" to="/app/transactions" variant="text" size="small"
            class="text-capitalize">
            See More
          </v-btn>
        </v-toolbar>
      </div>
    </template>
    <v-card v-if="allTransactions.length <= 0" flat color="transparent" height="100%" class="pt-16">
      <v-img src="@/assets/images/empty.svg" width="90%" />
      <v-card-text class="text-center text-body-1">
        No transactions yet
      </v-card-text>
    </v-card>
    <v-card flat v-else :key="transaction.id" v-for="transaction in allTransactions.slice(0, 20)"
      class="mx-1 pa-2 d-flex card rounded-xl mb-1">
      <TransactionUserInfo :transaction="transaction" />
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { useDisplay } from "vuetify";
import { mapGetters, mapState } from "vuex";
import TransactionUserInfo from "./components/TransactionUserInfo.vue";
export default {
  components: {
    TransactionUserInfo,
  },

  created() {
    this.drawerVisibility();
  },

  methods: {
    drawerVisibility() {
      switch (useDisplay().name.value) {
        case "xs":
          return (this.drawer.rightDrawer = false);
        case "sm":
          return (this.drawer.rightDrawer = false);
        case "md":
          return (this.drawer.rightDrawer = false);
        case "lg":
          return (this.drawer.rightDrawer = true);
        case "xl":
          return (this.drawer.rightDrawer = true);
        case "xxl":
          return (this.drawer.rightDrawer = true);
      }
    },
  },

  computed: {
    ...mapGetters(["allTransactions"]),

    ...mapState(["drawer"]),

    color() {
      switch (useDisplay().name.value) {
        case "xs":
          return "white";
        case "sm":
          return "white";
        case "md":
          return "white";
        case "lg":
          return "transparent";
        case "xl":
          return "transparent";
        case "xxl":
          return "transparent";
      }
    },
  },
};
</script>

<style>
@import "@/assets/style/home.css";
</style>