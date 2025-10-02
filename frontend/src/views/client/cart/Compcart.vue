<script setup lang="ts">
   import Cart from '@/views/client/cart/cart.vue';
   import { cartClient } from '@/constant'
   import { useToast } from 'vue-toastification'
   const toast = useToast()
   const store=useStore();
   const route = useRoute();
   const fetchListCart = async (user_id, page, count) => {
      const results = await store.dispatch('client/cart/' + cartClient.get_list_cart, {user_id, page, count });
   }
   const handleScrollLoadData = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (Math.abs(scrollTop + clientHeight - scrollHeight) < 1) {
         page.value++;
         fetchListCart(user.value?.id, page.value, 20);
      }
   };
   const handlePurchase = async (navigate) => {
      if(is_checked_carts.value.length != 0){
         carts_checked()
         navigate()
      }
      else {
         toast.info('Vui lòng chọn sản phẩm để đặt hàng')
      }
   }
   const user = computed(() => store.state.client.account.user )
   const carts= computed(() => store.getters['client/cart/get_carts'] )
   const is_checked_carts = computed(() => store.state.client.cart.selected_cart_index )
   const isCallApi = computed(() => store.state.client.cart.isCallApiCart )
   const page = ref(1)
   const carts_checked = () => store.commit('client/cart/GET_CART_CHECKED') 
   
   onMounted(() => {
      if(isCallApi.value=== true) {
         fetchListCart(user.value?.id, page.value, 20)
      }
      window.addEventListener("scroll", handleScrollLoadData);
   })
   onUnmounted(() => {
      store.commit('client/cart/CHANGE_IS_CALL_API', false)
      window.removeEventListener("scroll", handleScrollLoadData);
   });
</script>

<template>
   <div>
      <div class="  dark:text-gray-200 transition-all duration-500 pt-5">
         <div class="max-w-7xl m-auto px-5 overflow-y-auto scrollbar-hide">
            <div class="grid grid-cols-12 border-b-3 pb-4 border-[var(--maincolor)]">
                  <div class="col-span-4 bg-gray-200 pl-2 py-1.5 text-base rounded-sm font-[--font-winky] dark:bg-gray-800 dark:text-gray-200">
                     Sản phẩm
                  </div>
                  <div class="col-span-8 flex justify-between ">
                     <div class="ml-3 bg-gray-200 transition-all duration-300 flex items-center justify-center rounded-sm flex-1 font-[--font-winky] dark:bg-gray-800 dark:text-gray-200">Đơn giá</div>
                     <div class="ml-3 bg-gray-200 transition-all duration-500 flex items-center justify-center rounded-sm flex-1 font-[--font-winky] dark:bg-gray-800 dark:text-gray-200">Số lượng</div>
                     <div class="ml-3 bg-gray-200 transition-all duration-500 flex items-center justify-center rounded-sm flex-1 font-[--font-winky] dark:bg-gray-800 dark:text-gray-200">Số tiền</div>
                     <div class="ml-3 bg-gray-200 transition-all duration-500 flex items-center justify-center rounded-sm flex-1 font-[--font-winky] dark:bg-gray-800 dark:text-gray-200">Kích thước</div>
                     <div class="ml-3 bg-gray-200 transition-all duration-500 flex items-center justify-center rounded-sm flex-1 font-[--font-winky] dark:bg-gray-800 dark:text-gray-200">Thao tác</div>
                  </div>
            </div>
            <div class="grid grid-cols-1">
                  <template  v-for="(cart, index) in carts" :key="index">
                     <Cart :cart="cart" :index="index"/>
                  </template>
                  
            </div>
         </div>
      </div>
      <div class="fixed bottom-0 z-40 dark:bg-gray-700   right-0 left-0 shadow-[1rem_1rem_2rem_black] bg-white ">
         <div class="max-w-7xl m-auto px-5 py-4">
               <div class="grid grid-cols-[1fr_2fr_1fr] mt-5 items-center">
                  <p class="pay-all dark:text-gray-300">Tât cả sản phẩm ({{ carts.length }})</p>
                  <div class="pay-infor-money-summary dark:text-gray-300 d-flex_start_center tramform-vni">
                     Tổng thanh toán (0 sản phẩm):
                     <span class="text-red-500">0 VNĐ</span>
                  </div>
                  <div class="flex justify-end">
                     <router-link
                        :to="{name: 'bill_comfirm'}"
                        custom
                        v-slot="{href, navigate}"
                     >
                        <button @click="handlePurchase(navigate)" class="bg-[var(--maincolor)] dark:bg-gray-800 dark:text-gray-300 cursor-pointer uppercase font-bold text-white py-3 px-13 text-base rounded hover:bg-[var(--hoverred)] hover:shadow-md transition-all duration-300">
                              Đặt hàng
                        </button>
                     </router-link>
                     


                  </div >
               </div>
         </div>
         
      </div>
   
   </div>
   
</template>


