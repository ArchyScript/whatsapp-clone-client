<template>
  <div class="flex  space-x-3 ">
    <span v-for="tab in tabs" :key="tab.title" @click="handleSelectTab(tab.title)"
      class="py-1 px-3 focus:outline-none w-fit bg-whatsapp-header hover:bg-opacity-80 text-gray-500 rounded-2xl capitalize text-sm font-medium transition duration-300 ease-in-out"
      role="button" :class="activeTabTitle === tab.title && '!bg-whatsapp-accentDeep text-whatsapp-accent'">
      {{ tab.title }}
    </span>
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineModel, defineProps } from 'vue';


// const activeTab = defineModel<boolean>("activeTab", { default: 'all' })
interface Emits {
  (event: "selectTab", payload: string): void
}
const emit = defineEmits<Emits>()

interface TabItem {
  title: string
}

interface Props {
  tabs: TabItem[];
  activeTab: string;
}

const activeTabTitle = ref('')
const props = defineProps<Props>()
// const modelProps = defineModel({
//   activeTab: {
//     type: string,
//     default: () => props.tabs[0], 
//   },
// });

const handleSelectTab = (title: string) => {
  activeTabTitle.value = title
  emit('selectTab', title)
}

onMounted(() => activeTabTitle.value = props.activeTab)
</script>
