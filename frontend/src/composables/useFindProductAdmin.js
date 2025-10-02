import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {useStore } from 'vuex'
import { product } from '@/constant'
export const optionFindProduct = () => {
    const load_add_products = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_product.value !== '') {
                page.value++;
                loadAddProductFind(page.value, find_product.value, 5)
            }
            else {
                const start=products.value.length;
                get_list_product(start, start+5)
            }
            
        }
    }
    const find_product_by_name = async (event) => {
        find_product.value = event.target.value.trim()
        if(find_product.value === ''){
            get_list_product(0, 20)
        }
        else {
            const result = await store.dispatch('admin/product/' + product.find_product_by_name, {page: 1, name: find_product.value, count: 5})
        }
        
    }
    const loadAddProductFind = async (page, name, count) => {
        const result = await store.dispatch('admin/product/' + product.find_product_by_name , {page, name, count})
    }
    const get_list_product = async (start, end) => {
        const result= await store.dispatch('admin/product/' + product.get_list_product, { start, end})
    }
    const store = useStore()
    const products = computed(() => store.state.admin.product.products);
   
    const find_product = ref("")
    const page = ref(1)
    return { get_list_product, find_product_by_name, load_add_products, products }
}