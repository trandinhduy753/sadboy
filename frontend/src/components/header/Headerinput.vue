<script setup>


const nameproduct=ref("")

var props=defineProps({
    input: {
        type: String,
        default: ''
    }
})

const handleFindProduct = (navigate) => {
    if(nameproduct.value !== ''){
        navigate()
    }
    
}
</script>

<template>
    <div class="max-w-7xl m-auto px-5 grid grid-cols-12 pt-5  gap-7 ">
        <div class="col-span-3 max-md:hidden lg:block md:hidden flex items-center bg-[var(--maincolor)] dark:bg-[var(--dark_maincolor)] transition-all duration-500 text-sm text-white justify-center py-3 rounded-sm border-[1.5px] border-black dark:border-white">
            <font-awesome-icon :icon="['fas', 'house-chimney']" class="w-5 h-5 text-black dark:text-white" />
            <p class="ml-2 font-serif font-bold text-black dark:text-white">DEPARTMENT STORE</p>
        </div>

        <div class="lg:col-span-7 max-md:col-span-10 md:col-span-10 flex items-center">
            
            <router-link :to="{name: 'find_product', query: { name: nameproduct} }" custom v-slot="{href, navigate}">
                <input type="text" v-model="nameproduct" @keyup.enter="handleFindProduct(navigate)" placeholder="Nhập sản phẩm bạn muốn tìm" 
                    :class="input" 
                    class="transition-all duration-500 border-[1.5px] h-full w-full outline-none border-black dark:border-white  dark:bg-gray-800 text-black dark:text-white rounded-sm pl-2.5 font-serif" 
                >
                <button @click="handleFindProduct(navigate)" 
                class="cursor-pointer transition-all duration-500 h-13 px-5 rounded-sm ml-2 bg-[var(--maincolor)] font-serif text-sm font-semibold border-[1.5px] border-black dark:border-white dark:bg-[var(--dark_maincolor)] dark:text-white hover:bg-[var(--hoverred)] hover:text-white"
                >
                SEARCH
                </button>
            </router-link>
        </div>

        <div class="col-span-2 flex items-center justify-end">
            <router-link :to="{name: 'cart_product'} ">
                <div class="group relative flex items-center justify-center cursor-pointer  h-14 w-14 rounded-full  bg-gray-100 dark:bg-gray-900  overflow-hidden transition-all duration-500">
                    <span class="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-t-pink-500 group-hover:border-l-orange-500  dark:group-hover:border-t-cyan-400 dark:group-hover:border-l-green-400 animate-spin-slow"></span>
                    <span  class="absolute inset-0 rounded-full  bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600  dark:from-cyan-400 dark:via-blue-500 dark:to-green-400 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-700"></span>
                    <font-awesome-icon 
                        class="relative z-10 text-3xl text-orange-600 dark:text-yellow-400 transition-all duration-500  group-hover:scale-125 group-hover:rotate-12 group-hover:text-pink-500  dark:group-hover:text-cyan-300 group-hover:animate-pulse drop-shadow-[0_0_20px_rgba(255,100,50,0.9)] dark:drop-shadow-[0_0_20px_rgba(0,255,255,0.9)]"
                        icon="fa-solid fa-cart-shopping" 
                    />
                </div>
            </router-link>
            
        </div>
    </div>
    

</template>
<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>