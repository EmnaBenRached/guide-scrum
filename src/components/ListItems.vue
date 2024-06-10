<template>
    <div class="rounded-lg border p-6 text-center">
        <h2 class="text-xl font-bold underline decoration-1">
            {{ props.title }}
        </h2>
        <Button label="Add" @click="emits('add-item')"></Button>

        <div class="space-y-4 p-6">
            <ListItem
                v-for="(item, index) in props.items"
                :key="index"
                :item="item"
                @delete-click="emits('delete-item', item)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ListItem from './ListItem.vue';
import { GSListItem } from '../defs/defs';
import Button from './Button.vue';

const props = withDefaults(
    defineProps<{
        items?: GSListItem[];
        title: string;
    }>(),
    {
        items: () => [],
    },
);

const emits = defineEmits<{
    (event: 'add-item'): void;
    (event: 'delete-item', item: GSListItem): void;
}>();
</script>
