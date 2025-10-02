<script setup>
    import { product } from '@/constant'
    import { formatMoney, randomString } from '@/composables'
    import { useToast } from 'vue-toastification'
    const toast = useToast()
    const store = useStore();
    const isOpen = ref(false)
    const isClosing = ref(false)
    var props = defineProps({
        provide_id: {
            type: Number,
            default: -1
        }
    })
    const openDialog = () => {
        sub_products.value={}
        show_products.value=false;
        is_selected_product.value=[];
        products.value=[];
        // products.value=[];
        fetchListProductProvide(props.provide_id, 0, 20)
        isOpen.value = true
        isClosing.value = false
    }

    const closeDialog = () => {
        isClosing.value = true
        setTimeout(() => {
            isOpen.value = false
        }, 300) 
    }

    const fetchListProductProvide = async ( provide_id, start, end) => {
        const result = await store.dispatch('admin/product/' + product.import_order, { provide_id, start, end})
    }
    const fetchFindProductProvide = async (event) => {
        find_product.value = event.target.value;
        page.value=1;
        if(find_product.value.trim()=== "") {
            fetchListProductProvide(props.provide_id, 0, 20)
        }
        else {
            const result = await store.dispatch('admin/product/' + product.find_product_import_order, {provide_id: props.provide_id, find: find_product.value, page: page.value} )
        }
        
    }
    const loadFindProductProvide = async (find, page) => {
        const result = await store.dispatch('admin/product/' + product.find_product_import_order, { find, page} )
    }
    const delete_product = async (index) => {
        store.commit('admin/product/DELETE_LIST_PRODUCT_ORDER', index)
        //handleFinalChooseProduct()
    }
    const tongleSelected = (index) => {
        if (is_selected_product.value.includes(index)) {
            is_selected_product.value = is_selected_product.value.filter(proId => proId !== index);
        } 
        else {
            is_selected_product.value.push(index);
        }
    }
    const handleScrollLoadData = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            if(find_product.value.trim() === "") {
                var length = list_product_order_import.value.length;
                fetchListProductProvide(props.provide_id, length, length+5)
            }
            else {
                page.value++;
                loadFindProductProvide(find_product.value, page.value)
            }
            
        }
    };
    const handleFinalChooseProduct = () => {
        
        var check = ref(true);
        for(let i=0; i<=is_selected_product.value.length; i++) {
            const index = is_selected_product.value[i];
            if(sub_products.value[index]){
                products.value.push(sub_products.value[index])
            }
        }
        products.value.forEach((product, index) => {
            for (const key in product.size) {
                const value = product.size[key].count;
                const regex = /^[0-9]+$/;
                if (!regex.test(value)) {
                    toast.error(`Vui lòng kiểm tra giá trị ở sản phẩm thứ ${Number(index+1)}`)
                    check.value=false;
                }
            }
        })
        store.commit('admin/product/CHANGE_LIST_PRODUCT_ORDER', products.value)
        
        if(check.value){
            show_products.value=true;
            closeDialog()
        } 
        else {
            show_products.value=false;
        }
        
    }
    const handleInputCount = async (event, index, size, product, i) => {
        if (!sub_products.value[index]) {
            sub_products.value[index] = {
                code: product.code,
                name: product.name,
                img: product.img,
                size: {},
                subtotal: 0
            }
        }
        // Gán/ghi đè size cụ thể
        sub_products.value[index].size[size] = {
            price: product.price[size],
            count: Number(event.target.value)
        }
        
        //tính tổng tiền
        sub_products.value[index].subtotal = Object.values(sub_products.value[index].size)
        .reduce((sum, s) => sum + (s.price * s.count), 0)

         // ✅ Tính totalCount (tổng số lượng)
        sub_products.value[index].totalCount = Object.values(sub_products.value[index].size)
        .reduce((sum, s) => sum + s.count, 0)
    }
    
    const is_selected_product= ref([])
    const sub_products=ref({});
    const products = ref([]);
    const show_products = ref(false)
    const input_index = ref(1);
    const list_product_order_import = computed(() => store.getters['admin/product/get_list_product_order_import'])
    const find_product = ref("");
    const index_delete_product = ref(-1);
    const list_product_order = computed(() => store.getters['admin/product/get_list_product_order'] )
    const page = ref(1);
</script>

<template>

    <div class="col-span-12 bg-white dark:bg-gray-800 transition-all duration-500 px-5">
        <div class="-mt-1">
            <div>
                <div @click="openDialog" class="pb-5">
                   <slot></slot>
                </div>

                <div
                    v-if="isOpen"
                    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 "
                    @click.self="closeDialog"
                >
                    <div :class="[
                            'bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-4xl w-full h-160  p-6 transform transition-all duration-300',
                            isClosing ? 'opacity-0 scale-90' : 'animate-show'
                        ]">
                        <p class="pb-2 text-gray-900 dark:text-gray-200">
                            Tìm kiếm sản phẩm
                        </p>
                        <div class="relative">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']"  class="absolute top-3 left-3 text-gray-600 dark:text-gray-300" />
                            <input v-model="find_product" @keyup.enter="fetchFindProductProvide($event)" type="text" placeholder="Nhập tên sản phẩm" class="w-full pl-10 border border-[var(--color_border)] dark:border-gray-600 rounded-sm p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" >
                        </div>
                        <div class="grid grid-cols-12 mt-5 bg-gray-100 dark:bg-gray-900 px-2 py-3 text-gray-900 dark:text-gray-200">
                            <div class="col-span-2">Mã sản phẩm</div>
                            <div class="col-span-4">Tên sản phẩm</div>
                            <div class="col-span-2 text-right">Số lượng đặt</div>
                            <div class="col-span-2 text-right">Đơn giá</div>
                            <div class="col-span-2 text-right">Thành tiền</div>
                        </div>

                        <div @scroll="handleScrollLoadData" class="overflow-y-auto custom-scrollbar h-140 pb-40 text-sm bg-white dark:bg-gray-900">
                            <div v-for="(product, index) in list_product_order_import " :key="index" class="grid grid-cols-12 px-2 mt-2 mb-5 pb-5 border-b border-[var(--color_border)] dark:border-gray-700">
                                <div class="col-span-2 mt-2 text-gray-900 dark:text-gray-300">{{ product?.code }}</div>
                                <div class="col-span-4">
                                    <div class="gap-2">
                                        <label class="inline-flex items-center cursor-pointer group">
                                            <input type="checkbox" @change="tongleSelected(index)" class="peer hidden" />
                                            <span class="w-5 h-5 rounded border-2 border-gray-400 dark:border-gray-600 dark:peer-checked:bg-[var(--dark_maincolor)]  peer-checked:bg-[var(--maincolor)] dark:peer-checked:border-[var(--dark_maincolor)] peer-checked:border-[var(--maincolor)] transition duration-300 dark:group-hover:border-[var(--dark_maincolor)] group-hover:border-[var(--maincolor)] group-hover:scale-110"></span>
                                            <img :src="product?.img" class="ml-2 w-10 h-10" alt="" />
                                            <span class="ml-2 text-gray-700 dark:text-gray-300 group-hover:text-[var(--maincolor)] transition" >{{ product?.name }}</span>
                                        </label>
                                        <p class="text-gray-700 dark:text-gray-400 mt-3">{{ product?.name }} / S</p>
                                        <p class="text-gray-700 dark:text-gray-400 mt-3">{{ product?.name }} / M</p>
                                        <p class="text-gray-700 dark:text-gray-400 mt-3">{{ product?.name }} / L</p>
                                    </div>
                                </div>
                                <div class="col-span-2 text-right">
                                    <input type="text" @blur="handleInputCount($event, index, 'S', product, input_index++)" placeholder="10 cân" class="border border-[var(--color_border)] dark:border-gray-700 w-full mt-9 mb-2 py-1 pl-2 rounded-ssm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"/>
                                    <input type="text" @blur="handleInputCount($event, index, 'M', product, input_index++)" placeholder="10 cân" class="border border-[var(--color_border)] dark:border-gray-700 w-full mb-2 py-1 pl-2 rounded-ssm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"  />
                                    <input type="text" @blur="handleInputCount($event, index, 'L', product, input_index++)" placeholder="10 cân" class="border border-[var(--color_border)] dark:border-gray-700 w-full py-1 pl-2 rounded-ssm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" />
                                </div>
                                <div class="col-span-2 text-right text-gray-900 dark:text-gray-300">
                                    <p class="mt-10">{{ formatMoney(product?.price['S']) }}</p>
                                    <p class="mt-5">{{ formatMoney(product?.price['M']) }}</p>
                                    <p class="mt-5">{{ formatMoney(product?.price['L']) }}</p>
                                </div>
                                <div class="col-span-2 text-right text-gray-900 dark:text-gray-300">
                                    <p class="mt-10">{{ formatMoney(sub_products[index]?.size['S']?.count * product?.price['S'] ) }}</p>
                                    <p class="mt-5">{{ formatMoney(sub_products[index]?.size['M']?.count * product?.price['M'] ) }}</p>
                                    <p class="mt-5">{{ formatMoney(sub_products[index]?.size['L']?.count * product?.price['L'] ) }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="fixed flex justify-between bottom-0 left-0 right-0 bg-white dark:bg-gray-800 px-5 py-4 border-t border-gray-200 dark:border-gray-700">
                            
                            <p class="text-gray-900 dark:text-gray-300">0 sản phẩm được chọn</p>
                            <button  @click="handleFinalChooseProduct()"  class="bg-[var(--maincolor)] dark:bg-[var(--dark_maincolor)] hover:bg-[var(--hoverred)] text-white px-5 py-2 rounded-sm cursor-pointer transition-all duration-300" >
                                Hoàn tất chọn
                            </button>
                        </div>

                        <button @click="closeDialog" class="absolute top-2 right-2 text-gray-500 p-1 px-3 hover:text-red-500 hover:scale-[1.3] transition-all duration-300 text-3xl" >
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5 bg-gray-100 h-30 flex items-center justify-center hidden">
            <label class="block" for="">Nhập danh sách file</label>

        </div>
        <div v-show="show_products">
             <div class="grid grid-cols-12 mt-5 bg-gray-100 dark:bg-gray-900 px-2 py-3">
                <div class="col-span-2 text-gray-900 dark:text-gray-200">Mã sản phẩm</div>
                <div class="col-span-3 text-gray-900 dark:text-gray-200">Tên sản phẩm</div>
                <div class="col-span-2 text-right text-gray-900 dark:text-gray-200">Số lượng đặt</div>
                <div class="col-span-2 text-right text-gray-900 dark:text-gray-200">Đơn giá</div>
                <div class="col-span-2 text-right text-gray-900 dark:text-gray-200">Thành tiền</div>
            </div>
            <div class=" overflow-y-auto custom-scrollbar h-100 text-sm">
                <div v-for="(product, index) in list_product_order" :key="index" class="grid grid-cols-12 px-2 items-center mt-2 mb-5 pb-5 border-b-1 border-[var(--color_border)]">
                 
                    <div class="col-span-2 mt-2 text-gray-900 dark:text-gray-200">{{ product?.code }}</div>
                    <div class="col-span-3">
                        <label class="inline-flex items-center cursor-pointer group">
                            <img :src="product?.img" class="ml-2 w-10 h-10" alt="">
                            <span class="ml-2 text-gray-700 dark:text-gray-300 group-hover:text-[var(--maincolor)] transition">{{ product.name }}</span>
                        </label>
                        <p v-show="product?.size['S']?.count" class="text-gray-700 dark:text-gray-300 mt-3">{{ product.name }} / S</p>
                        <p v-show="product?.size['M']?.count" class="text-gray-700 dark:text-gray-300 mt-3">{{ product.name }} / M</p>
                        <p v-show="product?.size['L']?.count" class="text-gray-700 dark:text-gray-300 mt-3">{{ product.name }} / L</p>
                    </div>
                    <div class="col-span-2 text-right ">
                        <input v-show="product?.size['S']?.count" type="text" disabled :value="product?.size['S']?.count"
                            class="border border-[var(--color_border)] dark:border-gray-600 w-full mt-12 mb-2 py-1 pl-2 rounded-ssm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" />
                        <input v-show="product?.size['M']?.count" type="text" disabled :value="product?.size['M']?.count"
                            class="border border-[var(--color_border)] dark:border-gray-600 w-full mb-2 py-1 pl-2 rounded-ssm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" />
                        <input v-show="product?.size['L']?.count" type="text" disabled :value="product?.size['L']?.count"
                            class="border border-[var(--color_border)] dark:border-gray-600 w-full py-1 pl-2 rounded-ssm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" />
                    </div>
                    <div class="col-span-2 text-right text-gray-900 dark:text-gray-200">
                        <p v-show="product?.size['S']?.count" class="mt-10">{{ formatMoney(product?.size['S']?.price) }}</p>
                        <p v-show="product?.size['M']?.count" class="mt-5">{{ formatMoney(product?.size['M']?.price) }}</p>
                        <p v-show="product?.size['L']?.count" class="mt-5">{{ formatMoney(product?.size['L']?.price) }}</p>
                    </div>
                    <div class="col-span-2 text-right text-gray-900 dark:text-gray-200">
                        <p v-show="product?.size['S']?.count" class="mt-10">{{ formatMoney(product?.size['S']?.price * product?.size['S']?.count) }}</p>
                        <p v-show="product?.size['M']?.count" class="mt-5">{{ formatMoney(product?.size['M']?.price * product?.size['M']?.count) }}</p>
                        <p v-show="product?.size['L']?.count" class="mt-5">{{ formatMoney(product?.size['L']?.price * product?.size['L']?.count) }}</p>
                    </div>
                    <div class="col-span-1 flex items-center justify-end">
                        <Dialog>
                            <DialogTrigger>
                            <div
                                class="flex justify-end items-center p-4 rounded-sm cursor-pointer transition-all duration-200 hover:scale-[1.3] 
                                    bg-white dark:bg-gray-800"
                            >
                                <font-awesome-icon :icon="['fas', 'xmark']" class="text-gray-900 dark:text-gray-200" />
                            </div>
                            </DialogTrigger>
                            <DialogContent class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-md p-4">
                            <DialogHeader>
                                <div> Bạn có chắc chắn muốn xóa sản phẩm này không? </div>
                            </DialogHeader>

                            <DialogFooter class="mt-4">
                                <DialogClose as-child>
                                <button @click="delete_product(index)"
                                    class="bg-red-200 dark:bg-red-700 px-8 border border-red-900 dark:border-red-400 py-2 rounded-sm cursor-pointer font-bold
                                        text-red-900 dark:text-red-200 hover:bg-red-300 dark:hover:bg-red-600 transition"
                                >
                                    Xoá
                                </button>
                                </DialogClose>
                            </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            
        </div> 
       
        
    </div>

</template> 

<style scoped>
.delete_product {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: detele-product 3000 ease-in 1;
    
}
@keyframes detele-product {
    
}
</style>   