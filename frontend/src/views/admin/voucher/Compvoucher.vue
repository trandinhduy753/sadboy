<script setup lang="ts">
    import result from '@/views/admin/CompShareAdmin/result.vue'
    import Title_list_Option from '@/views/admin/CompShareAdmin/TitleListOption.vue';
    import { voucher  } from '@/constant';

    import {user_opt_show_admin, formatMoney} from '@/composables'
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    dayjs.extend(relativeTime);
    const store = useStore()

    const { navigateTo } = user_opt_show_admin();
    const opt_voucher = computed(() => navigateTo() );
    const fetchListVoucher = async (start=0, end=20) => {
        const result = await store.dispatch('admin/voucher/'+ voucher.get_list_voucher, { start: start, end: end })
    }
    const fetchFindVoucher = async (event) => {
        find_voucher.value = event.target.value.trim()
        if(find_voucher.value==='') {
            fetchListVoucher(0, 20)
        }
        else {
            const result = await store.dispatch('admin/voucher/' + voucher.find_voucher, {page: 1, code: find_voucher.value, count: 5})
        }
       
    }
    const fetchListVoucherDelete = async (start, end) => {
        const result = await store.dispatch('admin/voucher/' + voucher.get_list_voucher_delete, {start, end})
    }
    const fetchDeleteVoucherDeleteAt = async (id) =>  {
        const result = await store.dispatch('admin/voucher/' + voucher.delete_voucher_deleted_at, id)
    }
    const fetchRecoverVoucherDelete = async (id) => {
        const result = await store.dispatch('admin/voucher/' + voucher.recover_delete_voucher, id)
    }
    const loadAddVoucherFind = async (page, code, count) => {
        const result = await store.dispatch('admin/voucher/' + voucher.find_voucher, {page, code, count})
    }
    const handleScrollLoadVoucherDelete = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            //CALL ĐỂ THÊM DỮ LIỆU
            const start = vouchers_delete.value.length;
            fetchListVoucherDelete(start, start+5)
        }
    };
    const load_add_vouchers= (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_voucher.value !== ''){
                page.value++;
                loadAddVoucherFind(page.value, find_voucher.value, 5)
            }
            else {
                const start = list_voucher.value.length;
                fetchListVoucher(start, start+5)
            }
            
        }
    };
    const tongleChecked = () => {
        const selectResultID=ref([]);
        list_voucher.value.forEach((result, index) => {
            selectResultID.value.push(result.id)
        })
        if(!checked.value) {
            store.commit('admin/voucher/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/voucher/TOGGLE_SELECTED', []);
        }
        store.commit('admin/voucher/CHANGE_CHECKED_VOUCHER')
    }
    const checked = computed(() => store.state.admin.voucher.checked )
    const condition_sort = ref([
        {
            title: "Mã giảm giá",
            name: "code",
            others: []
        },
        {
            title: "Ngày tạo",
            name: "date",
            others: []
        },
        {
            title: "Phần % giảm",
            name: "percent",
            others: []
        },
        {
            title: "Trạng thái",
            name: "status",
            others: [
                {
                    title: 'Còn hiệu lực',
                    name: 'ACTIVE'
                },
                {
                    title: 'Hết hiệu lực',
                    name: 'DELETE'
                },
                {
                    title: 'Sắp có hiệu lực',
                    name: 'EXPIRE'
                }
            ]
        }
    ])
    const add_voucher = computed(() => store.state.admin.voucher.add_opt)
    const title_table_voucher = computed(() => store.getters['admin/voucher/get_title_list_voucher'] )
    const list_voucher = computed(() => store.getters['admin/voucher/get_list_voucher_by_sort'] )
    const change_sort = (sortby, sort_status) => store.commit('admin/voucher/CHANGE_SORT_BY', {sortby, sort_status});
    const sortby=computed(() => store.state.admin.voucher.sortby);
    const find_voucher = ref("")
    const show_list_voucher_delete = computed(() => store.state.admin.voucher.show_list_voucher_delete)
    const vouchers_delete = computed(() => store.state.admin.voucher.vouchers_delete )
    const show_voucher_delete = (data) =>  store.commit('admin/voucher/SHOW_LIST_VOUCHER_DELETE', data)
    const page = ref(1)
    onMounted(() => {
        if(list_voucher.value.length === 0 )
        {
            fetchListVoucher()
        }
        
    })
</script>

<template>
    <div class="bg-gray-100 p-2 dark:bg-gray-900 transition-all duration-500">
        <div v-if="opt_voucher" class="h-full">
            <router-view>
            </router-view>
        </div>

        <div v-else>
            <Title_list_Option :add_opt="add_voucher" />
            <div @scroll="handleScrollLoadVoucherDelete" v-if="show_list_voucher_delete"  class="max-h-270 overflow-y-auto scrollbar-hide">
                <div @click="show_voucher_delete(false)" class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
                    <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-1 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
                    <p class="ml-1">Trở lại</p>
                </div>
                <div v-for="(voucher, index) in vouchers_delete " :key="index" class="flex justify-between items-center mt-5 dark:bg-gray-600 dark:p-2 dark:rounded-sm transition-all duration-500">
                    <div class="flex items-center gap-x-2">
                        <img :src="voucher?.img" class="w-17 h-17 rounded-full" alt="">
                        <div>
                            <p class="dark:text-gray-300">{{ voucher?.code}}</p>
                            <p class="dark:text-gray-300">{{ voucher?.name }}</p>
                            <p class="dark:text-gray-300">Thời giạn còn lại: <span class="italic">{{ dayjs(voucher?.deleted_at).fromNow() }}</span></p>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-5 ">
                        <div @click="fetchRecoverVoucherDelete(voucher?.id)" class="bg-green-200 flex items-center px-2 py-1 rounded-sm">
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
                                        <Button @click="fetchDeleteVoucherDeleteAt(voucher?.id)" type="button" variant="destructive">
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
                <p class="flex items-center italic underline underline-offset-4 dark:text-white transition-all duration-300"> Tổng mã giảm giá hiện có: {{ list_voucher.length }} </p>
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
                                        <div>
                                            <p v-if="condition.others.length == 0" @click="change_sort(condition.name, '')" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ condition.title }}</p>
                                            <Menu v-else as="div" class="relative block text-left mr-5 ">
                                                <MenuButton class="w-50">
                                                    <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 p-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                                        <span>-- Trạng thái -- </span>
                                                        <font-awesome-icon :icon="['fas', 'angle-down']" />
                                                    </div>
                                                </MenuButton>
                                                <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
                                                    <div class="py-1">
                                                        <MenuItem v-for="(status, index) in condition.others" :key="index" class="mb-1 cursor-pointer">
                                                            <p @click="change_sort(condition.name, status.name)" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ status.title }}</p>
                                                            
                                                        </MenuItem>
                                                        
                                                        
                                                    </div>
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                        
                                    </MenuItem>
                                    
                                    
                                </div>
                            </MenuItems>
                        </Menu>
                        <input v-model="find_voucher" id="findproducts" @keyup.enter="fetchFindVoucher($event)" type="text" placeholder="Nhập mã để tìm kiếm" class="rounded-sm pl-2 py-1 border-1 border-[var(--color_border)] dark:border-gray-600 w-70 outline-none bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
                    </div>
                </div>
                <div class="grid grid-cols-18 mt-2">
                    <div v-for="(title_manage, index) in title_table_voucher" :key="index" 
                        :class="[title_manage.col, index == 0 ? 'border-1' : 'border-r-1 border-y-1']"
                        class="bg-gray-300 dark:bg-gray-700 transition-all duration-500 border-[var(--color_border)] dark:border-gray-600 pl-2 py-2 text-sm flex items-center text-black dark:text-white">
                        <input v-if="index == 0" @change="tongleChecked()" :checked="checked" type="checkbox" class="w-4 h-4 ml-[0.6rem] dark:accent-gray-800" />
                        <div class="flex items-center" :class="title_manage.sort ? 'cursor-pointer' : ''">
                            <p>{{ title_manage.title }}</p>
                            <p class="ml-2">{{ title_manage.sort }}</p>
                        </div>
                    </div>
                </div>
                <div @scroll="load_add_vouchers" class="max-h-270 overflow-y-auto custom-scrollbar">
                    <result :title_manages="title_table_voucher" v-for="(result, i) in list_voucher" :result="result" :key="i" :checked="checked" />
                </div>
                
            </div>
            
        </div>
    </div>
  
</template>

<style scoped>

</style>
