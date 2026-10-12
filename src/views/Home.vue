<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { SideBar, LeftPanel, RightPanel } from "@/components/layout" 
import { useAppStore } from   "@/stores/app"  

const showChat = computed(() => useAppStore().showChat)

const isDesktop = ref(false)
const mediaQuery = window.matchMedia("(min-width: 768px)")

const updateIsDesktop = () => {
  isDesktop.value = mediaQuery.matches
}

onMounted(() => {
  updateIsDesktop()
  mediaQuery.addEventListener("change", updateIsDesktop)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener("change", updateIsDesktop)
})

const showLeftPanel = computed(() => isDesktop.value || !showChat.value)
const showRightPanel = computed(() => isDesktop.value || showChat.value)
</script>

<template>
  <div class="mx-auto flex h-screen w-full max-w-[1600px] overflow-hidden bg-whatsapp-app md:p-4">
    <div
      class="flex h-full w-full overflow-hidden rounded-none border border-whatsapp-divider bg-whatsapp-panel shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:rounded-[28px]"
    >
      <transition name="slide-fade">
        <section v-show="showLeftPanel" class="flex h-full w-full md:w-[30rem] md:min-w-[26rem]">
          <div class="h-full w-16 border-r border-whatsapp-divider bg-whatsapp-sidebar">
            <SideBar />
          </div>

          <div class="h-full flex-1 truncate border-r border-whatsapp-divider">
            <LeftPanel />
          </div>
        </section>
      </transition>

      <transition name="slide-fade">
        <section v-show="showRightPanel" class="h-full flex-1">
          <RightPanel />
        </section>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Animation for sliding and fading */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from {
  transform: translateX(-24px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(24px);
  opacity: 0;
}
</style>
