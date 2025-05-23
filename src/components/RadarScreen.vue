<template>
  <v-card class="radar-container" :elevation="2">
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <div ref="radarContainer" class="radar-wrapper">
      <svg
        class="radar-svg"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        :width="width"
      >
        <!-- Background circles -->
        <circle
          v-for="(circle, index) in backgroundCircles"
          :key="`circle-${index}`"
          :cx="centerX"
          :cy="centerY"
          fill="none"
          :r="circle.radius"
          :stroke="circle.stroke"
          stroke-width="1"
        />

        <!-- Axis lines -->
        <line
          v-for="(line, index) in axisLines"
          :key="`axis-${index}`"
          stroke="rgba(255, 255, 255, 0.3)"
          stroke-width="1"
          :x1="line.x1"
          :x2="line.x2"
          :y1="line.y1"
          :y2="line.y2"
        />

        <!-- Data points -->
        <g v-for="(point, index) in visiblePoints" :key="`point-${index}`">
          <circle
            :cx="point.x"
            :cy="point.y"
            :fill="point.fill"
            :opacity="point.opacity"
            :r="point.radius"
          >
            <animate
              attributeName="opacity"
              :from="1"
              :to="0"
              :dur="`${point.fadeTime}s`"
              fill="freeze"
            />
          </circle>
          <circle
            :cx="point.x"
            :cy="point.y"
            :r="point.radius + 5"
            fill="none"
            :stroke="point.stroke"
            :opacity="point.opacity * 0.7"
          >
            <animate
              attributeName="r"
              :from="point.radius"
              :to="point.radius * 2"
              :dur="`${point.fadeTime * 0.7}s`"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              :from="point.opacity * 0.7"
              :to="0"
              :dur="`${point.fadeTime}s`"
              fill="freeze"
            />
          </circle>
        </g>
      </svg>
    </div>
    <v-card-actions v-if="showControls">
      <v-btn icon @click="pauseRadar">
        <v-icon>{{ isRunning ? 'mdi-pause' : 'mdi-play' }}</v-icon>
      </v-btn>
      <v-slider
        v-model="sweepSpeed"
        label="Speed"
        min="1"
        max="10"
        thumb-label
        class="ml-4"
      ></v-slider>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';

  interface RadarPoint {
    id: string;
    distance: number; // 0-1 (percentage from center)
    angle: number; // in degrees
    intensity: number; // 0-1
    type: string; // can be used for different styles
    timestamp: number;
  }

  interface VisiblePoint {
    x: number;
    y: number;
    radius: number;
    fill: string;
    stroke: string;
    opacity: number;
    fadeTime: number;
  }

  export default defineComponent({
    name: 'RadarScreen',
    props: {
      width: {
        type: Number,
        default: 500,
      },
      height: {
        type: Number,
        default: 500,
      },
      title: {
        type: String,
        default: 'Radar Display',
      },
      pointTypes: {
        type: Object,
        default: () => ({
          default: { fill: '#00ff00', stroke: '#00ff00', radius: 5 },
          warning: { fill: '#ffff00', stroke: '#ffff00', radius: 6 },
          danger: { fill: '#ff0000', stroke: '#ff0000', radius: 7 },
        }),
      },
      maxPoints: {
        type: Number,
        default: 100,
      },
      pointLifetime: {
        type: Number,
        default: 30, // seconds
      },
      showControls: {
        type: Boolean,
        default: true,
      },
      initialSpeed: {
        type: Number,
        default: 5,
      },
    },
    setup (props, { emit }) {
      const radarContainer = ref<HTMLElement | null>(null);
      const radarPoints = ref<RadarPoint[]>([]);
      const isRunning = ref(true);
      const sweepAngle = ref(0);
      const lastTimestamp = ref(Date.now());
      const sweepSpeed = ref(props.initialSpeed); // 1-10 scale

      // Computed values for drawing
      const centerX = computed(() => props.width / 2);
      const centerY = computed(() => props.height / 2);
      const radius = computed(() => Math.min(props.width, props.height) / 2 - 10);

      // Create background circles - 4 concentric circles
      const backgroundCircles = computed(() => {
        const circles = [];
        for (let i = 1; i <= 4; i++) {
          circles.push({
            radius: (radius.value * i) / 4,
            stroke: i % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
          });
        }
        return circles;
      });

      // Create axis lines (N, E, S, W lines)
      const axisLines = computed(() => {
        return [
          // Vertical line
          {
            x1: centerX.value,
            y1: centerY.value - radius.value,
            x2: centerX.value,
            y2: centerY.value + radius.value,
          },
          // Horizontal line
          {
            x1: centerX.value - radius.value,
            y1: centerY.value,
            x2: centerX.value + radius.value,
            y2: centerY.value,
          },
        ];
      });

      // Calculate the sweep path
      const sweepPath = computed(() => {
        const angle = sweepAngle.value * (Math.PI / 180);
        const x = centerX.value + Math.cos(angle) * radius.value;
        const y = centerY.value + Math.sin(angle) * radius.value;
        return `M ${centerX.value} ${centerY.value} L ${x} ${y} A ${radius.value} ${radius.value} 0 0 0 ${centerX.value} ${centerY.value - radius.value} Z`;
      });

      // Filter points that should be visible (not expired)
      const visiblePoints = computed(() => {
        const now = Date.now();
        const result: VisiblePoint[] = [];

        radarPoints.value.forEach(point => {
          const age = (now - point.timestamp) / 1000; // age in seconds
          if (age <= props.pointLifetime) {
            // Calculate the position on the radar
            const angle = point.angle * (Math.PI / 180);
            const distance = point.distance * radius.value;
            const x = centerX.value + Math.cos(angle) * distance;
            const y = centerY.value + Math.sin(angle) * distance;

            // Get style based on type
            const style = props.pointTypes[point.type] || props.pointTypes.default;

            // Calculate opacity based on age
            const remainingLife = 1 - (age / props.pointLifetime);

            result.push({
              x,
              y,
              radius: style.radius * (0.5 + point.intensity * 0.5),
              fill: style.fill,
              stroke: style.stroke,
              opacity: remainingLife * point.intensity,
              fadeTime: props.pointLifetime - age,
            });
          }
        });

        return result;
      });

      // Animation loop
      let animationFrame: number | null = null;

      const updateSweep = () => {
        if (!isRunning.value) {
          if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
          return;
        }

        const now = Date.now();
        const delta = now - lastTimestamp.value;
        lastTimestamp.value = now;

        // Update sweep angle based on speed
        sweepAngle.value = (sweepAngle.value + (delta * 0.05 * sweepSpeed.value)) % 360;

        // Clean up old points
        const expireTime = now - props.pointLifetime * 1000;
        radarPoints.value = radarPoints.value.filter(p => p.timestamp > expireTime);

        // Continue the animation loop
        animationFrame = requestAnimationFrame(updateSweep);
      };

      // Start/Pause radar
      const pauseRadar = () => {
        isRunning.value = !isRunning.value;
        if (isRunning.value) {
          lastTimestamp.value = Date.now();
          animationFrame = requestAnimationFrame(updateSweep);
        }
      };

      // Add a point to the radar
      const addPoint = (point: Omit<RadarPoint, 'timestamp'>) => {
        if (radarPoints.value.length >= props.maxPoints) {
          // Remove oldest point
          radarPoints.value.shift();
        }

        // Add new point with timestamp
        radarPoints.value.push({
          ...point,
          timestamp: Date.now(),
        });

        // Emit the addition
        emit('point-added', point);
      };

      // Clear all points
      const clearPoints = () => {
        radarPoints.value = [];
        emit('points-cleared');
      };

      // Watch for speed changes
      watch(sweepSpeed, newSpeed => {
        emit('speed-changed', newSpeed);
      });

      // Lifecycle hooks
      onMounted(() => {
        // Start the animation loop
        animationFrame = requestAnimationFrame(updateSweep);

        // Expose methods to parent component
        const parent = getCurrentInstance()?.parent;
        if (parent) {
          parent.proxy.$radar = {
            addPoint,
            clearPoints,
            pauseRadar,
          };
        }
      });

      onBeforeUnmount(() => {
        // Clean up animation frame
        if (animationFrame !== null) {
          cancelAnimationFrame(animationFrame);
        }
      });

      return {
        radarContainer,
        centerX,
        centerY,
        radius,
        backgroundCircles,
        axisLines,
        sweepPath,
        visiblePoints,
        isRunning,
        sweepSpeed,
        pauseRadar,
        addPoint,
        clearPoints,
      };
    },
  });
</script>

<style scoped>
.radar-container {
  background-color: #001824;
  border-radius: 4px;
  overflow: hidden;
}

.radar-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radar-svg {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
