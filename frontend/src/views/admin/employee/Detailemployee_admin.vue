<script setup lang="ts">
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number, mixed } from 'yup'
    import { scrollToTop, opt_show_img, toMySQLDate, toMySQLTimestampLocal } from '@/composables'
    import { useToast } from 'vue-toastification' 
    import { employee } from '@/constant'
    const toast = useToast()
    const store = useStore();
    const route = useRoute();
    const id=route.query.index;
    const { show_img, img,preview_img,  error_img, clear_img } = opt_show_img()
    const diploma_employee = computed(() => store.getters['admin/employee/get_diplomas']);
    const status_employee = computed(() => store.getters['admin/employee/get_status']);
    const contrast_employee = computed(() => store.getters['admin/employee/get_contrasts']);
    const position_employee = computed(() => store.getters['admin/employee/get_positions']);
    const department_employee = computed(() => store.getters['admin/employee/get_departments']);
    const work_shift_employee = computed(() => store.getters['admin/employee/get_work_shifts']);
    const grant_employee = computed(() => store.getters['admin/employee/get_grants'])
    const detail_employees = computed(() => store.getters['admin/employee/get_list_detail_employee'])

    const fetchDetailEmployee = async (id) => {
        await store.dispatch('admin/employee/' + employee.get_detail_employee, id)
    }
    const fetchInforWork = async () => {
        await store.dispatch('admin/employee/' + employee.get_infor_work)  
    }
    const fetchHandleEdit=  async (id, formData) =>
    {
        await store.dispatch('admin/employee/' + employee.edit_employee, {id: id, data: formData})
    }
    const tongle_edit =  () => {
        edit_employee.value = !edit_employee.value
        resetForm()
        preview_img.value=''
        
    }
    const detail_employee= computed(() => detail_employees.value[id] );

   
    const edit_employee=  ref(false);
    const schema = object({
        name: string().trim().notRequired()
        .test('min-if-not-empty', 'Tên nhân viên tối thiểu 5 ký tự', (value) => {
            //có rỗng thì -> true
            //''là false nhưng !false=true;
            return !value || value.length >= 5
        }),
        email: string().notRequired().email('Email không hợp lệ'),
        address: string().trim().notRequired()
        .test('min-if-not-empty', 'Địa chỉ nhân viên tối thiểu 15 ký tự', (value) => {
            return !value || value.length >= 15
        }),
        code: string().trim().notRequired()
        .test('min-if-not-empty', 'Mã nhân viên tối thiểu 5 ký tự', (value) => {
            return !value || value.length >= 5
        }),
        phone: string().trim().notRequired()
        .test('valid-phone-if-not-empty', 'Số điện thoại không hợp lệ', (value) => {
            if (!value) return true;
            return /^0\d{9}$/.test(value) && value.length >= 10;
        }),
        gender:  string().notRequired(),
        diploma: string().notRequired(),
        status: string().notRequired(),
        date_birth: date().notRequired(),
        date_start_work: date().notRequired(),
        date_sign_contrast: date().notRequired(),
        date_effect_contrast: date().notRequired(),
        date_end_contrast: date().notRequired(),
        position_id: string().notRequired(),
        department_id: string().notRequired(),
        grant_id: string().notRequired(),
        contrast_id: string().notRequired(),
        work_shift_id: string().notRequired(),
        salary: string().trim().notRequired()
        .test('valid-salary-if-not-empty', 'Vui lòng nhập tối thiểu 7 số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value) && value.length>=7;
        }),
        password: string().trim().notRequired()
        .test('valid-password-if-not-empty', 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt', (value) => {
            if (!value) return true;
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) && value.length>=8;
        })
    })

    const { handleSubmit, resetForm } = useForm({ 
        validationSchema: schema,
        
    })
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: email, errorMessage: emailError } = useField('email')
    const { value: address, errorMessage: addressError } = useField('address')
    const { value: code, errorMessage: codeError } = useField('code')
    const { value: phone, errorMessage: phoneError } = useField('phone')
    const { value: gender, errorMessage: genderError } = useField('gender')
    const { value: date_birth, errorMessage: dateBirthError} = useField('date_birth')
    const { value: diploma } = useField('diploma')
    const { value: status } = useField('status');
    const { value: date_start_work, errorMessage: date_start_workError } = useField('date_start_work')
    const { value: contrast_id, errorMessage: contrastError } = useField('contrast_id')
    const { value: date_sign_contrast, errorMessage: date_sign_contrastError } = useField('date_sign_contrast')
    const { value: date_effect_contrast, errorMessage: date_effect_contrastError } = useField('date_effect_contrast')
    const { value: date_end_contrast, errorMessage: date_end_contrastError } = useField('date_end_contrast')
    const { value: salary, errorMessage: salaryError } = useField('salary')
    const { value: position_id, errorMessage: positionError } = useField('position_id')
    const { value: department_id, errorMessage: departmentError } = useField('department_id')
    const { value: grant_id, errorMessage: grantError } = useField('grant_id')
    const { value: password, errorMessage: passwordError } = useField('password')
    const { value: work_shift_id, errorMessage: work_shiftError } = useField('work_shift_id')
    const handleEditEmployee = handleSubmit(
        (values) => {
            const formData = new FormData();
            
            for (const key in values) {
                if(values[key]){
                    if(key == 'date_birth' ){
                        formData.append(key, toMySQLDate(values[key]))
                    }   
                    else if ((key == 'date_start_work' || key=='date_sign_contrast' || key=='date_effect_contrast' || key =='date_end_contrast')){
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
                tongle_edit()
                toast.success('Không có thông tin nào được chỉnh sửa')
            } 
            else {
                fetchHandleEdit(id, formData)
                scrollToTop()
                tongle_edit()
                toast.success('Thay đổi thông tin nhân viên thành công')
            }
            
        },
        (errors) => {
            toast.error('Thêm nhân viên thất bại')
        }
    )

    const isDark = computed( () => store.state.isDark);
    onMounted(() => {
        fetchInforWork()
        // detail_employee.value=detail_employees.value[id];
        if (!detail_employee.value || Object.keys(detail_employee.value).length === 0) {
            fetchDetailEmployee(id)
            console.log('CALL API')
        } else {
            console.log('Lấy trong getter') // 👉 Object có dữ liệu
        }  
    })
    
</script>

<template>
    <div class="p-2 ">
        <div class="bg-white dark:bg-gray-800 dark:text-white flex items-center pl-3 border-l-5 mb-4 border-[var(--maincolor)] transition-all duration-500 dark:border-[var(--dark_maincolor)] font-bold mt-2">
            <router-link :to="{name: 'admin_sadboizz.employee'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p>Thông tin chi tiết nhân viên</p>
        </div>
        <div class="grid grid-cols-12 bg-white transition-all duration-500 dark:bg-gray-800 dark:text-gray-200 font-(family-name:--font-inter) mx-10 py-7 ">
            <div class="col-span-3 px-7 mb-2">
                <div  class=" flex items-center justify-center ">
                    <img :src=" preview_img ? preview_img: detail_employee?.img" class="w-25 h-25 object-cover rounded-full" alt="">
                </div>

                <label v-if="edit_employee" for="uploadimg_employee" class="transition-all duration-500 cursor-pointer text-white font-(family-name:--font-winky) mt-4 block py-1.5 px-5 rounded-sm bg-blue-900">
                    <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                    <span class="ml-2">Chọn ảnh</span>
                </label>
                <input type="file" @change="show_img($event)" id="uploadimg_employee" class="hidden">
            </div>
            <!-- mt-2 cho label khi edir -->
            <div class="col-span-9 px-7">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <input v-if="edit_employee" v-model="name" :placeholder="detail_employee?.name" class="mb-2 outline-none w-[65%] dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) ">
                        <p v-else class="text-lg font-bold -mt-2 ">{{ detail_employee?.name }}</p>
                        <span class="input-config-error block -mt-1">{{ nameError }}</span>
                    </div>
                   
                    <div v-if="edit_employee" @click="tongle_edit()" class="cursor-pointer flex items-center px-3 gap-2 bg-yellow-200 dark:bg-yellow-600 py-1 rounded-sm border-1 border-yellow-900 dark:border-yellow-800 hover:scale-[1.1] transition-all duration-500 hover:bg-yellow-300 dark:hover:bg-yellow-500">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-100 text-xl" />
                        <p class="font-bold text-yellow-900 dark:text-yellow-100">Huỷ chỉnh sửa</p>
                       
                    </div>
                    <div v-if="detail_employee && edit_employee == false" @click="tongle_edit()" class="cursor-pointer flex items-center px-3 gap-2 bg-yellow-200 dark:bg-yellow-600 py-1 rounded-sm border-1 border-yellow-900 dark:border-yellow-800 hover:scale-[1.1] transition-all duration-500 hover:bg-yellow-300 dark:hover:bg-yellow-500">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-100 text-xl" />
                        <p class="font-bold text-yellow-900 dark:text-yellow-100">Chỉnh sửa</p>
                       
                    </div>
                    
                </div>
                <!-- khi edit thì chinhr mt-2  -->
                <div class="flex items-center  mt-2 text-sm gap-x-10">
                    <div class="flex-1 items-center ">
                        <label for="emailemployee" class="mr-2 text-gray-500 cursor-pointer block ">Email </label>
                        <div v-if="edit_employee" class="flex flex-col ">
                            <input v-model="email" :placeholder="detail_employee?.email" id="emailemployee" type="text" class=" w-full h-8 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1.5 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " >
                            <span class="input-config-error">{{ emailError }}</span>
                        </div>
                        <p v-else class="italic w-full ">{{ detail_employee?.email }}</p>
                        
                    </div>
                    <div class="flex-1 ml-5">
                        <!-- <label for="addressemployee" :class="edit_employee ? '' : 'mt-2'" class="mr-2 text-gray-500 cursor-pointer block ">Địa chỉ </label> -->
                        <label for="addressemployee"  class="mr-2 text-gray-500 cursor-pointer block ">Địa chỉ </label>
                        <div v-if="edit_employee" class="flex flex-col">
                            <input v-model="address" :placeholder="detail_employee?.address" id="addressemployee"   type="text" class=" w-full h-8 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " >
                            <span class="input-config-error">{{ addressError }}</span>
                        </div>
                        <p v-else class="italic w-full ">{{ detail_employee?.address  }}</p>
                        
                    </div>
                    
                </div>
            </div>
            <div class="col-span-3  items-center text-sm mt-3 px-7">
                <label for="idemployee" class="mr-2 text-gray-500 cursor-pointer  block">Mã nhân viên</label>
                <div v-if="edit_employee" class="flex flex-col">
                    <input v-model="code" :placeholder="detail_employee?.code" id="idemployee" type="text" class="outline-none h-8 dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1.5 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) ">
                    <span class="input-config-error">{{ codeError }}</span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.code }}</p>
                
            </div>
            <div class="col-span-3 items-center  text-sm mt-3 px-7">
                <label for="phonenumberemployee" class="mr-2 text-gray-500 cursor-pointer  block">Số điện thoại </label>
                <div v-if="edit_employee" class="flex flex-col">
                    <input v-model="phone" :placeholder="detail_employee?.phone" id="phonenumberemployee" type="text" class="outline-none h-8 dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " >
                    <span class="input-config-error">{{ phoneError }}</span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.phone }}</p>
                
            </div>
            <div class="col-span-3 items-center text-sm mt-3 px-7 dark:text-gray-300">
                <label for="employeegender" class="mr-2 text-gray-500 cursor-pointer block dark:text-gray-400">Giới tính </label>
                <div v-if="edit_employee" class="flex flex-col mt-1">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white border border-[var(--color_border)] py-1 h-8 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:border-gray-700" >
                                <span>--{{ gender || detail_employee?.gender }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                    <MenuItems class="absolute left-0 mt-3 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
                        <div class="py-1">
                            <MenuItem class="mb-1 cursor-pointer">
                                <p @click="gender = 'Nam'" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> Nam </p>
                            </MenuItem>
                            <MenuItem class="mb-1 cursor-pointer">
                                <p @click="gender = 'Nữ'" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> Nữ </p>
                            </MenuItem>
                        </div>
                    </MenuItems>
                    </Menu>
                </div>
                <p v-else class="italic mt-1">{{ detail_employee?.gender }}</p>
                
            </div>
            <div class="col-span-3 items-center  text-sm mt-3 px-7" :class="isDark ? 'dark' : 'light' ">
                <label for="employeedateofbirth" class="mr-2 text-gray-500 cursor-pointer block  ">Ngày sinh </label>
                <div v-if="edit_employee" class="flex h-8 flex-col">
                    <VueDatePicker
                        class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                        v-model="date_birth"
                        :enable-time-picker="false"
                        input-class="border border-gray-300 rounded-md px-7 py-2 text-sm "
                        menu-class="rounded-lg  "
                        :placeholder="detail_employee?.date_birth"
                        format="dd-MM-yyyy"
                    />
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1">{{ detail_employee?.date_birth }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="items-center text-sm mt-3 px-7 dark:text-gray-300">
                <label for="employeegender" class="mr-2 text-gray-500 cursor-pointer block dark:text-gray-400">Bằng cấp </label>
                <div v-if="edit_employee" class="flex flex-col mt-1 ">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white border border-[var(--color_border)] py-1 h-8 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:border-gray-700" >
                                <span>--{{ diploma || detail_employee?.diploma }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                    <MenuItems class="absolute left-0 mt-3 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
                        <div class="py-1">
                            <MenuItem v-for="(value, key) in diploma_employee" :key="key" class="mb-1 cursor-pointer">
                                <p @click="diploma = key" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> 
                                    {{ key }} - {{ value }}
                                    </p>
                            </MenuItem>
                        </div>
                    </MenuItems>
                    </Menu>
                </div>
                <p v-else class="italic mt-1">{{ diploma_employee[detail_employee?.diploma] }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="items-center text-sm mt-3 px-7 dark:text-gray-300">
                <label for="employeegender" class="mr-2 text-gray-500 cursor-pointer block dark:text-gray-400">Tình trạng nhân viên </label>
                <div v-if="edit_employee" class="flex flex-col mt-1">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white border border-[var(--color_border)] py-1 h-8 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:border-gray-700" >
                                <span>--{{ status || detail_employee?.status }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                    <MenuItems class="absolute left-0 mt-3 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50 dark:bg-gray-900 dark:border-gray-700">
                        <div class="py-1">
                            <MenuItem v-for="(value, key) in status_employee" :key="key" class="mb-1 cursor-pointer">
                                <p @click="status = key" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem] dark:hover:bg-gray-700"> 
                                    {{ key }} - {{ value }} 
                                </p>
                            </MenuItem>
                            
                        </div>
                    </MenuItems>
                    </Menu>
                </div>
                <p v-else class="italic mt-1">{{ status_employee[detail_employee?.status] }}</p>
                
            </div>
            <!--  -->
            <div class="col-span-12 mt-7  border-b-1 border-[var(--color_border)] "></div>
            <div class="col-span-12 flex items-center gap-2 mt-5 mb-2 px-8">
                <font-awesome-icon :icon="['fab', 'get-pocket']" class="text-2xl text-gray-500 dark:text-white" />
                <p class="text-lg font-bold">Thông tin công việc</p>
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7">
                <label for="employeestartworkdate"  class="mr-2 text-gray-500 cursor-pointer mt-2 block">Ngày bắt đầu làm việc </label>
                <div v-if="edit_employee" class="flex flex-col mt-1" :class="isDark ? 'dark' : 'light' ">
                    <VueDatePicker
                        class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                        v-model="date_start_work"
                        :enable-time-picker="false"
                        input-class="border border-gray-300 rounded-md px-4 py-2 text-sm "
                        menu-class="rounded-lg  "
                        :placeholder="detail_employee?.date_start_work"
                        format="dd-MM-yyyy"
                    />
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.date_start_work }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7 dark:text-gray-300">
                <label for="employeepropertycontract" class="mr-2 text-gray-500 cursor-pointer mt-2 block dark:text-gray-400">Tên hợp đồng </label>
                <div v-if="edit_employee" class="flex flex-col mt-1">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="dark:bg-gray-800 dark:border-gray-700 bg-white border-1 h-9 border-[var(--color_border)] py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{ contrast_employee.find(contrast => contrast.id === contrast_id)?.name || detail_employee?.contrast }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="dark:bg-gray-900 dark:border-gray-700 absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(contrast_sad, index) in contrast_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="contrast_id = contrast_sad.id" class="block dark:hover:bg-gray-700 px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">
                                        {{ contrast_sad.code }} - {{ contrast_sad.name }}
                                    </p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1">{{ detail_employee?.contrast }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7">
                <label for="employeestartworkdate"  class="mr-2 text-gray-500 cursor-pointer mt-2 block">Ngày ký </label>
                <div v-if="edit_employee" class="flex flex-col mt-1" :class="isDark ? 'dark' : 'light' ">
                    <VueDatePicker
                        class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                        v-model="date_sign_contrast"
                        :enable-time-picker="false"
                        input-class="border border-gray-300 rounded-md px-4 py-2 text-sm "
                        menu-class="rounded-lg  "
                        :placeholder="detail_employee?.date_start_work"
                        format="dd-MM-yyyy"
                    />
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.date_sign_contrast }}</p>
                
            </div>
             <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7">
                <label for="employeestartworkdate" class="mr-2 text-gray-500 cursor-pointer mt-2 block">Ngày có hiệu lực </label>
                <div v-if="edit_employee" class="flex flex-col mt-1" >
                    <VueDatePicker
                        class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                        v-model="date_effect_contrast"
                        :enable-time-picker="false"
                        input-class="border border-gray-300 rounded-md px-4 py-2 text-sm "
                        menu-class="rounded-lg  "
                        :placeholder="detail_employee?.date_start_work"
                        format="dd-MM-yyyy"
                    />
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.date_effect_contrast }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7">
                <label for="employeestartworkdate" class="mr-2 text-gray-500 cursor-pointer mt-2 block">Ngày hết hạn </label>
                <div v-if="edit_employee" class="flex flex-col mt-1" :class="isDark ? 'dark' : 'light' ">
                    <VueDatePicker
                        class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                        v-model="date_end_contrast"
                        :enable-time-picker="false"
                        input-class="border border-gray-300 rounded-md px-4 py-2 text-sm "
                        menu-class="rounded-lg  "
                        :placeholder="detail_employee?.date_end_contrast"
                        format="dd-MM-yyyy"
                    />
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.date_end_contrast }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7">
                <label for="employeepropertycontract" class="mr-2 text-gray-500 cursor-pointer mt-2 block">Lương cơ bản </label>
                <div v-if="edit_employee" class="flex flex-col">
                    <input v-model="salary" :placeholder="detail_employee?.salary" id="employeepropertycontract"  type="text" class="dark:bg-gray-800 dark:border-gray-600 dark:text-white h-8 outline-none bg-white px-2 py-1 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " >
                    <span class="input-config-error">{{ salaryError }}</span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.salary }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7 dark:text-gray-300">
                <label for="employeeposition" class="dark:text-gray-400 mr-2 text-gray-500 cursor-pointer mt-2 block ">Chức vụ </label>
                <div v-if="edit_employee" class="flex flex-col">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="dark:bg-gray-800 dark:border-gray-700 bg-white h-8 border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{ position_employee.find(position => position.id === position_id)?.name || detail_employee?.position }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="dark:bg-gray-900 dark:border-gray-700 absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(position_sad, index) in position_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="position_id = position_sad.id" class="dark:hover:bg-gray-700 block px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] capitalize">
                                        {{ position_sad.code }} - {{ position_sad.name }}
                                    </p>
                                </MenuItem>
                               
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.position }}</p>
                
            </div>

            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="text-sm mb-2 px-7 dark:text-gray-300">
                <label for="employeepartment" class="dark:text-gray-400 mr-2 text-gray-500 cursor-pointer mt-2 block">Phòng ban </label>
                <div v-if="edit_employee" class="flex flex-col ">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="dark:bg-gray-800 dark:border-gray-700 bg-white border-1 h-8 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{ department_employee.find(department => department.id === department_id)?.name || detail_employee?.department }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="dark:bg-gray-900 dark:border-gray-700 absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(department_sad, index) in department_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="department_id = department_sad.id" class="dark:hover:bg-gray-700 block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">
                                        {{ department_sad.code }} - {{ department_sad.name }}
                                    </p>
                                </MenuItem>
                            
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.department }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="dark:text-gray-300 text-sm mb-2 px-7">
                <label for="employeecalendar" class="dark:text-gray-400 mr-2 text-gray-500 cursor-pointer mt-2 block">Ca làm việc </label>
                <div v-if="edit_employee" class="flex flex-col ">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="dark:bg-gray-800 dark:border-gray-700 bg-white border-1 h-8 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{ work_shift_employee.find(work_shift => work_shift.id === work_shift_id)?.name || detail_employee?.work_shift}}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                        <MenuItems class="dark:bg-gray-900 dark:border-gray-700 absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(work_shift_sad, index) in work_shift_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="work_shift_id = work_shift_sad.id" class="dark:hover:bg-gray-700 block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">
                                        {{ work_shift_sad.code }} - {{ work_shift_sad.name }}
                                    </p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.work_shift }}</p>
                
            </div>
            <div :class="edit_employee ? 'col-span-4' : 'col-span-3'" class="dark:text-gray-300 text-sm mb-2 px-7">
                <label for="employeepropertycontract" class="dark:text-gray-400 mr-2 text-gray-500 cursor-pointer mt-2 block">Phụ cấp </label>
                <div v-if="edit_employee" class="flex flex-col">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="dark:bg-gray-800 dark:border-gray-700 bg-white h-8 border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--{{ grant_employee.find(grant => grant.id === grant_id)?.name || detail_employee?.grant }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="dark:bg-gray-900 dark:border-gray-700 absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(grant_sad, index) in grant_employee" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="grant_id = grant_sad.id" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 rounded-[0.2rem]">
                                        {{ grant_sad.code }} - {{ grant_sad.name }}
                                    </p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error"></span>
                </div>
                <p v-else class="italic mt-1 ">{{ detail_employee?.grant }}</p>
                
            </div>
            <div class="col-span-12 mt-7  border-b-1 border-[var(--color_border)] "></div>
            <div class="col-span-12 flex items-center gap-2 mt-7 mb-2 px-7 ">
                <font-awesome-icon :icon="['fas', 'users']" class="text-2xl text-gray-500 dark:text-white" />
                <p class="text-lg font-bold">Thông tin quản lý</p>
            </div>
            <div  class="col-span-3 text-sm mb-2 px-7">
                <label for="employeemange" class="mr-2  text-gray-500 cursor-pointer mt-2 block">Người quản lý </label>
                <p  class="italic mt-1">nguyen van B</p>
                <div class="flex flex-col hidden">
                    <input id="employeemange" type="text" class="dark:bg-gray-800 dark:border-gray-600 dark:text-white h-8 outline-none bg-white px-2 py-1 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " placeholder="">
                    <span class="input-config-error"></span>
                </div>
            </div>

            <div  class="col-span-3 text-sm mb-2 px-7 dark:text-gray-300">
                <label class="dark:text-gray-400 mr-2  text-gray-500 cursor-pointer mt-2 block">Trang thái làm việc </label>
                <p class="italic mt-1 ">Đang làm việc</p>
                <div class="flex flex-col hidden">
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full ">
                            <div class="dark:bg-gray-800 dark:border-gray-700 bg-white border-1 border-[var(--color_border)] py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span>--Trạng thái làm việc--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="dark:bg-gray-900 dark:border-gray-700 absolute left-0 mt-2 w-full p-1 origin-top-right bg-white border rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem class="mb-1 cursor-pointer">
                                    <p class="dark:hover:bg-gray-700 block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">Đang làm việc</p>
                                </MenuItem>
                                <MenuItem class="mb-1 cursor-pointer">
                                    <p class="dark:hover:bg-gray-700 block px-2 py-1 hover:bg-[var(--background-color-gray)] rounded-[0.2rem]">Đã nghỉ</p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            <div class="col-span-12 mt-7  border-b-1 border-[var(--color_border)] "></div>
            <div class="col-span-12 flex items-center px-7 mt-5 mb-2">
                <font-awesome-icon :icon="['fas', 'key']" class="text-2xl text-gray-500 dark:text-white" />
                <p class="text-lg font-bold ml-2">Thông tin đăng nhập hệ thống</p>
            </div>
            <div class="col-span-12 px-7 text-sm">
                <label for="emailemployee" class="text-gray-500 w-25 mt-2 block">Email: </label>
                <p class="italic ">{{ detail_employee?.email }}</p>
                
            </div>
            <div class="col-span-5 px-7 text-sm">
                <label for="emailemployee" class="text-gray-500 w-25 mt-2 block">Password: </label>
                <div v-if="edit_employee" class="flex flex-col">
                    <input v-model="password" id="passwordnumberemployee" type="password" class="outline-none h-8 dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white px-2 py-1 mt-1 rounded-sm border-1 border-[var(--color_border)] placeholder:text-sm  placeholder:font-(family-name:--font-inter) font-(family-name:--font-inter) " >
                    <span class="input-config-error">{{ passwordError }}</span>
                </div>
              
               
            </div>
            <div v-if="edit_employee" class="col-span-12 flex items-center p-7">
                <div 
                    @click="handleEditEmployee()" 
                    class="relative px-15 py-2 cursor-pointer rounded-lg font-bold
                    bg-gradient-to-r from-green-400 to-green-600 dark:from-green-700 dark:to-green-900
                    text-white border border-green-800 shadow-lg 
                    transition-all duration-300 ease-in-out
                    hover:scale-110 hover:shadow-2xl hover:shadow-green-400/50
                    active:scale-95 overflow-hidden group"
                >
                    <span class="relative z-10">💾 Lưu lại</span>
                    <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></span>
                    <span class="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-green-400 animate-pulse"></span>
                </div>
            </div>

        </div>
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
