<script setup>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import robotoFont from '@/assets/fonts_js/Roboto-VariableFont_wdth,wght.js';
import { employee, user, order, product, voucher, provide, comment } from '@/constant'
import { useToast } from 'vue-toastification'
const store =useStore();
const toast = useToast();

const fetchAddToFileEmployee = async (fileContent) => {
    return await store.dispatch('admin/employee/' + employee.add_employee_file_excel, fileContent)
}
const fetchAddToFileUser = async (fileContent) => {
    return await store.dispatch('admin/user/' + user.add_user_file_excel, fileContent)
}
const fetchAddToFileOrder = async (fileContent) => {
    return await store.dispatch('admin/order/' + order.add_order_file_excel, fileContent)
}
const fetchAddToFileProduct = async (fileContent) => {
    return await store.dispatch('admin/product/' + product.add_product_file_excel, fileContent)
}
const fetchAddToFileVoucher = async (fileContent) => {
    return await store.dispatch('admin/voucher/' + voucher.add_voucher_file_excel, fileContent)
}
const fetchAddToFileProvide = async (fileContent) => {
    return await store.dispatch('admin/provide/' + provide.add_provide_file_excel, fileContent)
}
const fetchAddToFileComment = async (fileContent) => {
    return await store.dispatch('admin/comment/' + comment.add_comment_file_excel, fileContent)
}

const fetchListEmployeeDelete = async (start, end) => {
    const result = await store.dispatch('admin/employee/' + employee.get_list_employee_delete, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchListUserDelete = async (start, end) => {
    const result = await store.dispatch('admin/user/' + user.get_list_user_deleted, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchListOrderDelete = async (start, end) => {
    const result = await store.dispatch('admin/order/' + order.get_list_order_deleted, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchListProductDelete = async (start, end) => {
    const result = await store.dispatch('admin/product/' + product.get_list_product_delete, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchListCommentDelete = async (start, end) => {
    const result = await store.dispatch('admin/comment/' + comment.get_list_comment_delete, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchListVoucherDelete = async (start, end) => {
    const result = await store.dispatch('admin/voucher/' + voucher.get_list_voucher_delete, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}
const fetchListProvideDelete = async (start, end) => {
    const result = await store.dispatch('admin/provide/' + provide.get_list_provide_delete, {start, end})
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
}

var props=defineProps({
    add_opt: {
        type: Object,
        default: {}
    }
})
const get_type = computed(() => props.add_opt?.type);
const exportToPDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto.ttf', robotoFont);
    doc.addFont('Roboto.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    doc.text('Danh sách nhân viên', 10, 10);

    autoTable(doc, {
        head: [['Tên', 'Tuổi']],
        body: [
        ['Nguyễn Văn A', 25],
        ['Trần Thị B', 30]
        ],
        startY: 20
    });

    doc.save('danhsach.pdf');
};
const exportToExcel = () => {
    
    var data = [];
    if(get_type.value == 'employee'){
        data=employees.value;
    } 
    else if(get_type.value == 'user'){
        data=users.value;
    }
    else if(get_type.value == 'order') {
        data=orders.value;
    } 
    else if(get_type.value== 'product') {
        data=products.value;
    }
    else if(get_type.value == 'voucher') {
        data=vouchers.value
    }
    else if(get_type.value == 'provide') {
        data=provides.value
    }
    else if(get_type.value == 'comment') {
        data=comments.value
    }
   
    // Tạo worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Tạo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSach");

    // Xuất file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${get_type.value}.xlsx`);
};

const fileContent = ref([]);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Đọc file Excel dạng binary
    reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    // Lấy sheet đầu tiên
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Chuyển sheet thành mảng JSON
    fileContent.value = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    if(get_type.value=='employee'){
        fetchAddToFileEmployee(fileContent.value)
    }
    else if(get_type.value=='user'){
        fetchAddToFileUser(fileContent.value)
    }
    else if(get_type.value == 'order') {
        fetchAddToFileOrder(fileContent.value)
    }
    else if (get_type.value == 'product') {
        fetchAddToFileProduct(fileContent.value)
    }
    else if (get_type.value == 'voucher') {
        fetchAddToFileVoucher(fileContent.value)
    }
    else if (get_type.value == 'provide'){
        fetchAddToFileProvide(fileContent.value)
    }
    else if (get_type.value == 'comment'){ 
        fetchAddToFileComment(fileContent.value)
    }
    
    //console.log(fileContent.value); // Hiển thị nội dung
  };

  reader.readAsBinaryString(file);
};

const fetchDeleteAll = async () => {
    if(get_type.value=='employee') {
        const result = await store.dispatch('admin/employee/' + employee.delete_employee, select_checked_employee.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    else if (get_type.value == 'user') {
        const result = await store.dispatch('admin/user/' + user.delete_user, select_checked_user.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    } 
    else if (get_type.value == 'order') {
        const result = await store.dispatch('admin/order/' + order.delete_order, select_checked_order.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    else if(get_type.value == 'product') {
        const result = await store.dispatch('admin/product/' + product.delete_product, select_checked_product.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    else if(get_type.value == 'voucher') {
        const result = await store.dispatch('admin/voucher/' + voucher.delete_voucher, select_checked_voucher.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    else if(get_type.value == 'provide') {
        const result = await store.dispatch('admin/provide/' + provide.delete_provide, select_checked_provide.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    else if(get_type.value == 'comment') {
        const result = await store.dispatch('admin/comment/' + comment.delete_comment, select_checked_comment.value)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
}

const show_results_delete = () => {
    if(get_type.value == 'employee'){
        if(employees_delete.value.length == 0) {
            fetchListEmployeeDelete(0, 20)
        }
        store.commit('admin/employee/SHOW_LIST_EMPLOYEE_DELETE', true)
    }
    else if(get_type.value == 'user'){
        if(users_delete.value.length == 0) {
            fetchListUserDelete(0, 20)
        }
        store.commit('admin/user/SHOW_LIST_USER_DELETE', true)
    }
    else if(get_type.value == 'order'){
        if(orders_delete.value.length == 0) {
            fetchListOrderDelete(0, 20)
        }
        store.commit('admin/order/SHOW_LIST_ORDER_DELETE', true)
    }
    else if (get_type.value == 'product'){
        if(products_delete.value.length == 0) {
            fetchListProductDelete(0, 20)
        }
        store.commit('admin/product/SHOW_LIST_PRODUCT_DELETE', true)
    }
    else if (get_type.value == 'comment'){
        if(comments_delete.value.length == 0) {
            fetchListCommentDelete(0, 20)
        }
        store.commit('admin/comment/SHOW_LIST_COMMENT_DELETE', true)
    }
    else if (get_type.value == 'voucher'){
        if(vouchers_delete.value.length == 0) {
            fetchListVoucherDelete(0, 20)
        }
        store.commit('admin/voucher/SHOW_LIST_VOUCHER_DELETE', true)
    }
    else if (get_type.value == 'provide'){
        if(provides_delete.value.length == 0) {
            fetchListProvideDelete(0, 20)
        }
        store.commit('admin/provide/SHOW_LIST_PROVIDE_DELETE', true)
    }
}

const select_checked_employee = computed(() => store.state.admin.employee.selected_employee_ids)
const select_checked_user = computed(() => store.state.admin.user.selected_user_ids)
const select_checked_order = computed(() => store.state.admin.order.selected_order_ids)
const select_checked_product = computed(() => store.state.admin.product.selected_product_ids)
const select_checked_voucher = computed(() => store.state.admin.voucher.selected_voucher_ids)
const select_checked_provide = computed(() => store.state.admin.provide.selected_provide_ids)
const select_checked_comment = computed(() => store.state.admin.comment.selected_comment_ids)

const employees = computed(() => store.getters['admin/employee/get_list_employee_by_sort'])
const users = computed(() =>store.getters['admin/user/get_list_user_by_sort'])
const orders = computed(() => store.getters['admin/order/get_list_order_by_sort'])
const products = computed(() => store.getters['admin/product/get_list_product_by_sort'])
const vouchers = computed(() => store.getters['admin/voucher/get_list_voucher_by_sort'])
const provides = computed(() => store.getters['admin/provide/get_list_provide_by_sort'])
const comments = computed(() => store.getters['admin/comment/get_list_comment_by_sort'])

const employees_delete = computed(() => store.state.admin.employee.employees_delete )
const users_delete = computed(() => store.state.admin.user.users_delete )
const orders_delete = computed(() => store.state.admin.order.orders_delete )
const products_delete = computed(() => store.state.admin.product.products_delete )
const comments_delete = computed(() => store.state.admin.comment.comments_delete )
const vouchers_delete = computed(() => store.state.admin.voucher.vouchers_delete )
const provides_delete = computed(() => store.state.admin.provide.provides_delete )
</script>
<template>
    
    <div class="bg-white  text-black transition-all duration-500 dark:text-gray-600 py-2 pl-3 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
        {{ add_opt.description }}
        
    </div>
    <div class="flex flex-wrap gap-y-2 items-center border-b-1 border-[var(--color_border)] dark:border-gray-600 pb-3 text-sm"> 
        <router-link v-show="add_opt.router" :to="{ name: add_opt.router, query: { showopt: 'shop_ad_t' } }" custom v-slot="{ href, navigate, isActive }">
            <div @click="navigate" class="cursor-box crosshair flex items-center text-black px-2 py-1 rounded-sm mr-3 cursor-pointer  transition-all duration-300">
                <font-awesome-icon :icon="['fas', 'plus']" />
                <p class="ml-1">{{ add_opt.title }}</p>
            </div>
        </router-link>
        <div class="flex items-center bg-green-300 dark:bg-green-700 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-yellow-400 dark:hover:bg-yellow-600 transition-all duration-300">
            <label for="uploadexcel" class="flex items-center pointer">
                <font-awesome-icon :icon="['fas', 'file-excel']" />
                <p class="ml-1">Tải file lên</p>
                <input class="hidden" id="uploadexcel" type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
            </label>
        </div>
        <div class="flex items-center bg-purple-300 dark:bg-purple-700 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-purple-400 dark:hover:bg-purple-600 transition-all duration-300">
            <font-awesome-icon :icon="['fas', 'print']" />
            <p class="ml-1">In tài liệu</p>
        </div>
        <div class="flex items-center bg-purple-400 dark:bg-purple-800 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-purple-500 dark:hover:bg-purple-700 transition-all duration-300">
            <font-awesome-icon :icon="['fas', 'copy']" />
            <p class="ml-1">Sao chép</p>
        </div>
        <div @click="exportToExcel()" class="flex items-center bg-green-300 dark:bg-green-700 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-green-400 dark:hover:bg-green-600 transition-all duration-300">
            <font-awesome-icon :icon="['fas', 'file-excel']" />
            <p class="ml-1">Xuất Excel</p>
        </div>
        <div @click="exportToPDF()" class="flex items-center bg-red-300 dark:bg-red-700 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-red-400 dark:hover:bg-red-600 transition-all duration-300">
            <font-awesome-icon :icon="['fas', 'file-pdf']" />
            <p class="ml-1">Xuất PDF</p>
        </div>
        <div>
            <Dialog>
                <DialogTrigger>
                    <div class="flex items-center bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                        <p class="ml-1">Xoá tất cả</p>
                    </div>
                </DialogTrigger>
                <DialogContent class="dark:bg-gray-800 dark:text-white">
                    <DialogHeader>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xoá tất cả mục này không?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button @click="fetchDeleteAll()" type="button" variant="destructive">
                                Xác nhận
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div @click="show_results_delete" class="flex items-center bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-sm mr-3 cursor-pointer hover:scale-[1.1] hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300">
            <font-awesome-icon :icon="['fas', 'trash']" />
            <p class="ml-1">{{ add_opt?.delete_sort }}</p>
        </div>
    </div>
</template>

<style scoped>
.crosshair {
    cursor: crosshair;
    background: linear-gradient(145deg, #e1dfdf, #e2dfdf);
    border: 2px solid #4caf50;
}
.crosshair:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0 5px #4caf5030;
}
</style>
