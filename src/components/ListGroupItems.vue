<template>
    <div class="flex flex-wrap justify-between">
        <div v-for="group in props.groups" :key="group.id" class="w-1/3 p-4">
            <div class="h-full rounded-lg bg-slate-100">
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
</script>
