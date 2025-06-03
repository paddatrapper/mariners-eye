<template>
  <v-row
    v-if="enableRow"
    :class="rowClass"
    :justify="props.justify"
  >
    <v-card
      :class="cardClass"
      density="compact"
      :height="props.height"
      rounded="0"
      variant="outlined"
      :width="props.width"
    >
      <v-card-text class="card-status-text">
        <slot />
      </v-card-text>
    </v-card>
  </v-row>
  <v-card
    v-else
    :class="cardClass"
    density="compact"
    :height="props.height"
    rounded="0"
    variant="outlined"
    :width="props.width"
  >
    <v-card-text class="card-status-text">
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
    class?: string;
    height?: string;
    justify?: Justify;
    width?: string;
    row?: boolean;
  }

  const props = defineProps<StatusLabelProps>()

  const enableRow = ref(props.row ?? false);
  const cardClass = ref('card-status');
  if (props.class) {
    cardClass.value += ' ' + props.class;
  }

  const rowClass = ref('row-status');
  if (props.class) {
    rowClass.value += ' ' + props.class;
  }
</script>

<style scoped>
.card-status-text {
  padding: 5px;
}
</style>
