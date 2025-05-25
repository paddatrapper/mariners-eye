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
        <TargetInfo />
        <AlarmList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import Gain from '@/components/Gain.vue';
  import DisplaySettings from '@/components/DisplaySettings.vue';
  import TargetActions from '@/components/TargetActions.vue';
  import TargetInfo from '@/components/TargetInfo.vue';
  import AlarmList from '@/components/AlarmList.vue';
</script>
