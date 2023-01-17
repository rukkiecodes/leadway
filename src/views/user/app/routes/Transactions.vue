<template>
  <v-container class="fullContainer py-0">
    <v-sheet class="overflow-y-auto overflow-x-hidden transactionSheet" color="transparent" height="100%">
      <v-row justify="space-between" dense>
        <v-col
          cols="12"
          sm="6"
          v-for="transaction in allTransactions"
          :key="transaction.id"
        >
          <v-card flat class="mx-1 pa-2 d-flex card rounded-xl mb-1">
            <TransactionUserInfo :transaction="transaction" />
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import TransactionUserInfo from "./transactionComponents/TransactionUserInfo.vue";
export default {
  components: {
    TransactionUserInfo,
  },

  computed: {
    ...mapGetters(["allTransactions"]),
  },
};
</script>

<style scoped>
.transactionSheet::-webkit-scrollbar {
  width: 5px;
}

@media (max-width: 768px) {
  .transactionSheet::-webkit-scrollbar {
    width: 0px;
  }
}

.transactionSheet::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>