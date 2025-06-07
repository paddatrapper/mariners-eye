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
      :variant="btnVariant"
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
    :variant="btnVariant"
    :width="props.width"
  >
    <v-card-text class="card-status-text">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { VBtn, VRow } from 'vuetify/components';

  type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
  type Justify = UnwrapReadonlyArray<VRow['justify']>
  type Variant = UnwrapReadonlyArray<VBtn['variant']>

  interface StatusLabelProps {
    class?: string;
    disabled?: boolean;
    height?: string;
    justify?: Justify;
    row?: boolean;
    width?: string;
    variant?: Variant;
  }

  const props = defineProps<StatusLabelProps>()

  const btnDisabled = ref(props.disabled ?? false);
  const enableRow = ref(props.row ?? false);
  const cardClass = ref('card-status');
  if (props.class) {
    cardClass.value += ' ' + props.class;
  }
  if (btnDisabled.value) {
    cardClass.value += ' disabled';
  }

  const rowClass = ref('row-status');
  if (props.class) {
    rowClass.value += ' ' + props.class;
  }
  const btnVariant = ref<Variant>(props.variant ?? 'outlined');
</script>

<style scoped>
.card-status-text {
  padding: 5px;
}

.card-status.disabled {
  background: rgb(var(--v-theme-on-code));
  color: black;
  border-color: white;
}

</style>
