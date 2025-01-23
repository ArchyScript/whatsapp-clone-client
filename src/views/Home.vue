<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { SideBar, LeftPanel, RightPanel } from "@/components/layout"

import { useAppStore } from "@/stores/app"
const { setShowChat } = useAppStore()

const showChat = computed(() => useAppStore().showChat)
</script>

<template>
  <div class="overflow-y-hidden bg-[#0C1317] md:p-6 container mx-auto h-screen w-full">
    <!--  max-w-screen-2xl  -->
    <!-- <div class="fixed top-0  left-0 w-full h-36 bg-white hidden md:block" /> -->

    <div class="flex overflow-y-hidden md:min-w-[768px] border-4 mx-auto h-full">
      <transition name="slide-fade">
        <section
          class="h-full flex w-full md:w-1/3 min-w-[420px] lg:min-w-[460px]"
          :class="showChat && 'hidden md:flex'"
        >
          <div class="w-16 h-full">
            <SideBar />
          </div>

          <div class="h-full flex-1 truncate">
            <LeftPanel />
          </div>
        </section>
      </transition>
      <transition name="slide-fade">
        <section class="h-full w-full flex-1 hidden md:block" :class="showChat && '!block '">
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
  transition: all 0.6s ease;
}
.slide-fade-enter-from {
  transform: translateX(-100%);
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
  transform: translateX(100%);
  opacity: 0;
}
</style>
