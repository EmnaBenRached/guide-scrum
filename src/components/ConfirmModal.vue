<template>
    <TransitionRoot
        :show="props.open"
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
                    <DialogTitle> {{ props.title }}</DialogTitle>
                    <p class="text-center">
                        {{ props.message }}
                    </p>
                    <div class="flex justify-center space-x-4">
                        <Button label="Oui" @click="emits('yes')"></Button>
                        <Button label="Non" @click="emits('no')"></Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import Button from './Button.vue';
import {
    TransitionRoot,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

const props = withDefaults(
    defineProps<{
        open?: boolean;
        message?: string;
        title?: string;
    }>(),
    {
        open: false,
        message: '#Etes vous sur ?',
        title: 'Delete Items',
    },
);

const emits = defineEmits<{
    (event: 'close'): void;
    (event: 'yes'): void;
    (event: 'no'): void;
}>();
</script>
