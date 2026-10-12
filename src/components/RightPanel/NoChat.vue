<template>
  <div class="m-auto flex max-w-2xl flex-col items-center px-8 py-12 text-center">
    <div class="mb-6 rounded-[28px] border border-whatsapp-stroke bg-whatsapp-panel/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
      <img class="w-72" alt="WhatsApp" src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png" />
    </div>

    <div class="space-y-4">
      <h1 class="text-3xl font-semibold text-white">Frontend first, backend next</h1>
      <p class="mx-auto max-w-xl text-sm leading-7 text-whatsapp-icon md:text-base">
        Select a chat on the left to explore the interface. Messages stay local for now, which
        makes this a good place to learn layout, state management, and component structure before
        we start wiring real server behavior.
      </p>

      <div class="grid gap-3 pt-4 text-left md:grid-cols-3">
        <div class="rounded-2xl border border-whatsapp-stroke bg-whatsapp-panelAlt p-4">
          <h2 class="mb-2 font-medium text-white">UI flow</h2>
          <p class="text-sm leading-6 text-whatsapp-icon">Sidebar, chat list, selected conversation, and responsive mobile behavior.</p>
        </div>
        <div class="rounded-2xl border border-whatsapp-stroke bg-whatsapp-panelAlt p-4">
          <h2 class="mb-2 font-medium text-white">Frontend state</h2>
          <p class="text-sm leading-6 text-whatsapp-icon">Pinia stores hold selected chats, draft messages, and mock conversation history.</p>
        </div>
        <div class="rounded-2xl border border-whatsapp-stroke bg-whatsapp-panelAlt p-4">
          <h2 class="mb-2 font-medium text-white">Server prep</h2>
          <p class="text-sm leading-6 text-whatsapp-icon">Once the client feels solid, we can replace mock data with APIs and sockets piece by piece.</p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex items-center text-sm text-whatsapp-muted">
      <Icon name="lock-small" class="!h-3" />
      <span class="ml-2">Your personal messages are end-to-end encrypted</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
