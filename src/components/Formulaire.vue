<template>
    <textarea
        v-model="editedTask"
        class="min-h-10 w-full rounded border p-2"
        placeholder="Write your task..."
    ></textarea>
    <Button
        @click="saveTask"
        class="mt-2 rounded bg-blue-500 p-2 text-white"
        label="Save"
    >
    </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
const editedTask = ref<string>('');

const emit = defineEmits(['taskSaved']);

const saveTask = () => {
    if (editedTask.value.trim() !== '') {
        emit('taskSaved', editedTask.value);
        editedTask.value = '';
    }
};
</script>
