<script setup lang="ts">
const AdminHeader = defineAsyncComponent( () => import('@/components/header/adminHeader.vue'));

</script>

<template>
    <AdminHeader />
    <div>
        <slot></slot>
    </div>

</template>

<style scoped>

</style>

