<script setup >
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number, ref as yupRef } from 'yup'
    import { useToast } from 'vue-toastification'
    import { account } from '@/constant'
    import { get_info_admin } from '@/api/admin/account.js';
    const login = defineAsyncComponent(() => import('@/views/admin/form/login.vue'));

    const route = useRoute();
    const show_form = computed(() => {
        return login;
        
    });
    const fetchInfoAdmin = async () => {
        await store.dispatch('admin/account/' + account.get_info_admin)

    }
    const toast = useToast();
    const store = useStore();
    const router = useRouter()
    const fetchLogin = async (data) => {
        store.dispatch('admin/account/' + account.admin_login, data)
            .then(result => {
                if(result.ok ==='success') {
                    toast.success('Đăng nhập thành công')
                    setTimeout(() => {
                        router.push({name: 'admin_sadboizz.dashboard'})
                    }, 500);
                    
                }
                else {
                    toast.error('Đăng nhập không thành công')
                }

            })
            .catch(error => {
                console.error("Lỗi:", error);
        });
        
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
            password: 'Cuonga@123',
            password_confirmation: 'Cuonga@123',
            email: 'nguyentrancuong58@gmail.com'
            
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

    const show_password = ref(false)
    const show_password_confirmation = ref(false)

    onMounted(async () => {
        await fetchInfoAdmin()
        if(store.state.admin.account.employee?.name) {
            router.push({name: 'admin_sadboizz.dashboard'})
        }
    });
</script>

<template>
    <div class="relative overflow-hidden min-h-[400px]">
        <transition 
            name="form" 
            mode="out-in"
        >
        <div class="bg-gray-50 flex items-center justify-center h-[100vh]">
            <div class="grid grid-cols-12 bg-white rounded-sm shadow-lg w-md px-10 py-5">
                <div class="col-span-12  text-center">
                    <router-link :to="{name: 'admin_sadboizz.dashboard'}">
                        <div class="flex items-center font-(family-name:--font-noto) cursor-pointer w-50">
                            <font-awesome-icon :icon="['fab', 'pied-piper-alt']" class="text-4xl w-8 h-8 text-[var(--maincolor)] dark:text-yellow-500"/>
                            <h1 class="ml-3 text-xl text-[var(--maincolor)] font-[800] dark:text-yellow-400">NTC_ORANGE</h1>
                        </div>
                    </router-link>
                    <p class="font-black text-2xl font-(family-name:--font-noto) mt-1">Đăng nhập</p>
                    <p class="italic">Vui lòng nhâp thông tin để được phép truy cập vào hệ thống</p>
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
                <p class="col-span-12 text-blue-500 italic mt-1 cursor-pointer block">Forgot password</p>
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
               
                
            </div>
        </div>
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

