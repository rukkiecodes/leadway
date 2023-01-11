<template>
  <v-dialog v-model="deposit.dialog" width="400" max-width="100%">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" active-color="transparent">
        <v-list-item-title class="text-grey-darken-4 text-body-2">Deposit Funds</v-list-item-title>
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-wallet icon"></i>
          </v-avatar>
        </template>
      </v-list-item>
    </template>

    <v-card class="rounded-xl">
      <v-card-title> Fund account </v-card-title>
      <v-card-text width="100%" class="d-flex justify-center align-center">
        <v-avatar rounded="0" size="150">
          <v-img v-if="deposit.currency == 'Bitcoin'" src="@/assets/images/bitcoin.jpg" />
          <v-img v-else-if="deposit.currency == 'Ethereum'" src="@/assets/images/ethereum.jpg" />
          <v-img v-else-if="deposit.currency == 'USDT'" src="@/assets/images/USDT.jpg" />
          <v-img v-else-if="deposit.currency == 'BnB'" src="@/assets/images/BnB.jpg" />
          <v-img v-else src="@/assets/images/bitcoin.jpg" />
        </v-avatar>
      </v-card-text>
      <v-card-text>
        <v-select @update:menu="selectCurrency" density="compact" variant="outlined" v-model="deposit.currency"
          label="Choose cryptocurrency" :items="['Bitcoin', 'Ethereum', 'USDT', 'BnB']" />
        <v-text-field type="number" label="Amount" density="compact" variant="outlined" v-model="deposit.amount" />
        <div class="d-flex">
          <v-text-field disabled readonly density="compact" variant="outlined" v-model="deposit.address" />
          <v-btn @click="copyAddress" flat class="bg-indigo ml-4" :height="39">{{ deposit.copyText }}</v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="depositFund" :loading="deposit.loading"
          class="text-capitalize bg-indigo rounded-xl">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["depositFund"]),

    copyAddress() {
      navigator.clipboard.writeText(this.deposit.address);
      this.deposit.copyText = "Copied";
      setTimeout(() => {
        this.deposit.copyText = "Copy";
      }, 2000);
    },

    selectCurrency() {
      // console.log(this.deposit.currency)
      this.deposit.address = this.deposit.currency == 'Bitcoin' ? "1FWgBvNQ9Cy5PWdzG9YNDD1hv7WEpVPy5L" : this.deposit.currency == 'Ethereum' ? "0xe58ad656244e17c5f51c91834276f1774671a2c7" : this.deposit.currency == 'USDT' ? "TXsqcr5PeN7SZcE2JLQK1AZFjmTXWUyou7" : this.deposit.currency == 'BnB' ? '0xe58ad656244e17c5f51c91834276f1774671a2c7' : "1FWgBvNQ9Cy5PWdzG9YNDD1hv7WEpVPy5L";
    },
  },

  computed: {
    ...mapState(["deposit"]),
  },
};
</script>