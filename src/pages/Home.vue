<template>
    <div>
        <div class="flex justify-center p-4">
            <Button
                class="rounded bg-blue-500 px-2 py-2"
                label="Ajouter un groupe"
                @click="editGroup()"
            >
            </Button>
        </div>

        <ListGroupItems
            :groups="groups"
            @add-item="onAddOrEditItem"
            @edit-item="onAddOrEditItem"
            @delete-item="onDeleteItem"
            @delete-items="onDeleteGroupItems"
        />

        <FormModal
            :show="formItemModalOpen"
            :title="editingItem?.id ? `Modifier l'item` : `Ajouter un item`"
            @close="editingItem = null"
        >
            <FormItem
                v-if="editingItem"
                @save="onSaveItem"
                :item="editingItem"
                :groups="groups"
            />
        </FormModal>

        <FormModal
            :show="formGroupModalOpen"
            title="Ajouter un groupe"
            @close="editingGroup = null"
        >
            <FormGroup
                v-if="editingGroup"
                @save="onSaveGroup"
                :group="editingGroup"
            />
        </FormModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { GSListItem, GSGroupItems } from '../domain/models';
import ListGroupItems from '../components/ListGroupItems.vue';
import FormModal from '../components/FormModal.vue';
import Button from '../components/Button.vue';
import FormItem from '../components/FormItem.vue';
import FormGroup from '../components/FormGroup.vue';

const editingItem = ref<GSListItem | null>(null);
const editingGroup = ref<GSGroupItems | null>(null);
const formItemModalOpen = computed(() => editingItem.value !== null);
const formGroupModalOpen = computed(() => editingGroup.value !== null);

const groups = ref<GSGroupItems[]>([]);

const saveGroupsToLocalStorage = () => {
    localStorage.setItem('groups', JSON.stringify(groups.value));
};

onMounted(() => {
    groups.value = JSON.parse(localStorage.getItem('groups') || '[]');
});

watch(groups, saveGroupsToLocalStorage, { deep: true });

const onSaveItem = (item: GSListItem, groupId: string) => {
    const group = groups.value.find((group) => group.id === groupId);

    if (!group) {
        throw new Error('Group not found');
    }

    if (item.id) {
        const itemIndex = group.items.findIndex((i) => i.id === item.id);

        if (itemIndex === -1) {
            throw new Error('Item not found');
        }

        group.items[itemIndex] = item;
    } else {
        item.id = uuidv4();

        group.items.push(item);
    }

    editingItem.value = null;
};

const onSaveGroup = (group: GSGroupItems) => {
    if (group.id) {
        const indexGroup = groups.value.findIndex((g) => g.id === group.id);

        if (indexGroup !== -1) {
            groups.value[indexGroup] = group;
        }
    } else {
        group.id = uuidv4();

        groups.value.unshift(group);
    }

    editingGroup.value = null;
};

const editGroup = (group?: GSGroupItems) => {
    editingGroup.value = group ?? {
        title: '',
        canHide: false,
        items: [],
        visible: true,
    };
};

const onAddOrEditItem = (groupId: string, itemId?: string) => {
    const group = groups.value.find((group) => group.id === groupId);

    if (!group) {
        throw new Error('Group not found');
    }

    if (itemId) {
        const item = group.items.find((item) => item.id === itemId);

        if (!item) {
            throw new Error('Item not found');
        }

        editingItem.value = { ...item };
    } else {
        editingItem.value = {
            title: '',
            description: '',
            participants: [],
            progress: 0,
        };
    }
};

const onDeleteItem = (groupId: string, itemId: string) => {
    const group = groups.value.find((group) => group.id === groupId);

    if (!group) {
        throw new Error('Group not found');
    }

    const itemIndex = group.items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
        throw new Error('Item not found');
    }

    group.items.splice(itemIndex, 1);
};

const onDeleteGroupItems = (groupId: string) => {
    const group = groups.value?.find((group) => group.id === groupId);

    if (!group) {
        throw new Error('Group not found');
    }

    group.items = [];
};
</script>
