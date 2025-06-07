<template>
  <v-sheet
    class="sheet-power-controls"
    height="90px"
    width="190px"
  >
    <v-container style="padding: 0px;">
      <v-row
        no-gutters
        justify="end"
      >
        <v-spacer />
        <v-col cols="3">
          <ToggleButton
            class="btn-transmission"
            height="50px"
            width="50px"
          >
            TX
          </ToggleButton>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        justify="end"
      >
        <v-spacer />
        <v-col cols="5">
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
  padding-top: 14px;
  margin-right: -2px;
}

.sheet-power-controls {
  background: var(--v-theme-background);
}

.btn-trasmission {
  margin-left: 0px;
}
</style>
