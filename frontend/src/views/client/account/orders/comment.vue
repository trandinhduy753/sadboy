<script setup>
import { opt_show_multiple_img, randomString } from '@/composables';
import { commentClient } from '@/constant'
const store = useStore()
const {
    show_multiple_img,
    remove_image,
    clear_images,
    images,
    preview_images,
    error_img
} = opt_show_multiple_img()
var props = defineProps({
    order: {
        type: Object,
        default: {}
    }
    
})
const openDialog = () => {
  isOpen.value = true
  isClosing.value = false
}

const closeDialog = () => {
  isClosing.value = true
  setTimeout(() => {
    isOpen.value = false
  }, 300) // Thời gian trùng với transition
}

const addComment = () => {
    var formData = new FormData()
    formData.append('code', randomString(10))
    formData.append('content', content_comment.value)
    images.value.forEach((file, index) => {
        formData.append('imgs[]', file);
    });
    formData.append('star', index_star.value)
    formData.append('product_id', props.order.products?.[indexProduct.value]?.id)
    formData.append('user_id', user.value?.id)
    formData.append('parent_id', null)
    if(content_comment.value !=='') {
        errorContent.value = ''
        const result = store.dispatch('client/comment/' + commentClient.add_comment, formData )
    }
    else {
        errorContent.value = 'Vui lòng nhập nội dung của bình luận'
    }
    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
}
const user = computed(() => store.state.client.account.user )
const isOpen = ref(false)
const isClosing = ref(false)
const indexProduct = ref(0)
const content_comment = ref("")
const errorContent = ref("")
const index_star = ref(5)
</script>

<template>
    <div>
        
        <button @click="openDialog">
            <slot></slot>
        </button>

        <div
            v-if="isOpen"
            class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-all duration-300"
            @click.self="closeDialog"
        >
        
            <div
                :class="[
                    'bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-xl max-w-xl w-full h-140 overflow-y-auto custom-scrollbar p-6 transform transition-all duration-300',
                    isClosing ? 'opacity-0 scale-90' : 'animate-show'
                ]"
            >
                <div class="comment transition-all duration-300">
                    <form>
                    
                        <div class="-mt-1 border-b-3 border-[var(--maincolor)] pb-2">
                            <p class="dark:text-white">Đánh giá sản phẩm</p>
                        </div>
                        <div class="mt-2 bg-yellow-200 dark:bg-yellow-800 p-1.5">
                            Chúng tôi trân trọng ý kiến của bạn! Hãy dành chút thời gian để đánh giá sản phẩm và giúp chúng tôi phục vụ bạn tốt hơn.
                        </div>
                        <div class="flex mt-5 justify-between">
                            <div>
                                <Menu as="div" class="relative block text-left">
                                    <MenuButton class="w-full">
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-4 cursor-pointer">
                                            <span class="mr-3">{{ order?.products?.[indexProduct]?.name }}</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                    </MenuButton>

                                    <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border rounded-md shadow-lg z-50">
                                        <div class="py-1">
                                            <MenuItem v-for="(product, index) in order?.products" :key="index" class="mb-1 cursor-pointer">
                                                <p @click="indexProduct = index " class="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[0.2rem]">{{ product?.name }}</p>
                                            </MenuItem>
                                            
                                        </div>
                                    </MenuItems>
                                </Menu>
                                <div class="mt-2">
                                    <p class="font-bold mb-1">{{ order?.products?.[indexProduct]?.name }}</p>
                                    <img :src="order?.products?.[indexProduct]?.img" class="w-20 h-20" alt="">
                                </div>
                            </div>
                            
                            <div class="comment-product-quality">
                                <p class="dark:text-white">Đánh giá về chất lượng sản phẩm</p>
                                <div class="flex items-center mt-1">
                                    <template v-for="i in 5" :key="i">
                                        <font-awesome-icon @mouseenter="index_star = i"  @click="index_star = i" :class="i <= index_star ? 'text-yellow-300': ''" class=" mr-4 cursor-pointer text-xl" :icon="['fas', 'star']" />
                                    </template>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="mt-5">
                            <textarea v-model="content_comment" class="rounded-sm border-1 border-[var(--maincolor)] dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full pt-1 pl-2 h-30" placeholder="Đánh giá của bạn"></textarea>
                            <span class="text-red-500 dark:text-red-400">{{ errorContent }}</span>
                        </div>
                        <div class="form--group">
                            <label class="rounded-sm border-1 border-[var(--colorborder)] dark:border-gray-600 w-full block py-2 pl-2 mt-5 text-[var(--color_text-gray)] dark:text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-pointer" for="upload_img_video_pro">Tải ảnh sản phẩm ở đây</label>
                            <input type="file"  @change="show_multiple_img" id="upload_img_video_pro" class="hidden" multiple>
                        </div>
                        
                        <div class="flex items-center -mt-2">
                            <div v-for="(preview_image, index) in preview_images" :key="index" class="mr-3 cursor-pointer">
                                <font-awesome-icon @click="remove_image(index)" class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full border-1 border-black dark:border-gray-600 relative left-11 top-4" :icon="['fas', 'xmark']" />
                                <img :src="preview_image" class="w-14 h-14 border-1 border-black dark:border-gray-600 rounded-sm" alt="">
                            </div>
                        </div>
                        <div class="flex justify-end mt-5">
                            <button @click.prevent="addComment" class="bg-[var(--maincolor)] dark:bg-blue-600 px-15 py-1.5 uppercase font-bold text-white rounded-sm hover:bg-[var(--hoverred)] dark:hover:bg-red-700 transition duration-300">Bình luận</button>
                        </div>
                    </form>
                  
                </div>
                <button
                    @click="closeDialog"
                    class="absolute top-2 right-2 text-gray-500 dark:text-gray-300 p-1 px-3 hover:text-red-500 dark:hover:text-red-700 hover:scale-[1.3] transition-all duration-300 text-3xl"
                >
                    &times;
                </button>
            </div>
        </div>
    </div>

    
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease;
}

.animate-show {
    animation: fade-out 0.3s ease;
}
@keyframes fade-out {
    from 
    {
        opacity: 0;
        transform: scale(0);
    }
    to 
    {
        opacity: 1;
        transform: scale(1);
    }
}
</style>

