<template>
    <p class="text-center">Are you sure you want to delete all items?</p>
    <div class="flex justify-center space-x-4">
        <Button label="Yes" @click="emits('delete-items-confirmed')"></Button>
        <Button label="No" @click="emits('close-confirm-modal')"></Button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import Button from './Button.vue';
const emits = defineEmits<{
    (event: 'delete-items-confirmed'): void;
    (event: 'close-confirm-modal'): void;
}>();
</script>
