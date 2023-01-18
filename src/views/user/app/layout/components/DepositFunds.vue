<template>
  <v-dialog v-model="deposit.dialog" width="400" max-width="100%" persistent>
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" active-color="transparent">
        <v-list-item-title class="text-grey-darken-4 text-body-2"
          >Deposit Funds</v-list-item-title
        >
        <template v-slot:prepend>
          <v-avatar class="rounded-lg card" rounded="0">
            <i class="las la-wallet icon"></i>
          </v-avatar>
        </template>
      </v-list-item>
    </template>

    <v-card class="rounded-xl">
      <v-card-title> Fund account </v-card-title>
      <v-card-text class="bg-red-lighten-4" v-if="deposit.step == 2">
        <span class="text-red-darken-4">
          Please send only ({{ deposit.currency }}) choice of crypto to this address,
          sending any other token to this address may result to loss
        </span>
      </v-card-text>
      <v-card-text
        v-if="deposit.step == 2"
        width="100%"
        class="d-flex justify-center align-center"
      >
        <v-avatar rounded="0" size="150">
          <v-img
            v-if="deposit.currency == 'Bitcoin'"
            src="@/assets/images/bitcoin.jpg"
          />
          <v-img
            v-else-if="deposit.currency == 'Ethereum'"
            src="@/assets/images/ethereum.jpg"
          />
          <v-img
            v-else-if="deposit.currency == 'USDT'"
            src="@/assets/images/USDT.jpg"
          />
          <v-img
            v-else-if="deposit.currency == 'BnB'"
            src="@/assets/images/BnB.jpg"
          />
          <v-img v-else src="@/assets/images/bitcoin.jpg" />
        </v-avatar>
      </v-card-text>
      <v-card-text>
        <v-select
          @update:menu="selectCurrency"
          density="compact"
          variant="outlined"
          v-model="deposit.currency"
          label="Choose cryptocurrency"
          :items="['Bitcoin', 'Ethereum', 'USDT', 'BnB']"
          v-if="deposit.step == 1"
        />
        <v-text-field
          min="0"
          step=".1"
          type="number"
          label="Amount"
          density="compact"
          variant="outlined"
          v-model="deposit.amount"
          v-if="deposit.step == 1"
        />
        <div v-if="deposit.step == 2" class="d-flex">
          <v-text-field
            disabled
            readonly
            density="compact"
            variant="outlined"
            v-model="deposit.address"
          />
          <v-btn
            @click="copyAddress"
            flat
            class="bg-indigo ml-4"
            :height="39"
            >{{ deposit.copyText }}</v-btn
          >
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          @click="closeDialog"
          class="text-capitalize bg-indigo rounded-xl"
          v-if="deposit.step == 2"
          >Done</v-btn
        >
        <v-btn
          block
          @click="depositFund"
          :loading="deposit.loading"
          class="text-capitalize bg-indigo rounded-xl"
          v-if="deposit.step == 1"
          >Submit</v-btn
        >
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
      this.deposit.address =
        this.deposit.currency == "Bitcoin"
          ? "bc1qezyrwhanh7fmpa8ksfm6l55vc58ssehaknj83p"
          : this.deposit.currency == "Ethereum"
          ? "0xf953a9EA3a1C8399feaebd657483754571480Dc1"
          : this.deposit.currency == "USDT"
          ? "TDCUVsWMuRGw52p6q3vbeeL2rMP1X38suV"
          : this.deposit.currency == "BnB"
          ? "0xf953a9EA3a1C8399feaebd657483754571480Dc1"
          : "bc1qezyrwhanh7fmpa8ksfm6l55vc58ssehaknj83p";
    },

    closeDialog() {
      this.deposit.dialog = false;
      this.deposit.step = 1;
    },
  },

  computed: {
    ...mapState(["deposit"]),
  },
};
</script>