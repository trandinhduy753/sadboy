<script setup>
import { Button } from '@/components/ui/button'
import { useToast } from 'vue-toastification';
import { voucher, employee, user, order, comment, provide, product } from '@/constant'
import { formatMoney } from '@/composables'

const store = useStore();
const toast = useToast()
const toggleSelected = (id) => {
    if(get_type.value=='employee') store.commit('admin/employee/TOGGLE_SELECTED', id)
    else if (get_type.value=='user') store.commit('admin/user/TOGGLE_SELECTED', id)
    else if (get_type.value=='order') store.commit('admin/order/TOGGLE_SELECTED', id)
    else if (get_type.value=='product') store.commit('admin/product/TOGGLE_SELECTED', id)
    else if (get_type.value=='voucher') store.commit('admin/voucher/TOGGLE_SELECTED', id)
    else if (get_type.value=='provide') store.commit('admin/provide/TOGGLE_SELECTED', id)
    else if (get_type.value=='comment') store.commit('admin/comment/TOGGLE_SELECTED', id)

}
const fetchDeleteEmployee = async (id) => {
    const result = await store.dispatch('admin/employee/' + employee.delete_employee, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchDeleteUser = async (id) => {
    const result = await store.dispatch('admin/user/' + user.delete_user, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchDeleteOrder = async (id) => {
    const result = await store.dispatch('admin/order/' + order.delete_order, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchDeleteProduct = async (id) => {
    const result = await store.dispatch('admin/product/' + product.delete_product, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchDeleteVoucher = async (id) => {
    const result = await store.dispatch('admin/voucher/' + voucher.delete_voucher, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchDeleteProvide = async (id) => {
    const result = await store.dispatch('admin/provide/' + provide.delete_provide, id)
}
const fetchDeleteComment = async (id) => {
    const result = await store.dispatch('admin/comment/' + comment.delete_comment, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}

const fetchDeleteResult = async () => {
    const id = props.result.id;
    if(get_type.value== 'employee'){
        fetchDeleteEmployee(id)
    }
    else if (get_type.value=='user') {
        fetchDeleteUser(id)
    }
    else if (get_type.value == 'order') {
        fetchDeleteOrder(id)
    }
    else if (get_type.value == 'product') {
        fetchDeleteProduct(id)
    }
    else if (get_type.value == 'voucher') {
        fetchDeleteVoucher(id)
    }
    else if (get_type.value == 'provide') {
        fetchDeleteProvide(id)
    }
    else if (get_type.value == 'comment') {
        fetchDeleteComment(id)
    }
}
var props = defineProps({
    result: {
        type: Object,
        default: {}
    },
    checked: {
        type: Boolean,
        default: false
    },
    title_manages: {
        type: Array,
        default: () => []
    },
})
const get_type=computed(() => props.result?.type);
const isSelected = computed(() => {
    if(get_type.value=='employee') return store.state.admin.employee.selected_employee_ids.includes(props.result.id)
    else if (get_type.value=='user') return store.state.admin.user.selected_user_ids.includes(props.result.id)
    else if (get_type.value=='order') return store.state.admin.order.selected_order_ids.includes(props.result.id)
    else if (get_type.value=='product') return store.state.admin.product.selected_product_ids.includes(props.result.id)
    else if (get_type.value=='voucher') return store.state.admin.voucher.selected_voucher_ids.includes(props.result.id)
    else if (get_type.value=='provide') return store.state.admin.provide.selected_provide_ids.includes(props.result.id)
    else if (get_type.value=='comment') return store.state.admin.comment.selected_comment_ids.includes(props.result.id)
})
const getRouteDetailResult = computed(() => {
  if (get_type.value == 'employee') return 'admin_sadboizz.employee.detail'
  else if (get_type.value == 'user') return 'admin_sadboizz.customer.detail'
  else if (get_type.value == 'order') return 'admin_sadboizz.order.detail'
  else if (get_type.value == 'product') return 'admin_sadboizz.product.detail'
  else if (get_type.value == 'comment') return 'admin_sadboizz.comment.detail'
  else if (get_type.value == 'voucher') return 'admin_sadboizz.voucher.detail'
  else if (get_type.value == 'provide') return 'admin_sadboizz.provide.detail'
  return ''
})

const detailRoute = computed(() => ({
  name: getRouteDetailResult.value,
  query: { showopt: 'shop_ad_t', index: props.result.id }
}))

const order_status = computed (() => store.state.admin.order.order_status)
const voucher_status= computed(() => store.state.admin.voucher.voucher_status)
</script>

<template>
    <div class="grid grid-cols-18 bg-white transition-all duration-500 dark:bg-gray-800 border-b-1 border-[var(--color_border)] dark:border-gray-700 text-sm text-black dark:text-white">
        <div class="col-span-1 flex items-center pl-5 border-x-1 border-[var(--color_border)] dark:border-gray-700">
            <input type="checkbox" @change="toggleSelected(result.id)" :checked="isSelected" class="w-4 h-4 cursor-pointer dark:accent-gray-600">
        </div>
        <div :class="title_manages[1].col" class="px-2 flex items-center">
            <p>{{ result.code }}</p>
        </div>
        <div :class="title_manages[2].col" class="px-2 capitalize border-x-1 border-[var(--color_border)] dark:border-gray-700 flex items-center">
            <p>{{ result.item1 }}</p>
        </div>
        <div :class="title_manages[3].col" class="px-2 flex items-center">
            <p v-if="result.type=== 'order' || result.type === 'provide' || result.type === 'comment'" class="py-5">{{ result.item2 }}</p>
            <div v-else class="p-2">
                <img :src="result.item2" class="dark:brightness-90 h-15 w-15" alt="">
            </div>
            
        </div>
        <div :class="title_manages[4].col" class="px-2 italic border-x-1 border-[var(--color_border)] dark:border-gray-700 flex items-center flex-wrap">
            <p v-if="result.type == 'product'">{{ formatMoney(result?.item3?.['S']) }}</p>
            <p v-else-if="result.type == 'order'">{{ formatMoney(result?.item3) }}</p>
            <p v-else>{{ result?.item3 }}</p>
        </div>
        <div :class="title_manages[5].col" class="px-2 capitalize flex items-center">
            <div v-if="result?.type=='order'" :class="order_status[result?.item4]?.bg" class="px-4 py-1 rounded-ssm text-[0.8rem]">
                {{ order_status[result?.item4]?.title }}
            </div>
            <div v-else-if="result?.type=='voucher'" :class="voucher_status[result?.item4]?.bg" class="px-4 py-1 rounded-ssm text-[0.8rem]">
                {{ voucher_status[result?.item4]?.title }}
            </div>
            <p v-else class="dark:text-white  italic  rounded-sm py-1">
                {{ result?.item4 }}
            </p>
            
        </div>
        <div :class="title_manages[6].col" class="px-2 border-x-1 border-[var(--color_border)] dark:border-gray-700 flex items-center flex-wrap">
            <div class="flex items-center justify-start flex-wrap">
                <div class="mt-[0.36rem]">
                    <Dialog>
                        <DialogTrigger>
                            <font-awesome-icon  :icon="['fas', 'trash']" class="text-red-500 dark:text-red-300 bg-red-300 dark:bg-red-600 p-1.5 border-1 border-red-500 dark:border-red-400 rounded-sm mr-2 cursor-pointer hover:scale-[1.1] hover:bg-red-400 dark:hover:bg-red-700 duration-300 transition-all" />
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
                                    <Button @click="fetchDeleteResult()" type="button" variant="destructive">
                                        Xác nhận
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <router-link :to="detailRoute" custom v-slot="{ navigate }">
                    <div @click="navigate" class="flex items-center justify-start bg-blue-200 dark:bg-blue-600 px-1 py-1 border-1 border-blue-900 dark:border-blue-400 cursor-pointer rounded-sm hover:scale-[1.1] hover:bg-blue-400 dark:hover:bg-blue-700 duration-500 transition-all">
                        <font-awesome-icon :icon="['fas', 'info']" class="text-blue-900 dark:text-blue-300 px-1.5 py-0.5 rounded-full bg-blue-400 dark:bg-blue-800"/>
                        <span class="ml-1 text-[0.8rem]">Xem chi tiết</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>   

</template>

<style lang="less">

</style>
