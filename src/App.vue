<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <!-- grepper set vuetify3 snackbar position -->
    <v-snackbar
      v-model="snackbar.snackbar.active"
      :color="snackbar.snackbar.bg"
      close-on-back
      location="top right"
      absolute
    >
      {{ snackbar.snackbar.text }}

      <template v-slot:actions>
        <v-btn
          icon
          size="small"
          variant="text"
          @click="snackbar.snackbar.active = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- end grepper -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["snackbar"]),
  },
};
</script>

<style>
@import "@/assets/icon/css/line-awesome.min.css";

.glass {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(7.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.fullContainer {
  height: 100%;
}
</style>