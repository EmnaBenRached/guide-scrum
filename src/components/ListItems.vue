<template>
    <div class="max-h-full rounded-lg bg-stone-50 p-6 text-center shadow-lg">
        <div class="flex justify-center gap-2">
            <Button label="Ajouter" @click="emits('add-item')"></Button>
            <Button
                label="Supprimer tous"
                @click="confirmModalOpen = true"
                :disabled="props.items.length === 0"
                :class="
                    props.items.length === 0
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                "
            ></Button>
        </div>

        <div class="space-y-4 overflow-y-scroll p-6">
            <ListItem
                v-for="(item, index) in props.items"
                :key="index"
                :item="item"
                @delete-click="emits('delete-item', item.id!)"
                @edit-click="emits('edit-item', item.id!)"
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
import { GSListItem } from '../domain/models';
import Button from './Button.vue';
import ConfirmModal from './ConfirmModal.vue';

const props = withDefaults(
    defineProps<{
        items?: GSListItem[];
    }>(),
    {
        items: () => [],
    },
);

const emits = defineEmits<{
    (event: 'add-item'): void;
    (event: 'edit-item', itemId: string): void;
    (event: 'delete-item', itemId: string): void;
    (event: 'delete-items'): void;
}>();

const confirmModalOpen = ref(false);

const onDeleteItemsConfirmed = () => {
    emits('delete-items');

    confirmModalOpen.value = false;
};
</script>
