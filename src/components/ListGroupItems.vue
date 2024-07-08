<template>
    <div
        v-if="groups.length"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
        <GroupItems
            v-for="(group, i) in props.groups.filter((g) => g.visible)"
            :group="group"
            :key="i"
            @add-item="emits('add-item', group.id!)"
            @edit-item="emits('edit-item', group.id!, $event)"
            @delete-item="emits('delete-item', group.id!, $event)"
            @delete-items="emits('delete-items', group.id!)"
        ></GroupItems>
    </div>
    <div v-else>
        <p>Aucun Group</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { GSGroupItems } from '../domain/models';
import GroupItems from './GroupItems.vue';

const props = withDefaults(
    defineProps<{
        groups: GSGroupItems[];
    }>(),
    {
        groups: () => [],
    },
);

const emits = defineEmits<{
    (event: 'add-item', groupId: string): void;
    (event: 'edit-item', groupId: string, itemId: string): void;
    (event: 'delete-item', groupId: string, itemId: string): void;
    (event: 'delete-items', groupId: string): void;
}>();
</script>
