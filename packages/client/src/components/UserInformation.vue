<template>
  <v-card class max-width="344" outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <div class="overline mb-4">User</div>
        <v-list-item-title class="headline mb-1">
          {{
          user.licensePlate
          }}
        </v-list-item-title>
        <v-list-item-title>{{ user.firstName + " " + user.lastName }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
