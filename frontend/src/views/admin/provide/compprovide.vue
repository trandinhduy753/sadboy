<script setup lang="ts">
    import result from '@/views/admin/CompShareAdmin/result.vue'
    import Title_list_Option from '@/views/admin/CompShareAdmin/TitleListOption.vue';
    import {user_opt_show_admin, optionFindProvide } from '@/composables'
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import { provide } from '@/constant'
    dayjs.extend(relativeTime);
    const {
        fetchListProvide,
        fetchFindProvide,
        load_add_provides
    } = optionFindProvide()
    const store = useStore()
    const fetchListProductDelete = async (start, end) => {
        const result = await store.dispatch('admin/provide/' + provide.get_list_provide_delete, {start, end})
    }
    const fetchDeleteProvideDeleteAt = async (id) =>  {
        const result = await store.dispatch('admin/provide/' + provide.delete_provide_deleted_at, id)
    }
    const fetchRecoverProvideDelete = async (id) => {
        const result = await store.dispatch('admin/provide/' + provide.recover_delete_provide, id)
    }
    const handleScrollLoadProvideDelete = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            const start = provides_delete.value.length;
            fetchListProductDelete(start, start+5)
        }
    };
    const tongleChecked = () => {
        const selectResultID=ref([]);
        list_provide.value.forEach((result, index) => {
            selectResultID.value.push(result.id)
        })
        if(!checked.value) {
            store.commit('admin/provide/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/provide/TOGGLE_SELECTED', []);
        }
        store.commit('admin/provide/CHANGE_CHECKED_PROVIDE')
    }
    const checked = computed(() => store.state.admin.provide.checked)
    const sortby=computed(() => store.state.admin.provide.sortby);
    const { navigateTo } = user_opt_show_admin();
    const opt_provide = computed( () => navigateTo() )
    const change_sort = (sort) => store.commit('admin/provide/CHANGE_SORT_BY', sort);
    const add_employee = computed(() => store.state.admin.provide.add_opt)
    const title_table_provide = computed(() => store.getters['admin/provide/get_title_list_provide'] );
    const list_provide = computed(() => store.getters['admin/provide/get_list_provide_by_sort'] );
    const condition_sort = ref([
        {
            title: "Mã nhà cung cấp",
            name: "code"
        },
        {
            title: "Tên nhà cung cấp",
            name: "name"
        },
        {
            title: "Địa chỉ nhà cung cấp",
            name: "address"
        },
        {
            title: "Email nhà cung cấp",
            name: "email"
        }
    ])
    const show_list_provide_delete = computed(() => store.state.admin.provide.show_list_provide_delete)
    const provides_delete = computed(() => store.state.admin.provide.provides_delete )
    const show_provide_delete = (data) =>  store.commit('admin/provide/SHOW_LIST_PROVIDE_DELETE', data)
    const isCallApiProvide = computed(() => store.state.admin.provide.isCallApiProvide);  
    onMounted(() => {
        if(isCallApiProvide.value ) {
            fetchListProvide()
        }
    })
    onUnmounted(() => {
        store.commit('admin/provide/CHANGE_CALL_API_PROVIDE', false)
    })
</script>

<template>
    <div class="bg-blue-50 h-[100%] p-2 font-(family-name:--font-noto) dark:bg-gray-900 transition-all duration-500">
        {{ isCallApiProvide }}
        <div v-if="opt_provide">
            <router-view>

            </router-view>
        </div>

        <div v-else>
            <Title_list_Option :add_opt="add_employee" />
            <div @scroll="handleScrollLoadProvideDelete" v-if="show_list_provide_delete"  class="max-h-270 overflow-y-auto scrollbar-hide">
                <div @click="show_provide_delete(false)" class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
                    <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-1 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
                    <p class="ml-1">Trở lại</p>
                </div>
                <div v-for="(provide, index) in provides_delete " :key="index" class="flex justify-between items-center mt-5 dark:bg-gray-600 dark:p-2 dark:rounded-sm transition-all duration-500">
                    <div class="flex items-center gap-x-2">
                        <img :src="provide?.img" class="w-17 h-17 rounded-full" alt="">
                        <div>
                            <p class="dark:text-gray-300">{{ provide?.name}}</p>
                            <p class="dark:text-gray-300">Thời giạn còn lại: <span class="italic">{{ dayjs(provide?.deleted_at).fromNow() }}</span></p>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-5 ">
                        <div @click="fetchRecoverProvideDelete(provide?.id)" class="bg-green-200 flex items-center px-2 py-1 rounded-sm">
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
                                        <Button @click="fetchDeleteProvideDeleteAt(provide?.id)" type="button" variant="destructive">
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
                    <p class="flex items-center italic underline underline-offset-4 dark:text-white transition-all duration-300"> Tổng nàh cung cấp hiện có: {{ list_provide.length }} </p>
                    <div class="flex justify-end flex-1 my-4">
                        <Menu as="div" class="relative block text-left mr-5 ">
                            <MenuButton class="w-55">
                                <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 p-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                    <span>--{{  sortby || 'Điều kiện sắp xếp' }} --</span>
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
                        <input id="findproducts" @keyup.enter="fetchFindProvide($event)" type="text" placeholder="Nhập tên để tìm kiếm" class="rounded-sm pl-2 py-1 border-1 border-[var(--color_border)] dark:border-gray-600 w-70 outline-none bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
                    </div>
                </div>
                <div class="grid grid-cols-18 mt-2">
                    <div v-for="(title_manage, index) in title_table_provide" :key="index" 
                        :class="[title_manage.col, index == 0 ? 'border-1' : 'border-r-1 border-y-1']"
                        class="bg-gray-300 dark:bg-gray-700 transition-all duration-500 border-[var(--color_border)] dark:border-gray-600 pl-2 py-2 text-sm flex items-center text-black dark:text-white">
                        <input v-if="index == 0" @change="tongleChecked()" :checked="checked" type="checkbox" class="w-4 h-4 ml-[0.6rem] dark:accent-gray-800" />
                        <div class="flex items-center" :class="title_manage.sort ? 'cursor-pointer' : ''">
                            <p>{{ title_manage.title }}</p>
                            <p class="ml-2">{{ title_manage.sort }}</p>
                        </div>
                    </div>
                </div>
                <div @scroll="load_add_provides" class="max-h-270 overflow-y-auto custom-scrollbar">
                    <result :title_manages="title_table_provide" v-for="(result, i) in list_provide" :result="result" :key="i" :checked="checked" />
                </div>
            </div>
        </div>
    </div>
    
  
</template>

<style scoped>

</style>
