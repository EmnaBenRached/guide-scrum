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
                        :canHide="group.canHide"
                        @add-item="onAddItem(group.id)"
                        @delete-item="onDeleteItem(group.id, $event)"
                        @edit-item="onEditItem(group.id, $event)"
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
                        <DialogTitle>{{
                            isEditing ? 'Edit Item' : 'Add Item'
                        }}</DialogTitle>
                        <Formulaire @save="onSave" :initialData="editingItem" />
                    </DialogPanel>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- <TransitionRoot>
            <Dialog class="relative z-50" :open="true" @close="closeAddGroupModal">


            </Dialog>
        </TransitionRoot> -->
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
import { v4 as uuidv4 } from 'uuid';
import ListItems from './components/ListItems.vue';
import { GSListItem } from './defs/defs';
import Formulaire from './components/Formulaire.vue';

const groupIdEnAjout = ref('');
const editingItem = ref<GSListItem | null>(null);
const modalOpen = computed(() => groupIdEnAjout.value !== '');
const isEditing = computed(() => editingItem.value !== null);

const groups = ref<
    { title: string; id: string; items: GSListItem[]; canHide: boolean }[]
>([
    {
        title: 'Group 1',
        id: '1',
        items: [],
        canHide: false,
    },
    {
        title: 'Group 2',
        id: '2',
        items: [],
        canHide: true,
    },
    {
        title: 'Group 3',
        id: '3',
        items: [],
        canHide: true,
    },
]);

const onSave = (itemData: GSListItem) => {
    const group = groups.value.find(
        (group) => group.id === groupIdEnAjout.value,
    );
    if (!group) return;

    if (isEditing.value && editingItem.value) {
        const itemIndex = group.items.findIndex(
            (item) => item.id === editingItem.value?.id,
        );
        if (itemIndex !== -1) {
            group.items[itemIndex] = { ...group.items[itemIndex], ...itemData };
        }
    } else {
        const newItem = {
            ...itemData,
            id: uuidv4(),
            description: itemData.description ?? '',
            participants: itemData.participants ?? [],
            progress: itemData.progress ?? 0,
        };
        group.items.push(newItem);
    }

    closeModal();
};

const onAddItem = (groupId: string) => {
    groupIdEnAjout.value = groupId;
    editingItem.value = null;
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

const onEditItem = (groupId: string, item: GSListItem) => {
    groupIdEnAjout.value = groupId;
    editingItem.value = { ...item };
};

onMounted(() => {
    document.title = 'Guide Scrum';
});
</script>
