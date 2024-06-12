<template>
    <TransitionRoot
        as="template"
        enter="transition-all duration-500"
        enter-from="opacity-0  -translate-y-full"
        enter-to="opacity-100 translate-y-0"
        leave="transition-all duration-150"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 -translate-y-full"

</template>

<script setup lang="ts"></script>
