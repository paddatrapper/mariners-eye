import { ref, watch, onUnmounted, type Ref } from "vue";

interface ExclusiveToggle {
  isActive: Ref<boolean>;
  toggle: () => void;
  forceOff: () => void;
}

// Global reference to track the currently active toggle
// Contains the ID of the active toggle button
const activeToggleId: Ref<string | null> = ref(null);

/**
 * Manages the mutually exclusive toggle state for a single component.
 * @param id A unique identifier for the component
 * @returns An object with the state and control functions.
 */
export function useExclusiveToggle(id: string | null): ExclusiveToggle {
  const isActive = ref(false);

  const forceOff = () => {
    isActive.value = false;
  };

  const toggle = () => {
    if (isActive.value) {
      isActive.value = false;
      if (activeToggleId.value === id) {
        activeToggleId.value = null;
      }
    } else {
      isActive.value = true;
      activeToggleId.value = id;
    }
  };

  watch(
    activeToggleId,
    (newId: string | null) => {
      // Disable this button if another button is activated
      if (newId !== id && isActive.value) {
        isActive.value = false;
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    if (activeToggleId.value === id) {
      isActive.value = false;
      activeToggleId.value = null;
    }
  });

  return {
    isActive,
    toggle,
    forceOff,
  };
}
