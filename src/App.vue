<template>
    <div class="mt-2 min-h-screen bg-slate-50">
        <div
            class="box-border h-40 border-4 bg-fixed p-4"
            style="
                background-image: url(https://www.pexels.com/photo/dried-slices-of-orange-on-brown-surface-5490077/);
            "
        >
            <h1
                class="bg-gradient-to-r from-yellow-400 via-orange-600 to-pink-500 bg-clip-text p-6 text-center text-4xl font-extrabold text-gray-800 text-transparent drop-shadow-lg"
            >
                Guide Scrum
            </h1>
            <p class="p-2 text-center text-lg font-medium italic text-cyan-700">
                Welcome to the Guide Scrum
            </p>
        </div>
        <div class="flex flex-wrap justify-between">
            <div v-for="group in groups" :key="group.id" class="w-1/3 p-4">
                <div class="h-full rounded-lg bg-slate-100">
                    <ListItems
                        :items="group.items"
                        :title="group.title"
                        @add-item="onAddItem(group.id)"
                        @delete-item="onDeleteItem(group.id, $event)"
                        @delete-items="onDeleteItems(group.id)"
                    />
                </div>
            </div>
        </div>

        <TransitionRoot
            :show="modalOpen"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
            <Dialog class="relative z-50" :open="true" @close="closeModal">
                <div
                    class="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50"
                >
                    <DialogPanel
                        class="w-full max-w-sm rounded bg-white p-4 shadow-md"
                    >
                        <DialogTitle>Add Item</DialogTitle>
                        <Formulaire @save="onSave" />
                    </DialogPanel>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import {
    TransitionRoot,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';
import ListItems from './components/ListItems.vue';
import { GSListItem } from './defs/defs';
import Formulaire from './components/Formulaire.vue';

const groupIdEnAjout = ref('');
const modalOpen = computed(() => groupIdEnAjout.value !== '');

const groups = ref<{ title: string; id: string; items: GSListItem[] }[]>([
    {
        title: 'Group 1',
        id: '1',
        items: [],
    },
    {
        title: 'Group 2',
        id: '2',
        items: [],
    },
    {
        title: 'Group 3',
        id: '3',
        items: [],
    },
]);

const onSave = ({ title }: { title: string }) => {
    groups.value
        ?.find((group) => group.id === groupIdEnAjout.value)
        ?.items.push({
            title,
            description: '',
            participants: [],
            progress: 0,
        });

    closeModal();
};

const onAddItem = (groupId: string) => {
    groupIdEnAjout.value = groupId;
};

const closeModal = () => {
    groupIdEnAjout.value = '';
};

const onDeleteItem = (groupId: string, item: GSListItem) => {
    groups.value
        ?.find((group) => group.id === groupId)
        ?.items.splice(
            groups.value
                ?.find((group) => group.id === groupId)
                ?.items.indexOf(item) ?? -1,
            1,
        );
};

const onDeleteItems = (groupId: string) => {
    groups.value
        ?.find((group) => group.id === groupId)
        ?.items.splice(
            0,
            groups.value?.find((group) => group.id === groupId)?.items.length ??
                0,
        );
};

onMounted(() => {
    document.title = 'Guide Scrum';
});
</script>
