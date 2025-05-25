<template>
  <v-sheet border height="220px" width="300px">
    <v-container>
      <v-row>
        <v-col>
          <v-row class="row-info">
              <StatusLabel>HDG</StatusLabel>
            <p class="label-info">{{ displayHeading() }}</p>
          </v-row>
          <v-row class="row-info">
            <StatusLabel>COG<br>SOG</StatusLabel>
            <p class="label-info">{{ displayCourse() }}<br>{{ displaySpeed() }}</p>
          </v-row>
          <v-row>
            <StatusLabel>POS</StatusLabel>
            <p class="label-info">{{ displayPositionLatitude() }}<br>{{ displayPositionLongitude() }}</p>
          </v-row>
        </v-col>
        <v-col>
          <ToggleButton class="btn-action" height="3em" justify="end" width="50px">ACQ<br>TGT</ToggleButton>
          <ToggleButton class="btn-action" height="3em" justify="end" width="50px">DEL<br>TGT</ToggleButton>
          <ToggleButton class="btn-action" height="3em" justify="end" width="50px">ARPA<br>INFO</ToggleButton>
          <ToggleButton class="btn-action" height="3em" justify="end" width="50px">ARPA<br>MENU</ToggleButton>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import StatusLabel from './StatusLabel.vue';
  import ToggleButton from './ToggleButton.vue';

  const heading = ref(0.0);
  const course = ref(0.0);
  const speed = ref(0.0);
  const postition = ref({ latitude: 0.0, longitude: 0.0 });

  function displayHeading (): string {
    return heading.value.toFixed(1) + '°T';
  }

  function displayCourse (): string {
    return course.value.toFixed(0) + '°';
  }

  function displaySpeed (): string {
    return speed.value.toFixed(1) + ' knts';
  }

  function displayPositionLatitude (): string {
    return postition.value.latitude.toFixed(5) + ' N';
  }

  function displayPositionLongitude (): string {
    return postition.value.longitude.toFixed(5) + ' W';
  }
</script>

<style scoped>
.label-info {
  margin-left: 5px;
}

.row-info {
  margin-bottom: 40px;
}

.btn-action {
  margin-bottom: 10px;
}
</style>
