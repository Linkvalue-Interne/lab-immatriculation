<template>
  <div>
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
export default {
  data() {
    return {
      lowConfidencePlate: this.$route.params.plate,
      realPlate: ""
    };
  },

  methods: {
    submitForm() {
      alert(`${this.lowConfidencePlate} -> ${this.realPlate}`);
    }
  }
};
</script>

<style></style>
