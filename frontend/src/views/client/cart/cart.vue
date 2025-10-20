<script setup>
    import { formatMoney } from '@/composables'
    import { cartClient } from '@/constant'
    const store = useStore()
    
    var props = defineProps({
        cart: {
            type: Object,
            default: {}
        },
        index: {
            type: Number,
            default: -1
        }
        
    })
    const delete_cart = async (user_id, id) => {
        const result = store.dispatch('client/cart/' + cartClient.delete_product_in_cart,  {user_id: user_id, id: id })
    }
    const user = computed(() => store.state.client.account.user )
    const add_count = (index) => store.commit('client/cart/ADD_COUNT_PRODUCT', index)
    const except_count = (index) => store.commit('client/cart/EXCEPT_COUNT_PRODUCT', index)
    const toggle_selected = (index) => store.commit('client/cart/TOGGLE_SELECT_CART', index)
    
</script>

<template>
   <div class="grid grid-cols-12 mt-6 pb-4 border-b-1 border-[var(--colorborder)] dark:border-gray-600">
        <div class="max-md:col-span-12 max-md:mb-3 col-span-4  flex items-center">
            <label class="inline-flex items-center cursor-pointer group">
                <input @change="toggle_selected(index)" type="checkbox" class="peer hidden">
                <span class="w-6 h-6 rounded border-2 border-gray-400 peer-checked:bg-[var(--maincolor)] peer-checked:border-[var(--maincolor)] transition duration-300 group-hover:border-[var(--maincolor)] group-hover:scale-110 dark:border-gray-600 dark:peer-checked:bg-gray-800"></span>
                <img :src="cart?.product?.img" class="w-25 h-25 group-hover:scale-110 transition duration-600 ml-4 dark:bg-gray-800 rounded" alt="">
                <span class="ml-4 text-gray-700 group-hover:text-[var(--maincolor)] transition dark:text-gray-300">{{ cart?.product?.name }}</span>
            </label>
        </div>
        <div class="col-span-8 max-md:col-span-12 grid grid-cols-15 max-md:gap-x-5 items-center">                
            <div class="col-span-3 max-md:col-span-4 text-center max-md:text-lg dark:text-gray-300">
                <span>{{ formatMoney(cart?.price) }}</span>
            </div>
            <div class="col-span-3 max-md:col-span-4 text-center flex items-center justify-center">
                <font-awesome-icon @click="add_count(index)" :icon="['fas', 'plus']" class="bg-gray-300 p-2.5 cursor-pointer hover:bg-[var(--hoverred)] hover:text-white hover:scale-[1.1] transition-all duration-400 dark:bg-gray-700 dark:text-gray-200"/>
                <span class="underline text-[1.3rem] mx-4 dark:text-gray-300">{{ cart?.count }}</span>
                <font-awesome-icon @click="except_count(index)" :icon="['fas', 'minus']" class="bg-gray-300 p-2.5 cursor-pointer hover:bg-[var(--hoverred)] hover:text-white hover:scale-[1.1] transition-all duration-400 dark:bg-gray-700 dark:text-gray-200"/>
            </div>
            
            <div class="col-span-3 max-md:hidden text-center dark:text-gray-300">
                <span>{{ formatMoney(cart?.count * cart?.price) }}</span>
            </div>
            <div class="col-span-4  text-center underline dark:text-gray-300">
                {{ cart?.size }}
            </div>
            <div class="col-span-2 text-center">
                <Dialog>
                    <DialogTrigger>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="p-3 rounded-sm hover:bg-[var(--hoverred)] hover:scale-[1.1] transition-all duration-400 cursor-pointer dark:bg-gray-700 dark:text-gray-200" />
                    </DialogTrigger>
                    <DialogContent class="dark:bg-gray-800 dark:text-white">
                        <DialogHeader>
                            <DialogTitle></DialogTitle> 
                            <DialogDescription>
                                Bạn có chắc chắn muốn xoá mục này không?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button @click="delete_cart(user?.id, cart?.id)" type="button" variant="destructive">
                                    Xác nhận
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
               
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>