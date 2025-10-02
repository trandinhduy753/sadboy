<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const change_isDark = () => store.dispatch('change_isDark')
const isOn = ref(false)
const route=useRoute()
const router=useRouter()
var nav_title=reactive([
    {
        title: "Home",
        router:'home',
    },
    {
        title: "cart",
        router:'cart_product'
    },
    {
        title: "blog",
        router:'blog'
    },
    {
        title: "contact",
        router:''
    }
])
const Active_menu=ref(-1);

function handle_navigate(navigate, index)
{
    Active_menu.value=index;
    navigate()
}
var props=defineProps({
    text: {
        type: String,
        default: ''
    }
})

const isDark = computed(() => store.state.isDark);
const toggleDarkMode = () => {
    change_isDark()
    const newTheme = isDark.value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
};
onMounted(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    
})

</script>

<template>
    <div class="px-5 grid grid-cols-12 pt-3 gap-7 max-w-7xl m-auto">
        <div class="col-span-3 flex items-center">
            <font-awesome-icon :icon="['fab', 'pied-piper-alt']" class="text-4xl w-8 h-8 text-[var(--maincolor)] dark:text-yellow-500"/>
            <h1 class="ml-3 text-xl text-[var(--maincolor)] font-[600] font-serif dark:text-yellow-400">NTC_ORANGE</h1>
        </div>
        <div class="col-span-6 flex items-center text-sm font-[600] font-serif ">
            <router-link 
                v-for="(item, index) in nav_title" :key="index"
                :to="{name: item.router} "
                custom
                v-slot="{href, navigate}" 
            >
                <div @click="handle_navigate(navigate, index)" :class="['px-8 mr-1 py-2 uppercase hover:bg-red-400 rounded-ssm cursor-pointer hover:text-white dark:text-white transition-all', Active_menu==index ? 'bg-red-400 text-white' : '', text] ">{{ item.title }}</div>
            </router-link>
        </div>
        <div class="col-span-3 flex items-center justify-end" >
            <button
                @click="toggleDarkMode"
                class="relative cursor-pointer w-12 h-12 rounded-full flex items-center justify-center
                    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                    dark:from-gray-800 dark:via-black dark:to-indigo-900
                    shadow-[0_0_25px_rgba(255,0,150,0.8)]
                    transition-all duration-700 hover:scale-125 hover:rotate-180 overflow-hidden"
            >
                <!-- Hiệu ứng ánh sáng quét -->
                <span
                class="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 animate-shine"
                ></span>

                <!-- Vòng quỹ đạo -->
                <span
                class="absolute w-20 h-20 border-2 border-pink-400 dark:border-indigo-400 rounded-full animate-spin-slower"
                ></span>

                <!-- Sao bay -->
                <span
                v-for="i in 6"
                :key="i"
                class="absolute w-1.5 h-1.5 bg-white rounded-full animate-star"
                :style="{ top: `${Math.random() * 70}%`, left: `${Math.random() * 70}%` }"
                ></span>

                <!-- Icon -->
                <svg
                v-if="!isDark"
                xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7 text-yellow-300 drop-shadow-xl animate-spin-slower"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m16.95-6.95l-.7.7M6.75 17.25l-.7.7M17.25 17.25l.7.7M6.75 6.75l.7.7M12 7a5 5 0 100 10 5 5 0 000-10z"
                />
                </svg>

                <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-11 h-11 text-blue-300 drop-shadow-[0_0_15px_rgba(0,150,255,0.9)] animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    fill-rule="evenodd"
                    d="M21.752 15.002A9.718 9.718 0 0112 21.75a9.75 9.75 0 01-7.35-16.4c.2-.26.58-.32.86-.12A7.5 7.5 0 0019.5 15.5c0 .35-.03.7-.08 1.04-.06.28.21.54.51.46.29-.09.58-.21.82-.36.27-.17.58.08.54.37-.05.32-.13.63-.23.95z"
                    clip-rule="evenodd"
                />
                </svg>
            </button>
        </div>  
    </div>
    
    
</template>

<style scoped>
@keyframes push-left {
    0% {
        transform: translateX(-10rem) ;
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.push-left-animation {
    animation: push-left 0.8s ease-out forwards;
    behavior: smooth;
}

.blink {
    animation: blink-effect 3s ease-in-out;
}

@keyframes blink-effect {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

/* Hiệu ứng xoay lung linh */
/* Xoay chậm */
@keyframes spin-slower {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slower {
  animation: spin-slower 12s linear infinite;
}

/* Shine quét ngang */
@keyframes shine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}
.animate-shine {
  animation: shine 3s infinite;
}

/* Sao lấp lánh bay */
@keyframes star {
  0%, 100% { opacity: 0.2; transform: scale(0.6) translateY(0); }
  50% { opacity: 1; transform: scale(1.2) translateY(-5px); }
}
.animate-star {
  animation: star 2.5s ease-in-out infinite;
}
</style>
