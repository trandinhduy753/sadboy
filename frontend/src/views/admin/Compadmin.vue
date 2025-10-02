<script setup lang="ts">
import Optionadmin from '@/views/admin/Optionadmin.vue';

</script>

<template>
    
    <div class="grid grid-cols-12 dark:bg-gray-900 transition-all duration-500  px-5 gap-5">
        <div class="col-span-3">
            <Optionadmin />
        </div>
        <div class="col-span-9">
            <keep-alive>
                <router-view v-slot="{ Component }">
                    <component :is="Component" />
                </router-view>
            </keep-alive>
        </div>
    </div>
</template>

<style scoped>

</style>
