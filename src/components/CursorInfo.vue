<template>
  <v-container>
    <v-row density="compact">
      <v-col cols="12">
        <h4>CURSOR</h4>
      </v-col>
    </v-row>
    <v-row density="compact">
      <v-col cols="12">
        <p class="margin-0px">
          {{ range }}
        </p>
      </v-col>
    </v-row>
    <v-row density="compact">
      <v-col cols="12">
        <p class="margin-0px">
          {{ bearing }}
        </p>
      </v-col>
    </v-row>
    <v-row density="compact">
      <v-col cols="12">
        <p class="margin-0px">
          {{ info3 }}
        </p>
      </v-col>
    </v-row>
    <v-row density="compact">
      <v-col cols="12">
        <p class="margin-0px">
          {{ info4 }}
        </p>
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

<style scoped>
.margin-0px {
  margin: 0px;
}
</style>
