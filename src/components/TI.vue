<template>
  <v-container class="container-ti">
    <v-row
      class="row-ti-title"
      no-gutters
    >
      <h4>TI</h4>
    </v-row>
    <v-row no-gutters>
      <v-col style="z-index: 1;">
        <v-slider
          class="slider-ti"
          justify="start"
          direction="vertical"
          density="compact"
        />
      </v-col>
      <v-col>
        <div
          class="div-ti-color"
          style="background: lawngreen;"
        />
        <div
          class="div-ti-color"
          style="background: yellow;"
        />
        <div
          class="div-ti-color"
          style="background: red;"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>

<style scoped>
.container-ti {
  padding: 0px;
}

.slider-ti {
  margin: 0px;
}

.slider-ti :deep(.v-slider__container) {
  height: 65px;
}

.slider-ti :deep(.v-input__control) {
  min-height: 100%;
}

.slider-ti.v-slider.v-input--vertical {
  height: 70px;
}

.row-ti-title {
  margin-left: 12px;
}

.div-ti-color {
  height: 30%;
  width: 15px;
}
</style>
