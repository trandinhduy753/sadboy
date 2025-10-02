<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
</script>

<template>
    <div class="bg-[var(--footercolor)] dark:bg-gray-800 text-black dark:text-white">
        <div class="grid grid-cols-12 px-5 gap-5 py-10 max-w-7xl m-auto">
            <div class="col-span-8">
                <h2 class="text-[var(--maincolor)] dark:text-orange-500 font-(family-name:--font-winky) text-3xl font-bold">NTC_ORANGE</h2>
                <p class="font-(family-name:--font-winky) mt-3">Address: Thôn Đào Xá, Xã Nghĩa Dân, Huyện Kim Động, Tỉnh Hưng Yên</p>
                <p class="font-(family-name:--font-winky)">Phone: 0988870434</p>
                <p class="font-(family-name:--font-winky)">Email: nguyentrancuong58@gmail.com</p>
            </div>
            <div class="col-span-4">
                <h2 class="text-2xl font-bold font-(family-name:--font-winky) dark:text-orange-400">Gia nhập với chúng tôi</h2>
                <div class="mt-2">
                    <form action="">
                        <div class="form--group">
                            <label class="cursor-pointer mt-5 text-1xl font-(family-name:--font-winky) dark:text-gray-300" for="contact_infor">Email: </label>
                            <br>
                            <input 
                                class="mt-1 rounded-sm border-2 outline-0 border-[var(--colorborder)] dark:border-gray-700 w-full pl-1.5 py-2 font-[1.2rem] font-(family-name:--font-winky) bg-white dark:bg-gray-800 text-black dark:text-white" 
                                type="email" 
                                id="contact_infor" 
                                placeholder="Enter your email" 
                            />
                        </div>
                        <div class="cursor-pointer text-[1.2rem] text-white dark:text-gray-200 py-2 text-center rounded-sm hover:bg-[var(--hoverred)] dark:hover:bg-gray-700 font-(family-name:--font-winky) mt-3 bg-[var(--maincolor)] dark:bg-gray-700">Submit</div>
                    </form>
                    <div class="mt-5">
                        <font-awesome-icon :icon="['fab', 'facebook']" class="p-[0.5rem] bg-gray-200 dark:bg-gray-700 text-blue-500 mr-6 text-2xl rounded-full" />
                        <font-awesome-icon :icon="['fab', 'tiktok']" class="p-[0.5rem] bg-gray-200 dark:bg-gray-700 text-black dark:text-white mr-6 text-2xl rounded-full" />
                        <font-awesome-icon :icon="['fab', 'youtube']" class="p-[0.5rem] bg-gray-200 dark:bg-gray-700 text-red-500 mr-6 text-2xl rounded-full" />
                        <font-awesome-icon :icon="['fab', 'instagram']" class="p-[0.5rem] bg-gray-200 dark:bg-gray-700 text-pink-500 mr-6 text-2xl rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
