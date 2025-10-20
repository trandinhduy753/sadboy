<script setup>
</script>

<template>
    <div class="grid grid-cols-12 gap-5 bg-white py-2">
        <div class="col-span-12 px-2">
            <div class="flex items-center justify-between">
                <Menu as="div" class="relative block text-left w-65">
                    <MenuButton class="w-full ">
                        <div class="py-1 px-4 h-9 border-1 border-[var(--color_border)]  rounded-[0.2rem] text-left flex items-center justify-between  cursor-pointer">
                            <span>Lọc sản phẩm theo</span>
                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                        </div>
                    </MenuButton>

                    <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                        <div class="py-1">
                            <MenuItem class="mb-1 cursor-pointer">
                                <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">Kho A</p>
                            </MenuItem>
                            <MenuItem class="mb-1 cursor-pointer">
                                <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">kho B</p>
                            </MenuItem>
                            <MenuItem class="mb-1 cursor-pointer">
                                <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">Kho C</p>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
                <input type="text" placeholder="Nhập tên sản phẩm" class="w-full ml-3 outline-none border-1 border-[var(--color_border)] rounded-[0.2rem] pl-2 py-1.5">
            </div>
            
        </div>
        <div class="col-span-12">
            <div class="grid grid-cols-12 gap-5 bg-[var(--background-color-gray)] px-2 py-4">
                <div class="col-span-5 flex items-center">
                    <input type="checkbox" class="w-5 h-5" name="" id="" >
                    <p class="ml-2">Tên sản phẩm</p>
                </div>
                <div class="col-span-2">Tồn kho</div>
                <div class="col-span-2">Loại</div>
                <div class="col-span-2">Nhà cung cấp</div>
            </div>
            <div class="h-300 overflow-y-auto custom-scrollbar ">
                <div v-for="item in 20" :key="item" class=" grid  grid-cols-12 px-2 gap-5 mt-5 items-center border-b-1 border-[var(--color_border)] pb-5">
                    <div class="col-span-5 flex items-center">
                        <input type="checkbox" class="w-5 h-5" name="" id="" >
                        <div class="flex items-center ml-5 cursor-pointer hover:text-gray-500">
                            <div class="flex items-center w-20 h-15 p-1 border-1 border-[var(--color_border)] rounded-[0.2rem]">
                                <img src="/public/images/img_product/product_img-11A.jpg" class="w-full h-full object-cover" alt="">
                            </div>
                            <p class="ml-2">Quả dưa hấu</p>
                        </div>
                        <div class="ml-2 p-2 bg-gray-500 rounded-[0.2rem] text-white cursor-pointer hover:bg-gray-400">Ẩn</div>
                        <div class="hidden ml-2 p-2 bg-green-500 rounded-[0.2rem] text-white cursor-pointer hover:bg-green-400">Hiện</div>
                    </div>
                    <div class="col-span-2">300/ size</div>
                    <div class="col-span-2">Fruit juicy</div>
                    <div class="col-span-2">Nhà cung cấp A</div>
                    <div class="col-span-1">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="p-2  text-xl hover:scale-[1.2] transition-all duration-300 cursor-pointer" />
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style scoped>

</style>