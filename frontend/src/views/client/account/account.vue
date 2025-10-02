<script setup>
    import { replaceStringRange, formatDateTime, opt_show_img, toMySQLDate } from '@/composables'
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number, mixed } from 'yup'
    import { useToast } from 'vue-toastification' 
    import { accountClient } from '@/constant'
    const toast = useToast()
    const store = useStore()
    const { show_img, img, preview_img, error_img, clear_img } = opt_show_img()
    //accountClient.edit_user
    const fetchEditUser = async (user_id, data) => {
        const result = await store.dispatch('client/account/' + accountClient.edit_user, {user_id, data})
    }
    const schema = object({
        email: string().notRequired().email('Email không hợp lệ'),
        phone: string().trim().notRequired()
        .test('valid-phone-if-not-empty', 'Số điện thoại không hợp lệ', (value) => {
            if (!value) return true;
            return /^0\d{9}$/.test(value) && value.length >= 10;
        }),
        gender: string().notRequired(),
        date_birth: date().notRequired(),
    })

    const { handleSubmit, resetForm } = useForm({ 
        validationSchema: schema,
        
    })
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: phone, errorMessage: phoneError } = useField('phone')
    const { value: gender, errorMessage: genderError } = useField('gender')
    const { value: date_birth, errorMessage: dateBirthError} = useField('date_birth')
    
    const handleEditAccount = handleSubmit(
        (values) => {
            const formData = new FormData()
            for (const key in values) {
                if(values[key]){
                    if(key == 'date_birth' ){
                        formData.append(key, toMySQLDate(values[key]))
                    }   
                    else {
                        formData.append(key, values[key])
                    }
                    
                }

            }
            if(img.value){
                formData.append('img', img.value)
            }
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });
            fetchEditUser(user.value.id, formData);
            toast.success('Sửa thông tin thành công')
        },
        (errors) => {
            toast.error('Sửa thông tin thất bại')
        }
    )
    const edit_email=ref(false);
    const edit_phone=ref(false);
    const edit_date=ref(false);
    const isDark = computed( () => store.state.isDark);
    const user = computed(() => store.state.client.account.user )
    const genders = ref([
        {
            title: 'Nam',
            code: 'nam'
        },
        {
            title: 'Nữ',
            code: 'nu',
        },
        {
            title: 'Khác',
            code: 'khac'
        }
    ])
    
</script>

<template>
    <div class="bg-white dark:bg-gray-800 transition-all duration-500 mt-5 p-4 pb-30 rounded-md">
        <!-- Tiêu đề hồ sơ -->
        <div class="border-b-1 pb-2 border-[var(--maincolor)] dark:border-gray-600">
            <p class="text-2xl dark:text-gray-100">Hồ Sơ Của Tôi</p>
            <span class="text-[var(--color_text-gray)] dark:text-gray-400">Quản lý thông tin hồ sơ của bạn</span>
        </div>

        <!-- Form thông tin -->
        <form>
            <div class="grid grid-cols-[2fr_1fr] mt-10">
                <div class="pr-5 border-r-1 border-[var(--colorborder)] dark:border-gray-600">
                    <!-- Tên đăng nhập -->
                    <div class="flex items-center mb-4">
                        <label class="w-[30%] text-end text-[var(--color_text-gray)] dark:text-gray-400">Tên đăng nhập:</label>
                        <p class="capitalize ml-4 dark:text-gray-100">{{ user?.name }}</p>
                    </div>

                    <!-- Email -->
                    <div class="flex items-center mb-5">
                        <label class="w-[30%] text-end text-[var(--color_text-gray)] dark:text-gray-400">Email:</label>
                        <div v-show="edit_email" class="ml-4 flex-1 ">
                            <input v-model="email" :placeholder="user?.email" id="idemployee" type="text" class="w-full outline-none h-8 dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1.5 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) ">
                            <span class="input-config-error block">{{ emailError }}</span>
                        </div>
                        <p v-show="!edit_email" class="ml-4 flex-1 dark:text-gray-100">{{ replaceStringRange(user?.email, '*', 1, 8) }}</p>
                        <p v-show="edit_email" @click="edit_email=false" class="underline ml-4 text-blue-700  dark:text-blue-500 cursor-pointer">Huỷ bỏ</p>
                        <p v-show="!edit_email" @click="edit_email=true" class="underline ml-4 text-blue-700 dark:text-blue-500 cursor-pointer">Thay Đổi</p> 
                    </div>

                    <!-- Số điện thoại -->
                    <div class="flex items-center mb-5">
                        <label class="w-[30%] text-end text-[var(--color_text-gray)] dark:text-gray-400">Số điên thoại:</label>
                        <div v-show="edit_phone" class="ml-4 flex-1 ">
                            <input v-model="phone" :placeholder="user?.phone" id="idemployee" type="text" class="w-full outline-none h-8 dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1.5 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) ">
                            <span class="input-config-error block">{{ phoneError }}</span>
                        </div>
                        <p v-show="!edit_phone" class="ml-4 flex-1 dark:text-gray-100">{{ replaceStringRange(user?.phone, '*', 0, 9)}}</p>
                        <p v-show="edit_phone" @click="edit_phone=false" class="underline ml-4 text-blue-700  dark:text-blue-500 cursor-pointer">Huỷ bỏ</p>
                        <p v-show="!edit_phone" @click="edit_phone=true" class="underline ml-4 text-blue-700 dark:text-blue-500 cursor-pointer">Thay Đổi</p> 
                    </div>
                    <!-- Giới tính -->
                    <div class="flex items-center mb-5">
                        <label class="w-[30%] text-end text-[var(--color_text-gray)] dark:text-gray-400">Giới tính:</label>
                        <div class="flex items-center ml-4 flex-1">
                            <label v-for="(gender_sad, index) in genders" :key="index"  @click="gender = gender_sad.code" class="inline-flex items-center space-x-2 cursor-pointer group mr-4">
                                <input type="radio" :checked="gender_sad.code == user?.gender ? true : false " name="plan" class="peer hidden" />
                                <div class="w-5 h-5 rounded-full border-2 border-gray-400 dark:border-gray-500 peer-checked:border-green-500 peer-checked:bg-green-500 transition-all duration-300 group-hover:border-green-400 group-hover:scale-[1.1]"></div>
                                <span class="text-gray-800 dark:text-gray-100">{{ gender_sad.title }}</span>
                            </label>

            
                        </div>
                    </div>
                    <!-- Ngày sinh -->
                    <div class="flex items-center mb-5">
                        <label class="w-[30%] text-end text-[var(--color_text-gray)] dark:text-gray-400">Ngày sinh:</label>
                        <div v-show="edit_date" class="flex-1 h-8 ml-4" :class="isDark ? 'dark' : 'light' ">
                            <VueDatePicker
                                class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                                v-model="date_birth"
                                :enable-time-picker="false"
                                input-class="border border-gray-300 rounded-md px-7 py-2 text-sm "
                                menu-class="rounded-lg  "
                                :placeholder="user?.date_birth"
                                format="dd-MM-yyyy"
                               
                            />
                            <span class="input-config-error block">{{ dateBirthError }}</span>
                        </div>
                        <p v-show="!edit_date" class="ml-4 flex-1 dark:text-gray-100">{{ replaceStringRange(formatDateTime(user?.date_birth), '*', 1, 6) }}</p>
                        <p v-show="edit_date" @click="edit_date=false" class="underline ml-4 text-blue-700  dark:text-blue-500 cursor-pointer">Huỷ bỏ</p>
                        <p v-show="!edit_date" @click="edit_date=true" class="underline ml-4 text-blue-700 dark:text-blue-500 cursor-pointer">Thay Đổi</p> 
                    </div>

                    <!-- Nút Lưu -->
                    <div class="flex w-full justify-end text-center">
                        <div @click="handleEditAccount" class="flex-[0.4] py-1.5 uppercase font-bold rounded-sm bg-[var(--maincolor)] dark:bg-[var(--dark_maincolor)] dark:text-white hover:bg-[var(--hoverred)] dark:hover:bg-gray-600 hover:text-white cursor-pointer">Lưu</div>
                    </div>
                </div>

                <!-- Ảnh đại diện -->
                <div class="flex flex-col items-center">
                    <img :src="preview_img ? preview_img: user?.img" class="w-25 h-25 rounded-full">
                    <label for="avatar_edit" class="border-1 border-[var(--colorborder)] dark:border-gray-600 py-1.5 px-5 mt-3 bg-gray-100 dark:bg-gray-700 cursor-pointer hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 hover:scale-[1.1] hover:text-red-500 dark:hover:text-red-400">CHỌN ẢNH</label>
                    <input @change="show_img($event)" type="file" name="avatar" id="avatar_edit" class="hidden">
                    <p class="text-sm text-[var(--color_text-gray)] dark:text-gray-400 mt-3">Dung lượng file tối đa là 2MB</p>
                    <p class="text-sm text-[var(--color_text-gray)] dark:text-gray-400">Định dạng: .JPEG, .PNG</p>
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
:deep(.dp__input) {
    height: 1.8rem; /* h-10 */
    background-color: transparent; /* bg-gray-200 */
    padding:  1rem 2rem 1rem 2rem; /* py-2 px-4 */
    border-radius: 0.375rem; /* rounded-md */
    font-size: 0.875rem;
    border: 1px solid var(--color_border);
}
/* :deep(.dp__input_icon) {
  
}
:deep(.dp--clear-btn){
    margin-top: 0.5px;
} */
.dark :deep(.dp__input) {
  color: white;
}
.light :deep(.dp__input) {
  color: black;
}
</style>

