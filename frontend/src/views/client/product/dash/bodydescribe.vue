<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
const store = useStore();
const get_products_pagination = computed(() => store.getters['client/product/get_products_pagination'] )
</script>
<template>
    <div class="col-span-12 mt-10 animate-zoom">
        <Carousel class="" 
            :autoplay="2000" 
            :wrap-around="true" 
            :interval="6000" 
            :items-to-show="5" 
            :items-to-scroll="1" 
            :transition="1500" 
            :easing="'linear'">
            <Slide v-for="(product, index) in get_products_pagination?.products?.slice(0, 10)" :key="index">
                <div class="rounded-sm ml-4 bg-[var(--colorgoods)] w-65 h-56 p-2 flex flex-col justify-center items-center cursor-pointer dark:bg-gray-800 transition duration-300">
                    <img class="h-53 w-63 rounded-sm" :src="product?.img" />
                    <p class="font-semibold text-sm w-44 text-center py-2 rounded-sm bg-white font-serif my-3 dark:bg-gray-700 dark:text-white uppercase">{{ product.category }}</p>
                </div>
               
            </Slide>
           
        </Carousel>
    </div>
</template>

<style scoped>
@keyframes zoom {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-zoom {
    animation: zoom 0.7s ease-out;
}
</style>
