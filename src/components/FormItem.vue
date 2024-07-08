<template>
    <form action="#">
        <div class="">
            <textarea
                v-model.trim="formValue.title"
                class="mt-4 w-full rounded border p-2"
                placeholder="Write your task..."
            ></textarea>
            <Listbox v-model="formValue.groupId">
                <ListboxButton
                    class="focus:shadow-outline mt-4 rounded border border-stone-500 bg-slate-200 px-1 py-2 text-black hover:bg-orange-100 focus:outline-none"
                >
                    {{
                        props.groups.find((g) => g.id === formValue.groupId)
                            ?.title ?? 'Selectionner un groupe'
                    }}
                </ListboxButton>
                <ListboxOptions v-slot="{ selected }">
                    <ListboxOption
                        v-for="group in filtredGroups"
                        as="template"
                        :value="group.id"
                        :key="group.id"
                    >
                        <li
                            :class="{
                                'bg-blue-500 text-white': selected,
                                'bg-white text-black': !selected,
                            }"
                        >
                            {{ group.title }}
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </Listbox>
        </div>
        <div class="mt-4">
            <Button label="Enregistrer" @click="onSave"></Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import Button from './Button.vue';
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue';
import { GSListItem, GSGroupItems } from '../domain/models';

const props = withDefaults(
    defineProps<{
        item: GSListItem;
        groups?: GSGroupItems[];
    }>(),
    {
        groups: () => [],
    },
);

const emit = defineEmits<{
    (event: 'save', item: GSListItem, groupId: string): void;
}>();

const formValue = ref<GSListItem & { groupId?: string }>({
    ...props.item,
    groupId: props.groups.find((g) =>
        g.items.map((i) => i.id).includes(props.item.id),
    )?.id,
});

const filtredGroups = computed(() =>
    props.groups.filter(
        (g) => !g.items.map((i) => i.id).includes(formValue.value.id),
    ),
);

const onSave = () => {
    if (!formValue.value.title || !formValue.value.groupId) {
        return;
    }

    const item = { ...formValue.value };

    delete item.groupId;

    emit('save', item, formValue.value.groupId);
};
</script>
