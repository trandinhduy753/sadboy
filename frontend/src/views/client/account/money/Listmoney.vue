<script setup>
import addmoney from '@/views/client/account/money/addmoney.vue';
import exceptmoney from '@/views/client/account/money/exceptmoney.vue'

</script>

<template>
    <div class="bg-white mt-5 p-6 pb-10 dark:bg-gray-800 ">
        <div class="flex justify-between items-center dark:bg-gray-800 p-3 rounded-md">
            <div class="w-100 h-25 flex items-center">
                <img src="@/assets/images/coin.png" class="w-25 h-25 -ml-4" alt="">
                <p class="text-2xl text-yellow-500 font-bold">
                    100000 VNĐ 
                    <span class="text-black dark:text-gray-300 text-base font-[300]">hiện đang có</span>
                </p>
            </div>

            <div class="flex items-center text-yellow-600 dark:text-yellow-400 cursor-pointer">
                <p>Nạp tiền vào tải khoản!</p>
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[1.1rem] ml-2" />
            </div>
        </div>

        <div class="mt-2 flex dark:bg-gray-900 p-2 rounded-md">
            <p class="flex-1 text-center border-b-2 pb-1 border-red-800 dark:border-red-500 cursor-pointer text-[1.2rem] dark:text-gray-300">Tất cả lịch sử</p>
            <p class="flex-1 text-center border-b-2 pb-1 cursor-pointer text-[1.2rem] dark:text-gray-300">Tiền đã nạp</p>
            <p class="flex-1 text-center border-b-2 pb-1 cursor-pointer text-[1.2rem] dark:text-gray-300">Tiền đã sử dụng</p>
        </div>


        <div class="mt-4 ">
           <addmoney v-for="i in 2" :key="i"/>
           <exceptmoney />
        </div>

    </div>
    
    
</template>

<style scoped>

</style>

