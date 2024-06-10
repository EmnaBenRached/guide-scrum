<template>
    <div class="mt-2 min-h-screen bg-red-200">
        <h1 class="p-6 text-center text-4xl">Guide Scrum</h1>
        <p class="p-2 text-center">Welcome to the Guide Scrum</p>
        <div class="flex flex-wrap justify-between">
            <div v-for="group in groups" class="p-10">
                <ListItems
                    :items="group.items"
                    :title="group.title"
                    @add-item="onAddItem(group.id)"
                    @delete-item="onDeleteItem(group.id, $event)"
                />
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
            <Dialog @close="closeModal">
                <DialogPanel class="bg-white">
                    <DialogTitle>Add Item</DialogTitle>
                    <Formulaire @save="onSave" />
                </DialogPanel>
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
import ListItems from './components/ListItems.vue';
import { GSListItem } from './defs/defs';
import Formulaire from './components/Formulaire.vue';

const groupIdEnAjout = ref('');
const modalOpen = computed(() => groupIdEnAjout.value !== '');

const groups = ref<{ title: string; id: string; items: GSListItem[] }[]>([
    {
        title: 'Group 1',
        id: '1',
        items: [],
    },
    {
        title: 'Group 2',
        id: '2',
        items: [],
    },
    {
        title: 'Group 3',
        id: '3',
        items: [],
    },
]);

const onSave = ({ title }: { title: string }) => {
    groups.value
        ?.find((group) => group.id === groupIdEnAjout.value)
        ?.items.push({
            title,
            description: '',
            participants: [],
            progress: 0,
        });

    closeModal();
};

const onAddItem = (groupId: string) => {
    groupIdEnAjout.value = groupId;
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

onMounted(() => {
    document.title = 'Guide Scrum';
});
</script>
