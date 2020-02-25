<template>
  <div>
    <h2>Failed licenses plates</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">License Plates</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in plates" :key="item.name">
            <td>{{ item.plate }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plates: [
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" },
        { plate: "1234-5678" }
      ]
    };
  }
};
</script>

<style></style>
