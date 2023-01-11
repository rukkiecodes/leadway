<template>
  <v-app-bar class="appBar" color="transparent" flat>
    <v-app-bar-nav-icon
      @click.stop="drawer.leftDrawer = !drawer.leftDrawer"
      class="hidden-lg-and-up"
    ></v-app-bar-nav-icon>
    <v-app-bar-title class="hidden-xs text-body-1">
      <v-avatar class="mr-2" color="white">
        <v-img cover src="@/assets/images/logo.png" />
      </v-avatar>
      Blue<span class="text-indigo font-weight-bold">Zone</span>
    </v-app-bar-title>
    <v-spacer />
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-chip
          v-bind="props"
          color="white"
          style="cursor: pointer"
          class="py-5 pl-2 pr-5 mr-4 card"
        >
          <v-avatar class="mr-2" color="indigo">
            <v-img
              v-show="profile.avatar != undefined"
              :src="profile.avatar"
              cover
            />
            <i
              v-show="profile.avatar == undefined"
              class="las la-user-alt icon"
            ></i>
          </v-avatar>
          <span class="font-weight-bold text-body-2 text-grey-darken-3">{{
            profile.name
          }}</span>
        </v-chip>
      </template>

      <v-card
        min-width="300"
        max-width="100%"
        flat
        class="rounded-xl card"
        color="transparent"
        elevation="4"
      >
        <v-list class="card" color="transparent">
          <v-list-item :title="profile.name"> </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card-text>
          <v-btn block flat class="text-indigo rounded-lg text-capitalize"
            >Edit Profile</v-btn
          >
          <v-btn
            @click="logoutUser"
            block
            flat
            class="mt-4 text-red rounded-lg text-capitalize"
          >
            <i class="las la-sign-out-alt icon mr-2"></i>
            Logout
          </v-btn>
        </v-card-text>
      </v-card>
    </v-menu>

    <v-btn
      @click="drawer.rightDrawer = !drawer.rightDrawer"
      icon
      class="hidden-lg-and-up"
    >
      <i class="las la-chart-bar icon"></i>
    </v-btn>
  </v-app-bar>
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    menu: false,
  }),

  methods: {
    ...mapActions(["logoutUser"]),
  },

  computed: {
    ...mapState(["profile", "drawer"]),
  },
};
</script>

<style scoped>
@import "@/assets/style/home.css";
</style>