<template>
  <v-container
    class="fullContainer py-0 d-flex flex-column align-center justify-start"
  >
    <v-card
      v-if="allTrades.length <= 0"
      flat
      color="transparent"
      height="100%"
      class="pt-16"
    >
      <v-img src="@/assets/images/empty.svg" width="400" />
      <v-card-text class="text-center text-body-1">
        No copied trader yet
      </v-card-text>
    </v-card>
    <v-card
      flat
      v-else
      width="500"
      max-width="100%"
      :key="trader?.id"
      class="rounded-xl mb-4 glass"
      color="transparent"
      v-for="trader in allTrades"
      :disabled="trader?.isDeleted"
    >
      <v-card-text class="d-flex justify-space-between align-center">
        <div class="d-flex">
          <v-avatar size="60" rounded="0" class="rounded-lg">
            <v-img
              cover
              :src="
                trader?.image != undefined
                  ? trader?.image
                  : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
              "
              :alt="trader?.name"
            />
          </v-avatar>
          <div class="d-flex flex-column align-start justify-start">
            <span class="ml-4 text-h6">{{ trader?.name }}</span>
            <span class="ml-4 text-body-1 mt-n1"
              >{{ trader?.currency == undefined ? "BTC" : trader?.currency }},
              <span
                :class="
                  trader?.profitLoss == 'PROFIT' ? 'text-green' : 'text-red'
                "
                >{{ trader?.rate }}</span
              ></span
            >
            <span class="ml-4 text-body-1 mt-3"
              >{{ trader?.from == undefined ? trader?.losses : trader?.from }}
              <i class="las la-arrow-right"></i>
              {{ trader?.to == undefined ? trader?.wins : trader?.to }}</span
            >
          </div>
        </div>
        <v-btn
          flat
          size="small"
          @click="uncopyTrader(trader?.id)"
          class="bg-red text-capitalize"
        >
          Delete
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    activeDialog: false,
  }),

  methods: {
    ...mapActions(["uncopyTrader"]),
  },

  computed: {
    ...mapGetters(["allTrades"]),
  },
};
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.55) !important;
  backdrop-filter: blur(7.5px) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
}
</style>