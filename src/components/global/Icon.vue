<script lang="ts" setup>
import { ref, watch } from "vue"

interface Props {
  name: string
  filled?: boolean
  size?: number
}
const props = withDefaults(defineProps<Props>(), {
  filled: true,
  size: 24
})

const hasStroke = ref(false)
const icon = ref("")

const fetchIcon = async () => {
  try {
    const response = await fetch(`/icons/${props.name}.svg`)
    if (!response.ok) {
      throw new Error(`Icon "${props.name}" not found`)
    }

    const iconSvgContent = await response.text()
    hasStroke.value = iconSvgContent.includes("stroke")
    icon.value = iconSvgContent
  } catch (error) {
    hasStroke.value = false
    icon.value = ""
    throw new Error(`Icon "${props.name}" not found`)
  }
}

watch(
  () => props.name,
  () => {
    void fetchIcon()
  },
  { immediate: true }
)
</script>

<template>
  <!-- Render the loaded SVG content -->
  <span
    class="base-icon"
    :class="{ 'icon--fill': filled, 'icon--stroke': hasStroke && !filled }"
    v-html="icon"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  />
</template>

<style scoped>
/* Base styling for the icon */
.base-icon {
  line-height: 0;
}

/* Apply fill color to the icon */
.base-icon.icon--fill,
.base-icon.icon--fill * {
  fill: currentColor !important;
}

/* Apply stroke color to the icon */
.base-icon.icon--stroke,
.base-icon.icon--stroke * {
  stroke: currentColor !important;
}
</style>
