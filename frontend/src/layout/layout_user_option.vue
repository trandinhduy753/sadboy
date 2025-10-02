<script setup lang="ts">
import Compheader from '@/components/header/Compheader.vue';
import Optionaccount from '@/views/client/account/Optionaccount.vue';
</script>
<template>
    <Compheader />
    <div class="mt-50 bg-[var(--background-color-gray)] pb-10">
        <div class="px-1 grid grid-cols-[0.7fr_3fr]  max-w-7xl m-auto  gap-10">
            <Optionaccount />
            <slot></slot>
        
        </div>
    </div>
</template>

<style scoped>

</style>