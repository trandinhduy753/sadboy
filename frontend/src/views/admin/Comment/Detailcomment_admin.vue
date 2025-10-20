<script setup>
    import { comment } from '@/constant';
    const store = useStore()
    const route = useRoute()
    const id = computed(() => route.query.index)
    const detail_comments = computed(() => store.getters['admin/comment/get_list_detail_comment'])
    const detail_comment= computed(() => detail_comments.value[id.value] );
    import { useToast } from 'vue-toastification';
    const toast = useToast();
    const fetchDetailComment = async (id, page) => {
        const result = await store.dispatch('admin/comment/' + comment.get_detail_comment, {id, page})
         if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const handleScrollLoadData = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            page.value++;
            fetchDetailComment(id.value, page.value)
        }
        
    };
    const page = ref(1)
    onMounted(() => {
        if (!detail_comment.value || Object.keys(detail_comment.value).length === 0) {
            fetchDetailComment(id.value, page.value)
            console.log('CALL API')
        } else {
            console.log('Lấy trong getter') // 👉 Object có dữ liệu
        }  
    })
</script>

<template>
    
    <div class=" h-full bg-white dark:bg-gray-900 transition-all duration-500 rounded-sm shadow-md shadow-gray-500 dark:shadow-gray-800 border border-[var(--color_border)] dark:border-gray-700">
        <div class=" mx-5 bg-white dark:bg-gray-800 dark:text-white flex items-center pl-2 border-l-5 mb-4 border-[var(--maincolor)] transition-all duration-500 dark:border-[var(--dark_maincolor)] font-bold mt-2">
            <router-link :to="{name: 'admin_sadboizz.comment'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p>Thông tin chi tiết của comment</p>
        </div>
        <div class="grid grid-cols-12 font-(family-name:--font-noto) bg-white dark:bg-gray-900 transition-all duration-500 my-4 rounded-sm text-gray-900 dark:text-gray-200">
           
            <div class="col-span-12 border-b pb-3 px-10 border-[var(--color_border)] dark:border-gray-700">
                <div class="flex items-center mb-1">
                    <label class="font-bold block w-35">ID comment: </label>
                    <p>{{ detail_comment?.code }}</p>
                </div>
                <div class="flex items-center mb-1">
                    <label class="font-bold block w-35">ID product: </label>
                    <p>{{ detail_comment?.product_id }}</p>
                </div>
                <div class="flex items-center mb-1">
                    <label class="font-bold block w-35">ID user: </label>
                    <p>{{ detail_comment?.user_id }}</p>
                </div>
            </div>
            <div class="col-span-12 px-10 border-b border-[var(--color_border)] dark:border-gray-700 pb-5 text-sm">
                <p class="font-[800] my-3 mt-6 text-base uppercase">Thông tin người dùng</p>
                <div class="flex">
                    <div class="w-15 h-15 rounded-full overflow-hidden">
                        <img :src="detail_comment?.img_user" class="w-full h-full object-cover" alt="" />
                    </div>
                    <div class="ml-3 mt-1">
                        <p class="font-bold italic block">{{ detail_comment?.name_user }}</p>
                        <p>{{ detail_comment?.email_user }}</p>
                    </div>
                </div>
            </div>

            <div class="col-span-12 px-10 border-b border-[var(--color_border)] dark:border-gray-700 pb-5 text-sm">
                <h3 class="font-[800] text-base mt-5 uppercase ">Nội dung comment</h3>
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-yellow-400">
                        <template >
                            <font-awesome-icon class="w-6 h-6" :icon="['fas', 'star']" />
                        </template>
                    </div>
                    <div class="flex item-center gap-5">
                        <div class="flex items-center text-lg">
                            <font-awesome-icon :icon="['far', 'thumbs-up']" />
                            <p class="ml-2">{{ detail_comment?.likes }}</p>
                        </div>
                        <div class="flex items-center text-lg">
                            <font-awesome-icon :icon="['far', 'thumbs-down']" />
                            <p class="ml-2">{{ detail_comment?.dislikes }}</p>
                        </div>
                    </div>
                </div>
                <div class="italic -mt-5 text-gray-600 dark:text-gray-400">
                    {{ detail_comment?.created_at }}
                </div>
                <p class="mt-1"> {{ detail_comment?.content }} </p>
                <div class="mt-2 flex">
                    <template v-for="(img, index) in detail_comment?.imgs" :key="index">
                        <img :src="img" class="w-15 h-15 rounded-sm mr-2" alt="" />
                    </template>
                </div>
            </div>
            <div class="col-span-12 px-10 text-sm border-b border-[var(--color_border)] dark:border-gray-700 pb-5">
                <p class="font-bold text-base mt-5">Phản hồi của người dùng khác</p>
                <div @scroll="handleScrollLoadData" class="max-h-100 overflow-y-auto custom-scrollbar px-7">
                    <div v-for="(feedback, index) in detail_comment?.feedbacks" :key="index" class="mt-5">
                        <div class="flex">
                            <div class="w-15 h-15 rounded-full overflow-hidden">
                                <img :src="feedback.img_user" class="w-full h-full object-cover" alt="" />
                            </div>
                            <div class="ml-3 mt-1">
                                <p class="font-bold italic block">{{ feedback?.name_user }}</p>
                                <p>{{ feedback?.email_user }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                <p class="italic mt-2 text-gray-600 dark:text-gray-400">
                                    {{ feedback?.created_at }}
                                </p>
                                <p> {{ feedback?.content }}</p>
                            </div>
                            
                            <div class="flex item-center gap-5 mt-2">
                                <div class="flex items-center text-lg">
                                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                    <p class="ml-2">{{ feedback?.likes }}</p>
                                </div>
                                <div class="flex items-center text-lg">
                                    <font-awesome-icon :icon="['far', 'thumbs-down']" />
                                    <p class="ml-2">{{ feedback?.dislikes }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center mt-2">
                            <template v-for="(img, index) in feedback?.imgs" :key="index">
                                <img :src="img" class="w-15 h-15 rounded-sm mr-2" alt="" />
                            </template>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>


<style scoped>

</style>
