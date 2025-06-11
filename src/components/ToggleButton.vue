<template>
  <div
    class="container-btn-toggle"
    :justify="props.justify"
  >
    <v-btn
      :class="btnClass"
      density="compact"
      :height="props.height"
      :min-width="props.width"
      rounded="0"
      variant="flat"
      :width="props.width"
      :color="props.active ? '#2be32e' : '#fff434'"
    >
      <template v-if="configuredVariant === 'full'">
        <slot />
      </template>
      <template v-else-if="configuredVariant === 'compact'">
        {{ toggle }}
      </template>
    </v-btn>
    <p
      v-if="configuredVariant == 'compact'"
      class="btn-label"
    >
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { VRow } from 'vuetify/components';

  type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
  type Justify = UnwrapReadonlyArray<VRow['justify']>
  type Variant = 'full' | 'compact';

  interface ToggleButtonProps {
    active?: boolean;
    class?: string;
    height?: string;
    justify?: Justify;
    noGutters?: boolean;
    width?: string;
    variant?: Variant;
  }

  const props = defineProps<ToggleButtonProps>()

  const toggle = ref('A');
  const btnClass = ref('btn-toggle btn-toggle-' + props.variant);
  if (props.class) {
    btnClass.value += ' ' + props.class;
  }
  const configuredVariant = ref<Variant>(props.variant ?? 'full');
</script>

<style scoped>
.btn-toggle {
  padding: 5px;
  z-index: 1;
}

.btn-label {
  margin-left: 5px;
}

.container-btn-toggle {
  padding: 0px;
  display: flex;
  flex-direction: row
}
</style>
