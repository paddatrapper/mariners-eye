<template>
  <div
    id="radar-container"
    v-resize="updateCenter"
    class="radar-container"
    :style="{ width: props.size + 'px', height: props.size + 'px' }"
  >
    <svg class="radar-svg">
      <circle
        :cx="center.x"
        :cy="center.y"
        fill="blue"
        :r="radius"
        stroke="lightgray"
        stroke-width="2"
      />
      <line
        v-for="degree in 360"
        :key="`tick-${degree}`"
        stroke="lightgray"
        stroke-width="2"
        :x1="center.x + radius * Math.cos((degree - 90) * Math.PI / 180)"
        :x2="center.x + (radius + (degree % 10 === 0 ? 10 : 5)) * Math.cos((degree - 90) * Math.PI / 180)"
        :y1="center.y + radius * Math.sin((degree - 90) * Math.PI / 180)"
        :y2="center.y + (radius + (degree % 10 === 0 ? 10 : 5)) * Math.sin((degree - 90) * Math.PI / 180)"
      />
      <text
        v-for="degree in majorDegrees"
        :key="`label-${degree}`"
        dominant-baseline="middle"
        fill="lightgray"
        stroke-width="2"
        text-anchor="middle"
        :x="center.x + (radius + 28) * Math.cos((degree - 90) * Math.PI / 180)"
        :y="center.y + (radius + 20) * Math.sin((degree - 90) * Math.PI / 180)"
      >
        {{ degree }}
      </text>
      <text
        v-if="!props.isActive"
        dominant-baseline="middle"
        fill="white"
        font-size="64"
        font-weight="bold"
        text-anchor="middle"
        :x="center.x"
        :y="center.y"
      >
        STANDBY
      </text>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import type { ScreenCoordinates } from '@/lib/screen.ts';

  interface RadarProps {
    size: number
    isActive: boolean
  }

  const props = defineProps<RadarProps>();

  function getCenter (element: string) : ScreenCoordinates {
    const divElement = document.getElementById(element);

    if (!divElement) {
      console.warn(`Element with ID 'radar-container' not found. Defaulting to center of window.`);
      return {
        x: window.innerWidth / 2,
        y: document.body.scrollHeight / 2,
      };
    }

    const rect = divElement.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    return {
      x: centerX,
      y: centerY,
    };
  }

  const center = ref<ScreenCoordinates>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const radius = ref(props.size * 0.85 / 2);
  const majorDegrees = computed(() => {
    return Array.from({ length: 360 / 10 }, (_, i) => i * 10);
  });

  function updateCenter () {
    center.value = getCenter('radar-container');
  }

  onMounted(() => {
    updateCenter();
  });
</script>

<style scoped>
.radar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  z-index: 0;
}

.radar-svg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
