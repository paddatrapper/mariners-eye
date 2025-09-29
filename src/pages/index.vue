<template>
  <v-container
    v-resize="onResize"
    :min-width="minScreenWidth"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-sheet
        class="sheet-screen"
        :height="minScreenHeight"
        :min-height="minScreenHeight"
        :min-width="minScreenWidth"
        :width="minScreenWidth"
      >
        <v-container class="container-screen">
          <v-row no-gutters>
            <v-col cols="2">
              <Gain />
            </v-col>
            <v-col cols="1">
              <TI />
            </v-col>
            <v-col cols="1">
              <RM />
            </v-col>
            <v-spacer />
            <v-col cols="4">
              <DisplaySettings />
            </v-col>
            <v-col cols="3">
              <TargetActions />
            </v-col>
          </v-row>
          <v-row
            class="radar-row"
            no-gutters
          >
            <v-spacer />
            <v-col cols="1">
              <Radar
                :size="radarSize"
                :is-active="radarTransmitting"
              />
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <TargetInfo />
            </v-col>
          </v-row>
          <v-row
            no-gutters
            justify="end"
          >
            <v-col cols="3">
              <CursorInfo />
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <v-row no-gutters>
                <AlarmList />
              </v-row>
              <v-row no-gutters>
                <MessageList />
              </v-row>
            </v-col>
          </v-row>
          <v-row
            no-gutters
            justify="end"
          >
            <v-spacer />
            <v-col cols="10">
              <RangeBearing />
            </v-col>
            <v-col cols="2">
              <PowerControls @transmit-toggle="onTransmitToggle" />
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
      <v-row
        align="center"
        justify="center"
        style="height: 100%;"
      >
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
  import TI from '@/components/TI.vue';
  import RM from '@/components/RM.vue';
  import RangeBearing from '@/components/RangeBearing.vue';
  import CursorInfo from '@/components/CursorInfo.vue';
  import { onMounted, ref } from 'vue';

  const minScreenWidth = ref(1280);
  const minScreenHeight = ref(895)
  const screenSizeDialog = ref(false);
  const radarSize = minScreenHeight.value;

  function testScreenSize () {
    const width = window.innerWidth;
    screenSizeDialog.value = width < minScreenWidth.value
  }

  function onResize () {
    testScreenSize();
  }

  onMounted(() => {
    onResize();
  });

  const radarTransmitting = ref(false);
  function onTransmitToggle(isActive: boolean) {
    radarTransmitting.value = isActive;
  }
</script>

<style scoped>
.sheet-screen {
  background: var(--v-theme-background);
}

.container-screen {
  padding: 0px;
}

.radar-container {
  left: -400px;
  top: -200px;
}

.radar-row {
  height: 410px;
}
</style>
