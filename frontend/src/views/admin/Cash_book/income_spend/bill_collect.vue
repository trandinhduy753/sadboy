<script setup>
    import { cash_book } from '@/constant'
    import { useToast } from 'vue-toastification';
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    import { randomString, opt_show_multiple_img } from '@/composables'
    const {
        show_multiple_img,
        remove_image,
        clear_images,
        images,
        preview_images,
        error_img
    } = opt_show_multiple_img()
    const fetchAddBillCollect = async (data) => {
        const result = await store.dispatch('admin/cash_book/' + cash_book.add_bill_collect, data)
    }
    const toast = useToast()
    const store = useStore();
    const router = useRouter();
    const schema = object({
        code: string().required('Mã phiếu thu không được bỏ trống').trim().min(5, 'Mã phiếu thu tối thiểu 5 ký tự'),
        money: number().typeError('Giá sản phẩm phải là một số') .required('Giá nhập không được để trống').min(0, 'Giá sản phẩm không được âm'),
        reason: string().required('Lý do thu không được bỏ trống').trim().min(5, 'Lý do thu tối thiểu 5 ký tự'),
        receiver: string().required('Đối tượng thu không được để trống').trim(),
        name:  string().required('Tên đối tượng thu không được bỏ trống').trim()
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
            values['type']= 'collect';

            for (const key in values) {
                formData.append(key, values[key])
            }
            if(images.value.length == 0) {
                toast.error('Thêm phiếu thu thất bại')
                error_img.value = 'Ảnh chứng từ không được để trống'
            } 
            else if(images.value.length > 2) {
                toast.error('Thêm phiếu thu thất bại')
                error_img.value = 'Tối đa chỉ được 2 ảnh'
            } 
            else {
                error_img.value = '';
                images.value.forEach((file, index) => {
                    formData.append('imgs[]', file);
                });
                fetchAddBillCollect(formData);
                toast.success('Thêm phiếu thu thành công')
                setTimeout(() => {
                    router.push({ name: 'admin_sadboizz.cashbook.income_spend.cash_book' })
                }, 500)
                
            }
            
            
        },
        (errors) => {
            toast.error('Thêm phiếu thu thất bại')
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
    const object_collect = ref([
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
        <div class="flex items-center gap-2 bg-white dark:bg-gray-800 transition-all duration-500 py-2 pl-3 pointer">
            <font-awesome-icon  :icon="['fas', 'arrow-left']" class="cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)] hover:scale-[1.2] transition-all duration-200 dark:text-[var(--dark_maincolor)] dark:hover:text-[var(--maincolor)]" 
            />
            <p class="dark:text-gray-300">Tạo phiếu thu</p>
        </div>
    </router-link>
    <form action="" class=" mt-2">
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-8  bg-white dark:bg-gray-800 transition-all duration-500  px-5  pb-10 pt-5">
                <p class="border-b border-[var(--color_border)] pb-2 font-bold mt-2 dark:border-gray-600 dark:text-gray-300"> Thông tin phiếu thu </p>
                <div class="grid grid-cols-12 mt-4 gap-5">
                    <div class="col-span-6">
                        <label for="codebill" class="font-bold dark:text-gray-300">Mã phiếu thu</label>
                        <input v-model="code" type="text" name="codebill" d="codebill" class="bg-white transition-all duration-500 w-full border border-[var(--color_border)] rounded-sm pl-2 py-1 mt-1 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300" />
                        <span class="input-config-error block dark:text-red-400">{{ codeError }}</span>
                    </div>
                    <div class="col-span-6">
                        <label for="moneybill" class="font-bold dark:text-gray-300">Số tiền thu</label>
                        <input v-model="money" type="text" name="moneybill" d="moneybill" class="bg-white transition-all duration-500 w-full border border-[var(--color_border)] rounded-sm pl-2 py-1 mt-1 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300" />
                        <span class="input-config-error block dark:text-red-400">{{ moneyError }}</span>
                    </div>
                    <div class="col-span-6">
                        <label for="moneybill" class="font-bold dark:text-gray-300">Lý do thu</label>
                        <input v-model="reason" type="text"  id="moneybill" placeholder="Nhập lý do thu" class="placeholder:text-sm w-full mt-1 outline-none border border-[var(--color_border)] rounded-sm pl-2 py-1
                            dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
                            <span class="input-config-error block dark:text-red-400">{{ reasonError }}</span>
                    </div>

                    <div class="col-span-6">
                        <p for="moneybill" class="font-bold dark:text-gray-300">Đối tượng thu</p>
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white transition-all duration-500 border border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
                                    <span>--{{ receiver || 'Chọn đối tượng thu' }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" class="dark:text-gray-300" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
                                <div class="py-1 h-40 overflow-y-auto custom-scrollbar">
                                    <MenuItem v-for="(collect, index) in object_collect" :key="index" class="mb-1 cursor-pointer">
                                        <p @click="receiver = collect.code" class="block mb-2 px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700">{{ collect.title }}</p>
                                    </MenuItem>
                                    
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="input-config-error">{{ receiverError  }}</span>
                    </div>
                    <div class="col-span-6 flex flex-col">
                        <label for="nameaccept" class="font-bold text-black dark:text-gray-300">Tên đối tượng thu: </label>
                        <input v-model="name" type="text" id="nameaccept" class="bg-white transition-all duration-500 dark:bg-gray-800 mt-1 border-1 border-[var(--color_border)] outline-none py-1 pl-2 rounded-sm text-black dark:text-gray-300">
                        <span class="input-config-error text-red-500 dark:text-red-400">{{ nameError }}</span>
                    </div>
                    <div class="col-span-12">
                        <div class="flex items-center gap-2 mt-1">
                            <input id="report" type="checkbox" checked disabled name="" class="dark:accent-gray-600 transition-all duration-500">
                            <label for="report" class="dark:text-gray-300">Ghi nhận vào báo cáo kết quả kinh doanh</label>
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
                <span class="input-config-error text-red-500 dark:text-red-400">{{ error_img }}</span>
            </div>
            <div class="col-span-12 flex flex-col bg-white px-5 py-7 dark:bg-gray-800 transition-all duration-500 dark:text-gray-300">
                <div class="flex items-center mt-5">
                    <div @click="onManualSubmit" class="px-15 cursor-pointer py-1.5 transition-all duration-500 rounded-sm mr-5 bg-green-300 hover:bg-green-200 hover:text-black hover:scale-[1.1] text-green-900 font-bold border-1 border-green-900 dark:bg-green-700 dark:text-green-200 dark:border-green-500 dark:hover:bg-green-600">Lưu lại</div>
                    <router-link :to="{ name: 'admin_sadboizz.cashbook.income_spend.cash_book' }">
                        <div class="px-15 py-1.5 cursor-pointer transition-all duration-500 rounded-sm mr-3 bg-red-300 hover:bg-red-200 hover:text-black hover:scale-[1.1] text-red-900 font-bold border-1 border-red-900 dark:bg-red-700 dark:text-red-200 dark:border-red-500 dark:hover:bg-red-600">Huỷ bỏ</div>
                    </router-link>
                </div>
            </div>
        </div>
    </form>
  
</template>

<style scoped>

</style>
