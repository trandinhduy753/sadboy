<script setup>
    import result from '@/views/admin/CompShareAdmin/result.vue'
    import Title_list_Option from '@/views/admin/CompShareAdmin/TitleListOption.vue';
    import {user_opt_show_admin } from '@/composables'
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import { comment } from '@/constant'
    import { useToast } from 'vue-toastification'
    dayjs.extend(relativeTime);
    const store = useStore()
    const toast = useToast();
    const { navigateTo } = user_opt_show_admin();
    const fetchListComment = async (start=0, end=20 ) => {
        const result = await store.dispatch('admin/comment/' + comment.get_list_comment, { start: start, end: end })
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchFindComment = async (event) => {
        find_comment.value = event.target.value.trim();
        if(find_comment.value === '') {
            fetchListComment(0, 20)
        }
        else {
            const result = await store.dispatch('admin/comment/' + comment.find_comment_by_code, {page: 1, code: find_comment.value, count: 5})
            if(result.ok === 'error' ){
                toast.error(result.message)
            }
        }
        
    }
    const fetchListCommentDelete = async (start, end) => {
        const result = await store.dispatch('admin/comment/' + comment.get_list_comment_delete, {start, end})
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchDeleteCommentDeleteAt = async (id) =>  {
        const result = await store.dispatch('admin/comment/' + comment.delete_comment_deleted_at, id)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchRecoverCommentDelete = async (id) => {
        const result = await store.dispatch('admin/comment/' + comment.recover_delete_comment, id)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const loadAddCommentFind = async (page, code, count) => {
        const result = await store.dispatch('admin/comment/' + comment.find_comment_by_code, {page, code, count})
    }
    const handleScrollLoadEmployeeDelete = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            //CALL ĐỂ THÊM DỮ LIỆU
            const start=comments_delete.value.length;
            fetchListCommentDelete(start, start+5)
        }
    }
    const load_add_comments= (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_comment.value !== ''){
                page.value++;
                loadAddCommentFind(page.value, find_comment.value, 5)
            }
            else {
                const start = list_comment.value.length;
                fetchListComment(start, start+5)
            }
            
        }
    };
    const tongleChecked = () => {
        const selectResultID=ref([]);
        list_comment.value.forEach((result, index) => {
            selectResultID.value.push(result.id)
        })
        
        if(!checked.value) {
            store.commit('admin/comment/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/comment/TOGGLE_SELECTED', []);
        }
        store.commit('admin/comment/CHANGE_CHECKED_COMMENT')
    }
    const checked = computed(() =>  store.state.admin.comment.checked)
    const opt_comment = computed(() => navigateTo() );
    const title_comment = computed(() => store.state.admin.comment.add_opt);
    const title_table_comment = computed(() => store.getters['admin/comment/get_title_list_comment'] )
    const list_comment = computed(() =>store.getters['admin/comment/get_list_comment_by_sort'] )
    const change_sort = (sort) => store.commit('admin/comment/CHANGE_SORT_BY', sort);
    const sortby=computed(() => store.state.admin.comment.sortby);
    const page = ref(1);
    const condition_sort = ref([
        {
            title: "Mã bình luận",
            name: "code"
        },
        {
            title: "Ngày tạo",
            name: "date"
        },
        {
            title: "Số like",
            name: "like"
        },
        {
            title: "Số sao",
            name: "star"
        },
        {
            title: "Nội dung",
            name: "content"
        }
    ])
    const find_comment=ref('');
    const show_list_comment_delete = computed(() => store.state.admin.comment.show_list_comment_delete)
    const start_find_comment = computed(() => store.state.admin.comment.start_find )
    const end_find_comment = computed(() => store.state.admin.comment.end_find )
    const show_comment_delete = (data) =>  store.commit('admin/comment/SHOW_LIST_COMMENT_DELETE', data)
    const comments_delete = computed(() => store.state.admin.comment.comments_delete )
    onMounted(() => {
        if(list_comment.value.length === 0 ){
            fetchListComment(0, 20)
        }
        
    })
</script>

<template>
    <div class="p-2 bg-[#E0F2F7] dark:bg-gray-900 transition-all duration-500 h-full">
        <div v-if="opt_comment">
            <router-view>

            </router-view>
        </div>

        <div v-else>
            <Title_list_Option :add_opt="title_comment" />
            <div @scroll="handleScrollLoadEmployeeDelete" v-if="show_list_comment_delete"  class="max-h-270 overflow-y-auto scrollbar-hide">
                <div @click="show_comment_delete(false)" class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
                    <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-1 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
                    <p class="ml-1">Trở lại</p>
                </div>
                <div v-for="(comment, index) in comments_delete " :key="index" class="flex justify-between items-center mt-5 dark:bg-gray-600 dark:p-2 dark:rounded-sm transition-all duration-500">
                    <div>
                        <p class="dark:text-gray-300">{{ comment?.content}}</p>
                        <p class="dark:text-gray-300">Thời giạn còn lại: <span class="italic">{{ dayjs(comment?.deleted_at).fromNow() }}</span></p>
                    </div>
                    <div class="flex items-center gap-x-5 ">
                        <div @click="fetchRecoverCommentDelete(comment?.id)" class="bg-green-200 flex items-center px-2 py-1 rounded-sm">
                            <font-awesome-icon class="text-green-500 dark:text-green-300 bg-green-300 dark:bg-green-600 p-1.5 border-1 border-green-500 dark:border-green-400 rounded-sm mr-2 cursor-pointer hover:scale-[1.1] hover:bg-green-400 dark:hover:bg-green-700 duration-300 transition-all" icon="fa-solid fa-window-restore" />
                            <p class="text-green-600">Khôi phục</p>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <div class="flex items-center bg-red-200 px-2 py-1 rounded-sm text-red-500">  
                                    <font-awesome-icon  :icon="['fas', 'trash']" class="text-red-500 dark:text-red-300 bg-red-300 dark:bg-red-600 p-1.5 border-1 border-red-500 dark:border-red-400 rounded-sm mr-2 cursor-pointer hover:scale-[1.1] hover:bg-red-400 dark:hover:bg-red-700 duration-300 transition-all" />
                                    <p>Xoá</p>
                                </div>
                                
                            </DialogTrigger>
                            <DialogContent class="dark:bg-gray-800 dark:text-white">
                                <DialogHeader>
                                    <DialogTitle></DialogTitle> 
                                    <DialogDescription>
                                        Bạn có chắc chắn muốn xoá mục này không?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button @click="fetchDeleteCommentDeleteAt(comment?.id)" type="button" variant="destructive">
                                            Xác nhận
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
           
            </div>
            <div v-else>
                <div class="flex">
                    <p class="flex items-center italic underline underline-offset-4 dark:text-white transition-all duration-300"> Tổng bình luận hiện có: {{ list_comment.length }} </p>
                    <div class="flex justify-end flex-1 my-4">
                        <Menu as="div" class="relative block text-left mr-5 ">
                            <MenuButton class="w-55">
                                <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 p-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                    <span>{{ sortby || '-- Điền kiện xắp xếp --'}} </span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
                                <div class="py-1">
                                    <MenuItem v-for="(condition, index) in condition_sort" :key="index" class="mb-1 cursor-pointer">
                                        <p @click="change_sort(condition.name)" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ condition.title }}</p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                        <input type="text" v-model.trim="find_comment" @keyup.enter="fetchFindComment($event)" placeholder="Nhập mã để tìm kiếm" class="rounded-sm pl-2 py-1 border-1 border-[var(--color_border)] dark:border-gray-600 w-70 outline-none bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
                    </div>
                </div>
                <div class="grid grid-cols-18 mt-2">
                    <div v-for="(title_manage, index) in title_table_comment" :key="index" 
                        :class="[title_manage.col, index == 0 ? 'border-1' : 'border-r-1 border-y-1']"
                        class="bg-gray-300 dark:bg-gray-700 transition-all duration-500 border-[var(--color_border)] dark:border-gray-600 pl-2 py-2 text-sm flex items-center text-black dark:text-white">
                        <input v-if="index == 0" @change="tongleChecked()" :checked="checked" type="checkbox" class="w-4 h-4 ml-[0.6rem] dark:accent-gray-800" />
                        <div class="flex items-center" :class="title_manage.sort ? 'cursor-pointer' : ''">
                            <p>{{ title_manage.title }}</p>
                            <p class="ml-2">{{ title_manage.sort }}</p>
                        </div>
                    </div>
                </div>
                <div @scroll="load_add_comments" class="max-h-270 overflow-y-auto custom-scrollbar">
                    <result :title_manages="title_table_comment" v-for="(result, i) in list_comment" :result="result" :key="i" :checked="checked" />
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<style scoped>

</style>
