<template>
    <form @submit.prevent="emits('save', formValue)">
        <div class="mb-4 mt-4 grid grid-cols-2 items-center gap-4">
            <label for="title" class="block text-sm font-medium text-gray-700">
                Titre du groupe:
            </label>
            <input
                type="text"
                id="title"
                v-model="formValue.title"
                placeholder="Nom du groupe"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
        <div class="mb-4 mt-4 grid grid-cols-2 items-center gap-4">
            <label
                for="canHide"
                class="block text-sm font-medium text-gray-700"
            >
                Possibilité de cacher le groupe:
            </label>
            <input
                type="checkbox"
                id="canHide"
                v-model="formValue.canHide"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
        <div class="mt-2 flex justify-center">
            <Button label="Save" type="submit"></Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { GSGroupItems } from '../domain/models';
import Button from './Button.vue';

const props = defineProps<{
    group: GSGroupItems;
}>();

const emits = defineEmits<{
    (event: 'save', group: GSGroupItems): void;
}>();

const formValue = ref<GSGroupItems>({ ...props.group });
</script>
