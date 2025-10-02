<script setup lang="ts">
import Headerdescribe from '@/components/header/Headerdescribe.vue';
import Headernav from '@/components/header/Headernav.vue';
import Headerinput from './Headerinput.vue';


var props= defineProps({
    header_css: {
        type: Object,
        default: {}
    }
})
</script>

<template>
    <!-- Phần header -->
    <!-- Mỗi layout lại chỉnh lại nó -->
    <!-- class="header fixed z-99 bg-white top-0 right-0 pb-5 left-0" -->
    <div  :class="header_css?.bg" class="pb-5 dark:bg-gray-900 transition-all duration-300">
        <Headerdescribe :bg_des="header_css?.bg_des"/>
        <Headernav :text="header_css?.text_nav" />
        <Headerinput :input="header_css?.input" /> 
    </div>
    
</template>

<style scoped>
/* p
{
    font-family: 'Times New Roman', Times, serif;
} */
</style>
