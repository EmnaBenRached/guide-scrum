<template>
    <div v-show="showGroup" class="p-6 text-center">
        <div class="relative flex text-center">
            <h2
                class="mx-2 text-center text-xl font-bold underline decoration-1"
            >
                {{ props.title }}
            </h2>
            <span class="text-center text-xl font-bold"
                >({{ items.length }})</span
            >
            <button
                v-show="canHide"
                @click="showGroup = false"
                class="absolute right-0 top-0 px-4 py-2 text-2xl font-bold"
            >
                &times;
            </button>
        </div>
        <div class="flex justify-center">
            <Button label="Ajouter" @click="emits('add-item')"></Button>
            <Button
                label="Supprimer"
                @click="confirmModalOpen = true"
                :disabled="props.items.length === 0"
            ></Button>
        </div>

        <div class="space-y-4 overflow-auto p-6">
            <ListItem
                v-for="(item, index) in props.items"
                :key="index"
                :item="item"
                @delete-click="emits('delete-item', item)"
                @edit-click="emits('edit-item', item)"
            />
        </div>

        <ConfirmModal
            :open="confirmModalOpen"
            @yes="onDeleteItemsConfirmed"
            @no="confirmModalOpen = false"
            @close="confirmModalOpen = false"
        ></ConfirmModal>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, withDefaults } from 'vue';
import { defineProps } from 'vue';
import ListItem from './ListItem.vue';
import { GSListItem } from '../defs/defs';
import Button from './Button.vue';
import ConfirmModal from './ConfirmModal.vue';

const props = withDefaults(
    defineProps<{
        items?: GSListItem[];
        title: string;
        canHide?: boolean;
    }>(),
    {
        items: () => [],
        canHide: false,
    },
);

const emits = defineEmits<{
    (event: 'add-item'): void;
    (event: 'delete-item', item: GSListItem): void;
    (event: 'delete-items'): void;
    (event: 'edit-item', item: GSListItem): void;
}>();

const confirmModalOpen = ref(false);
const showGroup = ref(true);

const onDeleteItemsConfirmed = () => {
    emits('delete-items');

    confirmModalOpen.value = false;
};
</script>
