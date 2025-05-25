<template>
  <v-row v-if="enableRow" :justify="justifyAlignment">
    <v-card
      class="card-status"
      density="compact"
      rounded="0"
      variant="outlined"
      :width="props.width"
    >
      <v-card-text class="status-text">
        <slot />
      </v-card-text>
    </v-card>
  </v-row>
  <v-card
    v-else
    class="card-status"
    density="compact"
    rounded="0"
    variant="outlined"
    :width="props.width"
  >
    <v-card-text class="status-text">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { VRow } from 'vuetify/components';

  type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
  type Justify = UnwrapReadonlyArray<VRow['justify']>

  interface StatusLabelProps {
    width?: string;
    justify?: Justify;
    row?: boolean;
  }

  const props = defineProps<StatusLabelProps>()
  const justifyAlignment = ref<Justify>('start')
  if (props.justify) {
    justifyAlignment.value = props.justify
  }

  const enableRow = ref(false)
  if (props.row) {
    enableRow.value = props.row
  }
</script>

<style scoped>
.status-text {
  padding: 5px;
}
</style>
