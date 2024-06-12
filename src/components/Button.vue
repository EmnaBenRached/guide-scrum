<template>
    <button
        type="button"
        class="focus:shadow-outline ml-4 mt-2 w-1/5 rounded rounded-sm border border-stone-500 bg-slate-200 px-1 py-2 text-black hover:bg-orange-100 focus:outline-none"
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
