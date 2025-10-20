<script setup>
import result from '@/views/admin/CompShareAdmin/result.vue'
import { employee, user, order, product, voucher, provide, comment } from '@/constant'
const store = useStore();

const tongleChecked = () => {
    const selectResultID=ref([]);
    props.results.forEach((result, index) => {
        selectResultID.value.push(result.id)
    })
    if(get_type.value=='employee'){
        if(!checked.value) {
            store.commit('admin/employee/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/employee/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/employee/CHANGE_CHECKED_EMPLOYEE')
    }
    else if(get_type.value=='user') {
        if(!checked.value) {
            store.commit('admin/user/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/user/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/user/CHANGE_CHECKED_USER')
    }
    else if (get_type.value=='order') {
        if(!checked.value) {
            store.commit('admin/order/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/order/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/order/CHANGE_CHECKED_ORDER')
    }
    else if (get_type.value == 'product'){
        if(!checked.value) {
            store.commit('admin/product/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/product/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/product/CHANGE_CHECKED_PRODUCT')
    }
    else if (get_type.value == 'voucher'){
        if(!checked.value) {
            store.commit('admin/voucher/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/voucher/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/voucher/CHANGE_CHECKED_VOUCHER')
    }
    else if (get_type.value == 'provide'){
        if(!checked.value) {
            store.commit('admin/provide/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/provide/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/provide/CHANGE_CHECKED_PROVIDE')
    }
    else if (get_type.value == 'comment'){
        if(!checked.value) {
            store.commit('admin/comment/TOGGLE_SELECTED', selectResultID.value);
        }
        else {
            store.commit('admin/comment/TOGGLE_SELECTED', []);
        }
        
        store.commit('admin/comment/CHANGE_CHECKED_COMMENT')
    }
}
const fecthListEmployee = async(start=0, end=20 ) => {
    const result = await store.dispatch('admin/employee/' + employee.get_list_employee, {start, end })
}
const fetchListUser = async(start=0, end =20) => {
    const result = await store.dispatch('admin/user/' + user.get_list_user, {start, end })
}
const fetchListOrder = async (start=0, end = 20) => {
    const result = await store.dispatch('admin/order/' + order.get_list_order, {start, end})
}
const fetchListProduct = async (start=0, end = 20) => {
    const result = await store.dispatch('admin/product/' + product.get_list_product, {start, end})
}
const fetchListVoucher = async (start =0 , end = 20) => {
    const result = await store.dispatch('admin/voucher/' + voucher.get_list_voucher, {start, end})
}
const fetchListProvide = async (start=0, end=20)  => {
    const result = await store.dispatch('admin/provide/' + provide.get_list_provide, {start, end})
}
const fetchListComment = async (start=0, end=20)  => {
    const result = await store.dispatch('admin/comment/' + comment.get_list_comment, {start, end})
}

const handleScrollLoadData = (event) => {
    const el = event.target;
    if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
        //CALL ĐỂ THÊM DỮ LIỆU
        const start=props.results.length;
        if(get_type.value=='employee'){
            fecthListEmployee(start, start+5)
        }
        else if(get_type.value=='user'){
            fetchListUser(start, start+5)
        }
        else if(get_type.value=='order') {

            fetchListOrder(start, start+5)

        }
        else if(get_type.value == 'product'){
            fetchListProduct(start, start+5)
        }
        else if(get_type.value == 'voucher'){
            fetchListVoucher(start, start+5)
        }
        else if(get_type.value == 'provide'){
            fetchListProvide(start, start+5)
        }
        else if(get_type.value == 'comment'){
            fetchListComment(start, start+5)
        }
        //console.log(props.results.length)
        //console.log('load thêm data', props.results[0].type)
    }
};

const checked = computed(() => {
    if (get_type.value == 'employee') {
        return store.state.admin.employee.checked
    }
    else if(get_type.value== 'user') {
        return store.state.admin.user.checked
    }  
    else if(get_type.value == 'order') {
        return store.state.admin.order.checked;
    } 
    else if(get_type.value == 'product') {
        return store.state.admin.product.checked;
    } 
    else  if(get_type.value == 'voucher'){
        return store.state.admin.voucher.checked;
    }
    else  if(get_type.value == 'provide'){
        return store.state.admin.provide.checked;
    }
    else  if(get_type.value == 'comment'){
        return store.state.admin.comment.checked;
    }
    return false
})

var props=defineProps({
    title_manages: {
        type: Array,
        default: []
    },
    results: {
        type: Array,
        default: []
    },
    find_code: {
        type: String,
        default: ''
    }
})
const get_type = computed(() => props.results[0]?.type)

</script>

<template>
    <div class="grid grid-cols-18 mt-2">
        <div v-for="(title_manage, index) in title_manages" :key="index" 
            :class="[title_manage.col, index == 0 ? 'border-1' : 'border-r-1 border-y-1']"
            class="bg-gray-300 dark:bg-gray-700 transition-all duration-500 border-[var(--color_border)] dark:border-gray-600 pl-2 py-2 text-sm flex items-center text-black dark:text-white">
            <input v-if="index == 0" @change="tongleChecked()" :checked="checked" type="checkbox" class="w-4 h-4 ml-[0.6rem] dark:accent-gray-800" />
            <div class="flex items-center" :class="title_manage.sort ? 'cursor-pointer' : ''">
                <p>{{ title_manage.title }}</p>
                <p class="ml-2">{{ title_manage.sort }}</p>
            </div>
        </div>
    </div>
    <div @scroll="handleScrollLoadData" class="max-h-270 overflow-y-auto custom-scrollbar">
        <result :title_manages="title_manages" v-for="(result, i) in results" :result="result" :key="i" :checked="checked" />
    </div>
</template>

<style scoped>

</style>
