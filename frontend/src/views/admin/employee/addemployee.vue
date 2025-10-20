<script setup>
import { useForm, useField } from 'vee-validate'
import { object, string, date, number } from 'yup'
import { opt_show_img, randomString, toMySQLDate, toMySQLTimestampLocal } from '@/composables';
import { employee } from '@/constant'
import { useToast } from 'vue-toastification'
const toast = useToast()
const store = useStore();
const router = useRouter();
const { show_img, img, preview_img, error_img, clear_img } = opt_show_img();


const fetchAddEmployee = async (formData) => {
    const result = await store.dispatch('admin/employee/' + employee.add_employee, formData)  
    if(result.status === 422) {
       errorValidation.value = result.message;
    }
    else if(result.status === 403) {
        toast.error(result.message)
        errorValidation.value = {}
    }
    else {
        errorValidation.value= {}
        toast.success('Thêm nhân viên thành công')
        setTimeout(() => {
            router.push({name: 'admin_sadboizz.employee'})
        }, 1000)
    }
}

const schema = object({
    code: string().required('Mã nhân viên không được bỏ trống').trim().min(10, 'Mã nhân viên tối thiểu 10 ký tự'),
    name: string().required('Tên nhân viên không được bỏ trống').trim().min(5, 'Tên nhân viên tối thiểu 5 ký tự'),
    gender: string().required('Vui lòng chọn giới tính'),
    date_birth: date().required('Vui lòng chọn ngày sinh') ,
    phone: string().required('Số điện thoại không được để trống').matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
    email: string().required('Bắt buộc nhập email').email('Email không hợp lệ'),
    address: string().required('Bắt buộc nhập địa chỉ').trim().min(15, 'Địa chỉ nhân viên tối thiểu 15 ký tự'),
    diploma: string().notRequired(),
    status: string().notRequired(),
    position_id: string().required('Vị trí công việc không được để trống'),
    department_id: string().required('Phòng ban không được để trống'),
    date_start_work: string().required('Ngày bắt đầu làm việc không được để trống'),
    contrast_id: string().required('Hợp đồng không được để trống'),
    work_shift_id: string().required('Ca làm việc không được để trống'),
    salary: number().typeError('Lương phải là một số') .required('Bắt buộc nhập lương cơ bản').min(0, 'Lương không được âm'),
    grant_id: string().required('Phụ cấp không được để trống'),
    password: string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .max(32, "Mật khẩu tối đa 32 ký tự")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số")
        .matches(/[@$!%*?&]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
})

const { handleSubmit } = useForm({ 
    validationSchema: schema,
    initialValues: {
        code: randomString(11),
        name: 'trần đình duy',
        email: 'duytran@gmail.com',
        address: 'quận hoàng mai, vinhx hưng',
        phone: '0988870434',
        salary: 12345678,
        gender: 'Nam',
        diploma: 'NULL',
        status: 'NULL',
        //date_birth: '2025-08-21',
        position_id: 1,
        department_id: 2,
        //date_start_work: '2025-08-21 12:12:12',
        contrast_id: 3,
        work_shift_id: 3,
        grant_id: 2
    }
})
const { value: code, errorMessage: codeError } = useField('code')
const { value: name, errorMessage: nameError } = useField('name')
const { value: gender, errorMessage: genderError } = useField('gender')
const { value: date_birth, errorMessage: dateBirthError} = useField('date_birth')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: email, errorMessage: emailError } = useField('email')
const { value: address, errorMessage: addressError } = useField('address')
const { value: diploma } = useField('diploma');
const { value: status } = useField('status');
const { value: position_id, errorMessage: positionError } = useField('position_id')
const { value: department_id, errorMessage: departmentError } = useField('department_id')
const { value: date_start_work, errorMessage: date_start_workError } = useField('date_start_work')
const { value: contrast_id, errorMessage: contrastError } = useField('contrast_id')
const { value: work_shift_id, errorMessage: work_shiftError } = useField('work_shift_id')
const { value: salary, errorMessage: salaryError } = useField('salary')
const { value: grant_id, errorMessage: grantError } = useField('grant_id')
 const { value: password, errorMessage: passwordError } = useField('password')
// const { value: salary, errorMessage: salaryError } = useField('salary')
const onManualSubmit = handleSubmit(
    (values) => {
        const formData = new FormData();
        for (const key in values) {
            if(key=== 'date_birth'){
                formData.append(key, toMySQLDate(values[key]) )
            }
            else if(key=== 'date_start_work')
            {
                formData.append(key, toMySQLDate(values[key]) )
            }
            else 
            {
                formData.append(key, values[key])
            }
            
        }
        if(img.value) {
            formData.append('img', img.value)
        }
        fetchAddEmployee(formData)
        
    },
    (errors) => {
        toast.error('Thêm nhân viên thất bại')
    }
)

const fetchInforWork = async () => {
    await store.dispatch('admin/employee/' + employee.get_infor_work)
        
}
const isDark = computed( () => store.state.isDark);
const diplomas= computed(() => store.getters['admin/employee/get_diplomas']);
const status_employee = computed(() => store.getters['admin/employee/get_status']);
const position_employee = computed(() => store.getters['admin/employee/get_positions']);
const department_employee = computed(() => store.getters['admin/employee/get_departments']);
const contrast_employee = computed(() => store.getters['admin/employee/get_contrasts']);
const work_shift_employee = computed(() => store.getters['admin/employee/get_work_shifts']);
const grant_employee = computed(() => store.getters['admin/employee/get_grants'])
const show_password = ref(false)
const errorValidation = ref({});
onMounted(() => {
    fetchInforWork()
})
</script>

<template>
    <div class="bg-[#E0F2F7] dark:bg-gray-800 transition-all duration-500 -m-2 p-2 h-[90rem]">
        
        <div class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
            <router-link :to="{name: 'admin_sadboizz.employee'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-1 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p class="ml-1">Thêm nhân viên mới</p>
        </div>
        <div class="flex items-center mt-7 pb-3 border-b-1 border-[var(--color_border)] dark:border-gray-600">
            <Dialog>
                <DialogTrigger>
                    <div class="flex items-center bg-green-400 px-3 py-1.5 rounded-sm mr-3 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:scale-105 dark:bg-green-600 dark:hover:bg-green-700">
                        <font-awesome-icon :icon="['fas', 'folder-plus']" />
                        <p class="ml-1">Thêm chức vụ mới</p>
                    </div>
                </DialogTrigger>
                <DialogContent class="dark:bg-gray-800 dark:text-white">
                    <DialogHeader>
                        <DialogTitle>
                            <p class="text-[1.3rem] pb-3 border-b-1 border-[var(--color_border)] dark:border-gray-600">Thêm chức vụ mới</p>
                        </DialogTitle>
                        <DialogDescription>
                            <div class="flex flex-col mt-4">
                                <label for="Newprovider" class="text-black font-bold dark:text-gray-200">Nhập tên chức vụ mới</label>
                                <input type="text" id="Newprovider" class="border-1 border-[var(--color_border)] rounded-[0.2rem] outline-0 px-2 py-2 mt-1.5 bg-[var(--background-color-gray)] text-black dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <span class="mt-1 text-red-500 dark:text-red-400">Vui lòng nhập tên chức vụ mới</span>
                            </div>
                            <div class="mt-3 text-black dark:text-gray-200">
                                <p class="font-bold">Danh sách các chức vụ hiện nay</p>
                                <ul class="list-disc ml-3 mt-1">
                                    <li>Chức vụ A</li>
                                    <li>Chức vụ B</li>
                                </ul>
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose as-child>
                            <button class="bg-green-200 px-8 border-1 border-green-900 py-2 rounded-sm cursor-pointer font-bold text-green-900 dark:bg-green-600 dark:text-white dark:border-green-700 hover:bg-green-300 dark:hover:bg-green-700">
                                Lưu lại
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
        </div>
        <form class="mt-4" >
            <div class="grid grid-cols-12 gap-5 ">
                <div class="col-span-12 text-lg flex items-center justify-start text-orange-500 dark:text-orange-400">
                    <font-awesome-icon :icon="['fas', 'table-columns']" class="mr-2" />
                    <p class="font-bold underline underline-offset-8">Thông tin nhân viên</p>
                </div>
                <div class="col-span-12">
                    <p v-for="(value, key, index) in errorValidation" :key="key" class="text-red-500">
                        {{ value[0] }}
                    </p>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="idemployee" class="cursor-pointer font-bold text-black dark:text-white">ID nhân viên</label>
                    <input v-model="code"  placeholder="E001" type="text" id="idemployee" class="bg-white transition-all duration-500  border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                    <span class="input-config-error text-red-500 dark:text-red-400"></span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="nameemployee" class="cursor-pointer font-bold dark:text-white">Họ và tên</label>
                    <input v-model="name" placeholder="Nguyễn Trần Cường" type="text" name="name" id="nameemployee" class="bg-white transition-all duration-500 border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 ">
                    <span class="input-config-error text-red-500 dark:text-red-400">{{ nameError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold text-black dark:text-white">Giới tính</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{gender || ' Chọn giới tính ' }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem  class="mb-1 cursor-pointer">
                                    <p @click="gender = 'Nam'" class="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[0.2rem]">Nam</p>
                                </MenuItem>
                                <MenuItem  class="mb-1 cursor-pointer">
                                    <p @click="gender = 'Nữ'" class="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[0.2rem]">Nữ</p>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error dark:text-red-400">{{ genderError }}</span>
                </div>
                <div class="col-span-3 flex flex-col " :class="isDark ? 'dark' : 'light' " >
                    <label class="cursor-pointer font-bold dark:text-white">Ngày sinh</label>
                    <VueDatePicker
                        class="dark:bg-gray-800 bg-white transition-all duration-500 mt-1 rounded-sm dark:text-white"
                        v-model="date_birth"
                        :enable-time-picker="false"
                        format="yyyy-MM-dd"
                        input-class=""
                        menu-class=""
                    />
                    
                    <span class="input-config-error dark:text-red-400" >{{ dateBirthError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="phoneeployee" class="cursor-pointer font-bold dark:text-white">Số điện thoại</label>
                    <input v-model="phone" placeholder="0988870434" type="text" name="phone" id="phoneeployee" class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white dark:border-gray-600   border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 ">
                    <span class="input-config-error dark:text-red-400">{{ phoneError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="emailemployee" class="cursor-pointer font-bold dark:text-white">Địa chỉ email</label>
                    <input v-model="email" placeholder="nguyentrancuong58@gmail.com" type="text" name="" id="emailemployee" class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 ">
                    <span class="input-config-error dark:text-red-400">{{ emailError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="addressemployee" class="cursor-pointer font-bold dark:text-white">Địa chỉ thường chú</label>
                    <input v-model="address" placeholder="ngõ 259 vĩnh hưng" type="text" name="" id="addressemployee" class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 ">
                    <span class="input-config-error">{{ addressError }}</span>
                </div>
                
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Bằng cấp</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{ diploma === 'NULL' ? ' Chọn bằng cấp ' : diploma}}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                        <MenuItems class="absolute dark:bg-gray-800 dark:text-white left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(diploma_sad, key) in diplomas" :key="key" class="mb-1 cursor-pointer">
                                    <p @click="diploma = key" class="block px-2 py-1 rounded-[0.2rem] dark:hover:bg-gray-700 hover:bg-[var(--background-color-gray)]  capitalize">
                                       {{ key }} - {{ diploma_sad }}
                                    </p>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error"></span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Tình trạng nhân viên</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="bg-white transition-all duration-500 border-1 dark:bg-gray-800 dark:text-white border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>-- {{ status === 'NULL' ? ' Chọn tình trạng ' : status }} --</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                        <MenuItems class="absolute dark:bg-gray-800 dark:text-white left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(status_sad, key) in status_employee" :key="key" class="mb-1 cursor-pointer">
                                    <p @click="status = key" class="block dark:hover:bg-gray-700 px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] capitalize">
                                        {{ key }} - {{ status_sad }}
                                    </p>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error dark:text-red-400"></span>
                </div>
                <div class="col-span-12">
                    <p class="font-bold mb-3 text-black dark:text-white">Ảnh 3x4 nhân viên</p>
                    <label for="uploadimg_employee" class="cursor-pointer text-white font-(family-name:--font-winky) py-2 px-10 rounded-sm bg-blue-900 dark:bg-blue-700 dark:text-gray-100">
                        <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                        <span class="ml-2">Chọn ảnh</span>
                    </label>
                    <input @change="show_img($event)" type="file"  id="uploadimg_employee" class="hidden">
                    <div  class="flex items-center flex-wrap mt-5">
                        <div v-show="preview_img" class="mr-5 relative">
                            <font-awesome-icon
                                @click="clear_img"
                                class="absolute -right-2 -top-2 px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 z-10" 
                                :icon="['fas', 'xmark']" 
                            />
                            <img  :src="preview_img" 
                                class="w-25 h-20 border-1 border-black dark:border-gray-500 rounded-sm" 
                                alt="Employee photo">
                        </div>
                    </div>
                </div>
                <div class="col-span-12 text-lg flex items-center justify-start text-orange-500 dark:text-orange-400 mt-5">
                    <font-awesome-icon :icon="['fab', 'creative-commons-nd']" class="mr-2" />
                    <p class="font-bold underline underline-offset-8">Thông tin công việc</p>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Chức vụ</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span class="dark:text-gray-300">-- {{ position_employee.find(position => position.id === position_id)?.name || 'Chọn chức vụ' }} --</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" class="dark:text-gray-300" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 dark:bg-gray-800 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(position_sad, index) in position_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="position_id = position_sad.id" class="block px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 capitalize text-black dark:text-white">
                                        {{ position_sad.code }} - {{ position_sad.name }}
                                    </p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ positionError }}</span>
                </div>

                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Phòng ban</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span class="dark:text-gray-300">-- {{ department_employee.find(employee => employee.id === department_id )?.name || 'Chọn phòng ban' }} --</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" class="dark:text-gray-300" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 dark:bg-gray-800 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(department_sad, index) in department_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="department_id = department_sad.id" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem] text-black dark:text-white">
                                        {{ department_sad.code }} - {{ department_sad.name }}
                                    </p>
                                </MenuItem>
                               
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ departmentError  }}</span>
                </div>
                <div class="col-span-3 flex flex-col " :class="isDark ? 'dark' : 'light' " >
                    <label class="cursor-pointer font-bold dark:text-white">Ngày bắt đầu làm việc</label>
                    <VueDatePicker
                        v-model="date_start_work"
                        class="dark:bg-gray-800 bg-white transition-all duration-500 mt-1 rounded-sm dark:text-white"
                        :enable-time-picker="false"
                        input-class="border border-gray-300 rounded-md px-4 py-2 text-sm dark:text-white"
                        format="dd-MM-yyyy HH:mm:ss"
                    />
                    <span class="input-config-error">{{ date_start_workError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Hợp đồng lao động</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white  dark:border-gray-600 border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>-- {{contrast_employee.find(contrast => contrast.id === contrast_id)?.name || 'Chọn hợp đồng'}} --</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 dark:bg-gray-800 dark:text-white w-full p-1 origin-top-right bg-white transition-all duration-500 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(contrast_sad, index) in contrast_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="contrast_id = contrast_sad.id" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700  rounded-[0.2rem]">
                                        {{ contrast_sad.code }} - {{ contrast_sad.name }}
                                    </p>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ contrastError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Ca làm việc</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="bg-white transition-all duration-500 border-1 dark:bg-gray-800 dark:text-white border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>-- {{ work_shift_employee.find(work_shift => work_shift.id === work_shift_id)?.name || 'Chọn ca làm việc' }} --</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute dark:bg-gray-800 dark:text-white left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(work_shift_sad, index) in work_shift_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="work_shift_id = work_shift_sad.id" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem]">
                                        {{ work_shift_sad.code }} - {{ work_shift_sad.name }}
                                    </p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ work_shiftError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="salary" class="cursor-pointer font-bold dark:text-white">Lương cơ bản</label>
                    <input v-model="salary" placeholder="10000000 VNĐ" type="number" name="" id="salary" class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 ">
                    <span class="input-config-error dark:text-red-400">{{ salaryError }}</span>
                </div>
                <div class="col-span-3 flex flex-col ">
                    <label for="" class="font-bold dark:text-white">Phụ cấp</label>
                    <Menu as="div" class="relative block text-left ">
                        <MenuButton class="w-full ">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>-- {{ grant_employee.find(grant => grant.id === grant_id)?.name || 'Chọn phụ cấp' }} --</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute dark:bg-gray-800 dark:text-white left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(grant_sad, index) in grant_employee " :key="index" class="mb-1 cursor-pointer">
                                    <p @click="grant_id = grant_sad.id" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem]">
                                        {{ grant_sad.code }} - {{ grant_sad.name }}
                                    </p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ grantError }}</span>
                </div>
                <div class="col-span-3 items-end">
                    <div class="relative">
                        <label for="password" class="cursor-pointer font-bold dark:text-white">Mật khẩu</label>      
                        <input v-model="password" :type="show_password ? 'type' : 'password'" class="border-1 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-all duration-500 outline-none border-[var(--color_border)] w-full rounded-sm px-2.5 py-1.5" placeholder="Password">
                        <span class="text-sm text-red-500 mt-1">{{ passwordError }}</span>
                        <div class="text-gray-500 text-lg cursor-pointer absolute right-2 top-7 w-5 h-5">
                            <font-awesome-icon v-if="show_password" @click="show_password = false " :icon="['fa-solid', 'fa-eye-slash']" />
                            <font-awesome-icon v-else @click="show_password = true " :icon="['fas', 'eye']" />
                        
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-span-12 flex items-center mt-5">
                    <div @click="onManualSubmit()"  class="particle-deconstruct-container cursor-pointer flex justify-center items-center h-20">
                        <div class="particle-deconstruct-element relative overflow-hidden flex justify-center items-center w-50 h-10 border-1 border-black bg-green-300 dark:bg-gray-700 rounded-sm">
                            <h2 class="relative text-black  dark:text-blue-300 z-2 transition-all duration-500 font-(family-name:--font-inter) font-bold">LƯU LẠI</h2>
                        </div>
                    </div>
                    <!-- <router-link :to="{ name: 'employee_ad', params: {} }">
                         <div class="px-15 py-1.5 cursor-pointer rounded-sm mr-3 bg-red-300 dark:bg-red-600 hover:bg-red-200 dark:hover:bg-red-700 hover:text-black dark:hover:text-white hover:scale-[1.1] duration-300 transition-all text-red-900 dark:text-white font-bold border-1 border-red-900 dark:border-red-800">Huỷ bỏ</div>
                    </router-link> -->
                </div>
            </div>

        </form>

    </div>
    
</template>

<style scoped>

:deep(.dp__input) {
    height: 2rem; /* h-10 */
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


.particle-deconstruct-element::before,
.particle-deconstruct-element::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-radial-gradient(
    circle at center, 
    #0ff 1px, 
    transparent 2px, 
    transparent 50px
  );
  opacity: 0;
  transition: all 0.5s ease;
}

.particle-deconstruct-element:hover h2 {
  transform: scale(1.5) rotate(360deg);
  opacity: 0;
}

.particle-deconstruct-element:hover::before {
  transform: scale(2) rotate(45deg);
  opacity: 0.3;
}

.particle-deconstruct-element:hover::after {
  transform: scale(2) rotate(-45deg);
  opacity: 0.3;
}
</style>