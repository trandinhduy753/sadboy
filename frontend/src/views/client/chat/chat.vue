<script setup>
import { opt_show_multiple_video, opt_show_multiple_img, formatMoney, truncateString, groupMessages } from '@/composables';
import { productClient, orderClient, accountClient, chatClient } from '@/constant'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Echo from '@/plugins/echo.js'; 
dayjs.extend(relativeTime);
const {
    show_multiple_video,
    remove_video,
    clear_videos,
    videos,
    preview_videos,
    error_video
} = opt_show_multiple_video()

const {
    show_multiple_img,
    remove_image,
    clear_images,
    images,
    preview_images,
    error_img
} = opt_show_multiple_img()

const store = useStore();
const router = useRouter();
const fetchInfoConversation = async (user_id, page, count) => {
    const result = await store.dispatch('client/chat/' + chatClient.get_info_conversation, { user_id, page, count })
}

const fetchAddMessages = async (data) => {
    const result = await store.dispatch('client/chat/' + chatClient.add_message, data);
}
const fetchListProduct = async (start, end) => {
    const result = await store.dispatch('client/product/' + productClient.get_list_product, {start, end})
}
const fetchFindProduct = async (event) => {
    find_product.value = event.target.value.trim();
    if(find_product.value !== ''){
        const result = store.dispatch('client/product/' + productClient.get_list_product_by_search, {page: 1,search:find_product.value, count: 30})
    }
    
}
const loadAddProductFind = async (page, search, count) => {
    const result = store.dispatch('client/product/' + productClient.get_list_product_by_search, {page, search, count})
}
const fetchListOrder = async (user_id, page, count) => {
    const result = await store.dispatch('client/order/' + orderClient.get_list_order, {user_id, page, count})
}

const fetchFindOrder = async (event) => {
    find_order.value = event.target.value.trim();
    if(find_order.value !== '') {
        const result = store.dispatch('client/order/' + orderClient.find_order_by_code, {page:  1, user_id: user.value?.id, order_code: find_order.value, count: 5} )
    }
    
}

const loadAddOrderFind = async (page, user_id, order_code, count) => {
    const result = store.dispatch('client/order/' + orderClient.find_order_by_code, {page, user_id, order_code, count })
}

const load_add_products = (event) => {
    const el = event.target;
    if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
        if(find_product.value !== '') {
            pageProduct.value++;
            loadAddProductFind(pageProduct.value,  find_product.value, 5)
        }
        else {
            const start=products.value.length;
            fetchListProduct(start, start+5)
        }
    }
}

const load_add_orders = (event) => {
    const el = event.target;
    if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
        if(find_order.value !== '') {
            pageOrder.value++;
            loadAddOrderFind(pageOrder.value, user.value?.id, find_order.value, 5)
        }
        else {
            pageOrder.value++;
            fetchListOrder(user.value.id, pageOrder.value, 10)
        }   
    }
}

const loadAddMessages = async (el) => {
  const oldScrollHeight = el.scrollHeight;
  pageMessage.value++;
  await fetchInfoConversation(user.value?.id, pageMessage.value, 10);

  await nextTick();
  const newScrollHeight = el.scrollHeight;
  el.scrollTop = newScrollHeight - oldScrollHeight;
};

const handleScroll = (event) => {
  const el = event.target;
  isAtBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

  // Nếu ở đỉnh thì load thêm tin nhắn
  if (el.scrollTop === 0) {
    loadAddMessages(el);
  }
};

const hiddenBox = () => {
    show_product.value = false
    show_order.value = false
}
const handleShowProductChat = () => {
    show_product.value = !show_product.value
    show_order.value = false
}
const handleShowOrderChat = () => {
    show_order.value = !show_order.value
    show_product.value=false
}
const addMessages = async (type, content) => {
    var data = {}
    var formData = new FormData();
    if(type == 'product') {
        data = {
            //sender_id: user.value?.id,
            conversation_id: infoConversation.value?.conversation_id,
            sender_type: 'user',
            type: 'product',
            meta_data: {
                img_product: content?.img,
                name_product: content?.name,
                price: content?.sale_price['S'] ?? content?.original_price['S']
            },                 
        }
        fetchAddMessages(data)
    }
    else if(type == 'order') {
        data = {
            //sender_id: user.value?.id,
            conversation_id: infoConversation.value?.conversation_id,
            sender_type: 'user',
            type: 'order',
            meta_data: {
                order_code: content?.code,
                count: content?.count,
                total: content?.total,
                products: content?.products
            }
        }
        fetchAddMessages(data)
    }
    else {
        //formData.append('sender_id', user.value?.id)
        formData.append('conversation_id', infoConversation.value?.conversation_id)
        formData.append('sender_type', 'user')
        formData.append('type', 'mixed')
        if(content_message.value !== '') {
            formData.append('content', content_message.value)
        }
        if (images.value.length !== 0) {
            images.value.forEach((img) => {
                formData.append('imgs[]', img)
            })
        }

        if (videos.value.length !== 0) {
            videos.value.forEach((vid) => {
                formData.append('videos[]', vid)
            })
        }
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        fetchAddMessages(formData)
    }
    //console.log(data)
    content_message.value = "";

}

const isAtBottom = ref(true)
const user = computed(() => store.state.client.account.user )
const show_order = ref(false)
const show_product = ref(false)
const products = computed(() => store.state.client.product.products)
const orders = computed(() => store.getters['client/order/get_list_order'] )
const find_product = ref("")
const find_order = ref("")
const infoConversation = computed(() => store.state.client.chat.infoConversation )
const messages = computed(() => groupMessages(infoConversation.value.messages) )
const content_message = ref("")
const chatContainer = ref(null)
const showChat = computed(() => store.state.client.showChat)
const pageProduct = ref(1)
const pageOrder = ref(1)
const pageMessage = ref(1);
let channel;
watch(messages, async () => {
    await nextTick();
    if (isAtBottom.value) {
        const el = chatContainer.value;
        el.scrollTop = el.scrollHeight;
    }
});

onMounted(async () => {
    if (Object.keys(user.value).length === 0) {
        await store.dispatch('client/account/' + accountClient.get_infor_user)
    }
    console.log(user.value)
    if (Object.keys(user.value).length === 0) {
        store.commit('client/CHANGE_SHOW_CHAT', false);
        router.push({ name: "form", query: { opt: "login" } });
    }
    const [products, orders, info] = await Promise.all([
        fetchListProduct(0, 5),
        fetchListOrder(user.value.id, pageOrder.value, 10),
        fetchInfoConversation(user.value?.id, pageMessage.value, 10)
    ]);

    const id = infoConversation.value.conversation_id;
    const channel = Echo.channel(`conversation.${id}`);
    channel.listen('.MessagesFetched', (payload) => {
        store.commit('client/chat/ADD_MESSAGE', payload);
    });
});

</script>

<template>

    <div @click="hiddenBox()" v-if="showChat" :class="showChat ? 'animate-fade-in' : 'animate-fade-out'" class="fixed top-0 right-0 bottom-0 max-lg:w-[50%] w-[30%] z-999 bg-white dark:bg-gray-700 box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px ">
        <div class="flex max-md:flex-col justify-between p-3 bg-gray-300 dark:bg-gray-500">
            <div class="flex items-center gap-2">
                <img class="w-15 h-15 rounded-full max-md:hidden" :src="infoConversation?.employee?.img" alt="">
                <div class="text-gray-300">
                    <p>Nhân viên hệ thống</p>
                    <p>Admin123@gmail.com</p>
                </div>
            </div> 
            <div @click="store.commit('client/CHANGE_SHOW_CHAT', false)" class="flex items-center justify-center max-md:justify-end ">
                <a href="#" class="relative w-10 h-10 bg-white rounded-full shadow-[0_0_30px_rgba(247,149,29,0.5)] flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(.215,.61,.355,1)] group">
                    <span class="absolute  w-8 h-2 -mt-[6px] top-1/2 rounded-[6px] bg-[#f5a700] flex justify-between rotate-45 transition-all duration-400 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:bg-[#2faee0]">
                    <span class="circle-left absolute w-2 h-2 rounded-full bg-[#ed7f00] transition-all group-hover:bg-[#008ac9] group-hover:ml-6"></span>
                    <span class="circle-right absolute w-2 h-2 rounded-full bg-[#ed7f00] ml-6 transition-all group-hover:bg-[#008ac9] group-hover:ml-0"></span>
                    </span>
                    <span class="absolute  w-8 h-2 -mt-[6px] top-1/2 rounded-[6px] bg-[#f5a700] flex justify-between -rotate-45 transition-all duration-400 ease-[cubic-bezier(.215,.61,.355,1)] group-hover:bg-[#2faee0]">
                    <span class="circle-left absolute w-2 h-2 rounded-full bg-[#ed7f00] transition-all group-hover:bg-[#008ac9] group-hover:ml-6"></span>
                    <span class="circle-right absolute w-2 h-2 rounded-full bg-[#ed7f00] ml-6 transition-all group-hover:bg-[#008ac9] group-hover:ml-0"></span>
                    </span>
                </a>
            </div>
        </div>
        <div ref="chatContainer" @scroll="handleScroll " class="h-full p-2 overflow-y-auto custom-scrollbar pb-60">
            <template v-for="(message, index) in messages" :key="index">
                <div v-if="message?.type == 'text'" :class="message.sender_type =='user' ? 'justify-end' : 'justify-start' " class="flex items-center mb-5">
                    <div class="inline-block max-w-[80%] pr-5 dark:bg-gray-200 dark:text-gray-700 bg-white p-2 rounded-sm">
                        {{ message?.content }}
                    </div>
                </div>
                <div v-else-if="message?.type == 'order'" :class="message.sender_type =='user' ? 'justify-end' : 'justify-start' " class="flex items-center mb-5 ">
                    <div class="inline-block max-w-[80%] pr-5 dark:bg-gray-200 bg-white p-2 rounded-sm">
                        <p class=" border-white dark:text-gray-700">Đơn hàng</p>
                        <p class="border-b-1 border-white dark:text-gray-700">Mã đơn: {{ message?.meta_data?.order_code }}</p>
                        <div v-for="(product, index) in message?.meta_data?.products" :key="index" class="flex gap-2 items-center mt-2" >
                            <div class="text-end flex justify-end">
                                <img :src="product?.img_product" class="w-15 h-15 rounded-sm" alt="">
                            </div>
                            <div class="dark:text-gray-700">
                                <p>{{ product?.name_product }}</p>
                                <p>Size: {{ product?.size}}</p>
                                <p>Giá: {{ formatMoney(product?.price) }}</p>
                            </div>
                        </div>  
                        
                        <p class="mt-2 dark:text-gray-700">
                            Số lượng: {{ message?.meta_data?.count }}
                        </p>
                        <p class=" dark:text-gray-700">
                            ID đơn hàng: {{ formatMoney(message?.meta_data?.total) }}
                        </p>
                    </div>
                </div>
                <div v-else-if="message.type == 'product'" :class="message.sender_type =='user' ? 'justify-end' : 'justify-start' " class="flex  items-center mb-5 ">
                    <div class=" inline-block  pr-5 dark:bg-gray-200 bg-white p-2 rounded-sm">
                        <p class="border-b-1 border-white dark:text-gray-700">Trao đổi với người bán về sản phẩm</p>
                        <div class="flex gap-2 items-center mt-2" >
                            <div class="text-end flex justify-end">
                                <img :src="message?.meta_data?.img_product" class="w-15 h-15 rounded-sm" alt="">
                            </div>
                            <div class="dark:text-gray-700">
                                <p>{{ message?.meta_data?.name_product }}</p>
                                <p>Giá: {{ formatMoney(message?.meta_data?.price) }}</p>
                            </div>
                        </div>  
                        
                    </div>
                </div> 
                <div v-else-if="message.type =='image' " :class="message.sender_type =='user' ? 'justify-end ' : 'justify-start' " class="mb-5 flex  items-center">
                    <div class="flex items-center justify-end max-w-[70%]  flex-wrap">
                        <img v-for="(img, index) in message?.files" :key="index" :src="img" :class="message.sender_type =='user' ? 'ml-4 ' : 'mr-4' " class="w-15 h-15 mt-3" alt="">
                    </div>
                </div>
                <div v-else-if="message.type == 'video' " :class="message.sender_type =='user' ? 'justify-end' : 'justify-start' " class="mb-5 flex  items-center">
                    <div class="flex items-center justify-end max-w-[70%]  flex-wrap">
                        <video v-for="(video, index) in message?.files" :key="index" :class="message.sender_type =='user' ? 'ml-4 ' : 'mr-4' " class="w-15 h-15" controls>
                            <source :src="video">
                            Trình duyệt của bạn không hỗ trợ video tag.
                        </video>
                    </div>
                </div>
                <p :class="message.sender_type =='user' ? 'text-end': 'text-start'" class="dark:text-gray-500 -mt-4 mb-2">{{ dayjs(message?.date).fromNow()}}</p>
            </template>
        </div>
        <div class="absolute bottom-0 bg-gray-200 dark:bg-gray-500 left-0 right-0 p-4">
            <div class="flex place-items-center mb-2">
                <div v-for="(image, index) in preview_images" :key="index" class="mr-5 relative">
                    <font-awesome-icon
                        class="absolute -right-2 -top-2 px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 z-10" 
                        :icon="['fas', 'xmark']" 
                        @click="remove_image(index)"
                    />
                    <img  
                        :src="image"
                        class="w-15 h-15 border-1 border-black dark:border-gray-500 rounded-sm" 
                        alt="Employee photo">
                        {{ error_img }}
                </div>
                <div v-for="(video, index) in preview_videos" :key="index" class="mr-5 relative">
                    <font-awesome-icon
                        class="absolute -right-2 -top-2 px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 z-10" 
                        :icon="['fas', 'xmark']" 
                        @click="remove_video(index)"
                    />
                    <video class="w-15 h-15" controls>
                        <source :src="video">
                        
                        Trình duyệt của bạn không hỗ trợ video tag.
                    </video>
                    {{ error_video }}
                </div>
            </div>
            <input v-model="content_message"  @keydown.enter="addMessages" class="w-full outline-0 py-4 placeholder:text-xl text-xl dark:text-white placeholder:text-white" placeholder="Nhập tin nhắn" type="text">
            <div class="flex justify-between">
                <div class="flex items-center gap-6 text-2xl">
                    <label for="imgchat">
                        <font-awesome-icon class="cursor-pointer text-blue-500 hover:text-blue-600  dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 hover:scale-125  hover:drop-shadow-[0_0_10px_#3b82f6]" icon="fa-regular fa-image"  />
                    </label>
                    <label for="videochat">  
                        <font-awesome-icon class="cursor-pointer text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#ef4444]" icon="fa-solid fa-video"  />
                    </label>
                    <div class="relative">
                        <font-awesome-icon @click.stop="handleShowProductChat" class="cursor-pointer text-green-500 hover:text-green-600  dark:text-green-400 dark:hover:text-green-300  transition-all duration-300 hover:scale-125  hover:drop-shadow-[0_0_10px_#22c55e]"  icon="fa-solid fa-bag-shopping" />
                        <transition
                            enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-5 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 translate-y-5 scale-95"
                        >
                            <div v-if="show_product" @click.stop class="absolute bottom-12 bg-gray-200  h-70 w-90 right-1/2 translate-x-1/2 z-50 shadow-lg shadow-black rounded-md">
                                <div class="bg-white p-2 h-15">
                                    <input @input="fetchFindProduct" type="text" placeholder="Tìm kiếm sản phẩm" class="border border-black outline-0 w-full rounded-sm py-2 pl-8 placeholder:text-base text-base" />
                                    <font-awesome-icon class="relative -top-10 text-[1rem]  left-2"  icon="fa-solid fa-magnifying-glass" />
                                </div>
                                <div @scroll="load_add_products" class="max-h-55 overflow-y-auto custom-scrollbar">
                                    <div v-for="(product, index) in products"  :key="index" class="bg-white p-2 mt-2">
                                        <div class="flex gap-3">
                                            <img :src="product?.img" class="w-10 h-10" alt="" />
                                            <div class="text-sm">
                                                <p class="font-bold">{{ product?.name }}</p>
                                                <p class="text-gray-300 line-through text-[0.7rem]" >
                                                    {{ formatMoney(product?.original_price?.['S']) }} -
                                                    {{ formatMoney(product?.original_price?.['L']) }}
                                                </p>
                                                <p class="font-bold">
                                                    {{ formatMoney(product?.sale_price?.['S']) }} -
                                                    {{ formatMoney(product?.sale_price?.['L']) }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex text">
                                            <p @click="addMessages('product', product)" class="bg-orange-500 text-base text-white py-1 px-4 rounded-sm cursor-pointer">
                                                Gửi
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div class="relative">
                        <font-awesome-icon @click.stop="handleShowOrderChat" class="cursor-pointer text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#a855f7]" icon="fa-solid fa-clipboard" />
                        <transition
                            enter-active-class="transition duration-300 ease-out"
                            enter-from-class="opacity-0 translate-y-5 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 translate-y-5 scale-95"
                        >
                            <div v-if="show_order" @click.stop class="absolute bottom-10 bg-gray-200 h-70 w-90 right-1/2 translate-x-1/2 z-50 shadow-lg shadow-black rounded-md">
                                <div class="bg-white p-2 h-13">
                                    <input type="text" @input="fetchFindOrder" placeholder="Tìm kiếm đơn hàng" class="border border-black outline-0 w-full rounded-sm py-1 pl-8 text-base placeholder:text-base" />
                                    <font-awesome-icon class="relative -top-9 left-2 text-base"  icon="fa-solid fa-magnifying-glass" />
                                </div>
                                <div @scroll="load_add_orders" class="max-h-55 overflow-y-auto custom-scrollbar">
                                    <div v-for="(order, index) in orders" :key="index" class="bg-white p-2 mt-2">
                                        <div class="flex gap-3">
                                            <img :src="order?.products?.[0]?.img" class="w-10 h-10" alt="" />
                                            <div class="text-sm flex justify-between flex-1">
                                                <div>
                                                    <p>{{ truncateString(order?.products?.[0]?.sort_description, 30) }}</p>
                                                    <p>Size: {{ order?.products?.[0]?.size }}</p>
                                                </div>
                                                <div>
                                                    <p>{{ formatMoney(order?.products?.[0]?.price) }}</p>
                                                    <p class="text-end">x{{ order?.products?.[0]?.count }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-between text-base">
                                            <p>Tổng cộng: </p>
                                            <p> 
                                                <span class="inline-block pr-2 border-r-1">{{ order?.count }} sản phẩm</span> 
                                                <span class="inline-block pl-2 text-orange-600 font-bold">{{ formatMoney(order?.total) }}</span>
                                            </p>
                                        </div>
                                        <div class="flex justify-end gap-5 mt-3 text-base">
                                            <router-link :to="{ name: 'account.orders.detail' , params: { code: order?.code } }">
                                                <p class="border-1 border-orange-500 text-orange-500 py-1 px-4 rounded-sm cursor-pointer">
                                                    Chi tiết đơn
                                                </p>
                                            </router-link>
                                            
                                            <p @click="addMessages('order', order)" class="bg-orange-500 text-white py-1 px-4 rounded-sm cursor-pointer">
                                                Gửi
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    
                </div>
                <div @click="addMessages" class="relative w-14 h-14 flex items-center justify-center cursor-pointer group rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 dark:from-purple-700 dark:via-indigo-600 dark:to-cyan-500 animate-gradient shadow-[0_0_25px_rgba(0,0,0,0.4)]"  >
                    <span class="absolute inset-0 rounded-full animate-pulse-glow opacity-60 blur-xl  bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-purple-500 dark:via-indigo-400 dark:to-cyan-400"> </span>
                    <span class="absolute w-2 h-2 rounded-full bg-white animate-twinkle top-2 left-3"></span>
                    <span class="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 animate-twinkle delay-300 bottom-3 right-2"></span>
                    <span class="absolute w-2 h-2 rounded-full bg-pink-300 animate-twinkle delay-500 top-1 right-4"></span>
                    <font-awesome-icon class="relative z-10 text-white text-2xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,1)]" icon="fa-regular fa-paper-plane" />
                </div>
                <div class="hidden">
                    <input type="file" @change="show_multiple_img" id="imgchat" multiple>
                    <input type="file" @change="show_multiple_video" id="videochat" multiple>
                </div>
            </div>
            
       </div>
    </div>

</template>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0.9; }
}
.animate-pulse-glow {
  animation: pulse-glow 3s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
.animate-twinkle {
  animation: twinkle 2s infinite;
}



/* Overlay */
@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease forwards;
}
.animate-fade-out {
  animation: fadeOut 0.5s ease forwards;
}

/* Box */
@keyframes boxIn {
  0% {
    transform: translateX(100%) scale(0.9);
    opacity: 0;
    filter: blur(6px);
  }
  60% {
    transform: translateX(-12px) scale(1.03);
    opacity: 1;
    filter: blur(2px);
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes boxOut {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
    filter: blur(0);
  }
  40% {
    transform: translateX(-10px) scale(0.95);
    opacity: 0.7;
    filter: blur(2px);
  }
  100% {
    transform: translateX(100%) scale(0.9);
    opacity: 0;
    filter: blur(6px);
  }
}

.animate-box-in {
  animation: boxIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
.animate-box-out {
  animation: boxOut 0.5s ease-in forwards;
}
</style>
