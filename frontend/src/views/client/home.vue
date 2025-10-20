<script setup>
const Bodydescribe = defineAsyncComponent( () => import('@/views/client/product/dash/bodydescribe.vue'));
const Producttitle = defineAsyncComponent( () => import('@/views/client/product/dash/Producttitle.vue'));
const Listproduct = defineAsyncComponent( () => import('@/views/client/product/dash/Listproduct.vue'));
const Decorateproduct = defineAsyncComponent( () => import('@/views/client/product/dash/Decorateproduct.vue'));
const Productblog = defineAsyncComponent( () => import('@/views/client/product/dash/Productblog.vue'));
const ProductOptionRun = defineAsyncComponent( () => import('@/views/client/product/dash/ProductOptionRun.vue'));
const decorate_main_product= defineAsyncComponent( () => import('@/views/client/product/dash/decorate_main_product.vue'))
import { productClient } from '@/constant'
const route = useRoute();
const store = useStore();

const fetchInformationDash = async (category, page, per_page) => {
    const result = await store.dispatch('client/product/' + productClient.get_information_dashboard_client, {category, page, per_page})
}

function scrollToBodyDescribe() {
  // Cuộn đến component Bodydescribe
    bodyDescribeRef.value?.$el?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}
const bodyDescribeRef = ref(null)
const category = computed(() => store.state.client.product.category)
const products_pagination = computed(() =>  store.state.client.product.products_pagination)
const list_product_popular = computed(() =>  store.state.client.product.list_product_popular)
onMounted(() => {
    if(!(category.value.length !== 0) || 
        !(Object.keys(products_pagination.value).length !== 0) || 
        !(Object.keys(list_product_popular.value).length !==0) )
    {
        fetchInformationDash(category.value,1, 30);
    }
    
})
</script>

<template>
    <div>
       
        <div class="bg-[#e39f2f] dark:bg-gray-900 transition-all duration-500 mt-40 pt-10 pb-16 dark:pb-5">
            <component :is="decorate_main_product" />
        </div>
        <!-- <component :is="decorate_main_product" /> -->
        <div class="dark:bg-gray-900 transition-all duration-500 pb-10">
            <div class="grid grid-cols-12 max-w-7xl m-auto px-5 gap-5 ">
                <Bodydescribe ref="bodyDescribeRef" />  
                <Producttitle />
                <Listproduct @scroll-to-bodydescribe="scrollToBodyDescribe" />
                <Decorateproduct />
                <ProductOptionRun />
                <Productblog /> 
            </div>
        
        </div>
    </div>
    
    
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
