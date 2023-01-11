<template>
  <div class="background">
    <div class="gradient"></div>
    <div class="formContainer">
      <v-card
        width="400"
        max-width="98%"
        class="formCard card rounded-xl"
        theme="dark"
        flat
      >
        <v-card-title>Welcome back</v-card-title>
        <v-card-text>Enter your email and password below</v-card-text>

        <v-card-text>
          <v-text-field
            type="email"
            label="Email"
            :rules="emailRules"
            variant="underlined"
            placeholder="example@mail.com"
            prepend-inner-icon="mdi-email"
            v-model="login.credentials.email"
          />

          <v-text-field
            label="password"
            variant="underlined"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock"
            @click:append="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
            v-model="login.credentials.password"
            placeholder="Don't worry we are not looking"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          />

          <v-card-actions class="px-0 mt-4">
            <v-btn
              flat
              height="40"
              style="flex: 1"
              @click="loginUser"
              :loading="login.loading"
              class="bg-indigo text-capitalize rounded-lg"
              >Login</v-btn
            >
            <!-- <v-btn
              icon
              flat
              size="small"
              @click="googleLogin"
              :loading="login.googleLoading"
              class="bg-red text-capitalize px-0"
            >
              <v-icon color="white">mdi-google</v-icon>
            </v-btn> -->
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
import { mapActions, mapState } from "vuex";
import init from "../../assets/globe";
export default {
  data: () => ({
    passwordRules: [(v) => !!v || "Password is required"],
    emailRules: [(v) => !!v || "Email is required"],
    show1: false,
  }),

  mounted() {
    this.$nextTick(() => {
      init();
    });
  },

  methods: {
    ...mapActions(["loginUser", "googleLogin"]),
  },

  computed: {
    ...mapState(["login"]),
  },
};
</script>

<style scoped>
@import "./assets/login.css";
</style>