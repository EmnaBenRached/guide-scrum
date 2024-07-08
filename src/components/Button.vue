<template>
    <button
        type="button"
        class="focus:shadow-outline rounded border border-stone-500 bg-slate-200 px-1 py-2 text-black hover:bg-orange-100 focus:outline-none"
    >
        {{ props.label }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    label: string;
}>();
</script>
