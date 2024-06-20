<template>
    <div class="mt-2 min-h-screen bg-slate-50">
        <HeroSection />
        <!-- <div class = "flex justify-end p-4">
            <Button label="Ajouter un groupe" @click="openAddGroupModal" class="bg-blue-500 text-white px-4 py-2 rounded" />
        </div> -->
        <ListGroupItems
            :groups="groups"
            @add-item="onAddItem"
            @delete-item="onDeleteItem"
            @edit-item="onEditItem"
            @delete-items="onDeleteItems"
        />
        <!-- <div class="flex flex-wrap justify-between">
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
        </div> -->
        <Modall></Modall>
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
import { GSListItem } from '../defs/defs';
import Formulaire from '../components/Formulaire.vue';
import HeroSection from '../components/HeroSection.vue';
import ListGroupItems from '../components/ListGroupItems.vue';
import Button from '../components/Button.vue';

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
