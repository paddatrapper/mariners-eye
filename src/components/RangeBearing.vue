<template>
  <v-container class="pil-container fill-height w-100">
    <v-row
      class="w-100"
      justify="center"
      no-gutters
    >
      <v-spacer />
      <v-col cols="2">
        <ToggleButton>
          PIL 1
        </ToggleButton>
      </v-col>
    </v-row>
    <v-row
      class="w-100"
      justify="center"
      no-gutters
    >
      <v-spacer />
      <v-col cols="2">
        <ToggleButton>
          PIL 2
        </ToggleButton>
      </v-col>
    </v-row>
    <v-row
      class="w-100"
      justify="center"
      no-gutters
    >
      <v-spacer />
      <v-col cols="2">
        <ToggleButton>
          EBL 1
        </ToggleButton>
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <ToggleButton>
          VRM 1
        </ToggleButton>
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <ToggleButton>
          EBL 2
        </ToggleButton>
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <ToggleButton>
          VRM 2
        </ToggleButton>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import ToggleButton from './ToggleButton.vue';
</script>

<style scoped>
.pil-container {
  padding: 0px;
}
</style>
