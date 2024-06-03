<template>
    <button
        type="button"
        class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        @click="onClick"
        :style="style"
    >
        {{ props.label }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    label: string;
    onClick: () => void;
    style?: string;
}>();
</script>

<style scoped>
button {
    transition: background-color 0.3s ease-in-out;
}
</style>
