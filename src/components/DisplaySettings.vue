<template>
  <v-container>
    <v-row>
      <v-col>
        <ToggleButton :width="btnWidth">
          {{ orientation }}
        </ToggleButton>
      </v-col>
      <v-col>
        <v-row>
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-up"
            rounded="0"
          />
        </v-row>
        <v-row>
          <v-btn
            class="btn-icon-only"
            icon="mdi-menu-down"
            rounded="0"
          />
        </v-row>
      </v-col>
      <v-col>
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
  import TargetActions from './TargetActions.vue';
  import ToggleButton from './ToggleButton.vue';

  const orientation = ref('H-UP');
  const range = ref(1.5);
  const btnWidth = ref('125px');
</script>
