<script setup lang="ts">
import Compheader from '@/components/header/Compheader.vue';
import { reactive  } from 'vue'
const header_css=ref({
    bg_des: "bg-[var(--background-color-gray)]",
    text_nav: "",
    input: ' '
})

</script>

<template>
    <Compheader :header_css="header_css" />
    <div class="dark:bg-gray-900 ">
        <slot></slot>
    </div>

</template>

<style scoped>

</style>

