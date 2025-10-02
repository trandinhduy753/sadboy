<script setup lang="ts">
import Address from '@/views/client/product/find/address.vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
const store = useStore();
const applyRangePrice = () => {
    const regex = /^[0-9]+$/
    if(!start_price.value && !end_price.value ) {
        toast.warning("Vui lòng nhập giá tiền")
        store.commit('client/product/CHANGE_RANGE_PRICE', {start_price:0, end_price: 0})
    }
    else {
        if(!regex.test(start_price.value) || !regex.test(end_price.value) ) {
            toast.warning("Vui lòng xem lại giá nhập")
        }
        else {
            store.commit('client/product/CHANGE_RANGE_PRICE', {start_price: start_price.value, end_price: end_price.value})
        }
    }
    
    
}
const start_price = ref()
const end_price = ref()


</script>

<template>
    <div class="product-change-infor shop-find-contain-res]  dark:text-gray-200  rounded-lg">
        <!-- Bộ lọc tìm kiếm -->
        <div class="flex items-center">
            <font-awesome-icon :icon="['fas', 'filter']" class="text-gray-800 dark:text-gray-300" />
            <span class="font-bold text-lg uppercase ml-3">Bộ lọc tìm kiếm</span>
        </div>

        <!-- Nơi bán -->
        <div class="mt-5 border-b-1 border-[var(--maincolor)] pb-3 dark:border-gray-700">
            <p class="text-[1.2rem] capitalize font-bold">Nơi bán</p>
            <div class="product-change-buy-place">
                <div v-for="i in 4" :key="i" class="mt-2 flex items-center">
                    <input type="checkbox" name="Hà Nội" id="Hà Nội" value="Hà Nội" class="dark:bg-gray-800">
                    <label for="Hà Nội" class="capitalize ml-2 block">Hà Nội</label>
                </div>
                <div class="ml-5.5 mt-2 text-base cursor-pointer dark:text-gray-300">
                    <Address> Khác </Address>
                </div>
            </div>
        </div>

        <!-- Đơn vị vận chuyển -->
        <div class="mt-5 border-b-1 border-[var(--maincolor)] pb-3 dark:border-gray-700">
            <p class="text-[1.2rem] capitalize font-bold mb-2">Đơn Vị Vận Chuyển</p>
            <div class="product-change-ship-place">
                <div class="mt-2">
                    <input type="checkbox" name="Hỏa Tốc" id="Hỏa Tốc" value="Hỏa Tốc" class="dark:bg-gray-800">
                    <label for="Hỏa Tốc" class="ml-2">Hỏa Tốc</label>
                </div>
                <div class="mt-2">
                    <input type="checkbox" name="Nhanh" id="Nhanh" value="Nhanh" class="dark:bg-gray-800">
                    <label for="Nhanh" class="ml-2">Nhanh</label>
                </div>
                <div class="mt-2">
                    <input type="checkbox" name="Tiết Kiêm" id="Tiết Kiêm" value="Tiết Kiêm" class="dark:bg-gray-800">
                    <label for="Tiết Kiêm" class="ml-2">Tiết Kiệm</label>
                </div>
            </div>
        </div>

        <!-- Khoảng giá -->
        <div class="mt-5 border-b-1 border-[var(--maincolor)] pb-3 dark:border-gray-700">
            <p class="text-[1.2rem] capitalize font-bold mb-2">Khoảng Giá</p>
            <div class="flex justify-start items-center mt-2">
                <input v-model="start_price" type="number" class="w-25 rounded-ssm p-2 border-1 border-[var(--color_border)] text-[0.9rem] placeholder:text-gray-600 placeholder:text-sm dark:placeholder:text-gray-400 dark:bg-gray-800" placeholder="TỪ">
                <span class="w-5 h-[0.1rem] bg-gray-800 dark:bg-gray-400 mx-2.5"></span>
                <input v-model="end_price" type="number" class="w-25 rounded-ssm p-2 border-1 border-[var(--color_border)] text-[0.9rem] placeholder:text-gray-600 placeholder:text-sm dark:placeholder:text-gray-400 dark:bg-gray-800" placeholder="ĐẾN">
            </div>
            <div @click="applyRangePrice()" class="text-white py-2 text-center mt-3 bg-red-500 text-[0.9rem] cursor-pointer hover:opacity-[0.8] dark:bg-red-700">ÁP DỤNG</div>
        </div>

        <!-- Dịch vụ & Khuyến mại -->
        <div class="mt-5 border-b-1 border-[var(--maincolor)] pb-3 dark:border-gray-700">
            <p class="text-[1.2rem] capitalize font-bold mb-2">Dịch Vụ & Khuyến Mại</p>
            <div class="product-change-service-place">
                <div class="flex justify-start items-center mt-2">
                    <input type="checkbox" name="Voucher Xtra" id="Voucher Xtra" value="Voucher Xtra" class="dark:bg-gray-800">
                    <label for="Voucher Xtra" class="ml-2">Voucher Xtra</label>
                </div>
                <div class="flex justify-start items-center mt-2">
                    <input type="checkbox" name="Đang Giảm Giá" id="Đang Giảm Giá" value="Đang Giảm Giá" class="dark:bg-gray-800">
                    <label for="Đang Giảm Giá" class="ml-2">Đang Giảm Giá</label>
                </div>
                <div class="flex justify-start items-center mt-2">
                    <input type="checkbox" name="Miễn Phí Vận Chuyển" id="Miễn Phí Vận Chuyển" value="Miễn Phí Vận Chuyển" class="dark:bg-gray-800">
                    <label for="Miễn Phí Vận Chuyển" class="ml-2">Miễn Phí Vận Chuyển</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
