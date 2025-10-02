<script setup lang="ts">
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    import { user } from '@/constant';
    import { formatMoney, toMySQLDate, toMySQLTimestampLocal, opt_show_img, scrollToTop } from '@/composables'
    const {show_img, img, preview_img, error_img, clear_img } = opt_show_img()
    import { useToast } from 'vue-toastification' 
    const route = useRoute();
    const store = useStore();
    const id = computed(() => route.query.index);
    const detail_users = computed(() => store.getters['admin/user/get_list_detail_user']);
    const detail_user= computed(() => detail_users.value[id.value] );
    const toast = useToast()

    const fetchDetailUser = async (id) => {
        await store.dispatch('admin/user/' + user.get_detail_user, id)
    }
    const fetchEditUser = async (id, formData) => {
        await store.dispatch('admin/user/' + user.edit_user, {id: id, data: formData})
    }
    const tongleEdit = () => {
        edit_user.value = !edit_user.value
    };
    const schema = object({
        name: string().trim().notRequired()
        .test('min-if-not-empty', 'Tên người dùng tối thiểu 5 ký tự', (value) => {
            //có rỗng thì -> true
            //''là false nhưng !false=true;
            return !value || value.length >= 5
        }),
        email: string().notRequired().email('Email không hợp lệ'),
        code: string().trim().notRequired()
        .test('min-if-not-empty', 'Mã người dùng tối thiểu 5 ký tự', (value) => {
            return !value || value.length >= 5
        }),
        date_birth: date().notRequired(),
        gender:  string().notRequired(),
        status: string().notRequired(),
        phone: string().trim().notRequired()
        .test('valid-phone-if-not-empty', 'Số điện thoại không hợp lệ', (value) => {
            if (!value) return true;
            return /^0\d{9}$/.test(value) && value.length >= 10;
        }),
        date_create_account: date().notRequired(),
    })
    const { handleSubmit } = useForm({ 
        validationSchema: schema,
    })
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: code, errorMessage: codeError } = useField('code')
    const { value: date_birth, errorMessage: dateBirthError} = useField('date_birth')
    const { value: gender, errorMessage: genderError } = useField('gender')
    const { value: status } = useField('status');
    const { value: phone, errorMessage: phoneError } = useField('phone')
    const { value: date_create_account, errorMessage: date_create_accountError } = useField('date_create_account')
    const isDark = computed( () => store.state.isDark);
    const edit_user = ref(false);
    
    const onSubmitEditUser = handleSubmit(
        (values) => {
            const formData = new FormData();
            for (const key in values) {
                if(values[key]){
                    if(values[key] && key == 'date_birth' ){
                        formData.append(key, toMySQLDate(values[key]))
                    }   
                    else if (values[key] && (key == 'date_create_account' || key=='date_sign_contrast' || key=='date_effect_contrast' || key =='date_end_contrast')){
                        formData.append(key, toMySQLTimestampLocal(values[key]))
                    }
                    else {
                        formData.append(key, values[key])
                    }
                    
                }

            }
            if(img.value) {
                formData.append('img', img.value)
            }
            if ([...formData.entries()].length === 0) {
                scrollToTop()
                tongleEdit()
                toast.success('Không có thông tin nào được chỉnh sửa')
                
            } else {
                fetchEditUser(id.value, formData);
                scrollToTop()
                tongleEdit()
                toast.success('Thay đổi thông tin khách hàng thành công')
            }
            
        },
        (errors) => {
            console.log(errors)
        }
    )
    const conditions = ref([
        {
            id: 1,
            code: 'status'
        },
        {
            id: 2,
            code: 'lock'
        },
        {
            id: 3,
            code: 'confirm'
        }
    ])
    onMounted(() => {
        if (!detail_user.value || Object.keys(detail_user.value).length === 0) {
            fetchDetailUser(id.value)
            console.log('CALL API')
        } else {
            console.log('Lấy trong getter') // 👉 Object có dữ liệu
        }  
    })
</script>

<template>

    <div class="p-2 bg-emerald-50 dark:bg-gray-900 transition-all duration-500">
        <div class="bg-white dark:bg-gray-800 dark:text-white flex items-center transition-all duration-500 pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2 text-lg">
            <router-link :to="{name: 'admin_sadboizz.employee'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p>Thông tin chi tiết khách hàng</p>
        </div>
        <form action="" class="px-10 mt-5">
            <div class="grid grid-cols-12 p-2 font-(family-name:--font-winky)">
                <div class="col-span-12 ">
                    <div class="grid grid-cols-12">
                        <div class="col-span-7 flex items-center gap-4 ">
                            <div class=" border-black dark:border-gray-500 rounded-full">
                                <div  class=" flex items-center justify-center ">
                                    <img :src="preview_img ? preview_img : detail_user?.img" class="w-25 h-25 object-cover rounded-full" alt="">
                                </div>

                                <label v-if="edit_user" for="uploadimg_user" class="transition-all duration-500 cursor-pointer text-white font-(family-name:--font-winky) mt-2 block py-1.5 px-5 rounded-sm bg-blue-900">
                                    <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                                    <span class="ml-2">Chọn ảnh</span>
                                </label>
                                <input type="file" @change="show_img($event)" id="uploadimg_user"  class="hidden">
                            </div>

                            <div class="flex-1 pr-5 -mt-5 ml-2">
                                <div v-if="edit_user" class="-mt-5">
                                    <input type="text" v-model="name" :placeholder="detail_user?.name" class="w-full border border-gray-300 dark:border-gray-600 rounded-sm py-1 px-2 outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder:italic placeholder:text-gray-500 dark:placeholder-gray-400">
                                    <span class="input-config-error">{{ nameError }}</span>
                                </div>
                                <p v-else class="capitalize  font-bold text-lg text-black dark:text-white">{{ detail_user?.name }}</p>
                                
                                <div v-if="edit_user" class="mt-2">
                                    <input type="text" v-model="email" :placeholder="detail_user?.email" class="w-full border border-gray-300 dark:border-gray-600 rounded-sm py-1 px-2 outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder:italic placeholder:text-gray-500 dark:placeholder-gray-400">
                                    <span class="input-config-error">{{ emailError }}</span>
                                </div>  
                                <p v-else class="italic text-gray-600 dark:text-gray-400 -mt-1">{{ detail_user?.email }}</p>
                                
                            </div>
                        </div>
                        <div v-if="edit_user" @click="tongleEdit()" class="col-span-5 -mt-10 flex  items-center justify-end">
                            <div class="cursor-pointer flex items-center px-3 gap-2  bg-yellow-200 dark:bg-yellow-700 py-1 rounded-sm  border-1 border-yellow-900 dark:border-yellow-600 hover:scale-[1.1] transition-all duration-300  hover:bg-yellow-300 dark:hover:bg-yellow-600">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-200 text-xl" />
                                <p class="font-bold text-yellow-900 dark:text-yellow-200">Huỷ chỉnh sửa</p>
                            </div>
                            
                        </div>
                        <div v-else  @click="tongleEdit()" class="col-span-5 -mt-10 flex items-center justify-end ">
                            <div class="cursor-pointer flex items-center px-3 gap-2  bg-yellow-200 dark:bg-yellow-700 py-1 rounded-sm  border-1 border-yellow-900 dark:border-yellow-600 hover:scale-[1.1] transition-all duration-300  hover:bg-yellow-300 dark:hover:bg-yellow-600">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-200 text-xl" />
                                <p class="font-bold text-yellow-900 dark:text-yellow-200">Chỉnh sửa</p>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div class="col-span-12 transition-all duration-500 bg-white dark:bg-gray-800 mt-5 rounded-t-sm">
                    <div class="border-b-1 border-gray-300 dark:border-gray-600">
                        <p class="font-bold text-lg px-10 py-3 text-black dark:text-white">Chi tiết khách hàng</p>
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="grid grid-cols-12 gap-x-8 gap-y-4 transition-all duration-500 bg-white dark:bg-gray-800 px-10 pt-4 pb-5 rounded-bl-sm">
                        <div class="col-span-6 flex">
                            <label  for="iduser" class="block w-25 text-black dark:text-white">ID</label>
                            <div v-if="edit_user" class="flex-1 -mt-1.5">
                                <input id="iduser" v-model="code" type="text" :placeholder="detail_user?.id" class="w-full border border-gray-300 dark:border-gray-600 rounded-sm py-1 px-2 outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder:italic placeholder:text-gray-500 dark:placeholder-gray-400">
                                <span class="input-config-error">{{ codeError }}</span>
                            </div>
                            <span v-else class="text-black dark:text-gray-300">{{ detail_user?.id }}</span>
                            
                        </div>
                        
                        <div class="col-span-6 flex">
                            <label for="employeestartworkdate"  class="block w-25 font-semibold text-black dark:text-white">Ngày sinh </label>
                            <div v-if="edit_user" class="flex flex-1 -mt-1.5 flex-col" :class="isDark ? 'dark' : 'light' ">
                                <VueDatePicker
                                    v-model="date_birth"
                                    class="dark:bg-gray-700 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-200"
                                    :enable-time-picker="false"
                                    input-class="border border-gray-300 rounded-md px-4 py-2 text-sm "
                                    menu-class="rounded-lg  "
                                    :placeholder="detail_user?.date_birth"
                                    format="dd-MM-yyyy"
                                />
                                <span class="input-config-error"></span>
                            </div>
                            <p v-else class="text-black dark:text-gray-300">{{ detail_user?.date_birth }}</p>
                            
                        </div>
                        <div class="col-span-6 flex">
                            <label for="genderuser" class="block w-25 font-semibold text-black dark:text-white">Giới tính</label>
                            <div v-if="edit_user" class="flex-1 -mt-1.5">
                                <Menu as="div" class="relative block text-left">
                                    <MenuButton class="w-full">
                                        <div class="bg-white dark:bg-gray-700 py-1 mt-1 border border-gray-300 dark:border-gray-600 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                            <span class="text-black dark:text-white">--{{ gender || detail_user?.gender }}--</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" class="text-black dark:text-white" />
                                        </div>
                                    </MenuButton>

                                    <MenuItems  class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg z-50">
                                        <div class="py-1">
                                            <MenuItem class="mb-1 cursor-pointer">
                                                <p @click="gender = 'Nam'" class="block px-2 py-1 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 capitalize">Nam</p>
                                            </MenuItem>
                                            <MenuItem class="mb-1 cursor-pointer">
                                                <p @click="gender = 'Nữ'" class="block px-2 py-1 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 capitalize">Nữ</p>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                            <span v-else class="block text-black dark:text-gray-300">{{ detail_user?.gender }}</span>
                            
                        </div>
                       
                        <div class="col-span-6 flex">
                            <label for="statususer" class="block w-25 font-semibold text-black dark:text-white">Trạng thái</label>
                            <div v-if="edit_user" class="flex-1 -mt-1.5">
                                <Menu as="div" class="relative block text-left">
                                    <MenuButton class="w-full">
                                        <div class="bg-white dark:bg-gray-700 py-1 mt-1 border border-gray-300 dark:border-gray-600 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                            <span class="text-black dark:text-white">--{{ status || detail_user?.status }}--</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" class="text-black dark:text-white" />
                                        </div>
                                    </MenuButton>

                                    <MenuItems  class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg z-50">
                                        <div class="py-1">
                                            <MenuItem v-for="(condition, index) in conditions" :key="index" class="mb-1 cursor-pointer">
                                                <p @click="status = condition.code" class="block px-2 py-1 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 capitalize">
                                                    {{ condition.code }}
                                                </p>
                                            </MenuItem>
                                            
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                            <span v-else  class="block text-black dark:text-gray-300">{{ detail_user?.status }}</span>
                            
                        </div>
                        <div  class="col-span-6 flex">
                            <label for="phoneuser" class="block w-25 text-black dark:text-white">Điện thoại</label>
                            <div v-if="edit_user" class="flex-1 mt-1">
                                <input  v-model="phone" id="phoneuser"  type="text" :placeholder="detail_user?.phone"
                                    class="w-full border border-gray-300 dark:border-gray-600 rounded-sm py-1 px-2 outline-none bg-white dark:bg-gray-700 text-black dark:text-white placeholder:italic placeholder:text-gray-500 dark:placeholder-gray-400">
                                <span class="input-config-error">{{ phoneError }}</span>
                            </div>
                            <span v-else class="block text-black dark:text-gray-300">{{ detail_user?.phone }}</span>
                            
                        </div> 
                        <div  class="col-span-6 flex">
                            <label for="employeestartworkdate"  class="block w-25 font-semibold text-black dark:text-white">Ngày tạo </label>
                            <div v-if="edit_user" class="flex flex-1 flex-col">
                                <VueDatePicker
                                    v-model="date_create_account"
                                    class="dark:bg-gray-700 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-200"
                                    :enable-time-picker="false"
                                    input-class="border border-gray-300 rounded-md px-4 py-2 text-sm "
                                    menu-class="rounded-lg  "
                                    :placeholder="detail_user?.date_create_account"
                                    format="dd-MM-yyyy HH:mm:ss"
                                />
                                <span class="input-config-error"></span>
                            </div>
                            <p v-else class="text-black dark:text-gray-300">{{ detail_user?.date_create_account }}</p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="grid grid-cols-12 gap-x-8 gap-y-4  transition-all duration-500 bg-white dark:bg-gray-800 px-10 py-4 mt-10 rounded-l-sm">
                        <div class="col-span-6 flex">
                            <label for="orderuser" class="block w-60 font-bold text-black dark:text-white">Số đơn hàng đã đặt</label>
                            <span class="block text-black dark:text-gray-300">{{ detail_user?.total_order }}</span>
                        </div>
                        <div class="col-span-6 flex">
                            <label for="spenduser" class="block w-60 text-black dark:text-white">Số tiền đã tiêu dùng</label>
                            <span class="block text-black dark:text-gray-300">{{ formatMoney(detail_user?.money_spend) }}</span>
                        </div>
                        <div class="col-span-6 flex">
                            <label for="successorderuser" class="block w-60 text-black dark:text-white">Số đơn hàng giao thành công</label>
                            <span class="block text-black dark:text-gray-300">{{ detail_user?.total_order_success }}</span>
                        </div>
                        <div class="col-span-6 flex">
                            <label for="cancelorderuser" class="block w-60 font-semibold text-black dark:text-white">Số đơn hàng bị huỷ</label>
                            <span class="block text-black dark:text-gray-300">{{ detail_user?.total_order_cancel }}</span>
                        </div>
                        <div class="col-span-6 flex">
                            <label for="cartitems" class="block w-60 text-black dark:text-white">Số sản phẩm trong giỏ hàng</label>
                            <span class="block text-black dark:text-gray-300">{{ detail_user?.number_carts }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-12">
                    <div class="grid grid-cols-12 gap-x-8 gap-y-4 transition-all duration-500 bg-white dark:bg-gray-800 px-10 py-4 mt-10 rounded-l-sm">
                        <div class="col-span-6 flex" >
                            <label for="ratinguser" class="block w-60 font-bold text-black dark:text-white">Số lần đánh giá</label>
                            <span class="block text-black dark:text-gray-300">{{ detail_user?.comment_count }}</span>
                        </div>
                        <div  class="col-span-6  flex">
                            <label for="customeruser" class="block w-40 text-black dark:text-white">Khách hàng</label>
                            <span class="block text-black dark:text-gray-300">{{ detail_user?.type }}</span>
                            <div class="flex-1 -mt-2 hidden">
                                <Menu as="div" class="relative block text-left">
                                    <MenuButton class="w-full">
                                        <div
                                            class="bg-white dark:bg-gray-700 py-1 mt-1 border border-gray-300 dark:border-gray-600 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>--123--</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                    </MenuButton>
                                    <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                                        <div class="py-1">
                                            <MenuItem  class="mb-1 cursor-pointer">
                                                <p   class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize text-black dark:text-white"></p>
                                            </MenuItem>
                                            
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div  class="col-span-6 flex">
                            <span class="block w-60 text-black dark:text-white">
                                Mã giảm giá dành riêng
                            </span>
                            <div class="flex-1 -mt-2">
                                <Menu as="div" class="relative block text-left">
                                    <MenuButton class="w-full">
                                        <div
                                            class="bg-white dark:bg-gray-700 py-2 mt-3 border border-gray-300 dark:border-gray-600 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span></span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                    </MenuButton>

                                    <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                                        <div class="py-1">
                                            <MenuItem v-for="(voucher, index) in detail_user?.vouchers_user" :key="index" class="mb-1 cursor-pointer">
                                                <p class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize text-black dark:text-white"> {{ voucher.code }} - {{ voucher.name }} </p>
                                            </MenuItem>
                                        
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="edit_user" class="col-span-12 mt-5 transition-all duration-500 flex items-center bg-white dark:bg-gray-800 p-10">
                    <div @click="onSubmitEditUser()" class="px-15 cursor-pointer py-1.5 rounded-sm mr-5 bg-green-300 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 hover:text-black dark:hover:text-white hover:scale-[1.1] duration-300 transition-all text-green-900 dark:text-green-200 font-bold border border-green-900 dark:border-green-500">
                        Lưu lại
                    </div>
                    
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
