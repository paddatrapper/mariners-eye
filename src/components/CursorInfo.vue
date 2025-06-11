<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h4>CURSOR</h4>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <p>{{ range }}</p>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <p>{{ bearing }}</p>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <p>{{ info3 }}</p>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <p>{{ info4 }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const range = computed(() => {
  return "---";
});

const bearing = computed(() => {
  return "---";
});

const info3 = computed(() => {
  return "---";
});

const info4 = computed(() => {
  return "--- --";
});

</script>
