<template>
  <div>
    <v-alert
      v-if="user && !user.firstName"
      type="error"
    >No associated user with plate {{ user.licensePlate }}</v-alert>
    <UserInformation v-elseif="user && user.firstName" :user="user" />
    <v-btn absolute dark fab bottom right color="blue" @click="analyze()">
      <v-icon v-if="analyzing">mdi-timer</v-icon>
      <v-icon v-else>mdi-video-input-antenna</v-icon>
    </v-btn>
  </div>
</template>

<script>
import UserInformation from "@/components/UserInformation.vue";
import { analyze } from "@/services/plate";

export default {
  name: "Home",
  components: {
    UserInformation
  },

  methods: {
    async analyze() {
      try {
        this.analyzing = true;
        const user = await analyze();
        this.user = user;
        this.analyzing = false;
      } catch (error) {
        this.$router.push("/low-confidence/" + error.plate);
        this.analyzing = false;
      }
    }
  },

  data() {
    return {
      user: null,
      analyzing: false
    };
  }
};
</script>
