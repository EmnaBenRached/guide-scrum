<template>
    <div>
        <i
            v-if="props.progress === 100"
            class="fas fa-check-circle text-2x1 text-green-500"
        ></i>
        <i
            v-else-if="props.progress >= 75"
            class="fas fa-battery-three-quarters text-2x1 text-yellow-500"
        ></i>
        <i
            v-else-if="props.progress >= 50"
            class="fas fa-battery-half text-2x1 text-yellow-400"
        ></i>
        <i
            v-else-if="props.progress >= 25"
            class="fas fa-battery-quarter text-2x1 text-orange-400"
        ></i>
        <i v-else class="fas fa-battery-empty text-2xl text-red-500"></i>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    progress: number;
}>();
</script>
