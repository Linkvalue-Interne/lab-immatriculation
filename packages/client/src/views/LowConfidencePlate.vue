<template>
  <div>
    <v-alert v-if="isSuccess" type="success">
      Low confidence plate associated successfully with
      {{ realPlate }}
    </v-alert>
    <v-alert v-if="isError" type="error">
      Low confidence plate could not be associated with
      {{ this.realPlate }}. Maybe {{ realPlate }} is not registered in database
      ?
    </v-alert>
    <router-link to="/">Return to homepage</router-link>
    <h1 class="headline">Low confidence plate : {{ $route.params.plate }}</h1>
    <v-form @submit.prevent="submitForm()">
      <v-text-field v-model="lowConfidencePlate" label="Low Confidence License Plate" required></v-text-field>
      <v-text-field v-model="realPlate" label="Real License Plate" required></v-text-field>
      <v-btn color="blue" type="submit">Submit plate</v-btn>
    </v-form>
  </div>
</template>

<script>
import { replaceLowConfidencePlateWithRealPlate } from "@/services/plate";

const REPLACEMENT_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  NOT_TRIED: "notTried"
};

export default {
  data() {
    return {
      lowConfidencePlate: this.$route.params.plate,
      realPlate: "",
      status: REPLACEMENT_STATUS.NOT_TRIED
    };
  },

  computed: {
    isSuccess: function() {
      return this.status === REPLACEMENT_STATUS.SUCCESS;
    },
    isError: function() {
      return this.status === REPLACEMENT_STATUS.ERROR;
    }
  },

  methods: {
    async submitForm() {
      const result = await replaceLowConfidencePlateWithRealPlate(
        this.lowConfidencePlate,
        this.realPlate
      );

      if (result) {
        this.status = REPLACEMENT_STATUS.SUCCESS;
      } else {
        this.status = REPLACEMENT_STATUS.ERROR;
      }
    }
  }
};
</script>

<style></style>
