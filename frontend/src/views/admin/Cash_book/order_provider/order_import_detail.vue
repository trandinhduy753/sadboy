<script setup>
import { cash_book } from '@/constant'
import { formatDateTime, formatMoney } from '@/composables'
import { useForm, useField } from 'vee-validate'
import { object, string, date, number } from 'yup'
import { useToast } from 'vue-toastification'
const toast = useToast()
const route = useRoute()
const store = useStore()

const fetchDetailGoodsReceipt = async (id) => {
    const result = await store.dispatch('admin/cash_book/' + cash_book.detail_goods_receipt, id)
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchEditGoodsReceipt = async (id, data) => {
    const result = await store.dispatch('admin/cash_book/' + cash_book.return_goods_receipt, { id, data })
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const id = computed(() => route.query.index)

const showDialog = ref(false);
const show_pay_product=ref(false);
const detail_goods_receipt = computed(() => store.getters['admin/cash_book/get_list_detail_goods_receipt'][id.value])
const status_goods_receipt = computed(() => store.state.admin.cash_book.status_goods_receipt );
const timeLeft = ref(300);
const exportImgReceipt = ref(null)
let timer = null;
const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});
const schema = object({
    note_cancel: string().required('Tên nhân viên không được bỏ trống').trim(),
})

const { handleSubmit } = useForm({ 
    validationSchema: schema,
    initialValues: {
        
       
    }
})

const { value: note_cancel, errorMessage: note_cancelError } = useField('note_cancel')
const onManualSubmit = handleSubmit(
    (values) => {
        values['status'] = 'CANCEL',
        fetchEditGoodsReceipt(id.value, values)
        toast.success('Huỷ đơn hàng thành công')
    },
    (errors) => {
        toast.error('Huỷ đơn hàng thất bại')
    }
)
onMounted(() => {
    timer = setInterval(() => {
        if (timeLeft.value > 0) {
        timeLeft.value--;
        } else {
        clearInterval(timer);
        }
    }, 1000);
    if (!detail_goods_receipt.value || Object.keys(detail_goods_receipt.value).length === 0) {
        fetchDetailGoodsReceipt(id.value);
        console.log('CALL API')
    } else {
        console.log('Lấy trong getter') // 👉 Object có dữ liệu
    }  
})

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
    <div class="py-2 pl-3 border-l-5 transition-all duration-500 dark:bg-gray-800 dark:text-white dark:border-[var(--dark_maincolor)] mb-4 border-[var(--maincolor)] bg-white font-bold mt-2">Thông tin chi tiết của một phiếu nhập hàng</div>
    <div class="grid grid-cols-12 gap-5 py-2 ">
        <div class="col-span-12 px-2 dark:bg-gray-800 pb-3 transition-all duration-500 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="border-r-2 border-[var(--color_border)] dark:border-gray-600 pr-4">
                    <p class="text-[var(--color_text-gray)] dark:text-gray-300 uppercase h-6">Mã phiếu nhập</p>
                    <p class="text-sm mt-1 text-black dark:text-gray-300">{{ detail_goods_receipt?.code }}</p>
                </div>
                <div class="border-r-2 ml-2 border-[var(--color_border)] dark:border-gray-600 pr-4">
                    <p class="text-[var(--color_text-gray)] dark:text-gray-300 uppercase h-6">Ngày tạo</p>
                    <p class="text-sm mt-1 text-black dark:text-gray-300">{{ formatDateTime(detail_goods_receipt?.created_at) }}</p>
                </div>
                <div class="ml-2">
                    <p class="text-[var(--color_text-gray)] dark:text-gray-300 uppercase h-6 mt-1.5">Trạng thái</p>
                    <p :class="status_goods_receipt[detail_goods_receipt?.status]?.bg" class="text-sm mt-1 transition-all duration-500  px-7 rounded-ssm py-1 text-center">{{ status_goods_receipt[detail_goods_receipt?.status]?.title }}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <div  class="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 cursor-pointer rounded-ssm">
                    <font-awesome-icon :icon="['fas', 'print']" />
                    <p class="text-gray-800 dark:text-gray-300">In</p>
                </div>
                <Dialog>
                    <DialogTrigger as-child>
                        <div v-show="detail_goods_receipt?.status != 'CANCEL'" class="flex items-center gap-2 p-2 px-5 bg-white dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 hover:opacity-70 rounded-ssm cursor-pointer">
                            <p class="text-gray-800 dark:text-gray-300">Trả hàng</p>
                        </div>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300">
                        <div class="mt-5 w-full">
                            <form action="" class="grid grid-cols-12 gap-5">
                                <h3 class="col-span-12 font-bold uppercase text-2xl border-b-1 border-black dark:border-white pb-2">Thông tin liên hệ</h3>
                                <div class="col-span-12">
                                    <label for="reasonemployee" class="cursor-pointer font-bold text-black dark:text-white">Lý do trả hàng</label>
                                    <textarea v-model="note_cancel" id="reason" class="bg-white w-full transition-all h-20 duration-500  border-1 border-[var(--color_border)] outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600" name="" placeholder="Lý do trả đơn hàng" ></textarea>
                                    <span class="input-config-error ">{{ note_cancelError }}</span>
                                </div>
                                <div @click="onManualSubmit()" v-show="detail_goods_receipt?.status != 'CANCEL'" class="col-span-4 bg-[var(--maincolor)] dark:bg-blue-600 rounded-ssm text-white hover:bg-[var(--hoverred)] dark:hover:bg-red-600 cursor-pointer py-2 uppercase font-bold flex text-right justify-center">
                                    Trà hàng
                                </div>
                            </form>
                           
                        </div>
                        <DialogFooter class="sm:justify-start">
                            <DialogClose>
                                
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div class="flex items-center gap-2 hover:bg-blue-300 dark:hover:bg-blue-700 bg-blue-500 dark:bg-blue-800 text-white cursor-pointer rounded-ssm">
                    <div v-show="detail_goods_receipt?.status != 'CANCEL'" @click="showDialog = true" class="px-5 py-2 cursor-pointer">
                       Thanh toán
                        
                    </div>
                    
                    <Dialog v-model:open="showDialog">
                        <DialogContent class="bg-white dark:bg-gray-900 text-black dark:text-gray-300">
                            <DialogHeader>
                                <div class="holographic-container">
                                    <div @click='timeLeft = 300' class="holographic-card">
                                        <h2>Lấy thông tin thanh toán</h2>
                                    </div>
                                </div>
                                <div v-if="timeLeft > 0" class="flex gap-10">
                                    <div class="flex-1 text-sm">
                                        <h3 class="text-xl mb-3">Thông tin thanh toán</h3>
                                        <p class="text-gray-500 mb-2">Ngân hàng: {{ detail_goods_receipt?.provide?.bank  }}</p>
                                        <p class="text-gray-500 mb-2">Tên tài khoản: {{ detail_goods_receipt?.provide?.account_name  }}</p>
                                        <p class="text-gray-500 mb-2">Số tài khoản: {{ detail_goods_receipt?.provide?.account_phone  }}</p>
                                        <p class="text-gray-500 mb-2">Số tiền: {{ formatMoney(detail_goods_receipt?.total)  }}</p>
                                        <p class="text-gray-500 mb-2">Nội dung: {{ detail_goods_receipt?.code  }}</p>
                                        <p class="bg-blue-400 w-20 text-center text-white text-lg rounded-ssm">{{ formattedTime }}</p>
                                    </div>
                                    <div class="flex-1">
                                        <img :src="detail_goods_receipt?.provide?.QR_IMG" alt="">
                                    </div>
                                </div>
                            </DialogHeader>

                            <DialogFooter>
                                <DialogClose as-child>
                                    
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
        <div v-show="detail_goods_receipt?.status == 'CANCEL'" class="col-span-12 bg-white dark:bg-gray-800 transition-all duration-500 text-black dark:text-gray-300 p-2 rounded-ssm">
            <p>Lý do huỷ đơn: </p>
            <p>{{ detail_goods_receipt?.note_cancel }}</p>
        </div>
        <div class="col-span-6 bg-white dark:bg-gray-800 transition-all duration-500 text-black dark:text-gray-300 p-2 rounded-ssm">
            <p class="font-bold border-b-1 border-[var(--color_border)] dark:border-gray-600 pb-2">Nhà cung cấp</p>
            <div class="text-sm mt-3">
                <p class="mt-1">{{ detail_goods_receipt?.provide?.name }}</p>
                <p class="mt-1">Địa chỉ: {{ detail_goods_receipt?.provide?.address }}</p>
                <p class="mt-1">Điện thoại: {{ detail_goods_receipt?.provide?.phone }}</p>
                <p class="mt-1">Email: {{ detail_goods_receipt?.provide?.email }}</p>
                <p class="mt-1">Còn nợ: <span class="font-bold text-red-500 dark:text-red-400 italic underline underline-offset-2">{{ formatMoney(detail_goods_receipt?.provide?.total_debt) }}</span></p>
            </div>
        </div>
        <div class="col-span-6 bg-white dark:bg-gray-800 transition-all duration-500 text-black dark:text-gray-300 p-2 rounded-ssm">
            <p class="font-bold border-b-1 border-[var(--color_border)] dark:border-gray-600 pb-2">Kho cần trả</p>
            <div class="text-sm mt-3">
                <p class="mt-1">{{ detail_goods_receipt?.stock?.name }}</p>
                <p class="mt-1">{{ detail_goods_receipt?.stock?.address }}</p>
                <p class="mt-1">Điện thoại: {{ detail_goods_receipt?.stock?.phone }}</p>
                <p class="mt-1">Email: {{ detail_goods_receipt?.stock?.email }}</p>
            </div>
        </div>

        <div class="col-span-12 bg-white dark:bg-gray-800 transition-all duration-500 rounded-ssm pb-2">
            <div class="font-bold flex items-center gap-2 border-b-1 border-[var(--color_border)] dark:border-gray-600 p-2 transition-all duration-500 bg-white dark:bg-gray-800">
                <p class="cursor-pointer bg-[var(--maincolor)] text-white px-5 py-1 rounded-ssm mr-5">Danh sách hàng hoá</p>
            </div>

            <div class="grid grid-cols-12 px-2 py-3 bg-[var(--background-color-gray)] transition-all duration-500 dark:bg-gray-700 dark:text-gray-300 mt-3">
                <div class="col-span-2">Mã sản phẩm</div>
                <div class="col-span-4">Tên sản phẩm</div>
                <div class="col-span-2 text-right">Số lượng</div>
                <div class="col-span-2 text-right">Đơn giá</div>
                <div class="col-span-2 text-right">Thành tiền</div>
            </div>

            <div class="overflow-y-auto custom-scrollbar h-120">
                <div v-for="(product, index) in detail_goods_receipt?.products" :key="index" class="grid grid-cols-12 transition-all duration-500 px-2 py-3 border-b-1 border-[var(--color_border)] dark:border-gray-700 mt-2 bg-white dark:bg-gray-800">
                    <div class="col-span-2 dark:text-gray-300">{{ product?.code }}</div>
                    <div class="col-span-4">
                        <label class="inline-flex items-center cursor-pointer group">
                            <img :src="product?.img" class="ml-2 w-10 h-10" alt="">
                            <span class="ml-2 text-gray-700 dark:text-gray-300 group-hover:text-[var(--maincolor)] transition">{{ product?.name }}</span>
                        </label>
                        <p v-show="product?.size['S']" class="text-gray-700 dark:text-gray-300 mt-3">{{ product?.name }} / S</p>
                        <p v-show="product?.size['M']" class="text-gray-700 dark:text-gray-300 mt-3">{{ product?.name }} / M</p>
                        <p v-show="product?.size['L']" class="text-gray-700 dark:text-gray-300 mt-3">{{ product?.name }} / L</p>
                    </div>
                    <div class="col-span-2 text-right  pt-12">
                        <p v-show="product?.size['S']" class="text-gray-700 dark:text-gray-300">{{ product?.size['S']?.count }} cân</p>
                        <p v-show="product?.size['M']" class="mt-4 text-gray-700 dark:text-gray-300">{{ product?.size['M']?.count }} cân</p>
                        <p v-show="product?.size['L']" class="mt-4 text-gray-700 dark:text-gray-300">{{ product?.size['L']?.count }} cân</p>
            
                    </div>
                    <div class="col-span-2 text-right pt-12 ">
                        <p v-show="product?.size['S']" class=" dark:text-gray-200">{{ formatMoney(product?.size['S']?.price) }}</p>
                        <p v-show="product?.size['M']" class="mt-4 dark:text-gray-200">{{ formatMoney(product?.size['M']?.price) }}</p>
                        <p v-show="product?.size['L']" class="mt-4 dark:text-gray-200">{{ formatMoney(product?.size['L']?.price) }}</p>
                    </div>
                    <div class="col-span-2 text-right pt-12">
                        <p v-show="product?.size['S']" class=" dark:text-gray-200">{{ formatMoney(Number(product?.size['S']?.count * product?.size['S']?.price)) }}</p>
                        <p v-show="product?.size['M']" class="mt-4 dark:text-gray-200">{{ formatMoney(Number(product?.size['M']?.count * product?.size['M']?.price)) }}</p>
                        <p v-show="product?.size['L']" class="mt-4 dark:text-gray-200">{{ formatMoney(Number(product?.size['L']?.count * product?.size['L']?.price)) }}</p>
                    </div>
                </div>
                <!-- <div v-for="i in 10" :key="i" class="grid hidden grid-cols-12 px-2 py-3 border-b-1 border-[var(--color_border)] transition-all duration-500 dark:border-gray-700 mt-2 bg-white dark:bg-gray-800">
                    <div class="col-span-3 dark:text-gray-300">Sadboy</div>
                    <div class="col-span-3 dark:text-gray-300">10 phút trước</div>
                    <div class="col-span-3 dark:text-gray-300">Tiền mặt</div>
                    <div class="col-span-3 text-right text-green-500">-6.000.000 đ</div>
                </div>

                <div v-for="i in 10" :key="i" class="grid hidden grid-cols-16 gap-2 px-2 py-3 border-b-1 border-[var(--color_border)] transition-all duration-500 dark:border-gray-700 mt-2 bg-white dark:bg-gray-800">
                    <div class="col-span-2 dark:text-gray-300">sadboy</div>
                    <div class="col-span-3 dark:text-gray-300">10 phút trước</div>
                    <div class="col-span-4 capitalize dark:text-gray-300">trần đinh duy</div>
                    <div class="col-span-2 dark:text-gray-300">12</div>
                    <div class="col-span-2 text-right text-red-500">2.000.000 đ</div>
                    <div class="col-span-3 text-right text-green-500">1.000.000 đ</div>
                </div> -->
            </div>
        </div>
        <div class="col-span-6 p-4 bg-white dark:bg-gray-800 transition-all duration-500">
            <div class="flex flex-col">
                <label class="font-bold dark:text-gray-300">Nhân viên sử lý đặt hàng</label>
                <p class="capitalize italic text-blue-500 dark:text-blue-400">{{ detail_goods_receipt?.employee?.name }}</p>
            </div>
            <div class="flex flex-col mt-3">
                <label class="mb-1 font-bold dark:text-gray-300">Ngày muốn nhận hàng dự kiến</label>
                <p class="italic dark:text-gray-200">{{ detail_goods_receipt?.date_receive }}</p>
            </div>
            <div class="flex flex-col mt-3">
                <label class="mb-1 font-bold dark:text-gray-300">Mã đơn hàng</label>
                <p class="dark:text-gray-200">{{ detail_goods_receipt?.code }}</p>
            </div>
            <div class="flex flex-col mt-3">
                <label class="mb-1 font-bold dark:text-gray-300">Ghi chú</label>
                <p class="dark:text-gray-200">{{ detail_goods_receipt?.note }}</p>
            </div>
        </div>

        <div class="col-span-6 bg-white flex flex-col justify-between dark:bg-gray-800 transition-all duration-500 p-5 rounded-md">
            <div>
                <p class="font-bold text-gray-800 dark:text-gray-300 border-b-1 border-[var(--color_border)] dark:border-gray-600 pb-3">Chi phí mua hàng</p>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-gray-800 dark:text-gray-300">Tổng số lượng đặt:</p>
                    <p class="text-gray-800 dark:text-gray-300">{{ detail_goods_receipt?.count }}</p>
                </div>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-gray-800 dark:text-gray-300">Tạm tính:</p>
                    <p class="text-gray-800 dark:text-gray-300">{{ formatMoney(detail_goods_receipt?.subtotal) }}</p>
                </div>
                <div class="flex justify-between items-center mt-3 text-blue-500 dark:text-blue-400">
                    <p>Chiết khấu:</p>
                    <p>{{ formatMoney(detail_goods_receipt?.discount) }}</p>
                </div>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-gray-800 dark:text-gray-300">Chi phí nhập khác:</p>
                    <p class="text-blue-500 dark:text-blue-400">{{ formatMoney(detail_goods_receipt?.other_cost) }}</p>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between items-center mt-3 border-t-1 border-[var(--color_border)] dark:border-gray-600 pt-3">
                    <p class="text-gray-800 dark:text-gray-300">Tổng tiền hàng:</p>
                    <p class= "italic underline underline-offset-4 text-red-500">{{ formatMoney(detail_goods_receipt?.total) }}</p>
                </div>
                
            </div>
            
        </div>
    </div>
    
</template>

<style scoped>
.export-fix * {
  background-color: #fff !important;  /* nền trắng */
  color: #000 !important;             /* chữ đen */
}

.holographic-container {

  height: 50px;
  
}

.holographic-card {
  width: 50%;
  height: 40px;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 7px;
  transition: all 0.5s ease;
}

.holographic-card h2 {
  color: #0ff;
  font-size: 1rem;
  position: relative;
  z-index: 2;
}

.holographic-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    0deg, 
    transparent, 
    transparent 30%, 
    rgba(0,255,255,0.3)
  );
  transform: rotate(-45deg);
  transition: all 0.5s ease;
  opacity: 0;
}

.holographic-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0,255,255,0.5);
  cursor: pointer;
}

.holographic-card:hover::before {
  opacity: 1;
  transform: rotate(-45deg) translateY(100%);
}
</style>