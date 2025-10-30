<script setup>
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number, ref as yupRef } from 'yup'
    import { useToast } from 'vue-toastification'
    import { formClient } from '@/constant'
    const toast = useToast();
    const store = useStore();
    const router = useRouter()
    const fetchLogin = async (data) => {
        store.commit('client/CHANGE_LOADING', true);
        const result = await store.dispatch('client/form/' + formClient.login, data)
        store.commit('client/CHANGE_LOADING', false);
        if(result.ok === 'success') {
            toast.success('Đăng nhập thành công')
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
        else {
            toast.error('Đăng nhập không thành công')
        }
        
    }
    
    const schema = object({
        email: string().required('Bắt buộc nhập email').email('Email không hợp lệ'),
        password: string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .max(32, "Mật khẩu tối đa 32 ký tự")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số")
        .matches(/[@$!%*?&]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
        password_confirmation: string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([yupRef("password")], "Mật khẩu nhập lại không khớp"),
    })

    const { handleSubmit } = useForm({ 
        validationSchema: schema,
        initialValues: {
            
        }
    })

    const { value: email, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')
    const { value: password_confirmation, errorMessage: password_confirmationError } = useField('password_confirmation')
    const onManualSubmit = handleSubmit(
        (values) => {
            fetchLogin(values);
           
        },
        (errors) => {
            toast.error('Đăng nhập không thành công')
        }
    )   
    
    const loginGoogle = () => {
        const result = store.dispatch('client/form/' + formClient.loginGoogle)
    }
    const show_password = ref(false)
    const show_password_confirmation = ref(false)

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
                <p class="font-black text-2xl font-(family-name:--font-noto) mt-1">Đăng nhập</p>
                <p class="italic">Chào mừng bạn trở lại, vui lòng nhập thông tin để đăng nhập vào tài khoản</p>
            </div>
            <div class="col-span-12 mt-6 ">
                <input v-model="email" type="text" class="border-1 outline-none border-[var(--color_border)] w-full rounded-lg px-2.5 py-1.5" placeholder="Email">
                <span class="text-sm text-red-500 mt-1">{{ emailError }}</span>
            </div>
           
            <div class="col-span-12 items-end mt-5">
                <div class="relative">
                    <input v-model="password" :type="show_password ? 'type' : 'password'" class="border-1 outline-none border-[var(--color_border)] w-full rounded-lg px-2.5 py-1.5" placeholder="Password">
                    <span class="text-sm text-red-500 mt-1">{{ passwordError }}</span>
                    <div class="text-gray-500 text-lg cursor-pointer absolute right-2 top-1 left-85 w-5 h-5">
                        <font-awesome-icon v-if="show_password" @click="show_password = false " :icon="['fa-solid', 'fa-eye-slash']" />
                        <font-awesome-icon v-else @click="show_password = true " :icon="['fas', 'eye']" />
                       
                    </div>
                </div>
                
            </div>
            <div class="col-span-12 mt-5 items-end">
                <div class="relative">
                    <input v-model="password_confirmation" :type="show_password_confirmation ? 'type' : 'password'" class="border-1 outline-none border-[var(--color_border)] w-full rounded-lg px-2.5 py-1.5" placeholder="Password confirm">
                    <span class="text-sm text-red-500 mt-1">{{ password_confirmationError }}</span>
                    <div class="text-gray-500 text-lg cursor-pointer absolute right-2 top-1 left-85 w-5 h-5">
                        <font-awesome-icon v-if="show_password_confirmation" @click="show_password_confirmation = false " :icon="['fa-solid', 'fa-eye-slash']" />
                        <font-awesome-icon v-else @click="show_password_confirmation = true " :icon="['fas', 'eye']" />

                    </div>
                </div>
                
            </div>
            <div class="col-span-12">
                <router-link :to="{name: 'form', query: {opt: 'forgot'}}">
                    <p class="col-span-12 text-blue-500 italic mt-1 cursor-pointer block">Forgot password</p>
                </router-link>
            </div>
            
            <div class="col-span-12 mt-5">
                <div @click="onManualSubmit" class="text-center font-black bg-blue-300 hover:bg-blue-200 cursor-pointer rounded-lg text-white py-2 uppercase">
                    Sign in
                </div>
            </div>
            <div class="col-span-12 flex items-center mt-2">
                <span class="h-[0.1rem] rounded-sm flex-1 bg-gray-500"></span>
                <span class="mx-3 text-gray-500">Hoặc</span>
                <span class="h-[0.1rem] rounded-sm flex-1 bg-gray-500"></span>
            </div>
            
            <div class="col-span-12 text-center mt-2 italic">
                <router-link :to="{name: 'form', query: {opt: 'logout'}}">
                    <p class="text-gray-500">Bạn đã chưa có tài khoản? <span class="text-blue-500 underline underline-offset-4 cursor-pointer hover:text-orange-500">Đăng ký</span></p>
                </router-link>
                
            </div>
        </div>
    </div>
</template>

<style >


</style>