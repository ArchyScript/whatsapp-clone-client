<template>
  <div class="flex items-center bg-whatsapp-header rounded-md w-full">
    <span class="p-1.5 pl-2 rounded-full  w-10 inline-block " role="button">
      <Icon name="back" class="text-green-700 " v-if="isFocused" />
      <Icon name="search" class="text-gray-700" v-else />
    </span>


    <input type="text" placeholder="Search"
      class="w-full p-1.5 h-auto bg-whatsapp-header text-whatsapp-icon rounded-md focus:outline-none" v-model="value"
      @focus="isFocused = true" @blur="isFocused = false" />


    <span class="w-6  " v-if='isFocused'>
      <Icon name="times" class="text-white cursor-pointer" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const isFocused = ref(false);
</script>
