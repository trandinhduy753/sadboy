<script setup lang="ts">
    import Title_list_Option from '@/views/admin/CompShareAdmin/TitleListOption.vue';
    import result from '@/views/admin/CompShareAdmin/result.vue'
    import { user_opt_show_admin, optionFindOrder } from '@/composables';
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import { order } from '@/constant'
    dayjs.extend(relativeTime);
    const { fetchListOrder, fetchFindOrder, load_add_orders } = optionFindOrder()
    const store = useStore();

    const { navigateTo } = user_opt_show_admin();
    const opt_order =computed(() => navigateTo())
    const title_order = computed(() => store.state.admin.order.add_opt);
    const title_table_order = computed(() => store.getters['admin/order/get_title_list_order'])
    const get_list_order = computed(() => store.getters['admin/order/get_list_order_by_sort'])
    const change_sort = (sortby, sort_status) => store.commit('admin/order/CHANGE_SORT_BY', {sortby, sort_status});
    const fetchPendingAll = async (status='PENDING') => {
        const result = await store.dispatch('admin/order/' + order.confirm_all_order, status)
    }
    const fetchListOrderDelete = async (start, end) => {
        const result = await store.dispatch('admin/order/' + order.get_list_order_deleted, {start, end})
    }
    const fetchDeleteOrderDeleteAt = async (id) =>  {
        const result = await store.dispatch('admin/order/' + order.delete_order_deleted_at, id)
    }
    const fetchRecoverOrderDelete = async (id) => {
        const result = await store.dispatch('admin/order/' + order.recover_delete_order, id)
    }
    const handleScrollLoadOrderDele = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            //CALL ĐỂ THÊM DỮ LIỆU
            
            const start = orders_delete.value.length;
            fetchListOrderDelete(start, start+5)
        }
    };
    const sortby=computed(() => store.state.admin.order.sortby);
    const condition_sort = ref([
        {
            title: "Mã đơn hàng",
            name: "code",
            others: []
        },
        {
            title: "Ngày đặt",
            name: "date",
            others: []
        },
        {
            title: "Trạng thái",
            name: "status",
            others: [
                {
                    title:'Đã giao hàng',
                    name: "SUCCESS"
                },
                {
                    title: 'Đang đóng hàng',
                    name: 'LOCKING'
                },
                {
                    title: 'Đang vận chuyển',
                    name: 'SHIPPING'
                },
                {
                    title: 'Đã bị huỷ',
                    name: 'CANCEL'
                },
                {
                    title: 'Chờ xác nhận',
                    name: 'PENDING'
                },
                {
                    title: 'Trả hàng',
                    name: 'RETURN'
                }
            ]
        }
    ])
   
    const show_list_order_delete = computed(() => store.state.admin.order.show_list_order_delete)
    const orders_delete = computed(() => store.state.admin.order.orders_delete )
    const show_order_delete = (data) =>  store.commit('admin/order/SHOW_LIST_ORDER_DELETE', data)
    const tongleChecked = () => {
    const selectResultID=ref([]);
        get_list_order.value.forEach((result, index) => {
            selectResultID.value.push(result.id)
        })
        
        if(!checked.value) {
            store.commit('admin/order/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/order/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/order/CHANGE_CHECKED_ORDER')
        
    }
    const checked = computed(() => {
        return store.state.admin.order.checked;
    })
    onMounted(() => {
        if(get_list_order.value.length === 0 ) {
            fetchListOrder()
        }
        
    })
    onUnmounted(() => {

    })
</script>

<template>
    <div class="bg-[#e0f2fe] p-2 dark:bg-gray-900 transition-all duration-500">
        <div v-if="opt_order"> 
            <router-view>

            </router-view>
        </div>

        <div v-else>
            <Title_list_Option :add_opt="title_order" />
            <div @scroll="handleScrollLoadOrderDele" v-if="show_list_order_delete"  class="max-h-270 overflow-y-auto scrollbar-hide">
                <div @click="show_order_delete(false)" class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
                    <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-1 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
                    <p class="ml-1">Trở lại</p>
                </div>
                <div v-for="(order, index) in orders_delete " :key="index" class="flex justify-between items-center mt-5 dark:bg-gray-600 dark:p-2 dark:rounded-sm transition-all duration-500">
                    <div class="">
                        <p class="italic dark:text-gray-300">{{ order?.code}}</p>
                        <p class="dark:text-gray-300">{{ order?.address}}</p>
                        <p class="dark:text-gray-300">Thời giạn còn lại: <span class="italic">{{ dayjs(order?.deleted_at).fromNow() }}</span></p>
                    </div>
                    <div class="flex items-center gap-x-5 ">
                        <div @click="fetchRecoverOrderDelete(order?.id)" class="bg-green-200 flex items-center px-2 py-1 rounded-sm">
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
                                        <Button @click="fetchDeleteOrderDeleteAt(order?.id)" type="button" variant="destructive">
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
                    <p class="flex items-center italic underline underline-offset-4 dark:text-white transition-all duration-300"> Tổng nhân viên hiện có: {{ get_list_order.length }} </p>
                    <div class="flex justify-end items-center flex-1 my-4">
                        <div @click="fetchPendingAll()" class="bg-blue-400 dark:bg-blue-800 cursor-pointer hover:scale-[1.1]  hover:bg-blue-600 dark:text-gray-300 transition duration-500 rounded-sm px-4 text-[0.9rem] py-1 text-white mr-4">Xác nhận tất cả</div>
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
                        <input id="findproducts" @keyup.enter="fetchFindOrder" type="text" placeholder="Nhập mã để tìm kiếm" class="rounded-sm pl-2 py-1 border-1 border-[var(--color_border)] dark:border-gray-600 w-70 outline-none bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
                    </div>
                </div>
                <div class="grid grid-cols-18 mt-2">
                    <div v-for="(title_manage, index) in title_table_order" :key="index" 
                        :class="[title_manage.col, index == 0 ? 'border-1' : 'border-r-1 border-y-1']"
                        class="bg-gray-300 dark:bg-gray-700 transition-all duration-500 border-[var(--color_border)] dark:border-gray-600 pl-2 py-2 text-sm flex items-center text-black dark:text-white">
                        <input v-if="index == 0" @change="tongleChecked()" :checked="checked" type="checkbox" class="w-4 h-4 ml-[0.6rem] dark:accent-gray-800" />
                        <div class="flex items-center" :class="title_manage.sort ? 'cursor-pointer' : ''">
                            <p>{{ title_manage.title }}</p>
                            <p class="ml-2">{{ title_manage.sort }}</p>
                        </div>
                    </div>
                </div>
                <div @scroll="load_add_orders" class="max-h-270 overflow-y-auto custom-scrollbar">
                    <result :title_manages="title_table_order" v-for="(result, i) in get_list_order" :result="result" :key="i" :checked="checked" />
                </div>
            </div>
            
        </div>
    </div>
  
</template>

<style scoped>

</style>
