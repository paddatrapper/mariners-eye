<template>
  <v-row :class="props.class" :justify="justify">
    <v-btn
      :class="btnClass"
      density="compact"
      :height="props.height"
      :min-width="props.width"
      rounded="0"
      variant="flat"
      :width="props.width"
    >
      <template v-if="props.variant == 'full'">
        <slot />
      </template>
      <template v-else-if="props.variant == 'compact'">
        {{ toggle }}
      </template>
    </v-btn>
    <p v-if="props.variant == 'compact'" class="btn-label"><slot /></p>
  </v-row>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    class: {
      type: String,
    },
    height: {
      type: String,
    },
    justify: {
      type: String,
      default: 'start',
      validator (value) {
        return ['start', 'end', 'center'].includes(value);
      },
    },
    width: {
      type: String,
    },
    variant: {
      type: String,
      default: 'full',
      validator (value) {
        return ['full', 'compact'].includes(value);
      },
    },
  });

  const toggle = ref('A');
  const btnClass = ref('btn-toggle btn-toggle-' + props.variant);
  if (props.class) {
    btnClass.value += ' ' + props.class;
  }
</script>

<style scoped>
.btn-toggle {
  padding: 5px;
}

.btn-label {
  margin-left: 5px;
}
</style>
