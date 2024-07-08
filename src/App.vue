<template>
    <div
        class="min-h-screen bg-cover bg-center"
        style="
            background-image: url('https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        "
    >
        <HeroSection />
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import HeroSection from './components/HeroSection.vue';
import { onMounted } from 'vue';

onMounted(() => {
    document.title = 'Guide Scrum';
});
</script>
