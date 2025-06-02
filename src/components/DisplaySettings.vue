<template>
  <v-container>
    <v-row class="display-setting" justify="end" no-gutter>
      <v-col cols="2">
        <ToggleButton justify="end" width="90px">
          {{ orientation }}
        </ToggleButton>
      </v-col>
      <v-col cols="2">
        <v-row class="display-setting" justify="end">
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-up"
            min-width="30px"
            rounded="0"
          />
        </v-row>
        <v-row class="display-setting" justify="end">
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-down"
            min-width="30px"
            rounded="0"
          />
        </v-row>
      </v-col>
      <v-col cols="5">
        <StatusLabel justify="end" row :width="btnWidth">
          RNG {{ range }} NM
        </StatusLabel>
        <ToggleButton justify="end" :width="btnWidth">
          RINGS OFF
        </ToggleButton>
        <ToggleButton justify="end" :width="btnWidth">
          CENTRE
        </ToggleButton>
        <ToggleButton justify="end" :width="btnWidth">
          REL VECTOR
        </ToggleButton>
        <StatusLabel justify="end" row width="100px">
          GND STAB
        </StatusLabel>
        <ToggleButton justify="end" width="50px">
          HL
        </ToggleButton>
        <ToggleButton justify="end" width="50px">
          SYM
        </ToggleButton>
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
