<template>
  <div>
    <v-alert
      v-if="user && !user.firstName"
      type="error"
    >No associated user with plate {{ user.licensePlate }}</v-alert>
    <UserInformation v-else :user="user" />
    <v-btn absolute dark fab bottom right color="blue" @click="analyze()">
      <v-icon>mdi-video-input-antenna</v-icon>
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
        const user = await analyze();

        this.user = user;
      } catch (error) {
        this.$router.push("/low-confidence/" + error.plate);
      }
    }
  },

  data() {
    return {
      user: null
    };
  }
};
</script>
