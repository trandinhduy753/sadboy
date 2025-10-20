<script setup>
    import CountdownTimer from "@/components/times/CountdownTimer.vue";
    import { formatMoney, randomString, getFutureDate } from '@/composables'
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    import { useToast } from 'vue-toastification'
    import { voucherClient, orderClient, cartClient } from '@/constant'
    const toast = useToast()
    const store = useStore()
    const router = useRouter()
    const isCallPolling = ref(false);
    const pollingOrderPay = async () => {
        if (isOrderPending.value) return
        if (isCallPolling.value) return
        store.dispatch('client/cart/' + cartClient.check_order_pay, {code: code.value})
        setTimeout(pollingOrderPay, 1500)
    }
    
    const fetchFindDiscount = async () => {
        
        if(discount_code.value != '') {
            if(pay.value === 'QRCODE') {
                console.log(222)
                onManualSubmit()
            }
            const result = await store.dispatch('client/voucher/' + voucherClient.find_voucher, {user_id: user.value?.id, code: discount_code.value})
        }
    }
    const fetchAddOrder = async (data) => {
        //console.log(data)
        const result=  await store.dispatch('client/order/' + orderClient.add_order, data)
    }
    const hiddenInfoBanking = () => {
        show_banking.value = false
        pay.value = ''
        isCallPolling.value = true;
    }
    const handleBanking = async () => {
        if(address.value) {
            isCallPolling.value=false
            pay.value='QRCODE';
            show_banking.value = true;
            
        }
        else {
            toast.info('Vui lòng nhập địa chỉ')
        }
        
    }
    function calculateTime() {
        const now = new Date().getTime();
        const start = new Date(startTime.value).getTime();
        const end = start + durationMinutes.value * 60 * 1000; // cộng thêm X phút
    
        const diff = Math.floor((end - now) / 1000); // còn bao nhiêu giây
        timeLeft.value = diff > 0 ? diff : 0;
    
        if (diff <= 0) {
            clearInterval(timer);
        }
    }
    
    const handle_show_banking = async () => {
        showInputDiscountBanking.value = false;
        onManualSubmit()
        show_info_banking.value =true;
        pollingOrderPay()
        
    }
    const schema = object({
        address: string().required('Địa chỉ giao hàng không được để trống').trim(),
        note: string().trim().notRequired(),
        pay: string().required('Phương thức thanh toán không được để trống').trim(),
        
    })

    const { handleSubmit } = useForm({ 
        validationSchema: schema,
        initialValues: {
            
        }
    })
    const { value: address, errorMessage: addressError } = useField('address')
    const { value: note, errorMessage: noteError } = useField('note')
    const { value: pay, errorMessage: payError } = useField('pay')

    const onManualSubmit = handleSubmit (
        (values) => {
            values['code'] = code.value
            values['name'] = name.value
            values['date_delivery'] = date_delivery.value;
            if(Object.keys(voucher.value).length !== 0){
                values['discount_code'] = discount_code.value;
            }
            values['subtotal'] = subtotal.value;
            values['money_discount'] = money_discount.value;
            values['money_ship'] = money_ship.value
            values['total']= total.value
            var count = 0;
            const product_id= ref([]);
            carts_checked.value.forEach((cart, index) => {
                count = count+ cart.count
                product_id.value.push(cart.id)
            });
            values['count'] = count;
            values['product_id'] = product_id.value
            values['user_id'] = user.value?.id
            values['unit_shipping'] = 'Giao hàng nhanh';
            values['products'] = carts_checked.value;
            fetchAddOrder(values)
            change_detail_order(values)
            
            if(pay.value === 'HOMEPAY') {
                toast.success('Đặt hàng thành công')
                setTimeout(() => {
                    router.push({ name: 'bill_finish' })
                }, 1000)
            }
            
            
        },
        (errors) => {
            toast.error('Đặt hàng không thành công')
        }
    )

    const carts_checked = computed(() => store.state.client.cart.carts_checked)
    const subtotal = computed(() => {
        return carts_checked.value.reduce((total, cart) => {
            return total + Number(cart?.price * cart?.count)
        }, 0)
    })
   
    const money_discount = computed(() => {
        if (Object.keys(voucher.value).length === 0) return 0

        if (voucher.value?.type === 'percent') {
            let discount = subtotal.value * (voucher.value?.percent / 100)
            if (discount > voucher.value?.max_money) {
                discount = voucher.value?.max_money
            }
            return discount
        }

        if (voucher.value?.type === 'money') {
            return Number(voucher.value?.money_discount)
        }

        return 0
    })
    const total = computed(() => {
        
        const sub = subtotal.value - money_discount.value + money_ship.value;
        if(sub < 0 ) {
            return 0;
        }
        
        return subtotal.value - money_discount.value + money_ship.value
    }
       
    )
    const name = computed(() => {
        return carts_checked.value.reduce((name, cart, index) => {
            if(index == (carts_checked.value.length - 1)) {
                return name + `${cart?.product?.name} `
            }
            return name + `${cart?.product?.name}, `
        }, "")
    })
    const user = computed(() => store.state.client.account.user )
    const voucher = computed(() => store.state.client.voucher.detail_voucher )
    const change_detail_order = (data) => store.commit('client/order/CHANGE_DETAIL_ORDER', data)
    const discount_code = ref("")
    const date_delivery = computed(() => getFutureDate(5) )
    const money_ship = ref(0)
    const code = computed(() => randomString(12))
    const timeLeft = ref(0);
    let timer = null;
    
    const minutes = computed(() =>
        String(Math.floor(timeLeft.value / 60)).padStart(2, "0")
    );
    const seconds = computed(() =>
        String(timeLeft.value % 60).padStart(2, "0")
    );
    const order_detail = computed(() => store.state.client.order.list_order_detail?.[code.value]);
    const startTime = computed(() => order_detail.value?.created_at);
    const durationMinutes = ref(10);
    const show_info_banking = ref(false)
    const show_banking = ref(false)
    const isOrderPending = computed(() => store.state.client.cart.isOrderPending);
    const showInputDiscountBanking = ref(true);
    onMounted(() => {
        calculateTime(); // chạy ngay lần đầu
        timer = setInterval(calculateTime, 1000);
        if(carts_checked.value.length == 0){
            router.push( {name: 'cart_product'} )
        }
    });
    
    onUnmounted(() => {
        clearInterval(timer);
        store.commit('client/cart/RESET_CART_CHECKED')
        store.commit('client/voucher/CHANGE_DETAIL_VOUCHER', {});
        isCallPolling.value = true;
        
    });
    watch(isOrderPending, (newValue, oldValue) => {
        if(newValue) {
            toast.success('Đã thanh toán thành công vui lòng chờ trong giây lát')
            //isCallPolling.value = true;
            store.commit('client/cart/CHANGE_IS_ORDER_PENDING', false);
            setTimeout(() => {
                router.push({ name: 'bill_finish' })
            }, 1000)
            
        }
    })
</script>

<template>
    <div class="bg-gray-300 dark:bg-gray-900 pb-10 h-[100%]">
        <div class="grid grid-cols-12 max-md:w-[100%] max-w-7xl m-auto px-5 gap-x-15 max-md:gap-x-0 pt-10">
            <div class="col-span-12">
                <router-link :to="{ name: 'cart_product' }">
                    <div class="flex items-center mb-3 cursor-pointer rounded-sm dark:text-gray-300 dark:bg-gray-800 bg-white p-3">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" class="text-2xl" />
                        <p class="ml-2 font-bold font-(family-name:--font--madini) text-xl ">Tổng quát đơn hàng</p>
                    </div>
                </router-link>   
            </div>
            <div class="col-span-7 max-lg:col-span-12 max-lg:order-2  pb-10">       
                <template v-for="(cart, index) in carts_checked" :key="index">
                    <div class="bg-white dark:bg-gray-800 flex px-5 py-3 mb-4  items-center rounded-sm" >
                        <img :src="cart?.product?.img" class="w-30 h-30 rounded-ssm" alt="">
                        <div class="ml-5  flex-1">
                            <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">{{ cart?.product?.name }}</p>
                            <div class="mt-2  ">
                                <div class="flex justify-between dark:text-gray-300  ">Số lượng : <span>{{ cart?.count }}</span></div>
                                <div class="flex justify-between dark:text-gray-300">Đơn giá: <span>{{ formatMoney(Number(cart?.price)) }}</span></div>
                                <div class="flex justify-between dark:text-gray-300">Kích thước: <span>{{ cart?.size }}</span></div>
                                <div class="flex justify-between dark:text-gray-300">Tổng tiền: <span class="text-red-500 font-bold">{{ formatMoney(Number(cart?.price * cart?.count)) }}</span> </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="bg-white dark:bg-gray-800 px-5 py-3 rounded-md shadow-md">
                    <p class="flex justify-between font-bold text-base mb-1  text-gray-800 dark:text-gray-100">
                        Tổng tiền hàng: <span>{{ formatMoney(subtotal) }}</span>
                    </p>
                    <p class="flex justify-between font-bold text-base mb-1  text-gray-800 dark:text-gray-100">
                        Phí vận chuyển: <span>{{ formatMoney(money_ship) }}</span>
                    </p>
                    <p class="flex justify-between font-bold text-base mb-1  text-gray-800 dark:text-gray-100">
                        Số tiền giảm: <span>{{ formatMoney(money_discount) }}</span>
                    </p>
                    <p class="flex justify-between font-bold text-base mb-1  text-gray-800 dark:text-gray-100">
                        Số tiền trả trước: <span>0 VNĐ</span>
                    </p>
                    <p class="flex justify-between font-bold text-base mb-1  text-gray-800 dark:text-gray-100">
                        Tổng thanh toán: <span class="text-red-500 dark:text-red-400">{{ formatMoney(Number(subtotal + money_ship -money_discount) ) }}</span>
                    </p>
                    <p class="flex justify-between font-bold text-base mb-1  text-gray-800 dark:text-gray-100">
                        Ngày nhận hàng dự kiếm: <span class="text-red-500 dark:text-red-400">{{ date_delivery }}</span>
                    </p>
                </div>

            </div>
            <div class="col-span-5 max-lg:col-span-12 max-lg:order-1 max-lg:mb-5 bg-white dark:bg-gray-800 pb-10 px-15 max-md:px-5 rounded-sm">
                <div class="mt-5 text-center text-[var(--maincolor)] dark:text-[var(--dark_maincolor)] font-bold text-3xl">
                    <h1>NTC_ORANGE</h1>
                </div>
                <div class="mt-5">
                    <form action="" @submit.prevent id="form-change-bill" method="POST">
                        <p class="text-2xl mt-2 font-bold dark:text-gray-300">Shipping infor</p>
                        <div class="mt-5">
                            <input v-model="address" type="text" name="address" id="address" class="input-config dark:text-gray-400 dark:placeholder:text-gray-400 dark:bg-gray-700" placeholder="Địa chỉ (số nhà và tên đường)">
                            <span class="input-config-error">{{ addressError }}</span>
                        </div>
                        <div class="mt-5">
                            <input v-model="note" type="text" name="note" id="note" class="input-config dark:text-gray-400 dark:placeholder:text-gray-400 dark:bg-gray-700" placeholder="Ghi chú đi kèm">
                            <span class="input-config-error">{{ noteError }}</span>
                        </div>
                        
                        <Menu as="div" class="relative block text-left mt-5">
                            <MenuButton class="w-full">
                                <div class="bg-white  transition-all duration-500 dark:bg-gray-700 dark:text-white border-1 border-[var(--color_border)] dark:border-gray-600 p-2 mt-1 rounded-sm flex items-center justify-between cursor-pointer">
                                    <span>-- {{ pay || 'Chọn phước thức thanh toán' }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>

                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white transition-all duration-500 dark:bg-gray-800 dark:text-white border rounded-md shadow-lg z-50">
                                <div class="py-1">
                                    <MenuItem  class="mb-1 cursor-pointer">
                                        <p @click="pay = 'HOMEPAY' " class="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[0.2rem]">Thanh toán khi nhận hàng</p>
                                    </MenuItem>
                                    <MenuItem  class="mb-1 cursor-pointer">
                                        <p @click="handleBanking() " class="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[0.2rem]">Thanh toán trực tuyến</p>
                                        
                                    </MenuItem>
                                </div>
                            </MenuItems>
                            <span class="input-config-error">{{ payError }}</span>
                        </Menu>
                        
                    </form>
                    <div class="mt-5">
                        <input v-model.trim="discount_code" @keydown.enter="fetchFindDiscount" type="text" class="input-config dark:text-gray-400 dark:placeholder:text-gray-400 dark:bg-gray-700" placeholder="Nhập mã giảm giá nếu có">
                        <span class="input-config-error"></span>
                    </div>
                    <div class="mt-7 ">
                        <!-- <router-link 
                            :to="{name: 'bill_finish'}">
                            <button @click="onManualSubmit" class="btn dark:bg-[var(--dark_maincolor)]">ĐẶT HÀNG</button>
                        </router-link> -->
                        <button @click="onManualSubmit" class="btn dark:bg-[var(--dark_maincolor)]">ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="show_banking"  class="fixed top-0 right-0 bottom-0 left-0 z-99 "> 
            <div @click.prevent="hiddenInfoBanking()" class="flex bg-gray-200 h-full lg:p-5 justify-center items-center">
                <div @click.stop class="grid grid-cols-12 bg-white shadow-xl/30 rounded-sm w-6xl p-5 font-(family-name:--font-winky)">
                    <p class="col-span-12 text-2xl mb-5 inline-block font-bold">Thanh toán trực tuyến – Nhanh chóng, an toàn và tiện lợi, để mỗi giao dịch của bạn trở nên dễ dàng hơn bao giờ hết.</p>
                    <div class="col-span-7 ">
                        <p>Sản phẩm: <span>{{ name }}</span></p>
                        <p>Giá tiền: <span>{{ formatMoney(total) }}</span></p>
                        <p>Sau khi bạn chuyển khoản song hệ thống thống sẽ tư động thanh toán cho bạn</p>
                        <button @click="handle_show_banking()" class="text-white bg-[var(--maincolor)] py-3 px-5 mt-2 rounded-ssm cursor-pointer ">Lấy thông tin thanh toán</button>
                        <div v-if="show_info_banking" class="border-t-1 mt-5 ">
                            <p class="font-bold text-xl my-3">Thông tin thanh toán</p>
                            <div class="flex justify-between">
                                <div class="flex flex-col gap-y-3">
                                    <p>Ngân hàng: MB BANK</p>
                                    <p>Số tài khoản: 0988870434</p>
                                    <p>Tên tài khoản: Nguyễn Trần Cường</p>
                                    <p>Số tiền: {{ formatMoney(total) }} </p>
                                    <p>Nội dung: {{ code }}</p>
                                    <p class="text-xl" v-if="timeLeft > 0">
                                        Thời gian còn lại: 
                                        <strong class="text-green-500">{{ minutes }}:{{ seconds }}</strong>
                                    </p>
                                    <p v-else class="text-red-500">❌ Hết hạn thanh toán</p>
                                </div>
                                <img class="w-70 h-70" :src="`https://qr.sepay.vn/img?acc=VQRQAEQDZ1414&bank=MBBank&amount=${total}&des=${code}`">
                            </div>
                            
                        </div>
                    </div>
                    <div v-if="showInputDiscountBanking" class="col-span-5">
                        <p>Nếu bạn có mã giảm giá, hãy nhập mã giảm giá để được hưởng ưu đãi, khi mua khoá học tại NTC_ORGANGE</p>
                        <div class="flex items-center mt-2">
                            <input  v-model.trim="discount_code" type="text" class="flex-1 border-1 outline-0 rounded-sm p-3" placeholder="Mã giảm giá">
                            <button @click="fetchFindDiscount()" class="py-3 px-6 cursor-pointer bg-[var(--maincolor)] text-white rounded-sm ">Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>
<style scoped>

</style>