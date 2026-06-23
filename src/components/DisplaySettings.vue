<template>
  <v-container class="display-container">
    <v-row
      class="display-setting justify-end"
      density="compact"
    >
      <v-col
        cols="3"
      >
        <ToggleButton
          class="btn-display"
          width="90px"
          @click="orientationToggle"
        >
          {{ orientationOptions[orientation] }}
        </ToggleButton>
      </v-col>
      <v-col cols="3">
        <v-row
          class="display-btn-row justify-end"
          density="compact"
          style="margin-bottom: 2px;"
        >
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-up"
            min-width="30px"
            rounded="0"
            style="z-index: 1;"
          />
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-down"
            min-width="30px"
            rounded="0"
            style="z-index: 1;"
          />
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <StatusLabel :width="btnWidth">
            RNG {{ range }} NM
          </StatusLabel>
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <ToggleButton
            class="btn-display"
            :width="btnWidth"
            @click="toggleRings"
          >
            RINGS {{ ringsState }}
          </ToggleButton>
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <ToggleButton
            class="btn-display"
            :width="btnWidth"
          >
            CENTRE
          </ToggleButton>
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <ToggleButton
            class="btn-display"
            :width="btnWidth"
          >
            REL VECTOR
          </ToggleButton>
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <StatusLabel
            width="100px"
          >
            GND STAB
          </StatusLabel>
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <ToggleButton
            active
            width="50px"
          >
            HL
          </ToggleButton>
        </v-row>
        <v-row
          class="display-btn-row justify-end"
          density="compact"
        >
          <ToggleButton
            active
            width="50px"
          >
            SYM
          </ToggleButton>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import StatusLabel from './StatusLabel.vue';
  import ToggleButton from './ToggleButton.vue';

  const orientationOptions = ['H-UP', 'N-UP'];
  const orientation = ref(0)
  const range = ref(1.5);
  const btnWidth = ref('125px');
  const ringsState = ref('OFF');

  function orientationToggle() {
    orientation.value = (orientation.value + 1) % orientationOptions.length;
  }

  function toggleRings(isActive: boolean) {
    if (isActive) {
      ringsState.value = 'ON';
    } else {
      ringsState.value = 'OFF';
    }
  }
</script>

<style scoped>
.display-container {
  padding: 0px;
}

.display-setting {
  margin: 0px;
}

.btn-display {
  margin-right: 0px;
}

.display-btn-row {
  margin: 0px;
}
</style>
