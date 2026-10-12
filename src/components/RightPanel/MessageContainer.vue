<template>
  <div class="relative h-full overflow-hidden">
    <section class="absolute left-0 top-0 z-10 w-full">
      <MessageHeader />
    </section>

    <div class="chats-content flex h-full flex-col overflow-y-auto px-4 pb-28 pt-24 md:px-8">
      <div class="mx-auto mb-6 w-fit rounded-full bg-whatsapp-panelAlt/90 px-4 py-2 text-xs text-whatsapp-textSoft shadow-sm">
        Frontend mode: messages are stored locally while we build the UI
      </div>

      <div class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-3">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.direction === 'incoming' ? 'justify-start' : 'justify-end'"
        >
          <article
            class="max-w-[85%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[70%]"
            :class="
              message.direction === 'incoming'
                ? 'rounded-tl-md bg-whatsapp-header text-white'
                : 'rounded-tr-md bg-whatsapp-bubbleOut text-white'
            "
          >
            <p class="whitespace-pre-wrap text-sm leading-6">{{ message.body }}</p>
            <div
              class="mt-2 flex items-center justify-end gap-2 text-[11px]"
              :class="message.direction === 'incoming' ? 'text-whatsapp-icon' : 'text-whatsapp-bubbleOutText'"
            >
              <span>{{ message.time }}</span>
              <Icon
                v-if="message.direction === 'outgoing'"
                :name="message.status === 'read' ? 'status-dblcheck' : 'status-check'"
                class="!h-4"
                :class="message.status === 'read' ? 'text-whatsapp-bubbleRead' : ''"
              />
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 z-10 w-full">
      <MessageFooter />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from "vue"
import { MessageHeader, MessageFooter } from "@/components/RightPanel"
import { useConversationStore } from "@/stores/conversation"

const conversationStore = useConversationStore()
const messages = computed(() => conversationStore.currentMessages)
</script>


<style scoped>
.chats-content {
  @apply h-full w-full bg-cover bg-center bg-no-repeat;
  background-image:
    linear-gradient(rgba(11, 20, 26, 0.82), rgba(11, 20, 26, 0.82)),
    url('@/assets/images/bg-dark.png');
}
</style>
