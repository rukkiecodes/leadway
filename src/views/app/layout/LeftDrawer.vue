<template>
  <v-navigation-drawer v-model="drawer.leftDrawer" :color="color" border="0">
    <v-list>
      <v-list-item active-color="transparent" to="/app">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Dashboard</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-rocket icon"></i>
          </v-avatar>
        </template>
      </v-list-item>

      <DepositFundDialog />

      <WithdrawFunds />

      <v-list-item active-color="transparent" to="/app/transactions">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Transactions</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-chart-bar icon"></i>
          </v-avatar>
        </template>
      </v-list-item>

      <v-list-item active-color="transparent" to="/app/copytrade">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Copy Trader</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-chart-pie icon"></i>
          </v-avatar>
        </template>
      </v-list-item>

      <v-list-item active-color="transparent" to="/app/tradeMonitor">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Trade Monitor</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-chart-area icon"></i>
          </v-avatar>
        </template>
      </v-list-item>

      <v-list-item active-color="transparent" to="/app/support">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Support</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-sms icon"></i>
          </v-avatar>
        </template>
      </v-list-item>

      <v-list-item active-color="transparent" to="/app/profile">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Profile</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-user-alt icon"></i>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          flat
          block
          variant="tonal"
          @click="logoutUser"
          class="text-capitalize text-red rounded-lg"
        >
          <i class="las la-sign-out-alt icon mr-2"></i>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useDisplay } from "vuetify";
import { mapActions, mapState } from "vuex";
import DepositFundDialog from "./components/DepositFunds.vue";
import WithdrawFunds from "./components/WithdrawFunds.vue";

export default {
  components: {
    DepositFundDialog,
    WithdrawFunds,
  },

  created() {
    this.drawerVisibility();
  },

  methods: {
    ...mapActions(["logoutUser"]),

    drawerVisibility() {
      switch (useDisplay().name.value) {
        case "xs":
          return (this.drawer.leftDrawer = false);
        case "sm":
          return (this.drawer.leftDrawer = false);
        case "md":
          return (this.drawer.leftDrawer = false);
        case "lg":
          return (this.drawer.leftDrawer = true);
        case "xl":
          return (this.drawer.leftDrawer = true);
        case "xxl":
          return (this.drawer.leftDrawer = true);
      }
    },
  },

  computed: {
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

.icon {
  font-size: 1.5em;
}
</style>
