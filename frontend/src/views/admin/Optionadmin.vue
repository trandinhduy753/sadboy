<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { formatMoney } from '@/composables'
const store = useStore()
const admin_option = reactive([
    {
        title: 'Tổng quan',
        router: 'admin_sadboizz.dashboard',
        opt: 'dashboard',
        other: []
        
    },
    {
        title: 'Trò chuyện',
        router: 'admin_sadboizz.chat',
        opt: 'chat',
        other: []
    },
    {
        title: 'Quản lý nhân viên',
        router: 'admin_sadboizz.employee',
        opt: 'employee',
        other: []
    },
    {
        title: 'Quản lý khách hàng',
        router: 'admin_sadboizz.customer',
        opt: 'customer',
        other: []  
    },
    {
        title: 'Quản lý đơn hàng',
        router: 'admin_sadboizz.order',
        opt: 'order',
        other: []
    },
    {
        title: 'Quản lý sản phẩm',
        router: '',
        opt: 'product',
        other: [
            {
                title: 'Danh sách sản phẩm',
                router: 'admin_sadboizz.product',
                query: {  } 
            },
            {
                title: 'Thêm sản phẩm mới',
                router: 'admin_sadboizz.product.add',
                query: { showopt: 'shop_ad_t' }
            },
            {
                title: 'Tạo phiếu nhập hàng',
                router: 'admin_sadboizz.product.import',
                query: { showopt: 'shop_ad_t' }
            }
        ],
        
    },
    {
        title: 'Quản lý bình luận',
        router: 'admin_sadboizz.comment',
        opt: 'comment',
        other: []
    },
    {
        title: 'Quản lý mã giảm giá',
        router: 'admin_sadboizz.voucher',
        opt: 'voucher',
        other: []
    },
    {
        title: 'Quản lý nhà cung cấp',
        router: 'admin_sadboizz.provide',
        opt: 'provide',
        other: []
    },
    {
        title: 'Quản lý sổ quỹ',
        router: '',
        opt: 'cash_book',
        other: [
            {
                title: 'Thu chi',
                router: 'admin_sadboizz.cashbook.income_spend.cash_book',
            },
            {
                title: 'Công nợ',
                router: 'admin_sadboizz.cashbook.debt'
            },
            {
                title: 'Danh sach đơn hàng',
                router: 'admin_sadboizz.cashbook.order_provider.list_import'
            }
        ]
    }
])

const menuActive=ref(-1);

const dashboard = computed(() => store.getters['admin/get_dashboard'] )
</script>

<template>
    <div class="dark:text-gray-200 px-5 mt-2 rounded-md">
        <div class="border-b-3 border-[var(--maincolor)] pb-2">
            <div class="text-3xl font-bold">Department</div>
            <div class="mt-2">
                <template v-for="(option, index) in admin_option" :key="index">
                    <router-link 
                        v-if="option.other.length == 0" 
                        :to="{ name: option.router }" 
                        custom 
                        v-slot="{ href, navigate, isActive }"
                    >
                        <div 
                            @click="navigate" 
                            :class="[
                                'mb-1 py-2 pl-2 cursor-pointer hover:bg-[var(--color_border)] dark:hover:bg-gray-700',
                                isActive ? 'bg-[var(--color_border)] dark:bg-gray-800' : ''
                            ]"
                        >
                            {{ option.title }}
                        </div>
                    </router-link>
                    <div 
                        v-else 
                        class="mb-1 py-2 pl-2 cursor-pointer hover:bg-[var(--color_border)] dark:hover:bg-gray-700 dark:text-gray-300"
                    >
                        <Menu as="div" class="relative block">
                            <MenuButton class="w-full">
                                <div class="text-left">
                                    {{ option.title }}
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute -left-2 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50" >
                                <div v-for="(item, i) in option.other" :key="i" class="py-1">
                                    <router-link :to="{name: item.router , query: item.query } " custom  v-slot="{ href, navigate }" >
                                        <MenuItem @click="navigate" class="mb-1 cursor-pointer">
                                            <p :class="[ 'block px-2 py-1 hover:bg-[var(--background-color-gray)] hover:text-red-400 rounded-[0.2rem] dark:hover:bg-gray-700 dark:hover:text-yellow-300', menuActive == i ? 'bg-[var(--background-color-gray)] text-red-400 dark:bg-gray-700 dark:text-yellow-300' : '' ]" >
                                                {{ item.title }}
                                            </p>
                                        </MenuItem>
                                    </router-link>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                    
                </template>
               
            </div>
        </div>

        <div class="mt-7 border-b-3 border-[var(--maincolor)] pb-4">
            <div class="text-3xl font-bold">Price</div>
            <div class="flex justify-between items-center mt-2">
                <p class="flex-1">15000 VNĐ</p>
                <div class="rounded-sm bg-red-500 flex-1 h-1"></div>
                <p class="flex-1 text-end">60000 VNĐ</p>
            </div>
        </div>

        <div class="mt-7 border-b-3 border-[var(--maincolor)]">
            <div class="text-3xl font-bold">Color</div>
            <div class="grid grid-cols-2 mt-3">
                <div v-for="i in 6" :key="i" class="flex items-center shrink-0 mb-5 cursor-pointer">
                    <div class="w-5 h-5 bg-amber-400 rounded-full"></div>
                    <p class="ml-3">White</p>
                </div>
            </div>
        </div>

        <div class="mt-7 border-b-3 border-[var(--maincolor)] pb-5">
            <div class="text-3xl font-bold">Popular size</div>
            <div class="grid grid-cols-2 mt-4 gap-2">
                <p class="bg-[var(--color_border)] dark:bg-gray-800 py-1 text-center">Small</p>
                <p class="bg-[var(--color_border)] dark:bg-gray-800 py-1 text-center">Medium</p>
                <p class="bg-[var(--color_border)] dark:bg-gray-800 py-1 text-center">Large</p>
            </div>
        </div>

        <div class="mt-7">
            <div class="font-bold text-3xl">Salest product</div>
            <div class="grid grid-cols-1 gap-y-3 mt-5">
                <Carousel 
                    class="mb-1" 
                    v-for="(products, index) in dashboard?.product_sale" :key="index"
                    :autoplay="2000" 
                    :wrap-around="true" 
                    :interval="6000" 
                    :items-to-show="1" 
                    :items-to-scroll="1" 
                    :transition="1500" 
                    :easing="'ease-in-out'"
                >
                    <Slide v-for="(product, i) in products" :key="i">
                        <div class="flex items-center justify-start mb-0.5 w-full">   
                            <div class="w-30 h-20 bg-[var(--colorgoods)] dark:bg-gray-700 rounded-sm">
                                <img :src="product?.img" class="w-full h-full rounded-sm" alt="">
                            </div>
                            <div class="ml-5">
                                <p class="font-bold text-[1.3rem] normal-case">{{ product?.name }}</p>
                                <h3 class="text-sm">{{ formatMoney(product?.price) }}</h3>
                            </div>
                        </div>
                    </Slide>
                    
                </Carousel>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
