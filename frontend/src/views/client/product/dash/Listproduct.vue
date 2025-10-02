<script setup lang="ts">
    import product from '@/views/client/product/dash/Product.vue';
    import { productClient } from '@/constant'
    const store = useStore()
    const fetchHandlePage= async (category, page, per_page) => {
        const result = store.dispatch('client/product/' + productClient.get_list_product_by_type, {category, page, per_page})
    }
    function NextPage() {
        if (currentPage.value == totalPages.value) {
            fetchHandlePage(category.value,1, 30)
        } else {
            fetchHandlePage(category.value,Number(currentPage.value +1 ), 30)
            
        }
    }

    function PrevPage() {
        if (currentPage.value == 1) {
            fetchHandlePage(category.value,totalPages.value, 30)
            
        } else {
            fetchHandlePage(category.value,Number(currentPage.value - 1), 30)
        }
    }
    const currentPage = computed(() => get_products_pagination.value?.current_page );
    const totalPages = computed(() => get_products_pagination.value?.last_page);
    const get_products_pagination = computed(() => store.getters['client/product/get_products_pagination'] )
    const category = computed(() => store.state.client.product.category)
</script>

<template>
    <div class="col-span-12">
        <div class="grid grid-cols-5 mt-5 gap-5">
            <template v-for="(product, index) in get_products_pagination?.products" :key="index">
                <product :product="product" />
            </template>
            
        </div>
        <div class="flex space-x-2 justify-center mt-6">
            <div @click="PrevPage()" class="box-2 cursor-pointer mr-5 btn-two w-10 h-10 flex items-center justify-center rounded-sm px-4">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="rounded-sm text-black dark:text-white" />
            </div>
            <button
                v-for="page in totalPages"
                :key="page"
                @click="fetchHandlePage(category, page, 30)"
                :class="page === currentPage ? 'bg-[var(--maincolor)] text-white dark:bg-blue-500 dark:text-gray-100' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'"
                class="px-4 py-2 border rounded cursor-pointer hover:scale-[1.15] hover:opacity-[0.6] duration-500 transition"
            >
                {{ page }}
            </button>
            <div @click="NextPage()" class="box-2 cursor-pointer ml-3 btn-two w-10 h-10 flex items-center justify-center rounded-sm px-4">
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="rounded-sm text-black dark:text-white" />
            </div>
           
        </div>
    </div>
</template>

<style scoped>


.btn {
  line-height: 50px;

  text-align: center;

  cursor: pointer;
}

.btn-two {
  transition: all 0.5s;
  position: relative; 
}

.btn-two::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.5s;
  border: 1px solid rgba(255,255,255,0.2);
  background-color: rgba(255,255,255,0.1);
  border-radius: 3px;
}
.btn-two::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.5s;
  border: 1px solid rgba(255,255,255,0.2);
  background-color: rgba(27, 26, 26, 0.1);
  border-radius: 3px;
}
.btn-two:hover::before {
  transform: rotate(-45deg);
  background-color: rgba(255,255,255,0);
}
.btn-two:hover::after {
  transform: rotate(45deg);
  background-color: rgba(255,255,255,0);
}

</style>
