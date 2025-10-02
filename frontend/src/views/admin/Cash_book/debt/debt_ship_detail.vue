<script setup lang="ts">
    const { change_show_comp } = useMapActions('', ['change_show_comp']);
    function handle_change_show_comp(data)
    {
        change_show_comp(data)
    }
</script>

<template>
    <div class="flex items-center font-bold font-roboto border-l-4 border-[var(--maincolor)] bg-white dark:bg-gray-800 transition-all duration-500 dark:text-gray-300 mt-2  pl-2">
        <router-link :to="{name: 'admin_sadboizz.cashbook.debt'}">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)] hover:scale-[1.2] transition-all duration-500 dark:text-[var(--dark_maincolor)] dark:hover:text-[var(--maincolor)]"  />
        </router-link>
        <!-- <font-awesome-icon @click="handle_change_show_comp('debt_provide')" :icon="['fas', 'arrow-left']" class="cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)] hover:scale-[1.2] transition-all duration-500 dark:text-[var(--dark_maincolor)] dark:hover:text-[var(--maincolor)]"  /> -->
        <h3 class=" "> Thông tin chi tiết nhà vận chuyển </h3>
    </div>
    
    <div class="grid grid-cols-12 gap-5 pt-3">
        <div class="col-span-12 bg-white dark:bg-gray-800 transition-all duration-500 p-5 rounded-md">
            <div class="flex items-center">
                <div class="w-30 h-30 rounded-full overflow-hidden">
                    <img src="/public/images/img_product/product_img-11.png" class="w-full rounded-full h-full object-cover" alt="" />
                </div>
                <p class="ml-2 font-bold text-black dark:text-gray-300">Giao hàng nhanh</p>
                </div>
                <div class="flex justify-around items-center mt-4">
                <div class="text-center text-black dark:text-gray-300">
                    <p>Nợ phải trả</p>
                    <p class="text-lg font-bold text-red-500 dark:text-red-400">12.000.000 đ</p>
                </div>
                <div class="text-center text-black dark:text-gray-300">
                    <p>Tổng vận đơn</p>
                    <p class="text-lg font-bold text-[var(--maincolor)] dark:text-[var(--maincolor)]">120</p>
                </div>
            </div>
        </div>
        <div class="col-span-12 px-5 bg-white dark:bg-gray-800 transition-all duration-500 mt-5 py-5 rounded-md">
            <div class="border-b-2 border-[var(--maincolor)] pb-2 text-black dark:text-gray-300">Danh sách</div>
            <div class="mt-5 flex items-center justify-between">
                <Menu as="div" class="relative block text-left">
                    <MenuButton>
                        <div class="w-50 transition-all duration-500 h-9 flex items-center justify-between px-3 border border-[var(--color_border)] dark:border-gray-700 py-1 rounded-[0.2rem] bg-white dark:bg-gray-800 text-black dark:text-gray-300 cursor-pointer">
                            <span>Điều kiện lọc</span>
                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                        </div>
                    </MenuButton>
                    <MenuItems class="absolute left-0 mt-2 p-1 origin-top-right bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50 w-50 text-black dark:text-gray-300">
                        <div class="py-1">
                            <MenuItem class="mb-1 cursor-pointer">
                                <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem]">Theo thời gian</p>
                            </MenuItem>
                            <MenuItem class="mb-1 cursor-pointer">
                                <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem]">Người nộp</p>
                            </MenuItem>
                            <MenuItem class="mb-1 cursor-pointer">
                                <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem]">Số tiền</p>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
                <div class="w-full ml-3">
                    <input type="text" class="border transition-all duration-500 w-full border-[var(--color_border)] dark:border-gray-700 rounded-[0.2rem] pl-2 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-gray-200" placeholder="Tìm kiếm phiếu" />
                </div>
            </div>
            <div class="grid grid-cols-12 gap-2 text-sm mt-5 px-2 text-black dark:text-gray-300">
                <div class="col-span-3">Mã phiếu</div>
                <div class="col-span-3">Thời gian ghi nhận</div>
                <div class="col-span-3">Ghi chú</div>
                <div class="col-span-3 text-right">Giá trị</div>
            </div>
            <div v-for="i in 5" :key="i" class="grid grid-cols-12 gap-2 text-sm mt-4 px-2 bg-gray-100 dark:bg-gray-800 transition-all duration-500 py-4 text-black dark:text-gray-300"  >
                <div class="col-span-3 text-blue-700 dark:text-blue-400">#1233333 đ</div>
                <div class="col-span-3 text-red-500 dark:text-red-400">22-10-2024</div>
                <div class="col-span-3">Phiếu vận chuyển</div>
                <div class="col-span-3 text-right text-green-500 dark:text-green-400">4.888.888 đ</div>
            </div>
        </div>
    </div>

  
</template>

<style scoped>

</style>
