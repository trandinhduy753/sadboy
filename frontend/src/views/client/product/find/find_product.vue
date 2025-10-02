<script setup lang="ts">
import Silbar from '@/views/client/product/find/silbar.vue';
import { productClient } from '@/constant'
import { formatMoney } from '@/composables'
const store = useStore()
const route = useRoute()
const fetchGetListProductBySearch = async (search, count) => {
    const result = store.dispatch('client/product/' + productClient.get_list_product_by_search, {page: 1,search, count}) 
    
}
const load_add_product = async (page, search, count) => {
    const result = store.dispatch('client/product/' + productClient.get_list_product_by_search, {page, search, count})
}
const handleScrollLoadData = (event) => {
    const el = event.target;
    if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
        page.value++;
        load_add_product(page.value, search.value, 30)
    }
};
const change_sort = (sortby, index) => { 
    active_menu.value=index
    store.commit('client/product/CHANGE_SORT_BY', sortby )
} 
const opts_find_product=reactive([
    {
        title: 'Liên quan',
        opt: 'constant',
        type: 'normal'
    },
    {
        title: 'Mới nhất',
        opt: 'newest',
        type: 'normal'
    },
    {
        title: 'Bán chạy',
        opt: 'sale',
        type: 'normal'
    }
])
const opt_find_price=reactive({
    title: "Giá",
    type: [
        {
            title: 'Từ cao đến thấp',
            opt: 'price_asc',
            
        },
        {
            title: 'Từ thấp đến cao',
            opt: 'price_desc',
          
        }
    ]
})
const active_price=ref(-1)
const active_menu=ref(0);

const search = computed(() => route.query.name )
const products_search = computed(() => store.getters['client/product/get_products_search'] )
const page = ref(1)
watch(search, (newVal, oldVal) => {
  fetchGetListProductBySearch(newVal, 30)
})
onMounted(() => {
    
    fetchGetListProductBySearch(search.value, 30)
})
onUnmounted(() => {
    store.commit('client/product/CHANGE_POSITION_FIND', {start: 0, end: 0})
})
</script>

<template>
    <div class="dark:bg-gray-900 pb-10  transition-all duration-500">
        <div class="grid grid-cols-12 max-w-7xl  m-auto px-5 pt-5 gap-10 ">
            <Silbar class="col-span-3" />
            <div class="col-span-9">
                <div class="flex justify-start bg-[var(--background-color-gray)] p-3 dark:bg-gray-800 dark:text-gray-300" id="product-setup-title">
                    <div 
                        v-for="(opt_find_product, i) in opts_find_product" 
                        :key="i" 
                        class="w-35 transition duration-300 hover:bg-orange-400 hover:opacity-[0.8] hover:text-white p-2 text-center rounded-ssm mr-3 cursor-pointer"
                        :class="active_menu==i ? 'text-white bg-orange-500 dark:bg-orange-600' : 'bg-white dark:bg-gray-700 dark:text-gray-200'" 
                        @click="change_sort(opt_find_product.opt, i)"
                    >
                        {{ opt_find_product.title }}
                    </div>

                    <div>
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="flex w-50 rounded-ssm items-center cursor-pointer justify-between bg-white dark:bg-gray-700 dark:text-gray-300 px-3 py-2">
                                    <p>{{ opt_find_price.title }}</p>
                                    <font-awesome-icon :icon="['fas', 'chevron-down']" />
                                </div>
                            </MenuButton>

                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-700 dark:text-gray-300 border rounded-md shadow-lg z-50">
                                <div class="py-1">
                                    <MenuItem 
                                        v-for="(find_price, index) in opt_find_price.type" 
                                        :key="index" 
                                        class="mb-1 cursor-pointer"
                                    >
                                        <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] hover:text-orange-500 dark:hover:bg-gray-600 dark:hover:text-orange-400 rounded-ssm"
                                            :class="active_price==index ? 'bg-[var(--background-color-gray)] text-orange-500 dark:bg-gray-600 dark:text-orange-400' : ''"
                                            @click="change_sort(find_price.opt, active_menu)"
                                        >
                                            {{ find_price.title }}
                                        </p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div> 
             
                <div @scroll="handleScrollLoadData"  class="grid grid-cols-5 gap-5 mt-1 max-h-400 pb-10 overflow-y-auto scrollbar-hide">
                    <template v-for="(product, index) in products_search" :key="index">
                        <router-link :to="{ name: 'detail_product', params: { slug: product.slug }  }">
                            <div class=" group border-[1px] dark:text-white dark:bg-gray-800 border-[var(--colorborder)] pb-3 rounded-sm hover:scale-[1.02] shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                <div class="h-48 bg-[var(--colorgoods)] relative overflow-hidden">
                                    <img :src="product?.img" class="h-full w-full rounded-tl-sm rounded-tr-sm transition-transform duration-500 group-hover:scale-110" alt="">
                                    <div class="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>
                                <div class="pl-3 mt-3">
                                    <h3 class="text-xl font-[600] capitalize text-gray-700 dark:text-blue-300 transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">{{ product?.name }}</h3>
                                    <p class="font-serif text-base font-[600] dark:text-gray-400 transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">{{ product?.sale_price['S'] ? formatMoney(product?.sale_price['S']) : formatMoney(product?.original_price['S']) }}</p>
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
                </div>
               
            </div>
            
        </div>
    </div>
    
</template>

<style scoped>

</style>
