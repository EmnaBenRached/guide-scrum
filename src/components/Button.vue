<template>
    <button
        type="button"
        class="bg-orange-500 p-2"
        @click="onClick"
        :style="style"
    >
        {{ label }}
    </button>
</template>

<script setup lang="ts"></script>
