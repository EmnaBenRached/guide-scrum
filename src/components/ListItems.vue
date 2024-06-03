<template>
    <div class="rounded-lg border p-6 text-center">
        <h2 class="text-xl font-bold underline decoration-1">
            {{ props.title }}
        </h2>
        <div class="space-y-4 p-6">
            <ListItem
                v-for="(item, index) in props.items"
                :key="index"
                :item="item"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ListItem from './ListItem.vue';
import { GSListItem } from '../defs/defs';

const props = defineProps<{
    items: GSListItem[];
    title: string;
}>();
</script>
