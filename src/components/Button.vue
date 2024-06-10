<template>
    <button type="button" class="rounded bg-blue-500 p-2 text-white">
        {{ props.label }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    label: string;
}>();
</script>

<style scoped>
button {
    transition: background-color 0.3s ease-in-out;
}
</style>
