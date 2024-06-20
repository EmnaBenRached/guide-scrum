<template>
    <TransitionRoot
        :show="props.show"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
        <Dialog class="relative z-50" :open="true" @close="emits('close')">
            <div
                class="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50"
            >
                <DialogPanel
                    class="w-full max-w-sm rounded bg-white p-4 shadow-md"
                >
                    <DialogTitle>{{ props.title }}</DialogTitle>
                    <slot></slot>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import {
    TransitionRoot,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

const props = defineProps<{
    show: boolean;
    title: string;
}>();

const emits = defineEmits<{
    (event: 'close'): void;
}>();
</script>
