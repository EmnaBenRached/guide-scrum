<template>
    <Popover class="relative bg-indigo-400">
        <li
            class="flex min-h-10 w-full list-none justify-between rounded-md border bg-white"
        >
            <PopoverButton as="template">
                <div class="flex-grow truncate bg-red-300 p-2" tail>
                    {{ task }}
                </div>
            </PopoverButton>
            <TransitionRoot
                as="template"
                enter="transition-all duration-500"
                enter-from="opacity-0  -translate-y-full"
                enter-to="opacity-100 translate-y-0"
                leave="transition-all duration-150"
                leave-from="opacity-100 translate-y-0"
                leave-to="opacity-0 -translate-y-full"
            >
                <PopoverPanel
                    class="absolute top-12 z-10 w-full p-1 text-sm shadow-md"
                >
                    <span class="block p-1">
                        {{ task }}
                    </span>

                    <div class="mt-2">
                        <p class="text-sm">Progression: {{ item.progress }}%</p>

                        <ProgressIcon :progress="item.progress" />
                    </div>
                </PopoverPanel>
            </TransitionRoot>

            <div class="h-full shrink-0 bg-green-300">Avatar</div>
        </li>
    </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { TransitionRoot } from '@headlessui/vue';
import { GSListItem } from '../defs/defs';
// import { ref } from 'vue';
import ProgressIcon from './ProgressIcon.vue';
import { getCurrentInstance, onMounted } from 'vue';

const props = defineProps<{
    item: GSListItem;
}>();

let task = props.item.title;

const handleTaskSaved = (newTask: string) => {
    task = newTask;
};

onMounted(() => {
    const instance = getCurrentInstance();
    if (instance) {
        instance.emit('taskSaved', handleTaskSaved);
    }
});
</script>
