<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <Gain />
      </v-col>
      <v-col>
        <v-spacer />
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
</script>
