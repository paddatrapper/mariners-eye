<template>
  <v-container v-resize="onResize" :min-width="minScreenWidth">
    <v-row align="center" justify="center">
      <v-sheet
        class="sheet-screen"
        :height="minScreenHeight"
        :min-height="minScreenHeight"
        :min-width="minScreenWidth"
        :width="minScreenWidth"
      >
        <v-container class="container-screen">
          <v-row>
            <v-col cols="1">
              <Gain />
            </v-col>
            <v-col cols="4">
              <Radar :size="radarSize" />
            </v-col>
            <v-col cols="4">
              <DisplaySettings />
            </v-col>
            <v-col cols="3">
              <TargetActions />
              <TargetInfo />
              <AlarmList />
              <MessageList />
              <PowerControls />
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </v-container>
  <v-dialog
    v-model="screenSizeDialog"
    fullscreen
  >
    <v-container height="100%">
      <v-row align="center" justify="center" style="height: 100%;">
        <v-card>
          <v-card-title class="text-h5">
            Screen Size Warning
          </v-card-title>
          <v-card-text>
            The radar screen requires a minimum screen width of {{ minScreenWidth }} pixels. Please resize your window or use a larger display.
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script lang="ts" setup>
  import Gain from '@/components/Gain.vue';
  import DisplaySettings from '@/components/DisplaySettings.vue';
  import TargetActions from '@/components/TargetActions.vue';
  import TargetInfo from '@/components/TargetInfo.vue';
  import AlarmList from '@/components/AlarmList.vue';
  import MessageList from '@/components/MessageList.vue';
  import Radar from '@/components/Radar.vue';
  import PowerControls from '@/components/PowerControls.vue';
  import { onMounted, ref } from 'vue';

  const radarSize = ref(850);
  const minScreenWidth = ref(1280);
  const minScreenHeight = ref(885)
  const screenSizeDialog = ref(false);

  function updateRadarSize () {
    radarSize.value = document.body.scrollHeight * 0.9;
  }

  function testScreenSize () {
    const width = window.innerWidth;
    screenSizeDialog.value = width < minScreenWidth.value
  }

  function onResize () {
    updateRadarSize();
    testScreenSize();
  }

  onMounted(() => {
    onResize();
  });
</script>

<style scoped>
.sheet-screen {
  background: var(--v-theme-background);
}

.container-screen {
  padding: 0px;
}

.radar-container {
  left: -80px;
}
</style>
