<script setup>
import { opt_show_multiple_video, opt_show_multiple_img, formatMoney, 
    truncateString, optionFindOrder, optionFindProduct, optionFindUser,
    groupMessages
} from '@/composables';
import { product, order, chat } from '@/constant'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const store = useStore()
const { fetchListOrder, fetchFindOrder, load_add_orders, list_order } = optionFindOrder()
const { get_list_product, find_product_by_name, load_add_products, products } = optionFindProduct()
const { fetchListUser, fetchFindUser, load_add_users  } = optionFindUser()
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
const fetchListUserChat = async (admin_id, start, end) => {
    const result = await store.dispatch('admin/chat/' + chat.get_list_user_chat, {admin_id, start, end})
}
const fetchDetailUserChat = async (admin_id, user_id, start, end) => {
    user_id_start.value = user_id
    if(start==0) {
        if(!detail_user_chat.value) {
            console.log('Lấy dữ liệu')
            const result = await store.dispatch('admin/chat/' + chat.detail_user_chat, {admin_id, user_id, start, end});
        }
        else {
            console.log('Lấy trong getter')
        }
    }
    else {
        const result = await store.dispatch('admin/chat/' + chat.detail_user_chat, {admin_id, user_id, start, end});
    }
    
}
const load_add_users_chat= (event) => {
    const el = event.target;
    if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
        var start = users_chat.value.length;
        fetchListUserChat(12, start, start+5)
    }
};


const loadAddMessages = (event) => {
    const el = event.target;
    if (el.scrollTop === 0) {
        // Gọi hàm để tải thêm dữ liệu (ví dụ: lịch sử tin nhắn)
        const start = detail_user_chat.value?.messages.length;
        fetchDetailUserChat(12, user_id_start.value, start, start + 5);
    }
};
const handleShowProductChat = () => {
    show_product.value = !show_product.value
    show_order.value = false
}
const handleShowOrderChat = () => {
    show_order.value = !show_order.value
    show_product.value=false
}
const addMessage = (type, content) => {
    var data = {}
    var formData = new FormData();
    if(type == 'product') {
        data = {
            sender_id: 12,
            conversation_id: detail_user_chat.value?.conversation_id,
            sender_type: 'admin',
            type: 'product',
            meta_data: {
                img_product: content?.img,
                name_product: content?.name,
                price: content?.sale_price['S'] ?? content?.original_price['S']
            },                 
        }
    }
    else if(type == 'order') {
        data = {
            sender_id: 12,
            conversation_id: detail_user_chat.value?.conversation_id,
            sender_type: 'admin',
            type: 'order',
            meta_data: {
                order_code: content?.code,
                count: content?.count,
                total: content?.total,
                products: content?.products
            }
        }
    }
    else {
        formData.append('sender_id', 12)
        formData.append('conversation_id', detail_user_chat.value?.conversation_id)
        formData.append('sender_type', 'admin')
        formData.append('type', 'mixed')
        if(content_message.value !== '') {
            formData.append('content', content_message.value)
        }
        if(images.value.length !== 0){
            formData.append('imgs', images.value)
        }
        if(videos.value.length !== 0) {
            formData.append('videos', videos.value)
        }
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
    }
    console.log(data)
}
const hiddenBox = () => {
    show_product.value = false
    show_order.value = false
}
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};
const detail_user_chat=computed(() => store.getters['admin/chat/get_detail_user_chat'][user_id_start.value])
const chatContainer = ref(null)
const show_order = ref(false)
const show_product = ref(false)
const show_list_user_find = ref(false)
const users_chat = computed(() => store.getters['admin/chat/get_user_chat'] )
const users = computed(() => store.state.admin.user.users)
const messages = computed(() =>  groupMessages(detail_user_chat.value?.messages)  )
const user_id_start = ref(-1);
const content_message = ref("")
watch(detail_user_chat, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });
onMounted(async () => {
    const [products, orders] = await Promise.all([
        fetchListUserChat(12, 0, 20),
        get_list_product(0, 5),
        fetchListOrder(0, 5),
    ]);
    user_id_start.value= users_chat.value[0]?.id;
    fetchDetailUserChat(12, user_id_start.value, 0, 20)
})
</script>

<template>
    <div @click="hiddenBox()" class="grid grid-cols-12 gap-x-5">
        <div class="col-span-12 dark:text-gray-500 text-xl bg-gray-200 p-2 mb-2 rounded-sm">Trò chuyện với khách hàng</div>
        <div class="col-span-4 bg-gray-100 dark:bg-gray-700 px-2">
            <div class="mb-5 flex items-center">
                <font-awesome-icon v-show="show_list_user_find==true" @click="show_list_user_find=false " class="mt-5 text-xl p-4 cursor-pointer dark:text-white" icon="fa-solid fa-arrow-left" />
                <div class="flex-1">
                    <font-awesome-icon class="relative top-8.5 left-3 dark:text-white" icon="fa-solid fa-magnifying-glass" />
                    <input @click="show_list_user_find=true" @input="fetchFindUser" type="text" placeholder="Tìm kiếm theo tên" class="dark:bg-gray-600 dark:placeholder:text-white border-1 w-full outline-0 py-2 pl-8 dark:text-white rounded-lg">
                </div>
                
            </div>
            <div v-if="show_list_user_find" class="max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div v-for="(user, index) in users" :key="index" class="flex cursor-pointer gap-x-4 items-center mb-5 p-2 bg-gray-200 dark:bg-gray-500 rounded-sm">
                    <img class="w-15 h-15 rounded-full" :src="user?.img" alt="">
                    <div>
                        <p class="text-lg font-bold dark:text-white">{{ user?.name }}</p>
                        
                    </div>
                </div>
            </div>
            <div v-else @scroll="load_add_users_chat" class="max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div v-for="(user, index) in users_chat" :key="index" @click="fetchDetailUserChat(12, user?.user_id, 0, 20)" class="flex cursor-pointer gap-x-4 items-center mb-5 p-2 bg-gray-200 dark:bg-gray-500 rounded-sm">
                    <img class="w-15 h-15 rounded-full" :src="user?.img_user" alt="">
                    <div>
                        <p class="text-lg font-bold dark:text-white">{{ user?.name_user }}</p>
                        <p class="dark:text-white">{{ truncateString(user?.last_message, 15) }} <span> . {{ dayjs(user?.last_time).fromNow() }}</span></p>
                    </div>
                </div>
                
                
            </div>
            
        </div>
        <div class="col-span-8 bg-gray-100 dark:bg-gray-600 h-[70vh] p-2 flex flex-col justify-between">
            <div  class="flex gap-x-4 items-center mb-5 bg-white dark:bg-gray-500 p-2 rounded-xl">
                <img class="w-15 h-15 rounded-full" src="/public/images/img_chat/product_img-10.png" alt="">
                <div>
                    <p class="text-lg font-bold dark:text-white">Nguyễn Trần Cường</p>
                    <p class="dark:text-white">ok, tôi đã nhân đdddược <span> . 9h trước</span></p>
                </div>
            </div>
            <div @scroll="loadAddMessages" ref="chatContainer" class="bg-white dark:bg-gray-500 flex-1 overflow-y-auto custom-scrollbar p-5">
                <template v-for="(message, index) in messages" :key="index">
                    <div v-if="message.type == 'text'" :class="message.sender_type =='admin' ? 'justify-end': 'justify-start'" class="flex  items-center mb-5 ">
                        <div class="inline-block max-w-[80%] pr-5 bg-gray-200 dark:text-gray-700 dark:bg-white p-2 rounded-sm">
                            {{ message?.content}}
                        </div>
                    </div>
                    <div v-else-if="message.type == 'order'" :class="message.sender_type =='admin' ? 'justify-end': 'justify-start'" class="flex  items-center mb-5 ">
                        <div class="inline-block max-w-[80%] pr-5 bg-gray-200 dark:bg-white p-2 rounded-sm">
                            <p class=" border-white dark:text-gray-700">Đơn hàng</p>
                            <p class="border-b-1 border-white dark:text-gray-700">Mã đơn: {{ message?.meta_data?.order_code }}</p>
                            <div v-for="(product, i) in message?.meta_data?.products" :key="i" class="flex gap-2 items-center mt-2" >
                                <div class="text-end flex justify-end">
                                    <img :src="product?.img_product" class="w-15 h-15 rounded-sm" alt="">
                                </div>
                                <div class="dark:text-gray-700">
                                    <p>{{ product?.name_product }}</p>
                                    <p>Size: {{ product?.size }}</p>
                                    <p>Giá: {{ formatMoney(product?.price) }}</p>
                                </div>
                            </div>  
                            <p class="mt-2 dark:text-gray-700">
                                Số lượng: {{ message?.meta_data?.count }}
                            </p>
                            <p class=" dark:text-gray-700">
                                ID đơn hàng: {{ message?.meta_data?.order_code }}
                            </p>
                        </div>
                    </div>
                    <div v-else-if="message.type == 'product'" :class="message.sender_type =='admin' ? 'justify-end': 'justify-start'" class="flex  items-center mb-5 ">
                        <div class=" inline-block  pr-5 bg-gray-200 dark:bg-white p-2 rounded-sm">
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
                    <div v-else-if="message.type == 'image'" :class="message.sender_type =='admin' ? 'justify-end': 'justify-start'" class="mb-5 flex  items-center">
                        <div class="flex items-center justify-end max-w-[70%]  flex-wrap">{{ message?.contents }}
                            <img v-for="(img, index) in message?.files" :key="index" :src="img" :class="message.sender_type =='admin' ? 'ml-4': 'mr-4'" class="w-15 h-15 mt-3" alt="">
                        </div>
                    </div>
                    <div v-else-if="message.type == 'video'" :class="message.sender_type =='admin' ? 'justify-end': 'justify-start'" class="mb-5 flex  items-center">
                        <div class="flex items-center justify-end max-w-[70%]  flex-wrap">{{ message?.contents }}
                            <video v-for="(video, index) in message?.files" :key="index" :class="message.sender_type =='admin' ? 'ml-4': 'mr-4'" class="w-15 h-15" controls>
                                <source :src="video">
                                Trình duyệt của bạn không hỗ trợ video tag.
                            </video>
                        </div>
                    </div>
                    <p :class="message.sender_type =='admin' ? 'text-end': 'text-start'" class="dark:text-gray-300 -mt-4 mb-2">{{ dayjs(message?.date).fromNow()}}</p>
                </template>
            </div>
            
            <div class="bg-white dark:bg-gray-500 max-h-40 mt-3 p-2">
                
                <div class="flex place-items-center mb-2 d">
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
                <form action="" class="">
                    <div class="">
                        <input v-model="content_message" type="text" placeholder="Nhập nội dung tin nhắn" class="dark:text-white dark:placeholder:text-white outline-0 w-full rounded-ssm ">
                    </div>
                    <div class="flex items-center justify-between mt-2 text-gray-500 ">
                        <div class="flex items-center gap-4">
                            <label for="imgchat">
                                <font-awesome-icon class="cursor-pointer dark:text-white" icon="fa-regular fa-image" />
                            </label>
                            <label for="videochat">  
                                <font-awesome-icon class="cursor-pointer dark:text-white" icon="fa-solid fa-video" />
                            </label>
                            <div class="relative">
                                <font-awesome-icon @click.stop="handleShowProductChat" class="cursor-pointer dark:text-white" icon="fa-solid fa-bag-shopping" />
                                <transition
                                    enter-active-class="transition duration-300 ease-out"
                                    enter-from-class="opacity-0 translate-y-5 scale-95"
                                    enter-to-class="opacity-100 translate-y-0 scale-100"
                                    leave-active-class="transition duration-200 ease-in"
                                    leave-from-class="opacity-100 translate-y-0 scale-100"
                                    leave-to-class="opacity-0 translate-y-5 scale-95"
                                >
                                    <div v-if="show_product" @click.stop  class="absolute bottom-7 bg-gray-200  h-70 w-90 right-1/2 translate-x-1/2 z-50 shadow-lg shadow-black rounded-md">
                                        <div class="bg-white p-2 h-13">
                                            <input @input="find_product_by_name" type="text" placeholder="Tìm kiếm sản phẩm" class="border border-black outline-0 w-full rounded-sm py-1 pl-8" />
                                            <font-awesome-icon class="relative -top-[1.8rem] left-2"  icon="fa-solid fa-magnifying-glass" />
                                        </div>
                                        <div  @scroll="load_add_products" class="max-h-55 overflow-y-auto custom-scrollbar">
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
                                                    <p @click="addMessage('product', product)" class="bg-orange-500 text-white py-1 px-4 rounded-sm cursor-pointer">
                                                        Gửi
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>  
                            <div class="relative">
                                <font-awesome-icon @click.stop="handleShowOrderChat" class="cursor-pointer dark:text-white" icon="fa-solid fa-clipboard" />
                                <transition
                                    enter-active-class="transition duration-300 ease-out"
                                    enter-from-class="opacity-0 translate-y-5 scale-95"
                                    enter-to-class="opacity-100 translate-y-0 scale-100"
                                    leave-active-class="transition duration-200 ease-in"
                                    leave-from-class="opacity-100 translate-y-0 scale-100"
                                    leave-to-class="opacity-0 translate-y-5 scale-95"
                                >
                                    <div  v-if="show_order" @click.stop class="absolute bottom-7 bg-gray-200 h-70 w-90 right-1/2 translate-x-1/2 z-50 shadow-lg shadow-black rounded-md">
                                        <div class="bg-white p-2 h-13">
                                            <input @input="fetchFindOrder($event)" type="text" placeholder="Tìm kiếm đơn hàng" class="border border-black outline-0 w-full rounded-sm py-1 pl-8" />
                                            <font-awesome-icon class="relative -top-[1.8rem] left-2"  icon="fa-solid fa-magnifying-glass" />
                                        </div>
                                        <div @scroll="load_add_orders" class="max-h-55 overflow-y-auto custom-scrollbar">
                                            <div v-for="(order, index) in list_order" :key="index" class="bg-white p-2 mt-2">
                                                <div class="flex gap-3">
                                                    <img :src="order?.products[0]?.img" class="w-10 h-10" alt="" />
                                                    <div class="text-sm flex justify-between flex-1">
                                                        <div>
                                                            <p>{{ truncateString(order?.products[0]?.sort_description, 30) }}</p>
                                                            <p>Size: {{ order?.products[0]?.size }}</p>
                                                        </div>
                                                        <div>
                                                            <p>{{ formatMoney(order?.products[0]?.price) }}</p>
                                                            <p class="text-end">x{{ order?.products[0]?.count }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between">
                                                    <p>Tổng cộng: </p>
                                                    <p> 
                                                        <span class="inline-block pr-2 border-r-1">{{ order?.count }} sản phẩm</span> 
                                                        <span class="inline-block pl-2 text-orange-600 font-bold">{{ formatMoney(order?.total) }}</span>
                                                    </p>
                                                </div>
                                                <div class="flex justify-end gap-5 mt-3">
                                                    <router-link :to="{name: 'admin_sadboizz.order.detail', query: { showopt: 'shop_ad_t', index: order?.id } }">
                                                        <p class="border-1 border-orange-500 text-orange-500 py-1 px-4 rounded-sm cursor-pointer">
                                                            Chi tiết đơn
                                                        </p>
                                                    </router-link>
                                                   
                                                    <p @click="addMessage('order', order)" class="bg-orange-500 text-white py-1 px-4 rounded-sm cursor-pointer">
                                                        Gửi
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                                
                            </div>
                            
                        </div>
                        <div @click="addMessage" class="text-lg p-2 cursor-pointer">
                            <font-awesome-icon class="dark:text-white" icon="fa-regular fa-paper-plane" />
                        </div>
                    </div>
                    <div class="hidden">
                        <input type="file" @change="show_multiple_img" id="imgchat" multiple>
                        <input type="file" @change="show_multiple_video" id="videochat" multiple>
                    </div>
                </form>
                
            </div>

            
        </div>
    </div>
</template>

<style scoped>

</style>
