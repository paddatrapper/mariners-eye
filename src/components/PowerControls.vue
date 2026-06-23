<template>
  <v-sheet
    class="sheet-power-controls"
    height="90px"
    width="190px"
  >
    <v-container class="power-container">
      <v-row
        class="justify-end"
        density="compact"
      >
        <v-spacer />
        <v-col cols="4">
          <ToggleButton
            class="btn-transmission"
            height="50px"
            width="60px"
            @click="transmitToggle"
          >
            {{ powerLabel }}
          </ToggleButton>
        </v-col>
      </v-row>
      <v-row
        class="justify-end margin-0px"
        density="compact"
      >
        <v-spacer />
        <v-col cols="5">
          <StatusLabel
            class="status-label-master"
            justify="end"
            row
            width="102px"
          >
            MASTER
          </StatusLabel>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ToggleButton from './ToggleButton.vue';
  import StatusLabel from './StatusLabel.vue';

  const powerLabel = ref('TX');
  const emit = defineEmits<{
    (e: 'transmitToggle', isActive: boolean): void
  }>();

  function transmitToggle(isActive: boolean) {
    powerLabel.value = isActive ? 'STBY' : 'TX';
    emit('transmitToggle', isActive);
  }
</script>

<style scoped>
.sheet-power-controls {
  background: var(--v-theme-background);
  padding: 0px;
}

.power-container {
  padding: 0px;
}

.margin-0px {
  margin: 0px;
}
</style>
