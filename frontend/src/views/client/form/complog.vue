<script setup lang="ts">
    const login = defineAsyncComponent(() => import('@/views/client/form/login.vue'));
    const logout = defineAsyncComponent(() => import('@/views/client/form/register.vue'));
    const route = useRoute();
    const opt_form = computed(() => route.query.opt);
    const show_form = computed(() => {
        if(opt_form.value == 'login') {
            return login;
        }
        return logout;
    });
</script>

<template>
    <div class="relative overflow-hidden min-h-[400px]">
        <transition 
            name="form" 
            mode="out-in"
        >
            <component :is="show_form" :key="String(opt_form)" />
        </transition>
    </div>
</template>

<style scoped>
.form-enter-active,
.form-leave-active {
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-enter-from {
    opacity: 0;
    transform: translateX(30px) scale(0.9);
    filter: blur(5px);
}

.form-leave-to {
    opacity: 0;
    transform: translateX(-30px) scale(1.1);
    filter: blur(5px);
}

/* Thêm hiệu ứng cho container */
.form-enter-active::before,
.form-leave-active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    transition: all 0.6s ease;
}

.form-enter-from::before {
    opacity: 0;
    transform: scale(0.8);
}

.form-leave-to::before {
    opacity: 0;
    transform: scale(1.2);
}
</style>

