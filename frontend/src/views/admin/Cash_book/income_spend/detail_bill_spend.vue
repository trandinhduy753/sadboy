<script setup>
    
</script>

<template>
    <div class="grid grid-cols-12 font-noto h-full bg-white p-2">
        <div class="col-span-12">
           <p class=" font-bold border-b-1 border-[var(--color_border)] pb-1">Thông tin chi tiết của một phiếu chi</p>
        </div>
        <div class="col-span-8">
            <div class="grid grid-cols-12 gap-5">
                <div class="col-span-6 items-center text-sm dark:text-gray-300">
                    <label for="employeegender" class="mr-2  cursor-pointer block dark:text-gray-400">Chi vào quỹ</label>
                    <p class="italic mt-1">Tiền mặt</p>
                    <div class="flex flex-col mt-1 ">
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white border border-[var(--color_border)] py-2 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:border-gray-700" >
                                    <span>--Chọn loại chi--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-3 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
                                <div class="py-1">
                                    <MenuItem class="mb-1 cursor-pointer">
                                        <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> Tiền mặt </p>
                                    </MenuItem>
                                    <MenuItem class="mb-1 cursor-pointer">
                                        <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> Ngân hàng </p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <div class="col-span-6 items-center  text-sm ">
                    <label for="" class="mr-2 text-gray-500 cursor-pointer  block">Số tiền chi </label>
                    <p  class="italic mt-1 ">0988870434</p>
                    <div class="w-full ">
                        <input id="" type="text" class="outline-none w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-2 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " placeholder="">
                        <span class="input-config-error block"></span>
                    </div>
                </div>
                <div class="col-span-6 items-center text-sm dark:text-gray-300">
                    <label for="employeegender" class="mr-2  cursor-pointer block dark:text-gray-400">Lý do chi</label>
                    <p class="italic mt-1">Luân chuyển tiền nội bộ</p>
                    <div class="flex flex-col mt-1 ">
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white border border-[var(--color_border)] py-2 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:border-gray-700" >
                                    <span>--Chọn lý do chi--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-3 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
                                <div class="py-1">
                                    <MenuItem class="mb-1 cursor-pointer">
                                        <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> Luân chuyển tiền nội bộ </p>
                                    </MenuItem>
                                    <MenuItem class="mb-1 cursor-pointer">
                                        <p class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700">Chi trả cho nhà cung cấp </p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-4">1</div>
    </div>
</template>

<style scoped>

</style>
