<template>
  <v-container class="py-0">
    <v-row justify="start" dense>
      <v-col cols="12" sm="6" v-for="copy in allCopies" :key="copy?.id">
        <v-card flat class="mx-1 pa-2 d-flex card rounded-xl mb-1">
          <v-avatar class="mr-2" size="30">
            <v-img :src="copy?.image" cover />
          </v-avatar>
          <v-card-text class="pa-0 d-flex flex-column flex-wrap">
            <v-card-title
              class="py-1 pb-0 px-0 mt-n1 text-body-2 font-weight-black"
              >{{ copy?.name }}</v-card-title
            >
            <v-card-text
              class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
            >
              <span>Wins</span>
              <span>{{ copy?.wins }}</span>
            </v-card-text>
            <v-card-text
              class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
            >
              <span>Losses</span>
              <span>{{ copy?.losses }}</span>
            </v-card-text>
            <v-card-text
              class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
            >
              <span>Profit</span>
              <span>{{ copy?.profit }}</span>
            </v-card-text>
            <v-card-text
              class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
            >
              <span>Rate</span>
              <span>{{ copy?.rate }}</span>
            </v-card-text>
            <v-card-text
              class="text-caption px-0 py-0 mt-1 d-flex justify-space-between"
            >
              <span class="text-caption">currency</span>
              <span class="text-caption">{{ copy?.currency }}</span>
            </v-card-text>
          </v-card-text>

          <v-btn
            @click="
              profile?.copies != undefined && profile?.copies.includes(copy?.id)
                ? uncopyTrader(copy?.id)
                : copyTrader(copy?.id)
            "
            icon
            flat
            class="mr-2"
            size="30"
            :color="
              profile?.copies != undefined && profile?.copies.includes(copy?.id)
                ? 'amber'
                : 'green'
            "
          >
            <i
              class="text-white"
              :class="
                profile?.copies != undefined &&
                profile?.copies.includes(copy?.id)
                  ? 'las la-check'
                  : 'lar la-copy'
              "
            ></i>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["copyTrader", "uncopyTrader"]),
  },

  computed: {
    ...mapGetters(["allCopies"]),

    ...mapState(["profile"]),
  },
};
</script>
