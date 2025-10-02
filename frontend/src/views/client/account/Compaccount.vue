<script setup lang="ts">
import Optionaccount from '@/views/client/account/Optionaccount.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
    <div class="bg-[var(--background-color-gray)] dark:bg-gray-900 transition-all duration-500 pb-30">
        <div class="grid grid-cols-12 gap-10 max-w-7xl m-auto px-5">
            <div class="col-span-3">
                <Optionaccount />
            </div>
            <div class="col-span-9 ">
                <router-view v-slot="{ Component }">
                    <transition name="page" mode="out-in">
                        <component :is="Component" :key="route.fullPath" />
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .page-enter-active,
    .page-leave-active {
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page-enter-from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
    }

    .page-leave-to {
        opacity: 0;
        transform: scale(1.05) translateY(-20px);
    }
</style>
