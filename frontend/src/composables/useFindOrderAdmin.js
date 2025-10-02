import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {useStore } from 'vuex'
import { order } from '@/constant'
export const optionFindOrder = () => {
    const fetchListOrder = async(start=0, end=20 ) => {
        const result = await store.dispatch('admin/order/' + order.get_list_order, { start, end })
    }
    const fetchFindOrder = async(event) => {
        find_order.value=event.target.value.trim()
        if(find_order.value ==='') {
            fetchListOrder(0, 20)
        }
        else {
            const result = await store.dispatch('admin/order/' + order.find_order, {page: 1,find: event.target.value.trim(), count: 5})
        }
        
    }
    const loadAddOrderFind = async (page, find, count) => {
        const result = await store.dispatch('admin/order/' + order.find_order, {page, find, count})
    }
    const load_add_orders= (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_order.value !== ''){
                page.value++;
                loadAddOrderFind(page.value, find_order.value,  5)
            }
            else {
                const start = list_order.value.length;
                fetchListOrder(start, start+5)
            }
            
        }
    };
    const store =useStore()
    const list_order = computed(() => store.state.admin.order.orders)
    const find_order = ref("")
    const page = ref(1);
    return { fetchListOrder, fetchFindOrder, load_add_orders, list_order }
}