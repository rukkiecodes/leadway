<template>
  <v-container class="d-flex justify-center align-center profile">
    <v-card width="400" max-width="100%" class="dard" color="transparent" flat>
      <v-card-text class="d-flex justify-center align-center">
        <v-avatar color="indigo" size="100" @click="clickFileInput">
          <v-img v-if="profile.avatar != undefined" :src="profile.avatar" cover />
          <i v-else class="las la-user-alt icon"></i>
        </v-avatar>
        <v-file-input @change="pickAvatar" class="d-none" ref="fileInput" />
      </v-card-text>

      <v-card-subtitle class="font-weight-bold mb-0 pb-0">Profile Details</v-card-subtitle>
      <v-card-text>
        <v-text-field v-model="profile.name" label="Name" density="comfortable" variant="outlined" @blur="updateName" />
        <v-text-field label="Email" v-model="profile.email" density="comfortable" variant="outlined"
          @blur="updateEmail" />
        <v-text-field label="Phone" v-model="profile.phone" density="comfortable" variant="outlined"
          @blur="updatePhone" />
      </v-card-text>

      <v-card-subtitle class="font-weight-bold mb-0 pb-0">Profile Settings</v-card-subtitle>
      <v-card-text>
        <v-text-field v-model="pin" label="Current pin" density="comfortable" variant="outlined"
          @keypress="setShowNewPinUpdate" />
        <div class="d-flex" v-if="showNewPinUpdate">
          <v-text-field v-model="newPin" placeholder="New Pin" density="comfortable" variant="outlined" />
          <v-btn flat @click="updatePin" @keypress.enter="updatePin" :loading="loading" class="text-capitalize bg-indigo ml-4" height="48">Update</v-btn>
        </div>
      </v-card-text>

      <v-card-subtitle class="font-weight-bold">Logout</v-card-subtitle>
      <v-card-text>
        <v-btn variant="tonal" block class="text-capitalize text-red rounded-lg" flat @click="logoutUser">
          <i class="las la-sign-out-alt icon mr-2"></i>
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { db } from '@/plugins/firebase';
import { doc, updateDoc } from '@firebase/firestore';
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    pin: "",
    newPin: "",
    loading: false,
    showNewPinUpdate: false,
  }),

  methods: {
    ...mapActions([
      "lightTheme",
      "darkTheme",
      "updateName",
      "updateEmail",
      "updatePhone",
      "logoutUser",
      "pickAvatar",
      "getProfile",
    ]),

    clickFileInput() {
      this.$refs.fileInput.click();
    },

    setShowNewPinUpdate() {
      if (this.pin == this.profile.pin) {
        this.showNewPinUpdate = true;
      }
    },

    updatePin() {
      if (this.newPin.length < 4) return;

      this.loading = true;
      updateDoc(doc(db, 'users', localStorage.leadwayToken), {
        pin: this.newPin
      })
        .then(() => {
          this.dialog = false;
          this.pin = null;
          this.newPin = null;
          this.loading = false;
          this.showNewPinUpdate = false;
          this.getProfile();
          this.snackbar.active = true;
          this.snackbar.text = "Pin updated successfully";
          this.snackbar.color = "success";
        })
    }
  },

  computed: {
    ...mapState(["profile", "updateProfile", "snackbar"]),
  },
};
</script>

<style scoped>
@import "@/assets/style/home.css";

.profile {
  height: 90vh;
}

.avatarIcon {
  font-size: 2.5em;
}
</style>
