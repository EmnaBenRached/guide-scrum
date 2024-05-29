<template>
    <div class="mt-2 min-h-screen bg-red-200">
        <h1 class="text-center text-4xl">Guide Scrum</h1>
        <p class="text-center">Welcome to the Guide Scrum</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.title = 'Guide Scrum';
});
</script>
