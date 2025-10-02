import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { productClient } from '@/constant'
export const optionFindProductClient = () => {
    const fetchGetListProductBySearch = async (search, count) => {
        const result = store.dispatch('client/product/' + productClient.get_list_product_by_search, {search, count})
    }
    const load_add_product = async (search, start, count) => {
        const result = store.dispatch('client/product/' + productClient.add_product_search_to_list, {search, start, count})
    }
    const handleScrollLoadData = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            const start=products_search.value.length;
            load_add_product(search.value, end_find_product.value, 5)
        }
    };

    const store = useStore()
    const products_search = computed(() => store.getters['client/product/get_products_search'] )
    const start_find_product = computed(() => store.state.client.product.start_find )
    const end_find_product = computed(() => store.state.client.product.end_find )

    return {
        fetchGetListProductBySearch,
        handleScrollLoadData
    }
}