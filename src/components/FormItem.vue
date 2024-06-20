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
                    <!-- <span>{{ formValue.title }}</span> -->
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
import { ref, defineProps, watch, defineEmits } from 'vue';
import Button from './Button.vue';
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';
import { GSListItem } from '../defs/defs';

const props = defineProps<{
    initialData: GSListItem | null;
}>();

const emit = defineEmits<{
    (event: 'save', value: GSListItem): void;
}>();

const formValue = ref<GSListItem>({
    id: '',
    title: '',
    description: '',
    participants: [],
    progress: 0,
});

if (props.initialData) {
    formValue.value = { ...props.initialData };
}

const onSave = () => {
    if (!formValue.value.title) {
        return;
    }

    emit('save', formValue.value);

    formValue.value = {
        title: '',
        id: '',
        description: '',
        participants: [],
        progress: 0,
    };
};

watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formValue.value = { ...newData };
        } else {
            formValue.value = {
                title: '',
                id: '',
                description: '',
                participants: [],
                progress: 0,
            };
        }
    },
    { immediate: true },
);
</script>
