<script setup lang="ts">
import Compheader from '@/components/header/Compheader.vue';
import Compfooter from '@/components/footer/compfooter.vue';

import { ref, reactive } from 'vue';
var header_css=reactive({
   bg_des: "bg-[var(--background-color-gray)]"
})
</script>
<template>
   <Compheader :header_css="header_css" />
   <div>
      <slot></slot>
   </div>
   <Compfooter />
</template>

<style scoped>

</style>