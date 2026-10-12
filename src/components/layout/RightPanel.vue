<template>
  <div class="w-full h-full flex flex-col overflow-auto">
    <NoChat v-if="!selectedChat" />
    <MessageContainer v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NoChat, MessageContainer } from '@/components/RightPanel'
import { useAppStore } from '@/stores/app'

const selectedChat = computed(() => useAppStore().selectedChat)
</script>
