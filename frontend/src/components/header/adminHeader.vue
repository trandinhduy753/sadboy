<script setup lang="ts">
import { account } from '@/constant'
const store = useStore()
const router = useRouter();

const fetchInfoAdmin = async () => {
    await store.dispatch('admin/account/' + account.get_info_admin)

}
const fetchAdminLogout = async () => {
    await store.dispatch('admin/account/' + account.admin_logout);
    router.push({name: 'admin.formlog'})
}
const isDark = computed(() => store.state.isDark)
const employee = computed(() => store.state.admin.account.employee )
const toggleDarkMode = () => {
  store.dispatch('change_isDark')
  const newTheme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', newTheme)
}
onMounted(async () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    await fetchInfoAdmin()
})
</script>

<template>
    <div class="flex justify-end bg-gray-700 gap-5 px-5 py-3">
        <div class="flex items-center gap-10">
            <div class="relative">
                <p class="absolute left-3 -top-4 text-white font-bold w-4 h-4 text-[0.7rem] text-center leading-4 bg-cyan-500 rounded-full">5</p>
                <font-awesome-icon class="text-white text-xl" icon="fa-solid fa-bag-shopping" />
            </div>
            <div class="relative flex items-center justify-center">
                <!-- Aura xoay vòng -->
                <div
                class="absolute w-28 h-28 rounded-full blur-2xl opacity-60
                        bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400
                        dark:from-purple-700 dark:via-indigo-500 dark:to-blue-700
                        animate-rotate-slow"
                ></div>

                <button
                @click="toggleDarkMode"
                class="relative flex items-center w-20 h-10 rounded-full 
                        overflow-hidden transition-all duration-700
                        bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 
                        dark:from-gray-800 dark:via-gray-900 dark:to-black
                        shadow-[0_0_20px_rgba(255,255,255,0.4)]
                        hover:scale-110 active:scale-95"
                >
                <!-- Icon mặt trời -->
                <font-awesome-icon
                    :icon="['fas','sun']"
                    class="absolute left-3 text-yellow-200 text-lg drop-shadow-glow transition-all duration-500"
                    :class="isDark ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-110 rotate-0'"
                />

                <!-- Icon mặt trăng -->
                <font-awesome-icon
                    :icon="['fas','moon']"
                    class="absolute right-3 text-indigo-300 text-lg drop-shadow-glow transition-all duration-500"
                    :class="isDark ? 'opacity-100 scale-110 rotate-0' : 'opacity-0 scale-50 -rotate-180'"
                />

                <!-- Nút trượt -->
                <span
                    class="absolute w-8 h-8 bg-white dark:bg-gray-900 rounded-full 
                        shadow-md border border-yellow-200 dark:border-indigo-400
                        transition-transform duration-500"
                    :class="isDark ? 'translate-x-10' : 'translate-x-0'"
                />

                <!-- Sparkle lấp lánh bay quanh -->
                <span v-for="n in 8" :key="n"
                    class="absolute w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-sparkle"
                    :style="{
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: (Math.random() * 2) + 's'
                    }"
                />
                </button>
            </div>
            <div class="relative">
                <p class="absolute left-3 -top-4 text-white font-bold w-4 h-4 text-[0.7rem] text-center leading-4 bg-orange-500 rounded-full">5</p>
                <font-awesome-icon class="text-white text-xl" icon="fa-regular fa-bell" />
            </div>
        </div>
        <Menu as="div" class="relative block text-left">
            <MenuButton class="w-full ">
                <div class="flex gap-2 items-center cursor-pointer">
                   <img class="w-12 h-12 rounded-full" :src="employee?.img" alt="">
                    <div class="text-white text-[0.8rem]">
                        <p class="text-start">{{ employee?.name}}</p>
                        <p class="text-start">{{ employee?.email }}</p>
                    </div>
                </div>
            </MenuButton>

            <MenuItems class="absolute right-0 mt-2 w-45 h-20 p-1 origin-top-right bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
                <div class="py-1 px-2 absolute left-0 w-full">
                    <router-link :to="{name: 'admin_sadboizz.employee.detail', query: { showopt: 'shop_ad_t', index: employee?.id }}">
                        <MenuItem class="mb-1 px-2 py-1 rounded-sm block w-full cursor-pointer dark:text-white hover:bg-gray-200 hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-emerald-400">
                            <p>Xem thông tin</p>
                        </MenuItem>
                    </router-link>
                    
                    <MenuItem  class="mb-1 px-2 py-1 rounded-sm block w-full cursor-pointer dark:text-white hover:bg-gray-200 hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-emerald-400">
                        <p @click="fetchAdminLogout()">Đăng xuất</p>
                    </MenuItem>
                    
                </div>
            </MenuItems>
        </Menu>
    </div>
</template>

<style scoped>
/* Aura xoay chậm */
@keyframes rotate-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-rotate-slow {
  animation: rotate-slow 12s linear infinite;
}

/* Sparkle lấp lánh */
@keyframes sparkle {
  0%, 100% { transform: scale(0.5) translateY(0); opacity: 0.9; }
  50% { transform: scale(1.5) translateY(-4px); opacity: 0.2; }
}
.animate-sparkle {
  animation: sparkle 2s infinite ease-in-out;
}

/* Icon phát sáng */
.drop-shadow-glow {
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.8));
}

</style>
