<template>
  <v-container class="display-container">
    <v-row
      class="display-setting"
      justify="end"
      no-gutter
    >
      <v-col
        cols="3"
        style="margin-top: -12px;"
      >
        <ToggleButton
          class="btn-display"
          width="90px"
        >
          {{ orientation }}
        </ToggleButton>
      </v-col>
      <v-col cols="3">
        <v-row justify="end">
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-up"
            min-width="30px"
            rounded="0"
            style="z-index: 1;"
          />
        </v-row>
        <v-row justify="end">
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-down"
            min-width="30px"
            rounded="0"
            style="z-index: 1;"
          />
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row justify="end">
          <StatusLabel :width="btnWidth">
            RNG {{ range }} NM
          </StatusLabel>
        </v-row>
        <v-row justify="end">
          <ToggleButton
            class="btn-display"
            :width="btnWidth"
          >
            RINGS OFF
          </ToggleButton>
        </v-row>
        <v-row justify="end">
          <ToggleButton
            class="btn-display"
            :width="btnWidth"
          >
            CENTRE
          </ToggleButton>
        </v-row>
        <v-row justify="end">
          <ToggleButton
            class="btn-display"
            :width="btnWidth"
          >
            REL VECTOR
          </ToggleButton>
        </v-row>
        <v-row justify="end">
          <StatusLabel
            width="100px"
          >
            GND STAB
          </StatusLabel>
        </v-row>
        <v-row justify="end">
          <ToggleButton
            width="50px"
          >
            HL
          </ToggleButton>
        </v-row>
        <v-row justify="end">
          <ToggleButton
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

  const orientation = ref('H-UP');
  const range = ref(1.5);
  const btnWidth = ref('125px');
</script>

<style scoped>
.display-container {
  padding: 0px;
}

.display-setting {
  margin: 5px;
}

.btn-display {
  margin-right: 0px;
}
</style>
