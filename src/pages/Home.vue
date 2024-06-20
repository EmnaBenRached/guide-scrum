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

        <FormModal
            :show="modalOpen"
            :title="isEditing ? 'Modifier l\'item' : 'Ajouter un item'"
            @close="closeModal"
        >
            <FormItem @save="onSave" :initialData="editingItem" />
        </FormModal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { GSListItem } from '../defs/defs';
import HeroSection from '../components/HeroSection.vue';
import ListGroupItems from '../components/ListGroupItems.vue';
import FormModal from '../components/FormModal.vue';
import Button from '../components/Button.vue';
import FormItem from '../components/FormItem.vue';

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
