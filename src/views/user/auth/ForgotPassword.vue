<template>
  <div class="background">
    <div class="gradient"></div>
    <div class="formContainer">
      <v-card width="400" max-width="98%" class="formCard" theme="dark" flat>
        <v-card-title>Welcome back</v-card-title>
        <v-card-text>Enter your email and password below</v-card-text>

        <v-card-text>
          <v-text-field
            label="Email"
            variant="underlined"
            placeholder="example@mail.com"
            prepend-inner-icon="mdi-email"
          />

          <v-text-field
            hide-details
            label="password"
            color="red"
            variant="underlined"
            prepend-inner-icon="mdi-lock"
            placeholder="Don't worry we are not looking"
          />

          <v-card-actions class="px-0 mt-4">
            <v-btn class="bg-indigo text-capitalize" flat block :loading="false"
              >Login</v-btn
            >
          </v-card-actions>

          <v-card-actions class="px-0 mt-0">
            <router-link
              to="/forgotPassword"
              class="text-decoration-none text-caption"
              >Forgot password?</router-link
            >
            <v-spacer />
            <router-link
              to="/register"
              class="text-decoration-none text-caption"
              >Don't have an account?</router-link
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </div>
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import init from "@/assets/globe";
export default {
  mounted() {
    this.$nextTick(() => {
      init();
    });
  },
};
</script>

<style scoped>
@import "./assets/login.css";
</style>