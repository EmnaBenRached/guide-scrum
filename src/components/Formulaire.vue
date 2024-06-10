<template>
    <form action="#">
        <div class="">
            <textarea
                v-model.trim="formValue.title"
                class="w-full rounded border p-2"
                placeholder="Write your task..."
            ></textarea>
            <Listbox v-model="formValue.title">
                <ListboxButton>
                    <span>{{ formValue.title }}</span>
                </ListboxButton>
                <ListboxOptions v-slot="{ selected }">
                    <ListboxOption
                        v-for="group in [
                            { id: '1', title: 'Groupe 1' },
                            { id: '2', title: 'Groupe 2' },
                            { id: '3', title: 'Groupe 3' },
                        ]"
                        as="template"
                        :value="group.id"
                        :key="group.id"
                    >
                        <li
                            :class="{
                                'bg-blue-500 text-white': selected,
                                'bg-white text-black': !selected,
                            }"
                        >
                            {{ group.title }}
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </Listbox>
        </div>
        <div class="mt-2">
            <Button label="Save" @click="onSave"></Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';

const emit = defineEmits<{
    (event: 'save', value: { title: string }): void;
}>();

const formValue = ref<{ title: string }>({
    title: '',
});

const onSave = () => {
    if (!formValue.value.title) {
        return;
    }

    emit('save', formValue.value);

    formValue.value = { title: '' };
};
</script>
