import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {useStore } from 'vuex'
import { user } from '@/constant'
import { useToast } from 'vue-toastification'
const toast = useToast();
export const optionFindUser = () => {
    const fetchListUser = async (start=0, end=20) => {
        const result = await store.dispatch('admin/user/'+ user.get_list_user, { start: start, end: end })
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchFindUser = async (event) => {
        find_user.value = event.target.value.trim();
        if(find_user.value==='') {
            fetchListUser(0, 20)
        }
        else {
            const result = await store.dispatch('admin/user/' + user.find_user, {page: 1, name: find_user.value, count: 5})
            if(result.ok === 'error' ){
                toast.error(result.message)
            }
        }
       
    }
    const loadAddUserFind = async (page, name, count) => {
        const result = await store.dispatch('admin/user/' + user.find_user, {page, name, count})
    }
    const load_add_users= (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_user.value !== ''){
                page.value++;
                loadAddUserFind(page.value, find_user.value, end_find_user.value, 5)
            }
            else {
                const start = list_user.value.length;
                fetchListUser(start, start+5)
            }
            
        }
    };
    const store = useStore();
    const find_user = ref("");
    const list_user = computed(() => store.getters['admin/user/get_list_user_by_sort'])
    const start_find_user = computed(() => store.state.admin.user.start_find )
    const end_find_user = computed(() => store.state.admin.user.end_find )
    const page = ref(1);
    return {
        fetchListUser,
        fetchFindUser,
        load_add_users
    }
}