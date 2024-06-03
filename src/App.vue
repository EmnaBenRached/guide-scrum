<template>
    <div class="mt-2 min-h-screen bg-red-200">
        <h1 class="p-6 text-center text-4xl">Guide Scrum</h1>
        <p class="p-2 text-center">Welcome to the Guide Scrum</p>
        <Formulaire @taskSaved="addTask" />
        <div class="flex flex-wrap justify-between">
            <div class="p-10">
                <ListItems :items="listItems" :title="ListTitles[0]" />
            </div>
            <div class="p-10">
                <ListItems :items="listItems" :title="ListTitles[1]" />
            </div>
            <div class="p-10">
                <ListItems :items="listItems" :title="ListTitles[2]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ListItems from './components/ListItems.vue';
import { GSListItem } from './defs/defs';
import Formulaire from './components/Formulaire.vue';

const listItems = ref<GSListItem[]>([
    {
        title: 'Task 1',
        description: 'Description 1',
        participants: [],
        progress: 0,
    },
    {
        title: 'Task 2',
        description: 'Description 2',
        participants: [],
        progress: 50,
    },
    {
        title: 'Task 3',
        description: 'Description 3',
        participants: [],
        progress: 100,
    },
]);

const ListTitles = ref<string[]>(['To Do', 'In Progress', 'Done']);

const addTask = (newTask: string) => {
    listItems.value.push({
        title: newTask,
        description: '',
        participants: [],
        progress: 0,
    });
};

onMounted(() => {
    document.title = 'Guide Scrum';
});
</script>
