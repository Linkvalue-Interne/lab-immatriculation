<template>
  <v-card class="" max-width="344" outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <div class="overline mb-4">User</div>
        <v-list-item-title class="headline mb-1">{{
          user.licensePlate
        }}</v-list-item-title>
        <v-list-item-title v-if="user.firstName">
          {{ user.firstName + " " + user.lastName }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions v-if="!user.firstName">
      <v-btn text color="blue">
        Associate
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      firstName: String,
      lastName: String,
      licensePlate: String
    }
  }
};
</script>

<style></style>
