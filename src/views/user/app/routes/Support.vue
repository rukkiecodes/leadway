<template>
  <v-container class="py-0">
    <v-card
      flat
      height="90vh"
      color="transparent"
      class="d-flex flex-column card rounded-xl"
    >
      <div class="pa-4 overflow-auto chatSheet">
        <div
          v-for="chats in chat"
          :key="chats.id"
          :class="
            chats.user == user
              ? 'd-flex justify-end mt-4'
              : 'd-flex justify-start mt-4'
          "
          style="width: 100%"
        >
          <v-card
            min-width="4"
            max-width="70%"
            :class="
              chats.user == user
                ? 'bg-indigo rounded-xl rounded-te-0'
                : 'bg-white rounded-xl rounded-ts-0'
            "
          >
            <v-card-text class="pa-2 text-caption">
              {{ chats.message }}</v-card-text
            >
          </v-card>
        </div>
      </div>
      <v-toolbar class="px-4 pr-2">
        <v-text-field
          hide-details
          color="indigo"
          density="compact"
          variant="outlined"
          placeholder="Aa..."
          v-model="support.message"
          @keypress.enter="sendMessage"
        />
        <v-btn
          @click="sendMessage"
          :loading="support.loading"
          variant="tonal"
          class="ml-4 bg-indigo"
          :height="39"
        >
          <i class="las la-paper-plane icon mr-2"></i>
          <span class="text-capitalize text-caption">Send</span>
        </v-btn>
      </v-toolbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    user: "",
  }),

  methods: {
    ...mapActions(["sendMessage"]),

    scroolToBottom() {
      const chatSheet = document.querySelector(".chatSheet");
      chatSheet.scrollTop = chatSheet.scrollHeight - chatSheet.clientHeight;
    },
  },

  updated() {
    this.scroolToBottom();
  },

  mounted() {
    this.$nextTick(() => {
      this.scroolToBottom();
      this.user = localStorage.leadwayToken;
    });
  },

  computed: {
    ...mapState(["support"]),
    ...mapGetters(["chat"]),
  },
};
</script>

<style scoped>
.chatSheet {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 80vh;
}

.chatSheet::-webkit-scrollbar {
  width: 5px;
}

@media (max-width: 768px) {
  .chatSheet::-webkit-scrollbar {
    width: 0px;
  }
}

.chatSheet::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>