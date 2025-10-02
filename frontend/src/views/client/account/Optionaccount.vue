<script setup lang="ts">
import { ref, reactive } from 'vue';

var options_account=reactive([
    {
        title:"Tài khoản của tôi",
        icon: ['far', 'user'] ,
        class: 'text-blue-500',
        name: 'account.user'
    },
    {
        title:"Đơn mua",
        icon: ['far', 'clipboard'] ,
        class: 'text-blue-600',
        name: 'account.orders.list'
    },
    {
        title:"Thông báo",
        icon: ['fas', 'bullhorn'] ,
        class: 'text-red-500',
        name: 'account.announces'
    },
    {
        title:"Kho voucher",
        icon: ['fas', 'ticket'],
        class: 'text-red-500',
        name: 'account.vouchers'
    },
    {
        title:"Tiền trong tài khoản",
        icon: ['fas', 'money-bill'],
        class: 'text-yellow-500',
        name: 'account.moneys'
    }
])
</script>

<template>
    <div class="mt-5">
        <!-- Thông tin người dùng -->
        <div class="flex items-center border-b-1 border-[var(--maincolor)] pb-3 dark:border-gray-600">
            <img src="@/assets/images/img_discount/img_discount_view-1.webp" class="w-10 h-10 rounded-full">
            <p class="font-bold ml-3 dark:text-gray-300">Nguyễn Trần Cường</p>
        </div>
        
        <!-- Khuyến mãi -->
        <div class="mt-5 pb-3 border-b-1 border-[var(--maincolor)] dark:border-gray-600">
            <div class="flex items-center mb-2">
                <img src="@/assets/images/img_discount/img_discount_view-1.webp" class="w-5 h-5 rounded-full">
                <p class="ml-2 dark:text-gray-300">Sale giữa tháng giảm 15%</p>
            </div>
            <div class="flex items-center">
                <img src="@/assets/images/img_discount/img_discount_view-1.webp" class="w-5 h-5 rounded-full">
                <p class="ml-2 dark:text-gray-300">22/10 giảm 30% tất cả sản phẩm</p>
            </div>
        </div>

        <!-- Danh sách tùy chọn tài khoản -->
        <div class="mt-3">
            <router-link v-for="(option_account, index) in options_account" :key="index"
                :to="{name: option_account.name}"
                custom
                v-slot="{href, navigate, isActive}"
            >
                <div 
                    class="flex items-center mb-3 cursor-pointer hover:scale-[1.1] transition duration-300 hover:text-orange-500 dark:hover:text-orange-400"
                    @click="navigate"
                >
                    <font-awesome-icon 
                        :icon="option_account.icon" 
                        :class="option_account.class" 
                        class="text-[1.1rem] w-5 "
                    />
                    <p 
                        :class="['ml-4 text-base capitalize', isActive ? 'text-orange-500 dark:text-orange-400' : 'dark:text-gray-300']"
                    >
                        {{ option_account.title }}
                    </p>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style scoped>

</style>