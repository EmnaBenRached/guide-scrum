<template>
    <div class="relative rounded-lg bg-stone-100 p-4 p-6 text-center shadow-lg">
        <div class="flex justify-center gap-2">
            <h2
                class="mx-2 text-center text-xl font-bold underline decoration-1"
            >
                {{ props.group.title }}
            </h2>
            <span class="text-center text-xl font-bold"
                >({{ props.group.items.length }})</span
            >
        </div>

        <Button
            v-show="group.canHide"
            class="absolute right-0 top-0 text-2xl font-bold"
            label="&times;"
            @click="group.visible = !group.visible"
        >
        </Button>

        <ListItems
            class="mt-2"
            :items="group.items"
            @add-item="emits('add-item')"
            @edit-item="emits('edit-item', $event)"
            @delete-item="emits('delete-item', $event)"
            @delete-items="emits('delete-items')"
        />
    </div>
</template>

<script lang="ts" setup>
import { GSGroupItems } from '../domain/models';
import { defineEmits, defineProps } from 'vue';
import ListItems from './ListItems.vue';
import Button from './Button.vue';

const props = defineProps<{
    group: GSGroupItems;
}>();

const emits = defineEmits<{
    (event: 'add-item'): void;
    (event: 'edit-item', itemId: string): void;
    (event: 'delete-item', itemId: string): void;
    (event: 'delete-items'): void;
}>();
</script>
