<template>
    <div class="p-4 text-center">
        <transition class="transition-opacity duration-500">
            <div v-if="show">
                <p class="text-lg font-medium text-gray-800">
                    Bienvenue à Guide Scrum, votre outil pour gérer efficacement
                    vos groupes et tâches Scrum.
                </p>

                <p class="text-lg font-medium">
                    Cliquez sur le bouton ci-dessous pour commencer.
                </p>

                <Button
                    label="Commencer"
                    @click="goToHome"
                    class="mt-4 rounded bg-blue-500 py-2"
                >
                </Button>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Button from '../components/Button.vue';

const router = useRouter();
const show = ref(true);

const goToHome = () => {
    show.value = false;

    setTimeout(() => {
        router.push('/home');
    }, 500);
};
</script>
