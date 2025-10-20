<script setup>
	import { useForm, useField } from 'vee-validate'
    import { object, string, date, number, mixed } from 'yup'
	import ApexCharts from 'vue3-apexcharts'
	import { provide } from '@/constant'
	import { formatMoney, formatDateTime } from '@/composables'
	import Editor from '@tinymce/tinymce-vue'
	import { useToast } from 'vue-toastification'
	const route = useRoute()
	const store = useStore()
	const toast = useToast();
	const id = computed(() => route.query.index)
	const series = [45]
	const chartOptions = {
		chart: {
			type: 'radialBar'
		},
		labels: ['Tỷ lệ nợ'],
		colors: ['#fbbf24'],
		plotOptions: {
			radialBar: {
			hollow: {
				size: '50%'
			},
			dataLabels: {
				name: {
				show: true
				},
				value: {
				show: true,
				fontSize: '16px',
				formatter: val => `${val}%`
				}
			}
			}
		}
	}
	const series_col = [{
	name: 'Đơn hàng',
	data: [2, 4, 6, 8, 10]
	}]
	const chartOptions_col = {
	chart: {
		sparkline: { enabled: true },
		type: 'bar'
	},
	plotOptions: {
		bar: {
		columnWidth: '50%',
		borderRadius: 4
		}
	},
	colors: ['#93c5fd'],
	tooltip: { enabled: false }
	}
	const series_line = [
		{
			name: 'Hàng trả',
			data: [1, 2, 1, 3, 5]
		}
	]
	const chartOptions_line = {
	chart: {
		type: 'line',
		sparkline: {
		enabled: true // nhỏ gọn như ảnh bạn gửi
		}
	},
	stroke: {
		curve: 'smooth',
		width: 2
	},
	colors: ['#fbbf24'], // màu cam vàng
	tooltip: {
		enabled: false
	}
	}
	
	const editorSettings = computed(() => ({
        height: 400,
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
	const status = computed(() => store.state.admin.provide.status_provide )
	const status_order = computed(() => store.state.admin.provide.status_order )
	const list_order = computed(() =>  store.getters['admin/provide/get_list_order_by_sort'](id.value) )
	const detail_provides = computed(() => store.getters['admin/provide/get_list_detail_provide']);
	const detail_provide= computed(() => detail_provides.value[id.value] );
	const sort_status_order = computed(() => store.state.admin.provide.sort_status_order)
	const change_sort_order = (sort, type) => store.commit('admin/provide/CHANGE_SORT_BY_ORDER', {sortby: sort, sortstatus: type});
	const fetchDetailProvide = async (id, page) => {
		const result = await store.dispatch('admin/provide/' + provide.get_detail_provide, {id, page})
		if(result.ok === 'error' ){
            toast.error(result.message)
        }
	}
	const fetchEditProvide = async (id, data) => {
		const result = store.dispatch('admin/provide/' + provide.edit_provide, {id: id, data: data})
		if(result.status === 422) {
            errorValidation.value = result.message;
        }
        else if(result.status === 403) {
            toast.error(result.message)
            errorValidation.value = {}
        }
        else {
            errorValidation.value= {}
            toast.success('Sửa thông tin nhà cung cấp thành công');
        }
	}
	const handleScrollLoadData = async (event, type='') => {
		const el = event.target;
		if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) 
		{	
			page.value++;
			const result = await store.dispatch('admin/provide/' + provide.load_add_order_provide, {provide_id: id.value, page:page.value})
		}
	};

	const handleSelectConditionTitle = async (condition, status, index) => {
		select_condition_sort_title.value = index;
		change_sort_order(condition, status)
	}
	const handleEditProvide = async () => {
		
		const formData = new FormData();
		if(detail_provide.value.status == 'ACTIVE'){
			formData.append('status', 'DEACTIVE')
			fetchEditProvide(id.value, formData);
		}
		else if (detail_provide.value.status == 'DEACTIVE'){
			formData.append('status', 'ACTIVE')
			fetchEditProvide(id.value, formData);
		}
	}
	const schema = object({
        name: string().trim().notRequired()
        .test('min-if-not-empty', 'Tên nhà cung cấp tối thiểu 5 ký tự', (value) => {
            return !value || value.length >= 5
        }),
        address: string().trim().notRequired()
        .test('min-if-not-empty', 'Địa chỉ nhà cung cấp tối thiểu 8 ký tự', (value) => {
            return !value || value.length >= 5
        }),
		note: string().trim().notRequired(),
		email: string().notRequired().email('Email không hợp lệ'),
		phone: string().trim().notRequired()
        .test('valid-phone-if-not-empty', 'Số điện thoại không hợp lệ', (value) => {
            if (!value) return true;
            return /^0\d{9}$/.test(value) && value.length >= 10;
        }),
    })
	const { handleSubmit, resetForm } = useForm({ 
        validationSchema: schema,
		initialValues: {
        	
			
		}
        
    })
    const { value: name, errorMessage: nameError } = useField('name')
	const { value: address, errorMessage: addressError } = useField('address')
	const { value: note, errorMessage: noteError } = useField('note')
	const { value: email, errorMessage: emailError } = useField('email')
	const { value: phone, errorMessage: phoneError } = useField('phone')
	const handleFetchEditProvide = handleSubmit(
        (values) => {
			console.log(values)
			const formData = new FormData();
			for (const key in values) {
				if(values[key])
				{
					formData.append(key, values[key])
				}
			}
			formData.forEach((value, key) => {
				console.log(`${key}: ${value}`)
			})
			fetchEditProvide(id.value, formData);
            
        },
        (errors) => {
            console.log(errors)
        }
    )
	
	const condition_sort = ref([
		{
			title: 'Mã đơn hàng',
			name: 'code'
		},
		{
			title: 'Ngày tạo',
			name: 'date'
		},
		{
			title: "Kho hàng",
			name: "stock"
		},
		{
			title: "Số lượng",
			name: 'count'
		},
		{
			title: "Tổng tiền",
			name: 'total'
		}
	])
	const condition_sort_title = ref([
		{
			title: 'Tất cả',
			name: ''
		},
		{
			title: 'Lịch sử đăt hàng',
			name: 'ORDER'
		},
		{
			title: 'Lịch sử trả hàng',
			name: 'RETURN'
		}
	])
	const select_condition_sort_title = ref(0)
	const page = ref(1);
	const errorValidation = ref({})
	onMounted(() => {
		if (!detail_provide.value || Object.keys(detail_provide.value).length === 0) {
		fetchDetailProvide(id.value, page.value)
			console.log('CALL API')
		} else {
			console.log('Lấy trong getter') // 👉 Object có dữ liệu
		} 
		
	})

</script>

<template>
	
   <div class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold ">
        <router-link :to="{name: 'admin_sadboizz.provide'}">
            <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
        </router-link>
        <p class="ml-1">Thông tin chi tiết của nhà cung cấp</p>
    </div>
    <div class="grid grid-cols-12  gap-x-5  text-sm">
        <div class="col-span-8 bg-white dark:bg-gray-800 rounded-ssm transition-all duration-500 p-5 ">
			<div class="flex gap-5 p-3  dark:text-gray-200 rounded-sm transition-all duration-500">
				<div class="w-15 h-15">
					<img :src="detail_provide?.img" alt="" class="w-full h-full object-cover rounded-full border border-gray-300 dark:border-gray-700" />
				</div>
				<div class="flex-1">
					<div class="flex gap-2 -mt-2 items-center justify-between">
						<div class="flex gap-2 items-center">
							<p class="font-bold text-lg dark:text-gray-100">NCC: {{ detail_provide?.name }}</p>
							<p class="px-3 font-bold py-1 rounded-sm" :class="status[detail_provide?.status]?.bg"> {{ status[detail_provide?.status]?.title }} </p>
						</div>
						<Dialog>
							<DialogTrigger>
								<div class="flex items-center rounded-[0.2rem] transition-all text-2xl duration-200 hover:scale-[1.2] hover:text-yellow-700 p-4 text-yellow-500 cursor-pointer dark:hover:text-yellow-400" > 
									<font-awesome-icon :icon="['fas', 'pen-to-square']" /> 
								</div>
							</DialogTrigger>
							<DialogContent class="bg-white dark:bg-gray-900 dark:text-gray-200 rounded-sm transition-all duration-500 p-6 max-h-[80vh] overflow-auto">
								<DialogHeader>
									<DialogTitle>
										<p class="text-[1.1rem] pb-3 border-b border-[var(--color_border)] dark:border-gray-700 text-[var(--color_text-gray)] dark:text-gray-300" > Chỉnh sửa thông tin liên hệ </p>
									</DialogTitle>
									<DialogDescription>
										
										<form action="" class="text-base h-100 overflow-y-auto scrollbar-hide">
											<p class="font-bold text-black dark:text-gray-200 mb-1">Thông tin chung</p>
											<div class="grid grid-cols-12 gap-x-5">
												<div class="col-span-12">
													<p v-for="(value, key, index) in errorValidation" :key="key" class="text-red-500">
														{{ value[0] }}
													</p>
												</div>
												<div class="col-span-12 flex flex-col">
													<label for="nameprovide" class="dark:text-gray-300">Tên nhà cung cấp</label>
													<input v-model="name" type="text" :placeholder="detail_provide?.name" id="nameprovide" class="border border-[var(--color_border)] dark:border-gray-600 rounded-[0.2rem] mt-1 pl-2 py-1 outline-none text-black dark:text-gray-200 dark:bg-gray-800 placeholder:text-black dark:placeholder:text-gray-400" />
													<span class="input-config-error">{{ nameError }}</span>
												</div>
												<div class="col-span-12 flex flex-col mt-3">
													<label for="addressprovide" class="dark:text-gray-300">Địa chỉ</label>
													<input v-model="address" type="text" :placeholder="detail_provide?.address" id="addressprovide" class="border border-[var(--color_border)] dark:border-gray-600 rounded-[0.2rem] mt-1 pl-2 py-1 outline-none text-black dark:text-gray-200 dark:bg-gray-800 placeholder:text-black dark:placeholder:text-gray-400" />
													<span class="input-config-error">{{ addressError }}</span>
												</div>											
												<div class="col-span-12 flex flex-col mt-3">
													<label for="noteprovide" class="dark:text-gray-300">Ghi chú</label>
													<Editor
														v-model="note" :init="editorSettings" api-key="peas03g0bwumpx7ivb4cuhrck2dfd1lpkmjsxqyljojpxyez"
													/>
													<span class="input-config-error"></span>
												</div>
												<div class="col-span-12 border-t border-[var(--color_border)] dark:border-gray-700 pt-2 mt-6">
													<p class="font-bold text-black dark:text-gray-200 mb-1">Thông tin người liên hệ</p>
												</div>	
												<div class="col-span-6 flex flex-col">
													<label for="emailcontact" class="dark:text-gray-300">Email</label>
													<input v-model="email" type="text" :placeholder="detail_provide?.email" id="emailcontact" class="border border-[var(--color_border)] dark:border-gray-600 rounded-[0.2rem] mt-1 pl-2 py-1 outline-none text-black dark:text-gray-200 dark:bg-gray-800 placeholder:text-black dark:placeholder:text-gray-400" />
													<span class="input-config-error">{{ emailError }}</span>
												</div>
												<div class="col-span-6 flex flex-col">
													<label for="phonecontact" class="dark:text-gray-300">Số điện thoại</label>
													<input v-model="phone" type="text" :placeholder="detail_provide?.phone" id="phonecontact" class="border border-[var(--color_border)] dark:border-gray-600 rounded-[0.2rem] mt-1 pl-2 py-1 outline-none text-black dark:text-gray-200 dark:bg-gray-800 placeholder:text-black dark:placeholder:text-gray-400" />
													<span class="input-config-error">{{ phoneError }}</span>
												</div>
											</div>
										</form>
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose as-child>
										<button @click="handleFetchEditProvide" class="bg-[var(--maincolor)] dark:bg-[var(--dark_maincolor)] hover:bg-[var(--hoverred)] dark:hover:bg-red-700 hover:scale-[1.1] transition-all duration-500 px-8 text-sm border border-transparent py-1 rounded-[0.1rem] cursor-pointer font-bold text-white" > Xác nhận chỉnh sửa </button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
					<p class="text-gray-600 -mt-4 dark:text-gray-400">{{ detail_provide?.name }}</p>
					
				</div>
			</div>

			<div class="flex justify-around mt-5 border-b-1 border-[var(--color_border)] pb-5 dark:border-gray-700">
				<div class="text-center">
					<p class="text-[var(--color_text-gray)] dark:text-gray-400">Nợ phải trả</p>
					<p class="text-base font-bold dark:text-white">{{ formatMoney(detail_provide?.total_debt) }}</p>
				</div>
				<div class="text-center">
					<p class="text-[var(--color_text-gray)] dark:text-gray-400">Tổng mua</p>
					<p class="text-base font-bold dark:text-white">{{ formatMoney(detail_provide?.total_buy) }}</p>
				</div>
			</div>
			<div class="flex gap-4 mt-5">
				<router-link :to="{name: 'admin_sadboizz.product.import', query: {showopt: 'shop_ad_t', redirect: 'provide'} }">
					<div class="border-1 border-green-500 bg-green-400 hover:scale-[1.1] hover:bg-green-200 dark:bg-green-700 dark:border-green-600 dark:hover:bg-green-600 rounded-sm px-6 py-2 text-center cursor-pointer transition duration-500">
						Tạo phiếu nhập hàng
					</div>
				</router-link>
				
			</div>
			<div class="mt-5">
				<p class="text-lg font-bold dark:text-white">Ghi chú</p>
				<p class="text-sm text-[var(--color_text-gray)] dark:text-gray-400">
					{{ detail_provide?.note }}
				</p>
			</div>
        </div>
        <div class="col-span-4 row-span-2 ">
			<div class="bg-white dark:bg-gray-800 p-5 rounded-sm transition-all duration-500">
				<div class="flex justify-between items-center border-b-1 border-[var(--color_border)] dark:border-gray-700 pb-4">
					<p class="font-bold dark:text-white">Thông tin liên hệ:</p>
					<Dialog v-if="detail_provide?.status == 'ACTIVE'">
						<DialogTrigger>
							<div class="flex items-center rounded-sm mr-3 transition-all duration-200 hover:scale-105 bg-blue-500 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-3 cursor-pointer py-1">
								<p class="ml-1">Tạm ngừng NCC</p>
							</div>
						</DialogTrigger>
						<DialogContent class="dark:bg-gray-700">
							<DialogHeader>
								<DialogTitle>
									<p class="text-[1.1rem] pb-3 border-b-1 border-[var(--color_border)] dark:border-gray-white dark:text-white"> Tạm ngừng nhà cung cấp </p>
								</DialogTitle>
								<DialogDescription>
									<div class="text-gray-800 dark:text-gray-300"> Bạn có chắc chắn muốn ngừng hoạt động của nhà cung cấp này không? Bạn sẽ không thể mua hàng từ nhà cung cấp này nữa, thông tin lịch sử mua hàng và công nợ vẫn được lưu lại. </div>
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose as-child>
									<button @click="handleEditProvide()" class="bg-red-500 hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500 px-8 text-sm border-1 border-red-600 dark:border-red-500 py-1 rounded-[0.1rem] cursor-pointer font-bold text-white">
										Tạm ngừng nhà cung cấp
									</button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<Dialog v-else>
						<DialogTrigger>
							<div class="flex items-center rounded-sm mr-3 transition-all duration-200 hover:scale-105 bg-blue-500 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-3 cursor-pointer py-1">
								<p class="ml-1">Kích hoạt NCC</p>
							</div>
						</DialogTrigger>
						<DialogContent class="dark:bg-gray-700">
							<DialogHeader>
								<DialogTitle>
									<p class="text-[1.1rem] pb-3 border-b-1 border-[var(--color_border)] dark:border-gray-white dark:text-white"> Tạm ngừng nhà cung cấp </p>
								</DialogTitle>
								<DialogDescription>
									<div class="text-gray-800 dark:text-gray-300"> Bạn có chắc chắn muốn kích hoạt nhà cung cấp này không? Bạn sẽ có thể mua hàng từ này nhà cung cấp này</div>
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose as-child>
									<button @click="handleEditProvide()" class="bg-green-500 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500 px-8 text-sm border-1 border-green-600 dark:border-green-500 py-1 rounded-[0.1rem] cursor-pointer font-bold text-white">
										Kích hoạt nhà cung cấp
									</button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div class="mt-3 border-b-1 border-[var(--color_border)] dark:border-gray-700 pb-3">
					<p class="capitalize mb-1 dark:text-gray-300">{{ detail_provide?.name }}</p>
					<p class="mb-1 dark:text-gray-300">{{ detail_provide?.email }}</p>
					<p class="mb-1 dark:text-gray-300">{{ detail_provide?.phone }}</p>
				</div>
				<div class="mt-3">
					<h3 class="font-bold mb-1 dark:text-white">Địa chỉ</h3>
					<p class="dark:text-gray-300">{{ detail_provide?.address }}</p>
				</div>
			</div>
			<div class="bg-white dark:bg-gray-800 p-5 mt-5 rounded-sm transition-all duration-500">
				<p class="font-bold border-b-1 border-[var(--color_border)] dark:border-gray-700 pb-4 mb-2 text-gray-900 dark:text-white">Thông tin thanh toán</p>
				<p class="text-gray-800 dark:text-gray-400 mb-2">Ngân hàng: {{ detail_provide?.bank }}</p>
				<p class="text-gray-800 dark:text-gray-400 mb-2">Tên tài khoản: {{ detail_provide?.account_name }}</p>
				<p class="text-gray-800 dark:text-gray-400 mb-2">Số tài khoản: {{ detail_provide?.account_phone }}</p>
				<img :src="detail_provide?.QR_IMG" class="w-65 h-60 rounded-ssm" alt="">
			</div>
        </div>
        <div class="col-span-3 bg-white dark:bg-gray-800 mt-5 rounded-sm transition-all duration-500">
			<div class="flex items-center justify-center">
				<ApexCharts height="200" width="200" :options="chartOptions" :series="series" />
			</div>
		</div>

		<div class="col-span-3 bg-white dark:bg-gray-800 mt-5 rounded-sm transition-all duration-500">
			<div class="shadow-md flex flex-col items-center justify-center w-full h-full">
				<div>
					<p class="text-2xl font-bold text-gray-900 dark:text-white">Đơn hàng</p>
					<p class="text-2xl font-bold text-gray-900 dark:text-white">{{ detail_provide?.total_order }}</p>
				</div>
				<ApexCharts type="bar" height="70" width="70" :options="chartOptions_col" :series="series_col" />
			</div>
		</div>

		<div class="col-span-2 bg-white dark:bg-gray-800 mt-5 rounded-sm transition-all duration-500">
			<div class="flex flex-col items-center mt-9 w-full h-full">
				<div class="text-2xl font-bold text-gray-900 dark:text-white">
					<p>Hàng trả</p>
					<p>{{ detail_provide?.return_order }}</p>
				</div>
				<ApexCharts type="line" height="50" width="70" :options="chartOptions_line" :series="series_line" />
			</div>
		</div>

		<div class="col-span-12 row-span-2 bg-white dark:bg-gray-800 mt-5 px-5 py-3 rounded-sm transition-all duration-500">
			<div class="flex items-center">
				<div v-for="(condition, index) in condition_sort_title" :key="index" @click="handleSelectConditionTitle('', condition.name, index)" :class="select_condition_sort_title == index ? 'border-b-2' : '' " class="mr-10 border-blue-500 pb-3 cursor-pointer text-gray-900 dark:text-white">{{ condition.title }}</div>
				
				
			</div>
			<div class=" my-4">
				<Menu as="div" class="relative block text-left mr-5 ">
					<MenuButton class="w-55">
						<div class="bg-white p-2 dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
							<span>-- Điều kiện sắp xếp --</span>
							<font-awesome-icon :icon="['fas', 'angle-down']" />
						</div>
					</MenuButton>
					<MenuItems class="absolute left-0 mt-2 w-5,5 p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
						<div class="py-1">
							<MenuItem v-for="(condition, index) in condition_sort" :key="index" class="cursor-pointer">
								<p @click="change_sort_order(condition.name, '')" class="block p-2 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ condition.title }}</p>
							</MenuItem>
							
							
						</div>
					</MenuItems>
				</Menu>
				
			</div>
			<div class="grid grid-cols-12 items-center mt-5 bg-gray-100 dark:bg-gray-700 py-4 px-1 text-gray-900 dark:text-white">
				<div class="col-span-2">Mã phiếu</div>
				<div class="col-span-2">Thời gian</div>
				<div class="col-span-2 text-right">Kho hàng</div>
				<div class="col-span-2 text-right">Số lượng</div>
				<div class="col-span-2 text-right">Loại</div>
				<div class="col-span-2 text-right">Tổng cộng</div>
			</div>
			<div @scroll="handleScrollLoadData($event)" class="max-h-120 overflow-y-auto scrollbar-hide">
				<div v-for="(order, index) in list_order" :key="index" class="grid grid-cols-12 items-center py-4 px-1 dark:text-gray-300">
					<router-link :to="{name: 'admin_sadboizz.cashbook.order_provider.detail_import', query: { showopt: 'shop_ad_t', index: index +1} }" custom v-slot="{ href, navigate, isActive }">
                        <div @click="navigate" class="col-span-2 text-blue-500 dark:text-blue-400 italic">{{ order.code }}</div>
                    </router-link>
					<div class="col-span-2 italic">{{ formatDateTime(order.created_at) }}</div>
					<div class="col-span-2 text-blue-500 italic text-right">{{ order.stock }}</div>
					<div class="col-span-2 text-right">{{ order.count }}</div>
					<div class="col-span-2 text-right">{{ order.status }}</div>
					<div class="col-span-2 text-right">{{ formatMoney(order.total) }}</div>
				</div>
			</div>
		</div>

        
    </div>

</template>

<style scoped>

</style>
