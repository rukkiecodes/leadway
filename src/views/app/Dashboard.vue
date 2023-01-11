<template>
  <div class="dashBoardBackground">
    <div class="gradient"></div>
    <v-layout class="app">
      <LeftDrawer />
      <RightDrawer />

      <AppBarVue />

      <v-main class="main">
        <router-view />
      </v-main>
    </v-layout>
    <canvas class="webgl"></canvas>
    <div class="globeCover"></div>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card class="rounded-xl">
        <v-card-title>Hello, {{ profile?.name }}</v-card-title>
        <v-card-text>
          <span class="text-body-2">
            Welcome to our Leadway Finance! We're excited to have you here.
            Please kindly Enter a pin to be used for your withdrawals.
          </span>

          <v-text-field v-model="pin" @keypress.enter="updatePin" type="number" variant="outlined" density="compact"
            :counter="3" :maxlength="3" placeholder="Enter PIN" class="pt-4" hide-details />
        </v-card-text>
        <v-card-actions>
          <v-btn class="text-capitalize bg-indigo rounded-xl" block @click="updatePin" :loading="loading">Set
            Pin</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase';
import { doc, updateDoc } from '@firebase/firestore';
import { mapActions, mapState } from "vuex";
import AppBarVue from "./layout/AppBar.vue";
import LeftDrawer from "./layout/LeftDrawer.vue";
import RightDrawer from "./layout/RightDrawer.vue";
export default {
  data: () => ({
    dialog: false,
    pin: '',
    loading: false,
  }),

  components: {
    AppBarVue,
    LeftDrawer,
    RightDrawer,
  },

  mounted() {
    this.$nextTick(() => {
      this.getProfile();
      this.getTransactions();
      this.getChat();
      this.getAllCoppies();

      let main = document.querySelector(".main");
      main.style.height = window.innerHeight + "px";

      window.addEventListener("resize", () => {
        main.style.height = window.innerHeight + "px";
      });

      setTimeout(() => {
        if (this.profile?.pin == undefined) this.dialog = true;
        else this.dialog = false;
      }, 5000);
    });
  },

  methods: {
    ...mapActions([
      "getProfile",
      "getTransactions",
      "getChat",
      "getAllCoppies"
    ]),

    updatePin() {
      if (this.pin.length < 4) return;

      this.loading = true;
      updateDoc(doc(db, 'users', localStorage.leadwayToken), {
        pin: this.pin
      })
        .then(() => {
          this.dialog = false;
          this.pin = null;
          this.loading = false;
          this.getProfile();
          this.snackbar.active = true;
          this.snackbar.text = "Pin updated successfully\nIf you forget your pin, Please kindly contact customer support for assistance and your pin will be sent to your mail\nYou're Good To Go ✅";
          this.snackbar.color = "success";
        })
    }
  },

  computed: {
    ...mapState(["profile", "snackbar"]),
  }
};
</script>

<style>
@import "../../assets/style/dashboard.css";
</style>