<template>
  <v-sheet
    class="sheet-power-controls"
    height="90px"
    width="300px"
  >
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="1">
          <ToggleButton
            height="50px"
            justify="end"
            width="50px"
          >
            TX
          </ToggleButton>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="4">
          <StatusLabel
            class="status-label-master"
            justify="end"
            row
            width="100px"
          >
            MASTER
          </StatusLabel>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
  import ToggleButton from './ToggleButton.vue';
  import StatusLabel from './StatusLabel.vue';
</script>

<style scoped>
.status-label-master {
  padding-top: 2px;
}

.sheet-power-controls {
  background: var(--v-theme-background);
}
</style>
