<script setup>
    import { formClient } from '@/constant'
    import { useToast } from 'vue-toastification'
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const fetchSendOTP = async () => {
        store.commit('client/CHANGE_LOADING', true);
        const result = await store.dispatch('client/form/' + formClient.sendOTP, email.value)
        store.commit('client/CHANGE_LOADING', false);
        if(result.ok === 'success') {
           showButtonOTP.value = true;

        }
        else {

            toast.error('Gửi mã OTP không thành công');
        }
    }
    const fetchVerifyOTP = async () => {
        store.commit('client/CHANGE_LOADING', true);
        const result = await store.dispatch('client/form/' + formClient.verifyOTP, {email: email.value, otp: otp.value})
        if(result.ok === 'success') {
            store.commit('client/CHANGE_LOADING', false);
            router.push({name: 'form', query: {opt: 'reset'}})
           //showButtonOTP.value = true;
        }
        else {
           toast.error('Mã OTP không hợp lệ');
        }
    }   

    const email = ref("");
    const showButtonOTP = ref(false);  
    const otp = ref("");
</script>

<template>
    <div class="bg-gray-50 flex items-center justify-center h-[100vh]">
        <div class="grid grid-cols-12 bg-white rounded-sm shadow-lg w-md px-10 py-5">
            <div class="col-span-12  text-center">
                <router-link :to="{name: 'home'}">
                    <div class="flex items-center font-(family-name:--font-noto) cursor-pointer w-50">
                        <font-awesome-icon :icon="['fab', 'pied-piper-alt']" class="text-4xl w-8 h-8 text-[var(--maincolor)] dark:text-yellow-500"/>
                        <h1 class="ml-3 text-xl text-[var(--maincolor)] font-[800] dark:text-yellow-400">NTC_ORANGE</h1>
                    </div>
                </router-link>
            </div>
            <div class="col-span-12 mt-6 ">
                <input v-model="email" type="text" class="border-1 outline-none border-[var(--color_border)] w-full rounded-lg px-2.5 py-1.5" placeholder="Nhập email của bạn">
                <span class="text-sm text-red-500 mt-1"></span>
                <button @click="fetchSendOTP" class="mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Nhận mã OTP</button>
            </div>  
            <div v-if="showButtonOTP" class="col-span-12 mt-8 ">
                <input v-model="otp" type="number" class="border-1 outline-none border-[var(--color_border)] w-full rounded-lg px-2.5 py-1.5" placeholder="Nhập mã OTP">
                <span class="text-sm text-red-500 mt-1"></span>
                <button @click="fetchVerifyOTP" class="mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Xác nhận</button>
            </div>  

        </div>
    </div>
</template>

<style >


</style>