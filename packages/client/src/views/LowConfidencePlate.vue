<template>
  <div>
    <v-alert v-if="isSuccess" type="success">
      Low confidence plate associated successfully with {{ this.realPlate }}
    </v-alert>
    <v-alert v-if="isError" type="error">
      Low confidence plate could not be associated with
      {{ this.realPlate }}. Maybe {{ this.realPlate }} is not registered in
      database ?
    </v-alert>
    <router-link to="/">Return to homepage</router-link>
    <h1>Low confidence plate : {{ $route.params.plate }}</h1>
    <v-form @submit.prevent="submitForm()">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="lowConfidencePlate"
              label="Low Confidence License Plate"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="realPlate"
              label="Real License Plate"
              required
            ></v-text-field>
          </v-col>
          <v-btn color="blue" type="submit">Submit plate</v-btn>
        </v-row>
      </v-container>
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
