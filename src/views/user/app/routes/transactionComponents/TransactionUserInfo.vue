<template>
  <v-avatar class="mr-2" size="30">
    <v-img :src="user?.avatar" cover />
  </v-avatar>
  <v-card-text class="pa-0 d-flex flex-column flex-wrap">
    <v-card-title class="py-1 pb-0 px-0 mt-n1 text-body-2 font-weight-black">{{
      user?.name
    }}</v-card-title>
    <v-card-text
      class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
    >
      <span>Amount</span>
      <span>{{ transaction?.amount }}</span>
    </v-card-text>
    <v-card-text
      class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
    >
      <span class="text-caption">currency</span>
      <span class="text-caption">{{ transaction?.currency }}</span>
    </v-card-text>
    <v-card-text
      class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
    >
      <span class="text-caption">Status</span>
      <span class="text-caption">{{ transaction?.state }}</span>
    </v-card-text>
    <v-card-text
      class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
    >
      <span class="text-caption">Type</span>
      <span class="text-caption">{{ transaction?.type }}</span>
    </v-card-text>
    <v-card-text
      class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
    >
      <span class="text-caption">Date</span>
      <span class="text-caption">{{
        transaction?.timestamp?.toDate().toDateString()
      }}</span>
    </v-card-text>
    <v-card-text
      class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
    >
      <span class="text-caption">Time</span>
      <span class="text-caption">{{
        transaction?.timestamp?.toDate().toLocaleTimeString("en-US")
      }}</span>
    </v-card-text>
  </v-card-text>
  <v-avatar class="mr-2" size="30">
    <v-img src="https://res.cloudinary.com/rukkiecodes/image/upload/v1674077189/XTVCBTC--big_vifjve.svg" cover></v-img>
  </v-avatar>
</template>

<script>
import { getDoc, doc } from "@firebase/firestore";
import { db } from "@/plugins/firebase";
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    user: null,
  }),

  mounted() {
    this.getUserData();
  },

  methods: {
    async getUserData() {
      const data = await (
        await getDoc(doc(db, "users", this.transaction.user))
      ).data();

      this.user = data;
    },
  },
};
</script>

<style>
</style>