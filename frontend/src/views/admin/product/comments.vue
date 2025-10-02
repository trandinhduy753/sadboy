<script setup lang="ts">
    import { product } from '@/constant'
    const store = useStore()
    const route = useRoute()
    const id=computed(() => route.query.index)
    var props = defineProps({
        comment: {
            type: Object,
            default: {}
        }
    })
    const fetchDeleteComment = async (comment_id) => {
        const result = await store.dispatch('admin/product/' + product.delete_comment, {product_id: id.value, comment_id: comment_id} )
    }
</script>

<template>
   
    <div class="flex mt-8 pl-5 dark:bg-gray-900 dark:text-gray-100 ">
        <img :src="comment?.img_user" class="w-15 h-15 rounded-[100%]" alt="">
        <div class="ml-3 -mt-2 flex-1 last:border-b-1 last:border-[var(--color_border)]  pb-8">
            <div class="flex items-center justify-between">
                <p class="capitalize">{{ comment?.name_user }}</p>
                <Dialog>
                    <DialogTrigger>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="cursor-pointer px-6 py-2  text-2xl hover:scale-[1.5] transition-all duration-300 dark:text-gray-300" />
                    </DialogTrigger>
                    <DialogContent class="dark:bg-gray-800 dark:text-white">
                        <DialogHeader>
                        
                            <DialogDescription>
                                <div class="flex flex-col mt-4 text-black text-xl dark:text-white ">
                                Bạn có muốn xóa bình luận này không
                                </div>
                                
                            </DialogDescription>

                        </DialogHeader>

                        <DialogFooter>
                            <DialogClose as-child>
                                <button @click="fetchDeleteComment(comment.id)" class="bg-green-200 px-8 border-1 border-green-900 py-2 rounded-sm cursor-pointer font-bold text-green-900 dark:bg-green-700 dark:text-gray-200">Xác nhận</button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div class="-mt-1">
                <font-awesome-icon v-for="i in comment?.star" class="text-yellow-300 mr-1 cursor-pointer text-[0.8rem]" :key="i" :icon="['fas', 'star']"  />
            </div>
            <div class="text-[0.9rem] italic text-[var(--color_text-gray)] dark:text-gray-400">
                {{ comment?.created_at }}
            </div>
            <div class="flex item-center gap-5 ">
                <div class="flex items-center ">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="ml-2">{{ comment?.likes }}</p>
                </div>
                <div class="flex items-center ">
                    <font-awesome-icon :icon="['far', 'thumbs-down']" />
                    <p class="ml-2">{{ comment?.dislikes }}</p>
                </div>
            </div>
            <p class="mb-3 mt-2">{{ comment?.content }}</p>
            <div class="flex">
                <img v-for="(img, index) in comment?.imgs" :key="index" :src="img" class="w-18 h-18 rounded-sm mr-3 dark:bg-gray-700" alt="">
            </div>
            
            <div class="mt-5 dark:text-gray-100" >
                <p class="text-[1.2rem] p-2 mb-3 font-bold italic dark:bg-gray-800 dark:text-gray-100">Phản hồi</p>                                 
                <div v-for="(feedback, index) in comment.feedbacks" :key="index" class="my-5 flex justify-between">
                    <div>
                        <div class="flex mb-2">
                            <div class="w-10 h-10 rounded-full overflow-hidden">
                                <img :src="feedback.img_user" class="w-full h-full object-cover" alt="" />
                            </div>
                            <div class="ml-3 text-[0.7rem]">
                                <p class="font-bold italic block">{{ feedback.name_user }}</p>
                                <p>{{ feedback.email_user }}</p>
                            </div>
                        </div>
                        <div class="flex item-center gap-5 mt-2">
                                <div class="flex items-center">
                                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                    <p class="ml-2">{{ feedback?.likes }}</p>
                                </div>
                                <div class="flex items-center">
                                    <font-awesome-icon :icon="['far', 'thumbs-down']" />
                                    <p class="ml-2">{{ feedback?.dislikes }} </p>
                                </div>
                            </div>
                        <div class="flex justify-between">
                            <div class="text-[0.7rem]">
                                <p class="italic text-gray-600 dark:text-gray-400">
                                    {{ feedback.created_at }}
                                </p>
                                <p>{{ feedback?.content }}</p>
                            </div>
                            
                            
                        </div>
                        <div class="flex items-center mt-2">
                            <template v-for="(img, index) in feedback?.imgs" :key="index">
                                <img :src="img" class="w-10 h-10 rounded-sm mr-2" alt="" />
                            </template>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <font-awesome-icon :icon="['fas', 'xmark']" class="cursor-pointer px-6 py-2  text-2xl hover:scale-[1.5] transition-all duration-300 dark:text-gray-300" />
                        </DialogTrigger>
                        <DialogContent class="dark:bg-gray-800 dark:text-white">
                            <DialogHeader>
                            
                                <DialogDescription>
                                    <div class="flex flex-col mt-4 text-black text-xl dark:text-white ">
                                    Bạn có muốn xóa bình luận này không
                                    </div>
                                    
                                </DialogDescription>

                            </DialogHeader>

                            <DialogFooter>
                                <DialogClose as-child>
                                    <button @click="fetchDeleteComment(feedback.id)" class="bg-green-200 px-8 border-1 border-green-900 py-2 rounded-sm cursor-pointer font-bold text-green-900 dark:bg-green-700 dark:text-gray-200">Xác nhận</button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<style scoped>

</style>

