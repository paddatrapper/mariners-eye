<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <Gain />
      </v-col>
      <v-col cols="6">
        <Radar :size="radarSize" />
      </v-col>
      <v-col cols="3">
        <DisplaySettings />
      </v-col>
      <v-col cols="2">
        <TargetActions />
        <TargetInfo />
        <AlarmList />
        <MessageList />
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
  import MessageList from '@/components/MessageList.vue';
  import Radar from '@/components/Radar.vue';
  import { onMounted, ref } from 'vue';

  const radarSize = ref(850);
  function updateRadarSize () {
    radarSize.value = document.body.scrollHeight * 0.9;
  }

  onMounted(() => {
    updateRadarSize();
    window.addEventListener('resize', updateRadarSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateRadarSize);
  });
</script>
