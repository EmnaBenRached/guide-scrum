<template>
    <div class="flex flex-wrap justify-between">
        <div v-for="group in props.groups" :key="group.id" class="w-1/3 p-4">
            <div class="h-full rounded-lg bg-slate-100">
                <!-- <ListItems
                    :items="group.items"
                    :title="group.title"
                    :canHide="group.canHide"
                    @add-item="onAddItem(group.id)"
                    @delete-item="onDeleteItem(group.id, $event)"
                    @edit-item="onEditItem(group.id, $event)"
                    @delete-items="onDeleteItems(group.id)"
                /> -->
                <ListItems
                    :items="group.items"
                    :title="group.title"
                    :canHide="group.canHide"
                    @add-item="emits('add-item', group.id)"
                    @delete-item="emits('delete-item', group.id, $event)"
                    @edit-item="emits('edit-item', group.id, $event)"
                    @delete-items="emits('delete-items', group.id)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ListItems from '../components/ListItems.vue';
import { GSListItem } from '../defs/defs';

const props = defineProps<{
    groups: {
        title: string;
        id: string;
        items: GSListItem[];
        canHide: boolean;
    }[];
}>();

const emits = defineEmits<{
    (event: 'add-item', groupId: string): void;
    (event: 'delete-item', groupId: string, item: GSListItem): void;
    (event: 'delete-items', groupId: string): void;
    (event: 'edit-item', groupId: string, item: GSListItem): void;
}>();

// const groupIdEnAjout = ref('');
// const editingItem = ref<GSListItem | null>(null);

// const onAddItem = (groupId: string) => {
//     groupIdEnAjout.value = groupId;
//     editingItem.value = null;
// };

// const onDeleteItem = (groupId: string, item: GSListItem) => {
//     groups.value
//         ?.find((group) => group.id === groupId)
//         ?.items.splice(
//             groups.value
//                 ?.find((group) => group.id === groupId)
//                 ?.items.indexOf(item) ?? -1,
//             1,
//         );
// };

// const onEditItem = (groupId: string, item: GSListItem) => {
//     groupIdEnAjout.value = groupId;
//     editingItem.value = { ...item };
// };

// const onDeleteItems = (groupId: string) => {
//     groups.value
//         ?.find((group) => group.id === groupId)
//         ?.items.splice(
//             0,
//             groups.value?.find((group) => group.id === groupId)?.items.length ??
//                 0,
//         );
// };
</script>
