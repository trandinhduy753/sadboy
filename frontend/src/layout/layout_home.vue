<script setup lang="ts">
import Compheader from '@/components/header/Compheader.vue';
import Compfooter from '@/components/footer/compfooter.vue';

import { ref, reactive } from 'vue';
var header_css=reactive({
    bg: "fixed z-9 bg-[#e39f2f]  top-0 right-0  left-0 ",
    text_nav: "text-white",
    input: 'text-white placeholder:text-white '
});
</script>
<template>
    <Compheader :header_css="header_css" />
    <transition name="slide" mode="out-in">
        <!-- Bọc slot trong một thẻ div -->
        <div key="$route.fullPath" class="">
            <slot></slot>
        </div>
    </transition>
    <Compfooter />
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(10rem);
    opacity: 0;
  }
  to {
    transform: translateX(0rem);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    
    opacity: 1;
  }
  to {
    
    opacity: 0;
  }
}
.slide-enter-active {
  animation: slideIn 1s ease forwards;
}
.slide-leave-active {
  animation: slideOut 0.7s ease forwards;
}

</style>