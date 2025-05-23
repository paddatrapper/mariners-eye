<template>
  <v-container>
    <v-row>
      <v-col>
        <Gain />
      </v-col>
      <v-col>
        <v-spacer />
      </v-col>
      <v-col>
        <DisplaySettings />
      </v-col>
      <v-col>
        <TargetActions />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import Gain from '@/components/Gain.vue';
  import DisplaySettings from '@/components/DisplaySettings.vue';
  import TargetActions from '@/components/TargetActions.vue';
</script>
