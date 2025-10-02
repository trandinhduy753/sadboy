<script setup lang="ts">
    import { opt_show_multiple_img } from '@/composables'
    var props = defineProps({
        comment: {
            type: Object,
            default: {}
        },
        
    })
    const { show_multiple_img, remove_image,
        clear_images,
        images,
        preview_images,
        error_img
    } = opt_show_multiple_img()
    const add_comment = ref(false)
</script>

<template>

    <div class="flex mt-8 pl-5 dark:bg-gray-900 dark:text-gray-100">
        <img :src="comment?.img" class="w-17 h-17 rounded-[100%]" alt="">
        <div class="ml-2 last:border-b-1 last:border-[var(--color_border)] w-full pb-8">
            <div class="flex items-center justify-between">
                <p class="detail_comment_user-name">{{ comment?.name }}</p>
            </div>
            
            <div class="-mt-1">
                <font-awesome-icon v-for="i in comment?.star" class="text-yellow-300 mr-1 cursor-pointer text-[0.8rem]" :key="i" :icon="['fas', 'star']"  />
            </div>
            <div class="text-[0.9rem] italic text-[var(--color_text-gray)] dark:text-gray-400">
                {{ comment?.created_at }}
            </div>
            <div class="flex item-center gap-5 ">
                <div class="flex items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ml-2">{{ comment?.likes }}</p>
                </div>
                <div class="flex items-center">
                    <font-awesome-icon :icon="['far', 'thumbs-down']" />
                    <p class="ml-2">{{ comment?.dislikes }}</p>
                </div>
            </div>
            <p class="mb-3">{{ comment?.content }}</p>
            <div class="flex">
                <img v-for="(img, index) in comment?.imgs" :key="index" :src="img" class="w-18 h-18 rounded-sm mr-3 dark:bg-gray-700" alt="">
            </div>
            <input type="text" placeholder="Phản hồi về bình luận" class="w-[100%] bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white dark:border-gray-600   border-1 border-[var(--color_border)] outline-none rounded-sm p-3 mt-4 ">
            <label for="uploadimg_product" class="inline-block mt-5 cursor-pointer text-white font-(family-name:--font-winky) py-2 px-10 rounded-sm bg-blue-900 dark:bg-blue-700">
                <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                <span class="ml-2">Chọn ảnh</span>
            </label>
            <input type="file" @change="show_multiple_img($event)" multiple id="uploadimg_product" class="hidden">
            <div class="flex items-center flex-wrap mt-1">
                <div v-for="(preview_image, index) in preview_images" :key="index" class="mr-5">
                    <font-awesome-icon @click="remove_image(index)" class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 relative left-21 top-4" :icon="['fas', 'xmark']" />
                    <img :src="preview_image" class="w-25 h-20 border-1 border-black dark:border-gray-500 rounded-sm" alt="">
                </div>
            </div>
            <div class="mt-3">
                
                <p>Phản hồi về bình luận</p>
                <div v-for="(feedback, index) in comment.feedbacks" :key="index" class="flex items-start mb-2">
                    <img :src="feedback?.img" class="w-17 h-17 rounded-[100%]" alt="">
                    <div class="p-2 dark:text-gray-100" >
                        <div class="flex items-center justify-between">
                            <p class="detail_comment_user-name">{{ feedback?.name }}</p>
                        </div>
                        <div class="text-[0.9rem] italic text-[var(--color_text-gray)] dark:text-gray-400">
                            {{ feedback?.created_at }}
                        </div>
                        <div class="flex item-center gap-5 ">
                            <div class="flex items-center">
                                <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                <p class="ml-2">{{ feedback?.likes }}</p>
                            </div>
                            <div class="flex items-center">
                                <font-awesome-icon :icon="['far', 'thumbs-down']" />
                                <p class="ml-2">{{ feedback?.dislikes }}</p>
                            </div>
                            
                        </div>
                        <p class="mb-3">{{ feedback?.content }}</p>
                        <div class="flex">
                            <img v-for="(img, index) in feedback?.imgs" :key="index" :src="img" class="w-18 h-18 rounded-sm mr-3 dark:bg-gray-700" alt="">
                        </div>
                    </div>
                </div>
                
               
            </div>
            
        </div>
    </div>
    
    
</template>

<style scoped>

</style>

