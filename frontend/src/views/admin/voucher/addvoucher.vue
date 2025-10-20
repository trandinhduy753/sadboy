<script setup>
	import { useForm, useField } from 'vee-validate'
	import { object, string, date, number } from 'yup'
	import { opt_show_img, randomString, toMySQLTimestampLocal } from '@/composables';
	import { voucher } from '@/constant'
	import { useToast } from 'vue-toastification'

	const { show_img, img, preview_img, error_img, clear_img } = opt_show_img();
	const toast = useToast()
	const store = useStore()
	const router = useRouter();
	const schema = object({
		name: string().required('Tên chương trình giảm giá không được bỏ trống').trim().min(10, 'Tên chương trình giảm giá tối thiểu 10 ký tự'),
		code: string().required('Mã giảm giá không được phép để trống').trim().min(10, 'Mã giảm giá tối thiểu 10 ký tự'),
		date_effect: date().required('Vui lòng chọn ngày có tác dụng'),
		date_end: date().required('Vui lòng chọn ngày hết hiệu lực'),
		percent: number().typeError('Phần % giảm phải là một số').min(0, 'Phần trăm giảm không được âm'),
		status: string().required('Trạng thái mã giảm giá không được để trống'),
		total_user: number().typeError('Tổng số lần sử dụng phải là một số') .required('Tổng số lần sử dụng không đươc để trống').min(0, 'Tổng số lần sử dụng không được âm'),
		per_use: number().typeError('Số lần sử dụng mỗi người phải là một số') .required('Số lần sử dụng mỗi người không đươc để trống').min(0, 'Số lần sử dụng mỗi người không được âm'),
		order_price_smallest: number().typeError('Giá trị đơn hành nhỏ nhất phải là một số') .required('Giá trị đơn hành nhỏ nhất không đươc để trống').min(0, 'Giá trị đơn hành nhỏ nhất không được âm'),
		user_apply: string().required('Đối tượng áp dụng mã giảm giá không được để trống'),
		type: string().required('Loại mã giảm giá không được để trống'),
		category_id: string().required('Đối tượng sản phẩm áp dụng  không được để trống'),
		max_money: number().typeError('Số tiền giảm tối đa phải là một số').min(0, 'Số tiền giảm không được âm'),
		money_discount: number().typeError('Số tiền giảm tối đa phải là một số').min(0, 'Số tiền giảm không được âm'),
	})

	const { handleSubmit } = useForm({ 
		validationSchema: schema,
		initialValues: {
			code: randomString(10),
			percent: 0,
			max_money: 0,
			money_discount: 0,

			name: '111111111111111111',
			total_user: 1,
			per_use: 1,
			order_price_smallest: 1,
			status: 'ACTIVE',
			user_apply: 'VIP',
			category_id: 2


		}
		
	})
	//const code = randomString(10)
	const { value: name, errorMessage: nameError } = useField('name')
	const { value: code, errorMessage: codeError } = useField('code')
	const { value: date_effect, errorMessage: date_effectError } = useField('date_effect')
	const { value: date_end, errorMessage: date_endError} = useField('date_end')
	const { value: percent, errorMessage: percentError} = useField('percent')
	const { value: status, errorMessage: statusError} = useField('status')
	const { value: total_user, errorMessage: total_userError} = useField('total_user')
	const { value: per_use, errorMessage: per_useError} = useField('per_use')
	const { value: order_price_smallest, errorMessage: order_price_smallestError} = useField('order_price_smallest')
	const { value: user_apply, errorMessage: user_applyError} = useField('user_apply')
	const { value: type, errorMessage: typeError} = useField('type')
	const { value: category_id, errorMessage: category_idError} = useField('category_id')
	const { value: max_money, errorMessage: max_moneyError} = useField('max_money')
	const { value: money_discount, errorMessage: money_discountError } = useField('money_discount')
	const onManualSubmit = handleSubmit(
		(values) => {
			console.log(values)
			const formData = new FormData();
			for (const key in values) {
				if(key == 'date_effect' || key == 'date_end'){
					formData.append(key, toMySQLTimestampLocal(values[key]) )
				}
				else 
				{
					formData.append(key, values[key])
				}
				
			}
			if(img.value) {
				formData.append('img', img.value)
			}
			if(values.type == 'percent' && (values.percent==0 || values.max_money == 0)) {
				toast.error('Số % giảm, số tiền giảm tối đa không được để trống')
			}
			else if(values.type == 'money' && values.money_discount== 0){
				toast.error('Số tiền giảm không được để trống')
			}
			else {
				fetchAddVoucher(formData);
				
			}
		},
		(errors) => {
			console.log(errors)
		}
	)
	const fetchTypeUser = async () => {
		const result = await store.dispatch('admin/voucher/' + voucher.get_type_user)
	}
	const fetchTypeProduct = async () => {
		const result = await store.dispatch('admin/voucher/' + voucher.get_type_product)
	}
	const fetchAddVoucher = async (formData)=> {
		const result = await store.dispatch('admin/voucher/' + voucher.add_voucher, formData)
		if(result.status === 422) {
			errorValidation.value = result.message;
		}
		else if(result.status === 403) {
			toast.error(result.message)
			errorValidation.value = {}
		}
		else {
			errorValidation.value= {}
			toast.success('Thêm mã giảm giá thành công')
			setTimeout(() => {
				router.push({ name: 'admin_sadboizz.voucher'})
			}, 1000)
		}
 	}	
 	const voucher_status = computed(() => store.state.admin.voucher.voucher_status);
	const types_user =  computed(() => store.state.admin.voucher.types_user);
	const types_product = computed(() => store.state.admin.voucher.types_product);
	const show_input_user_monoply = ref(false)
	const show_input_percent = ref(false);
	const show_input_money = ref(false);
	const errorValidation = ref({});
	const show_percent_type = async (type_voucher='percent') => {
		if(type_voucher == 'percent') {
			show_input_percent.value = !show_input_percent.value;
			show_input_money.value = false
			type.value=type_voucher
		}
		else {
			show_input_money.value = !show_input_money.value;
			show_input_percent.value = false;
			type.value='money'
		}
	}
	onMounted(() => {
		fetchTypeUser()
		fetchTypeProduct()
	})
</script>

<template>
	<div class="bg-purple-50 dark:bg-gray-900 transition-all duration-500 -m-2 p-2  h-full">
		<div class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold ">
            <router-link :to="{name: 'admin_sadboizz.voucher'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-1 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p class="ml-1">Thêm một mã giảm giá mới</p>
        </div>
		<form action="" class="dark:bg-gray-800 dark:px-2 dark:pt-2 dark:pb-10 transition-all duration-500">
			<div class="grid grid-cols-12 gap-5">
				<div class="col-span-12">
                    <p v-for="(value, key, index) in errorValidation" :key="key" class="text-red-500">
                        {{ value[0] }}
                    </p>
                </div>
				<div class="col-span-3 flex flex-col">
					<label for="idvoucher" class="font-bold text-gray-900 dark:text-gray-200">ID voucher: </label>
					<input v-model="code" type="text" id="idvoucher" class="pl-2 outline-none bg-white dark:bg-gray-800 py-1 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 transition-all duration-500 text-gray-900 dark:text-gray-100" placeholder="" />
					<span class="input-config-error text-red-500 mt-1 block text-sm">{{ codeError }}</span>
				</div>
				<div class="col-span-3 flex flex-col">
					<label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Tên chương trình: </label>
					<input v-model="name" type="text" id="nameprogram" class="pl-2 outline-none bg-white dark:bg-gray-800 py-1 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 transition-all duration-500 text-gray-900 dark:text-gray-100" placeholder="" />
					<span class="input-config-error">{{ nameError }}</span>
				</div>
				
				<div class="col-span-3 flex flex-col" >
					<label for="dateactive" class="font-bold text-gray-900 dark:text-gray-200">Ngày có hiệu lực:
					</label>
					<VueDatePicker 
						class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
						v-model="date_effect" 
						:enable-time-picker="false"
						input-class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-all duration-500 rounded-md px-3 py-1 text-gray-900 dark:text-gray-100"
						menu-class="rounded-md bg-white dark:bg-gray-900" 
						format="dd-MM-yyyy HH:mm:ss"
					/>
					<span class="input-config-error text-red-500 mt-1 block text-sm">{{ date_effectError }}</span>
				</div>
				<div class="col-span-3 flex flex-col" >
					<label for="dateend" class="font-bold text-gray-900 dark:text-gray-200">Ngày hết hạn:
					</label>
					<VueDatePicker 
						class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
						v-model="date_end" 
						:enable-time-picker="false"
						input-class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-all duration-500 rounded-md px-3 py-1 text-gray-900 dark:text-gray-100"
						menu-class="rounded-md bg-white dark:bg-gray-900" 
						format="dd-MM-yyyy HH:mm:ss"
					/>
					<span class="input-config-error text-red-500 mt-1 block text-sm">{{ date_endError }}</span>
				</div>
				<div class="col-span-3">
					<label for="status" class="font-bold text-gray-900 dark:text-gray-200">Trạng thái mã: </label>
					<Menu as="div" class="relative block text-left">
						<MenuButton class="w-full">
							<div
								class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-all duration-500 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-gray-900 dark:text-gray-100">
								<span>-- {{ status || 'Chọn trạng thái' }} --</span>
								<font-awesome-icon :icon="['fas', 'angle-down']" />
							</div>
						</MenuButton>
						<MenuItems
							class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
							<div class="py-1">
								<MenuItem v-for="(voucher, key) in voucher_status" :key="key" class="mb-1 cursor-pointer">
									<p @click="status = key" :class="voucher.bg" class="block px-2 py-1 rounded-[0.2rem] hover:opacity-[0.8] text-gray-900 dark:text-white">
										{{ voucher.title }}	 
									</p>
								</MenuItem>
								
							</div>
						</MenuItems>
					</Menu>
					<span class="input-config-error">{{ statusError }}</span>
				</div>
				<div class="col-span-3 flex flex-col">
					<label for="quantity" class="font-bold text-gray-900 dark:text-gray-200">Tổng số lần sử dụng:
					</label>
					<input type="text" id="quantity"
						v-model="total_user"
						class="pl-2 outline-none bg-white dark:bg-gray-800 py-1 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 transition-all duration-500 text-gray-900 dark:text-gray-100"
						placeholder="" />
					<span class="input-config-error">{{ total_userError }}</span>
				</div>
				<div class="col-span-3 flex flex-col">
					<label for="quantityuser" class="font-bold text-gray-900 dark:text-gray-200">Số lần sử dụng của mỗi người: </label>
					<input v-model="per_use" type="text"  id="quantityuser" class="pl-2 outline-none bg-white dark:bg-gray-800 py-1 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 transition-all duration-500 text-gray-900 dark:text-gray-100" placeholder="" />
					<span class="input-config-error">{{ per_useError }}</span>
				</div>
				<div class="col-span-3 flex flex-col">
					<label for="minorder" class="font-bold text-gray-900 dark:text-gray-200">Giá trị đơn hàng: </label>
					<input v-model="order_price_smallest" type="text"  id="minorder" class="pl-2 outline-none bg-white dark:bg-gray-800 py-1 mt-1 rounded-sm border border-gray-300 dark:border-gray-600 transition-all duration-500 text-gray-900 dark:text-gray-100" placeholder="" />
					<span class="input-config-error text-red-500 mt-1 block text-sm">{{ order_price_smallestError }}</span>
				</div>
				<div class="col-span-3">
					<label for="" class="font-bold text-gray-900 dark:text-gray-200">Đối tượng áp dụng: </label>
					<Menu as="div" class="relative block text-left">
						<MenuButton class="w-full">
							<div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-all duration-500 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-gray-900 dark:text-gray-100">
								<span>-- {{ user_apply || 'Chọn đối tượng' }} --</span>
								<font-awesome-icon :icon="['fas', 'angle-down']" />
							</div>
						</MenuButton>
						<MenuItems
							class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
							<div class="py-1">
								<MenuItem v-for="(type, index) in types_user" :key="index" class="mb-2 cursor-pointer">
									<p @click="user_apply = type.code" class="lock px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">
										Khách hàng: {{ type.code }}
									</p>
								</MenuItem>
								<MenuItem @click.prevent="show_input_user_monoply = !show_input_user_monoply" class="mb-2 cursor-pointer">
									<div>
										<p  class="lock px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-700 capitalize text-gray-900 dark:text-gray-100">
											Khách hàng cụ thể
										</p>
									</div>
								</MenuItem>
								<div v-show="show_input_user_monoply" class="">
									<input type="text" placeholder="Nhập id của khách hàng" class="border-1 outline-0 border-black pl-2 w-full dark:text-white rounded-ssm py-1 dark:bg-gray-600">
									<p class="mt-1 text-sm text-amber-700">Ví dụ có nhiều khách hành: User001 User002</p>
								</div>
							</div>
						</MenuItems>
					</Menu>
					<span class="input-config-error">{{ user_applyError }}</span>
				</div>
				
				
				<div class="col-span-3">
					<label for="" class="font-bold text-gray-900 dark:text-gray-200">Loại mã giảm giá:
					</label>
					<Menu as="div" class="relative block text-left">
						<MenuButton class="w-full">
							<div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-all duration-500 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-gray-900 dark:text-gray-100">
								<span>-- {{ type || 'Chọn loại mã gỉam giá' }}--</span>
								<font-awesome-icon :icon="['fas', 'angle-down']" />
							</div>
						</MenuButton>
						<MenuItems
							class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
							<div class="py-1">
								<MenuItem @click.prevent="show_percent_type('percent')" class="mb-2 cursor-pointer">
									<p  class="lock px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-700 capitalize text-gray-900 dark:text-gray-100"> Giảm theo % </p>
								</MenuItem>
								<MenuItem @click.prevent="show_percent_type('money')" class="mb-2 cursor-pointer">
									<p  class="lock px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-700 capitalize text-gray-900 dark:text-gray-100"> Giảm theo số tiền </p>
								</MenuItem>
								<div v-if="show_input_percent">
									<div>
										<input v-model="percent" type="text" placeholder="Nhấp số % giảm" class="border-1 border-black w-full rounded-ssm p-1 outline-0 text-sm">
										<span class="input-config-error">{{ percentError }}</span>
									</div>
									<div class="mt-2">
										<input v-model="max_money" type="text" placeholder="Nhấp số tiền giảm tối đa" class="border-1 border-black w-full rounded-ssm p-1 outline-0 text-sm">
										<span class="input-config-error">{{ max_moneyError }}</span>
									</div>
									
								</div>
								<div v-if="show_input_money">
									<input v-model="money_discount" type="text" placeholder="Nhập số tiền giảm" class="border-1 border-black w-full p-1 rounded-ssm">
									<span class="input-config-error">{{  money_discountError }}</span>
								</div>
							</div>
						</MenuItems>
					</Menu>
					<span class="input-config-error">{{ typeError }}</span>
				</div>
				<div class="col-span-4">
					<label for="" class="font-bold text-gray-900 dark:text-gray-200">Sản phẩm áp dụng:
					</label>
					<Menu as="div" class="relative block text-left">
						<MenuButton class="w-full">
							<div class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-all duration-500 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-gray-900 dark:text-gray-100">
								<span>-- {{ types_product.find(type => type.id === category_id)?.code || 'Chọn sản phẩm áp dụng' }}--</span>
								<font-awesome-icon :icon="['fas', 'angle-down']" />
							</div>
						</MenuButton>
						<MenuItems
							class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50">
							<div class="py-1">
								<MenuItem v-for="(product, index) in types_product" :key="index" class="mb-2 cursor-pointer">
									<p @click="category_id = product.id" class="lock px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-700 capitalize text-gray-900 dark:text-gray-100"> {{ product.code }} </p>
								</MenuItem>
								
							</div>
						</MenuItems>
					</Menu>
					<span class="input-config-error">{{ category_idError }}</span>
				</div>
				<div class="col-span-12">
					<p class="font-bold mb-3 text-gray-900 dark:text-gray-200">Ảnh mã giảm giá</p>
					<label for="uploadimg_employee"  class="cursor-pointer text-white dark:text-gray-100 font-(family-name:--font-winky) py-2 px-10 rounded-sm bg-blue-900 dark:bg-blue-700">
						<font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
						<span class="ml-2">Chọn ảnh</span>
					</label>
					<input type="file" @change="show_img($event)" id="uploadimg_employee" class="hidden" />
					<div v-show="preview_img" class="flex items-center flex-wrap mt-1">
						<div class="mr-5">
							<font-awesome-icon @click="clear_img" class="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer border-1 border-black dark:border-gray-600 transition-all duration-500 relative left-21 top-4"  :icon="['fas', 'xmark']" />
							<img :src="preview_img ? preview_img : ''" class="w-25 h-20 border-1 border-black dark:border-gray-600 transition-all duration-500 rounded-sm"  alt="" />
						</div>
					</div>
				</div>
				<div class="col-span-12 mt-5 transition-all duration-500 flex items-center">
					<div @click="onManualSubmit()" class="px-15 cursor-pointer py-1.5 rounded-sm mr-5 bg-green-300 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 hover:text-black dark:hover:text-white hover:scale-[1.1] duration-300 transition-all text-green-900 dark:text-green-200 font-bold border border-green-900 dark:border-green-500">
						Lưu lại
					</div>
					
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
</style>
