<template>
  <form class="border-t border-whatsapp-hover bg-whatsapp-header px-3 py-3 md:px-5" @submit.prevent="handleSubmit">
    <div class="flex w-full items-end gap-2">
      <button class="rounded-full p-2 text-whatsapp-muted transition hover:bg-whatsapp-hover" type="button">
        <Icon name="times" />
      </button>
      <button class="rounded-full p-2 text-whatsapp-muted transition hover:bg-whatsapp-hover" type="button">
        <Icon name="smiley" />
      </button>

      <div class="flex-1 rounded-2xl bg-whatsapp-hover px-4 py-2">
        <textarea
          v-model="draft"
          class="max-h-32 w-full resize-none overflow-auto bg-transparent py-2 text-sm text-white placeholder:text-whatsapp-muted focus:outline-none"
          rows="1"
          placeholder="Type a message"
        />
      </div>

      <button
        class="rounded-full p-2 text-whatsapp-muted transition hover:bg-whatsapp-hover"
        :disabled="!draft.trim()"
        type="submit"
      >
        <Icon :name="draft.trim() ? 'status-check' : 'record'" />
      </button>
    </div>
  </form>
</template>


<script setup lang="ts">
import { computed } from "vue"
import { useConversationStore } from "@/stores/conversation"

const conversationStore = useConversationStore()
const draft = computed({
  get: () => conversationStore.draft,
  set: (value: string) => conversationStore.setDraft(value)
})

const handleSubmit = () => {
  conversationStore.sendMessage()
}
</script>
