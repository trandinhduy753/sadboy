<script setup lang="ts">
const AdminHeader = defineAsyncComponent( () => import('@/components/header/adminHeader.vue'));
import { account } from '@/constant'
const store = useStore()
const router = useRouter();

const fetchInfoAdmin = async () => {
    await store.dispatch('admin/account/' + account.get_info_admin)

}


onMounted(async () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    await fetchInfoAdmin()
})
</script>

<template>
    <AdminHeader />
    <div>
        <slot></slot>
    </div>

</template>

<style scoped>

</style>

