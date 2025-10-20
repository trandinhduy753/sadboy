<script setup>
    import { randomString, opt_show_img, scrollToTop } from '@/composables';
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    import Editor from '@tinymce/tinymce-vue'
    import { provide } from '@/constant'
    import { useToast } from 'vue-toastification'
    const store = useStore();
    const toast = useToast();
    const router = useRouter()
    const { show_img, img, preview_img, error_img, clear_img } = opt_show_img()
    const schema = object({
        code: string().required('Mã nhà cung cấp không được để trống').trim().min(8, 'Mã nhà cung cấp tối thiểu 8 ký tự'),
        name: string().required('Tên nhà cung cấp không được bỏ trống').trim().min(5, 'Tên nhà cung cấp tối thiểu 5 ký tự'),
        phone: string().required('Số điện thoại không được để trống').matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
        address: string().required('Địa chỉ nhà cung cấp không để trống').trim().min(5, 'Địa chỉ nhà cung cấp tối thiểu 5 ký tự'),
        email: string().required('Email không được để trống').email('Email không hợp lệ'),
        note: string().trim().notRequired()
    })

    const { handleSubmit } = useForm({ 
        validationSchema: schema,
        initialValues: {
			code: randomString(10),
            name: 'tran cuong',
            phone: '0988870434',
            address: 'Nguêxxxxxxxxxxxxxxx',
            email: 'nguyentrancuong58@gmail.com',
            note: ''
		}
    })

    const { value: code, errorMessage: codeError } = useField('code')
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: phone, errorMessage: phoneError} = useField('phone')
    const { value: address, errorMessage: addressError} = useField('address')
    const { value: email, errorMessage: emailError} = useField('email')
    const { value: note, errorMessage: noteError} = useField('note')
    const editorSettings = computed(() => ({
        height: 800,
        plugins: 'lists link code preview', // Chỉ giữ các plugin cần cho text
        toolbar: [
            'undo redo | bold italic underline strikethrough | forecolor backcolor | fontfamily fontsize',
            'alignleft aligncenter alignright alignjustify | numlist bullist | link | code preview',
        ],
        menubar: false, // Ẩn menubar để giao diện gọn
        toolbar_mode: 'floating',
        skin: 'oxide', // Hoặc 'oxide' nếu thích sáng
        content_css: 'document',
        branding: false, // Ẩn chữ "Powered by Tiny"
        statusbar: false, // Ẩn thanh trạng thái
    }))

    const fetchAddProvide = async (data) => {
        const result = await store.dispatch('admin/provide/' + provide.add_provide, data )
        if(result.status === 422) {
            errorValidation.value = result.message;
        }
        else if(result.status === 403) {
            toast.error(result.message)
            errorValidation.value = {}
        }
        else {
            errorValidation.value= {}
            toast.success('Thêm nhà cung cấp thành công');
            setTimeout(() => {
                router.push({ name: 'admin_sadboizz.provide'})
            }, 1000)
        }
    }
    const onManualSubmit = handleSubmit(
        (values) => {
            //console.log(values)
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key])
            }
            if(img.value) {
                formData.append('img', img.value)
            }
            formData.forEach((value, key) => {
                //console.log(`${key}: ${value}`)
            })
            fetchAddProvide(formData)
            scrollToTop()
            
        },
        (errors) => {
            console.log(errors)
        }
    )
   
    const errorValidation = ref({})

</script>

<template>
    <div class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold ">
        <router-link :to="{name: 'admin_sadboizz.provide'}">
            <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
        </router-link>
        <p class="ml-1">Thêm nhà cung cấp mới</p>
    </div>
    <form action="">
        <div class="grid grid-cols-12 gap-5 dark:bg-gray-800 transition-all duration-500 dark:p-2">
            <div class="col-span-12">
                <p v-for="(value, key, index) in errorValidation" :key="key" class="text-red-500">
                    {{ value[0] }}
                </p>
            </div>
            <div class="col-span-4 flex flex-col">
                <label for="idprovide" class="cursor-pointer font-bold dark:text-gray-200">Mã nhà cung cấp</label>
                <input v-model="code" type="text" id="idprovide" class="bg-white dark:bg-gray-800 transition-all duration-500 dark:text-gray-200 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1">
                <span class="input-config-error">{{ codeError }}</span>
            </div>

            <div class="col-span-4 flex flex-col">
                <label for="nameprovide" class="cursor-pointer font-bold dark:text-gray-200">Tên nhà cung cấp</label>
                <input v-model="name" type="text" id="nameprovide" class="bg-white dark:bg-gray-800 transition-all duration-500 dark:text-gray-200 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1">
                <span class="input-config-error">{{ nameError }}</span>
            </div>

            <div class="col-span-4 flex flex-col">
                <label for="phoneprovide" class="cursor-pointer font-bold dark:text-gray-200">Số điện thoại</label>
                <input v-model="phone" type="text" id="phoneprovide" class="bg-white dark:bg-gray-800 transition-all duration-500 dark:text-gray-200 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1">
                <span class="input-config-error">{{ phoneError }}</span>
            </div>

            <div class="col-span-4 flex flex-col">
                <label for="addressprovide" class="cursor-pointer font-bold dark:text-gray-200">Địa chỉ</label>
                <input v-model="address" type="text" id="addressprovide" class="bg-white dark:bg-gray-800 transition-all duration-500 dark:text-gray-200 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1">
                <span class="input-config-error">{{ addressError }}</span>
            </div>

            <div class="col-span-4 flex flex-col">
                <label for="emailprovide" class="cursor-pointer font-bold dark:text-gray-200">Email</label>
                <input v-model="email" type="text" id="emailprovide" class="bg-white dark:bg-gray-800 transition-all duration-500 dark:text-gray-200 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1">
                <span class="input-config-error">{{ emailError }}</span>
            </div>
            <div class="col-span-12">
                <p class="font-bold dark:text-gray-200 mb-3">Ảnh nhà cung cấp</p>
                <label for="uploadimg_employee" class="cursor-pointer text-white dark:text-gray-200 font-(family-name:--font-winky) py-2 px-10 rounded-sm bg-blue-900 dark:bg-blue-700">
                    <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                    <span class="ml-2">Chọn ảnh</span>
                </label>
                <input type="file" @change="show_img($event)" id="uploadimg_employee" class="hidden">
                <div v-show="preview_img" class="mr-5">
                    <font-awesome-icon @click="clear_img()" class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 relative left-21 top-4" :icon="['fas', 'xmark']" />
                    <img :src="preview_img ? preview_img : ''" class="w-25 h-20 border-1 border-black dark:border-gray-500 rounded-sm" alt="">
                </div>
                <span class="block mt-3 input-config-error">{{ error_img }}</span>
            </div>

            <div class="col-span-12 flex flex-col">
                <label for="noteprovide" class="cursor-pointer font-bold dark:text-gray-200 mt-7 mb-2 text-xl">Ghi chú</label>
                <Editor
                    v-model="note" :init="editorSettings" api-key="peas03g0bwumpx7ivb4cuhrck2dfd1lpkmjsxqyljojpxyez"
                />
                <span class="input-config-error"></span>
            </div>

            <div class="col-span-12 flex items-center mt-3">
                <div @click="onManualSubmit" class="px-15 cursor-pointer py-1.5 rounded-sm mr-5 bg-green-300 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 hover:text-black hover:scale-[1.1] duration-600 transition-all text-green-900 dark:text-gray-200 font-bold border-1 border-green-900 dark:border-green-600">
                    Lưu lại
                </div>
               
            </div>

        </div>
    </form>
  
</template>

<style scoped>

</style>
