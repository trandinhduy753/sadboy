<script setup lang="ts">
    import { cash_book } from '@/constant'
    import { useToast } from 'vue-toastification';
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    import { randomString, opt_show_multiple_img } from '@/composables'
    const {show_multiple_img,
        remove_image,
        clear_images,
        images,
        preview_images,
        error_img
    } = opt_show_multiple_img()
    const fetchAddBillSpend = async (data) => {
        const result = await store.dispatch('admin/cash_book/' + cash_book.add_bill_spend, data)
    }
    const toast = useToast()
    const store = useStore();
    const router = useRouter();
    const schema = object({
        code: string().required('Mã phiếu chi không được bỏ trống').trim().min(5, 'Mã phiếu chi tối thiểu 5 ký tự'),
        money: number().typeError('Giá sản phẩm phải là một số') .required('Giá nhập không được để trống').min(0, 'Giá sản phẩm không được âm'),
        reason: string().required('Lý do chi không được bỏ trống').trim(),
        receiver: string().required('Đối tượng chi không được để trống').trim(),
        name:  string().required('Tên đối tượng chi không được bỏ trống').trim()
    })
    

    const { handleSubmit } = useForm({ 
        validationSchema: schema,
        initialValues: {
            code: randomString(10),
        }
    })

    const { value: code, errorMessage: codeError } = useField('code')
    const { value: money, errorMessage: moneyError } = useField('money')
    const { value: reason, errorMessage: reasonError } = useField('reason')
    const { value: receiver, errorMessage: receiverError } = useField('receiver')
    const { value: name, errorMessage: nameError } = useField('name')

    const onManualSubmit = handleSubmit(
        (values) => {
            const formData = new FormData();
            values['type']= 'spend';

            for (const key in values) {
                formData.append(key, values[key])
            }
            if(images.value.length == 0) {
                toast.error('Thêm phiếu chi thất bại')
                error_img.value = 'Ảnh chứng từ không được để trống'
            } 
            else if(images.value.length > 2) {
                toast.error('Thêm phiếu chi thất bại')
                error_img.value = 'Tối đa chỉ được 2 ảnh'
            } 
            else {
                error_img.value = '';
                fetchAddBillSpend(formData);
                setTimeout(() => {
                    router.push({ name: 'admin_sadboizz.cashbook.income_spend.cash_book' })
                }, 500)
                toast.success('Thêm phiếu chi thành công')
                
                
            }
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`)
            })
            
        },
        (errors) => {
            toast.error('Thêm phiếu chi thất bại')
            if(images.value.length == 0) {
                error_img.value = 'Ảnh chứng từ không được để trống'
            } 
            else if(images.value.length > 2) {
                error_img.value = 'Tối đa chỉ được 2 ảnh'
            } 
            else {
                error_img.value = ''
            }
        }
    )
    const object_spend = ref([
        {
            title: 'Khách hàng',
            code: 'customer',
        },
        {
            title: 'Nhân viên',
            code: 'employee',
        },
        {
            title: 'Nhà cung cấp',
            code: 'provide',
        }
    ])
</script>

<template>
    <router-link :to="{ name: 'admin_sadboizz.cashbook.income_spend.cash_book' }">
        <div class="flex items-center gap-2 bg-white dark:bg-gray-800 transition-all duration-500 py-2 pl-3">
            <font-awesome-icon :icon="['fas', 'arrow-left']"  class="cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            <p class="text-black dark:text-gray-300 ">Tạo phiếu chi</p>
        </div>
    </router-link>
    <form action="" class=" mt-2">
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-8 bg-white dark:bg-gray-800 transition-all duration-500 px-5  pb-10 pt-5">
                <p class="border-b border-[var(--color_border)] pb-2 font-bold mt-2 dark:border-gray-600 dark:text-gray-300"> Thông tin phiếu chi </p>
                <div class="grid grid-cols-12 mt-4 gap-5">
                    <div class="col-span-6">
                        <label for="codebill" class="font-bold text-black dark:text-gray-300">Mã phiếu chi</label>
                        <input v-model="code" type="text" name="codebill" id="codebill"  class="bg-white transition-all duration-500 dark:bg-gray-800 text-black dark:text-gray-300 w-full border-1 border-[var(--color_border)] rounded-sm pl-2 py-1 mt-1 outline-none">
                        <span class="input-config-error">{{ codeError }}</span>
                    </div>
                    <div class="col-span-6">
                        <label for="moneybill" class="font-bold text-black dark:text-gray-300">Số tiền chi</label>
                        <input v-model="money" type="text" name="moneybill" id="moneybill"  class="bg-white transition-all duration-500 dark:bg-gray-800 text-black dark:text-gray-300 w-full border-1 border-[var(--color_border)] rounded-sm pl-2 py-1 mt-1 outline-none">
                        <span class="input-config-error">{{ moneyError }}</span>
                    </div>
                    <div class="col-span-6">
                        <label for="moneybill" class="font-bold text-black dark:text-gray-300">Lý do chi</label>
                        <input v-model="reason" type="text" id="moneybill" placeholder="Nhập lý do chi" class="placeholder:text-sm w-full mt-1 outline-none border border-[var(--color_border)] rounded-sm pl-2 py-1
                            dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
                            <span class="input-config-error">{{ reasonError }}</span>
                    </div>

                    <div class="col-span-6">
                        <p for="moneybill" class="font-bold text-black dark:text-gray-300">Đối tượng nhận</p>
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                    <span class="text-black dark:text-gray-300">--{{ receiver || 'Chọn đối tương chi' }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" class="dark:text-white"  />
                                </div>
                            </MenuButton>

                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50">
                                <div class="py-1 h-40 overflow-y-auto custom-scrollbar">
                                    <MenuItem v-for="(spend, index) in object_spend" :key="index" class="mb-1 cursor-pointer">
                                        <p @click="receiver = spend.code" class="block mb-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[0.2rem] text-black dark:text-gray-300">{{ spend.title }}</p>
                                    </MenuItem>
                                    
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="input-config-error">{{ receiverError }}</span>
                    </div>
                    <div class="col-span-6 flex flex-col">
                        <label for="nameaccept" class="font-bold text-black dark:text-gray-300">Tên đối tượng nhận</label>
                        <input v-model="name" type="text" id="nameaccept" class="bg-white transition-all duration-500 dark:bg-gray-800 mt-1 border-1 border-[var(--color_border)] outline-none py-1 pl-2 rounded-sm text-black dark:text-gray-300">
                        <span class="input-config-error">{{ nameError }}</span>
                    </div>
                    <div class="col-span-12">
                        <div class="flex items-center gap-2 mt-1">
                            <input id="report" type="checkbox" class="text-black dark:text-gray-300">
                            <label for="report" class="text-black dark:text-gray-300">Ghi nhận vào báo cáo kết quả kinh doanh</label>
                        </div>
                    </div>      
                </div>
            </div>
            <div class="col-span-4 py-7 bg-white px-5 dark:bg-gray-800 transition-all duration-500 dark:text-gray-300">
                <p class="font-bold pb-1 border-b-1 border-[var(--color_border)] dark:border-gray-600">Hình ảnh chứng từ thanh toán</p>
                <label v-if="!(preview_images.length != 0)" for="img_pay" class="h-30 mt-2  block w-full text-center leading-30 transition-all duration-500 bg-gray-50 border-1 border-[var(--color_border)] dark:bg-gray-700 dark:border-gray-600">
                    Thêm ảnh ở đây, tối đa 2 ảnh
                </label>
                <div v-else v-for="(preview, index) in preview_images" :key="index"  class="flex items-center justify-center mt-5">
                    <img :src="preview"
                        class="w-[80%] h-35  rounded-sm" 
                        alt="">
                    <font-awesome-icon
                        @click="remove_image(index)"
                        class="relative -top-17 right-3 px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 " 
                        :icon="['fas', 'xmark']" 
                    />
                </div>

                <input type="file" @change="show_multiple_img($event)" name="" multiple class="hidden" id="img_pay">
                <span class="input-config-error">{{ error_img }}</span>
            </div>

            <div class="col-span-12 flex  bg-white dark:bg-gray-800 text-black dark:text-gray-300 px-5 py-7">
                <div @click="onManualSubmit" class="w-50 text-center py-2 cursor-pointer rounded-sm mr-5 bg-green-300 dark:bg-green-600 hover:bg-green-200 dark:hover:bg-green-700 text-green-900 dark:text-green-300 font-bold border-1 border-green-900 dark:border-green-300">Lưu lại</div>
                <div class="w-50 text-center py-2 cursor-pointer rounded-sm mr-3 bg-red-300 dark:bg-red-600 hover:bg-red-200 dark:hover:bg-red-700 text-red-900 dark:text-red-300 font-bold border-1 border-red-900 dark:border-red-300">Huỷ bỏ</div>
            </div>

            
        </div>
    </form>
  
</template>

<style scoped>

</style>