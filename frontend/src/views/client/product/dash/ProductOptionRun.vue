<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { productClient } from '@/constant';
import { formatMoney } from '@/composables'
const fetchGetProductPopular = async (row, col) => {
    const result = await store.dispatch('client/product/' + productClient.get_product_popular, {row, col})
}
const store = useStore();
const list_product_popular = computed(() => store.getters['client/product/get_product_popular'] )
onMounted(() => {
   
})
</script>

<template>
    <div v-for="(product_popular, index) in list_product_popular " :key="index" class="col-span-4 max-md:hidden">
        <h3 class="lg:text-2xl font-bold border-b-4 border-[var(--maincolor)] pb-3 mb-6 dark:text-white xl:h-11 lg:h-20">{{ product_popular?.title }}</h3>
        <Carousel class="mb-4" v-for="(list_product, index) in product_popular.products" :key="index" 
            :autoplay="2000" 
            :wrap-around="true" 
            :interval="6000" 
            :items-to-show="1" 
            :items-to-scroll="1" 
            :transition="1500" 
            :easing="'ease-in-out'">
            <Slide v-for="(product, index) in list_product" :key="index">
                <div class="flex items-center justify-start mb-0.5 w-full  dark:text-white rounded-sm">   
                    <router-link :to="{ name: 'detail_product', params: { slug: product.slug }  }">
                        <div class="w-30 h-20 bg-[var(--colorgoods)] rounded-sm">
                            <img :src="product?.img" class="w-full h-full rounded-sm" alt="">
                        </div>
                    </router-link>
                    <div class="ml-5">
                        <p class="font-bold text-[1.3rem] normal-case dark:text-gray-300">{{ product?.name }}</p>
                        <h3 class="text-sm dark:text-gray-400">1{{ product?.sale_price?.['S'] ? formatMoney(product?.sale_price['S']) : formatMoney(product?.original_price['S']) }}</h3>
                    </div>
                </div>
              
            </Slide>
        </Carousel>
    </div> 
    
</template>

<style scoped>

</style>
