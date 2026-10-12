<template>
  <div class="h-full bg-whatsapp-panel"> 
    <!-- <transition name="fade" mode="out-in">
      <Chats v-if="activeTab === 'chats'" key="chats" />
    </transition>
 
    <transition name="fade" mode="out-in">
      <Status v-if="activeTab === 'status'" key="status" />
    </transition>
 
    <transition name="fade" mode="out-in">
      <Channels v-if="activeTab === 'channels'" key="channels" />
    </transition>
 
    <transition name="fade" mode="out-in">
      <Communities v-if="activeTab === 'communities'" key="communities" />
    </transition>
 
    <transition name="fade" mode="out-in">
      <Settings v-if="activeTab === 'settings'" key="settings" />
    </transition>
 
    <transition name="fade" mode="out-in">
      <Profile v-if="activeTab === 'profile'" key="profile" />
    </transition> -->

<Chats v-if="activeTab === 'chats'"  />
    <Status v-if="activeTab === 'status'"   />
    <Channels v-if="activeTab === 'channels'"    />
    <Communities v-if="activeTab === 'communities'"    />
    <Settings v-if="activeTab === 'settings'"    />
    <Profile v-if="activeTab === 'profile'"    />   
  </div>
</template>

<script setup>
import { ref,computed } from 'vue'
import { Chats, Communities, Status, Settings, Channels, Profile } from '@/components/LeftPanel/index.ts'

import { useAppStore } from '@/stores/app'; 

const activeTab = computed(() => useAppStore().activeTab)  
</script>

<style scoped>
.relative:hover .opacity-0 {
    opacity: 1;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 4s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}

</style>
