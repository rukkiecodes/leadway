<template>
  <v-dialog v-model="withdraw.dialog" width="400" max-width="100%">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" active-color="transparent">
        <v-list-item-title class="text-grey-darken-4 text-body-2">Withdraw</v-list-item-title>
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-cash-register icon"></i>
          </v-avatar>
        </template>
      </v-list-item>
    </template>

    <v-card class="rounded-xl">
      <v-card-title> Withdraw fund </v-card-title>
      <v-card-text>
        <v-select density="compact" variant="outlined" v-model="withdraw.currency" label="Choose cryptocurrency"
          :items="['Bitcoin', 'Ethereum', 'USDT', 'BNB smart chain']" />
        <v-text-field type="number" label="Amount" density="compact" variant="outlined" v-model="withdraw.amount" />
        <v-text-field density="compact" variant="outlined" placeholder="Your wallet address"
          v-model="withdraw.address" />
        <v-text-field density="compact" variant="outlined" placeholder="ENter withdraw pin" v-model="pin" />
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="withdrawFund" :disabled="pin != profile?.pin" :loading="withdraw.loading"
          class="text-capitalize bg-indigo rounded-xl">Withdraw</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    pin: '',
  }),

  methods: {
    ...mapActions(["withdrawFund"]),

    copyAddress() {
      navigator.clipboard.writeText(this.withdraw.address);
      this.withdraw.copyText = "Copied";
      setTimeout(() => {
        this.withdraw.copyText = "Copy";
      }, 2000);
    },
  },

  computed: {
    ...mapState(["withdraw", "profile"]),
  },
};
</script>