<script setup>
import { formatMoney } from '@/composables'
var props = defineProps({
    product: {
        type: Object,
        default: {}
    },
    
})
</script>

<template>
    <router-link :to="{ name: 'detail_product', params: { slug: product.slug }  }">
        <div class="group border-[1px] dark:text-white dark:bg-gray-800 border-[var(--colorborder)] pb-3 rounded-sm hover:scale-[1.02] shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div class="h-48 bg-[var(--colorgoods)] relative overflow-hidden">
                <img :src="product?.img" class="h-full w-full rounded-tl-sm rounded-tr-sm transition-transform duration-500 group-hover:scale-110" alt="">
                <div class="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
            <div class="pl-3 mt-3">
                <h3 class="text-xl font-[600] capitalize text-gray-700 dark:text-blue-300 transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">{{ product?.name }}</h3>
                <p class="font-serif text-base font-[600] dark:text-gray-400 transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">{{ product?.sale_price?.['S'] ? formatMoney(product?.sale_price?.['S']) : formatMoney(product?.original_price?.['S']) }}</p>
            </div>
            <div class="ml-3 my-3 h-5">
                <p v-show="product?.gift=='yes'" class="border-[1px] border-red-600 text-xs text-red-600 dark:border-red-400 dark:text-red-400 inline pl-1 pr-6 py-[2px] transition-all duration-300 group-hover:bg-red-600 group-hover:text-white dark:group-hover:bg-red-400">Mua để nhận quà</p>
            </div>
            <div class="pl-3 flex items-center justify-start">
                <template class="flex items-center">
                    <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300 -mt-1 transition-transform duration-300 group-hover:scale-110" />
                    <span class="ml-1 font-serif pr-3 -mt-1 transition-colors duration-300 group-hover:text-orange-500">{{ product?.star }}</span>
                    <div class="h-4 w-[0.1rem] bg-[var(--colorborder)] dark:bg-gray-600 transition-colors duration-300 group-hover:bg-orange-500"></div>
                </template>
                <p class="font-serif ml-3 transition-colors duration-300 group-hover:text-orange-500">Đã bán <span>{{ product?.count_sale }}</span></p>
            </div>
            <div class="pl-3 flex items-center mt-1">
                <font-awesome-icon :icon="['fas', 'location-dot']" class="text-red-600 dark:text-red-400 transition-transform duration-300 group-hover:scale-110" />
                <p class="text-sm ml-1 transition-colors duration-300 group-hover:text-orange-500">{{ product?.place }}</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
/* Thêm hiệu ứng shine khi hover */
.group::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transform: skewX(-25deg);
    transition: 0.5s;
}

.group:hover::before {
    left: 150%;
}

/* Thêm hiệu ứng border animation */
.group::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid transparent;
    border-radius: 0.125rem;
    transition: 0.3s;
}

.group:hover::after {
    border-color: var(--colorborder);
}
</style>
