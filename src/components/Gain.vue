<template>
  <v-container
    class="gain"
    height="100%"
  >
    <v-row no-gutters>
      <v-col>
        <ToggleButton
          variant="compact"
          width="15px"
        >
          TUNE
        </ToggleButton>
        <ToggleButton
          variant="compact"
          width="15px"
        >
          GAIN
        </ToggleButton>
        <ToggleButton
          variant="compact"
          width="15px"
        >
          SEA
        </ToggleButton>
        <ToggleButton
          variant="compact"
          width="15px"
        >
          RAIN
        </ToggleButton>
        <StatusLabel
          disabled
          row
          width="100px"
        >
          PL OVER
        </StatusLabel>
        <StatusLabel
          row
          width="100px"
          variant="text"
        >
          X SHORT
        </StatusLabel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import ToggleButton from './ToggleButton.vue';
  import StatusLabel from './StatusLabel.vue';
</script>

<style scoped>
.row-status {
  margin-top: 20px;
}
</style>
