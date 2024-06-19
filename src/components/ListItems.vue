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
        <Button label="Add" @click="emits('add-item')"></Button>
        <Button
            label="Delete all"
            @click="openConfirmModal"
            :disabled="props.items.length === 0"
        ></Button>

        <div class="space-y-4 overflow-auto p-6">
            <ListItem
                v-for="(item, index) in props.items"
                :key="index"
                :item="item"
                @delete-click="emits('delete-item', item)"
                @edit-click="emits('edit-item', item)"
            />
        </div>

        <TransitionRoot
            :show="confirmModalOpen"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
            <Dialog
                class="relative z-50"
                :open="true"
                @close="closeConfirmModal"
            >
                <div
                    class="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50"
                >
                    <DialogPanel
                        class="w-full max-w-sm rounded bg-white p-4 shadow-md"
                    >
                        <DialogTitle>Delete Items</DialogTitle>
                        <ConfirmModal
                            @delete-items-confirmed="onDeleteItemsConfirmed"
                            @close-confirm-modal="closeConfirmModal"
                        ></ConfirmModal>
                    </DialogPanel>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, withDefaults } from 'vue';
import { defineProps } from 'vue';
import {
    TransitionRoot,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';
import ListItem from './ListItem.vue';
import { GSListItem } from '../defs/defs';
import Button from './Button.vue';
import ConfirmModal from './ConfirmModal.vue';

const confirmModalOpen = ref(false);
const showGroup = ref(true);

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

const openConfirmModal = () => {
    confirmModalOpen.value = true;
};

const closeConfirmModal = () => {
    confirmModalOpen.value = false;
};

const onDeleteItemsConfirmed = () => {
    emits('delete-items');
    closeConfirmModal();
};
</script>
