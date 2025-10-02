<script setup lang="ts">
    import { ref, computed, defineAsyncComponent } from 'vue';
    import { useStore } from 'vuex';
    import { user_opt_show_admin } from '@/composables'

    const debt_provide = defineAsyncComponent(() => import('@/views/admin/Cash_book/debt/debt_provide.vue'));
    const debt_ship = defineAsyncComponent( () => import('@/views/admin/Cash_book/debt/debt_ship.vue'));
    const debt_ship_detail = defineAsyncComponent( () => import('@/views/admin/Cash_book/debt/debt_ship_detail.vue'))
    const { navigateTo } = user_opt_show_admin();
    const opt_cash_book = computed( () => navigateTo() )
    const store=useStore()
    const opt_show_comp=computed( ()=> store.state.opt_show_comp);
    const show_debt=computed( () => {
        if(opt_show_comp.value=='debt_ship')
        {
            return debt_ship
        }
        return debt_provide
    })
</script>

<template>
    <div v-if="opt_cash_book"> 
        <router-view>

        </router-view>
    </div>
    <div v-else>
        <component :is="show_debt" />
    </div>
    
</template>

<style scoped>

</style>
