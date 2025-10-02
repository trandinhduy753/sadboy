<script setup lang="ts">
    import comments from '@/views/client/product/detail/comments.vue'
    import Carol_product from '@/views/client/product/detail/Carol.vue';
    import { productClient, cartClient } from '@/constant'
    import { formatMoney, randomString } from '@/composables'
    import { useToast } from 'vue-toastification'
    const route = useRoute();
    const store = useStore();
    const toast = useToast()
    const router = useRouter()
    const fetchDetailProduct = async (slug) => {
        const result = await store.dispatch('client/product/' + productClient.get_detail_product, slug )
    }
    const add_comment_to_list = async (slug, page) => {
        const result = await store.dispatch('client/product/' + productClient.add_comment_to_list, {slug, page} )
    } 
    const addProductToCart = async () => {
        const user_id = computed(() => user.value?.id);
        const data=computed(() => {
            return {
                code: randomString(10),
                product_id: detail_product.value?.id,
                price: detail_product.value?.sale_price?.[size.value] ? detail_product.value?.sale_price?.[size.value] : detail_product.value?.original_price?.[size.value],
                count: number_pro.value,
                size: size.value,
                user_id: user.value?.id
            }
            
        })
        const result = await store.dispatch('client/cart/' + cartClient.add_product_to_cart, {user_id: user_id.value, data: data.value} )
        toast.success('Đã thêm sản phẩm vào giỏ hàng thành công')
    }
    const handleScrollLoadData = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            //CALL ĐỂ THÊM DỮ LIỆU
            page.value++;
            add_comment_to_list(slug.value, page.value)
        }
    };
    const buyProductNow = async () => {
        const data=computed(() => {
            return  {
                id: detail_product.value?.id,
                code: detail_product.value?.code,
                product: {
                    name: detail_product.value?.name,
                    img: detail_product?.value?.imgs[0]
                },
                price: detail_product.value?.sale_price?.[size.value] ?? detail_product.value?.sale_price?.[size.value],
                size: size.value,
                count: number_pro.value

            }
            
        })
        store.commit('client/cart/ADD_PRODUCT_CART_CHECKED', data.value)
        router.push({ name: 'bill_comfirm'})
        console.log(data.value)
    }
    const number_pro=ref(1);
    const size=ref('S');

    
    const slug = computed(() => route.params.slug)
    const detail_product = computed(() => store.getters['client/product/get_detail_product'][slug.value])
    const user = computed(() => store.state.client.account.user )
    const page = ref(1);
    onMounted(() => {
        if (!detail_product.value || Object.keys(detail_product.value).length === 0) {
            fetchDetailProduct(slug.value)
            
        }
        
    })
</script>
<template>
    <div class="dark:bg-gray-900 transition duration-500 ">
        <div class="grid grid-cols-12 -mt-5 max-w-7xl m-auto px-5 pt-5 gap-10">
            <div class="col-span-6 mt-5">
                <Carol_product :imgs="detail_product?.imgs" />
            </div>
            <div class="col-span-6 mt-5 dark:text-gray-300">
                <p class="font-bold text-3xl">{{ detail_product?.name }}</p>
                <div class="mt-1">
                    {{ detail_product?.sort_description }}
                </div>
                <div class="flex items-center mt-2">
                    <span class="text-red-500 underline">{{ detail_product?.star }}</span>
                    <div class="ml-3 flex items-center">
                        <font-awesome-icon v-for="i in 5" class="text-yellow-300 mr-1 cursor-pointer" :key="i" :icon="['fas', 'star']" />
                    </div>
                </div>
                <div class="flex items-center bg-gray-300 px-2 py-3 mt-4 dark:bg-gray-700 font-noto">
                    <p class="old_price text-gray-600 dark:text-gray-400 " :class="detail_product?.sale_price ? 'line-through' : 'text-lg text-red-500'">{{ formatMoney(detail_product?.original_price?.[size]) }}</p>
                    <p class="new_price text-xl font-bold text-red-500 ml-4">{{ formatMoney(detail_product?.sale_price?.[size]) }}</p>
                </div>
                <div class="flex items-center mt-5">
                    <p class="w-25">Size:</p>
                    <select v-model="size" class="w-30 border cursor-pointer dark:bg-gray-700 dark:text-gray-200 p-1">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </div>
                <div class="flex items-center mt-5">
                    <p class="w-25">Số lượng:</p>
                    <div class="flex items-center border dark:border-gray-600">
                        <font-awesome-icon :icon="['fas', 'plus']" @click="number_pro++" class="bg-gray-300 p-2.5 hover:bg-red-400 dark:bg-gray-700 dark:text-gray-300 transition" />
                        <span class="mx-4">{{ number_pro }}</span>
                        <font-awesome-icon :icon="['fas', 'minus']" @click="number_pro > 1 ? number_pro-- : 0" class="bg-gray-300 p-2.5 hover:bg-red-400 dark:bg-gray-700 dark:text-gray-300 transition" />
                    </div>
                </div>
                <div class="flex items-center mt-15">
                    <div @click="addProductToCart()" class="py-3 px-5 flex items-center gap-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition dark:bg-red-700">
                        <font-awesome-icon  :icon="['fas', 'cart-plus']" /> Thêm vào giỏ hàng
                    </div>
                    <div @click="buyProductNow" class="py-3 w-50 text-center ml-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition dark:bg-blue-700">
                        Mua ngay
                    </div>
                </div>
            </div>
            <div class="col-span-12 dark:text-gray-300" v-html="detail_product?.long_description">
                
            </div>
            <div class="col-span-12 mt-5">
                <div class="text-3xl pb-5 border-b dark:border-gray-600 dark:text-white font-Luckiest_Guy">Đánh giá sản phẩm</div>
                <div @scroll="handleScrollLoadData" class="max-h-270 overflow-y-auto scrollbar-hide">
                    <template  v-for="(comment, index) in detail_product?.comments" :key="index">
                        <comments :comment="comment" />
                    </template>
                </div>
                
                
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
