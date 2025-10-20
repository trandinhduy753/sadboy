import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {useStore } from 'vuex'
import { provide } from '@/constant'
import { useToast } from 'vue-toastification'
const toast = useToast();
export const optionFindProvide = () => {

    const fetchListProvide = async (start=0, end=20) => {
        const result = await store.dispatch('admin/provide/' + provide.get_list_provide, { start: start, end: end })
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchFindProvide = async (event) => {
        find_provide.value = event.target.value.trim()
        if(find_provide.value==='') {
            fetchListProvide(0, 20)
        }
        else {
            const result = await store.dispatch('admin/provide/' + provide.find_provide, {page: 1,name: find_provide.value, count: 5})
            if(result.ok === 'error' ){
                toast.error(result.message)
            }
        }
        
    }
    const loadAddProvideFind = async (page, name, count) => {
        const result = await store.dispatch('admin/provide/' + provide.find_provide, {page, name, count})
    }
    const load_add_provides= (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_provide.value !== ''){
                page.value++;
                loadAddProvideFind(page.value, find_provide.value, 5)
            }
            else {
                const start = list_provide.value.length;
                fetchListProvide(start, start+5)
            }
            
        }
    };
    const store = useStore()
    const find_provide = ref("")
    const list_provide = computed(() => store.getters['admin/provide/get_list_provide_by_sort'] );
    const page = ref(1)
    return {
        fetchListProvide,
        fetchFindProvide,
        load_add_provides
    }
}