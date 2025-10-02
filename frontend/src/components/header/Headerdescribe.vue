<script setup lang="ts">
    import { accountClient } from '@/constant'
    const store = useStore()
    const router = useRouter()
    const header_nav= reactive([
        {
            title: 'Tài khoản của tôi',
            name: 'account.user',
            opt: 'account'
        },
        {
            title: 'Đơn mua',
            name: 'account.orders.list',
            opt: 'order'
        },
        {
            title: 'Đăng nhập',
            name: 'form',
            opt: 'login'
        },
        {
            title: 'Đăng ký',
            name: 'form',
            opt: 'logout'
        }
    ])

    var props=defineProps({
        bg_des: {
            type: String,
            default: ''
        }
    })
    const fetchInfoUser = async () => {
        await store.dispatch('client/account/' + accountClient.get_infor_user)
    }
    const user = computed(() => store.state.client.account.user )
    const handleShowChat = () => {
        store.commit('client/CHANGE_SHOW_CHAT', true)
    }
    onMounted(() => {
        if (Object.keys(user.value).length === 0) {
            fetchInfoUser()
        }
    })

</script>

<template>

    <div :class="[bg_des, 'dark:bg-gray-900 dark:text-gray-300']">
        <div class="px-5 py-2 max-w-7xl m-auto">
            <div class="grid grid-cols-12">
                <div class="col-span-6 flex items-center text-sm font-mono text-gray-800 dark:text-gray-300">
                    <font-awesome-icon :icon="['fas', 'envelope']" class="text-lg dark:text-gray-300" />
                    <p class="ml-1 border-r-2 pr-3 border-gray-400 dark:border-gray-600">nguyentrancuong58@gmail.com</p>
                    <label class="ml-3">Free shipping for October 22, 2024</label>
                </div>
                <div class="col-span-6 flex justify-end items-center text-gray-800 dark:text-gray-300">
                    <div class="flex border-r-2 pr-3 border-gray-400 dark:border-gray-600">
                        <font-awesome-icon :icon="['fab', 'facebook']" class="text-base text-blue-700 dark:text-blue-500 mr-3" />
                        <font-awesome-icon :icon="['fab', 'youtube']" class="text-base text-red-600 dark:text-red-500 mr-3"/>
                        <font-awesome-icon :icon="['fab', 'tiktok']" class="text-base text-black dark:text-gray-300 mr-3"/>
                        <font-awesome-icon :icon="['fab', 'instagram']" class="text-base text-fuchsia-800 dark:text-pink-500 mr-1"/>
                    </div>
                    <div class="flex items-center px-4">
                        <img class="w-13 h-9 rounded-sm" src="@/assets/images/Flag_of_Vietnam.svg.png" alt="">
                        <p class="ml-2 font-mono">Việt Nam</p>
                    </div>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="flex items-center border-l-2 pl-3 border-gray-400 dark:border-gray-600 cursor-pointer">
                                <font-awesome-icon :icon="['fas', 'user']" class="text-base dark:text-gray-300"/>
                                <p class="ml-1 font-mono">{{ user?.name ? user?.name : 'login' }}</p>
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute right-0 mt-2 w-45 h-50 p-1 origin-top-right bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
                            <div class="py-1 px-2 absolute w-45 right-0">
                                <MenuItem v-for="(item, index) in header_nav" :key="index" class="mb-1 cursor-pointer">
                                    <router-link 
                                        :to="{name: item.name, query: {opt: item.opt} }"
                                        custom
                                        v-slot="{href, navigate, isActive }" 
                                    >
                                        <p 
                                          @click="navigate" 
                                          :class="[
                                            'block px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-emerald-400',
                                            isActive ? 'text-emerald-500 bg-gray-200 dark:bg-gray-700 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-300'
                                          ]"
                                        >
                                          {{item.title}}
                                        </p>
                                    </router-link>
                                </MenuItem>
                                <MenuItem  class="mb-1 cursor-pointer">
                                    <p @click.stop="handleShowChat" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-emerald-400">Trò chuyện</p>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>           
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes drop {
    0% {
        transform: translateY(-2rem);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.drop-animation {
    animation: drop 0.4s ease-out;
}
</style>
