<script setup>
import { reactive, ref, onMounted } from 'vue'
import { authorization } from '@/constant'
import { useToast } from 'vue-toastification'
const store =useStore();
const toast = useToast();
const fetchGetPermissions = async () => {
    if(employee_id.value !== '' && employee_id.value != null) {
        const result = await store.dispatch('admin/authorization/' + authorization.get_authorization, employee_id.value);
        if(result.ok === 'error' ){
            toast.error(result.message)
            selectedPermissions.value = {}
        }
    }   
}   
const permissions = {
  employee: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'add', 'forceDelete'],
  user: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'forceDelete'],
  order: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'forceDelete'],
  product: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'add', 'forceDelete', 'GoodsReceipt'],
  comment: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'forceDelete'],
  voucher: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'add', 'forceDelete'],
  provide: ['all', 'view', 'viewAny', 'restore', 'update', 'delete', 'find', 'viewDelete', 'add', 'forceDelete'],
  cash_book: ['all', 'viewDebt', 'viewIncomeSpend', 'addBill'],
  authorization: ['all', 'view', 'all']
}

const per = computed(() => store.state.admin.authorization.permissions['permissions'] || {})

const selectedPermissions = reactive({})
for (const module in permissions) {
    selectedPermissions[module] = [] 
}

const selectAll = () => {
    isUnSelectAll.value = true
    for (const module in permissions) {
        selectedPermissions[module] = ['all']
    }
}

const unselectAll = () => {
    isUnSelectAll.value = false
    for (const module in permissions) {
        selectedPermissions[module] = []
    }
}

const savePermissions = () => {
    const filtered = {}

    for (const module in selectedPermissions) {
        const actions = selectedPermissions[module]
        if (!actions.length) continue

        filtered[module] = actions.includes('all') ? ['all'] : actions
    }
  
    const result = store.dispatch('admin/authorization/' + authorization.save_authorization, {employee_id: employee_id.value, permissions: filtered});
    if(result.ok === 'error' ){
        toast.error(result.message)
    }
    else{
        toast.success('Permissions saved successfully!')
    }
    //console.log('Filtered permissions:', filtered)
    return filtered
}

const isUnSelectAll = ref(false)
const allActions = [
  'all', 'view', 'viewAny', 'update', 'delete', 'add', 'restore', 'forceDelete',
  'find', 'viewDelete', 'GoodsReceipt', 'viewDebt', 'viewIncomeSpend', 'addBill'
]
const employee_id = ref('')
const employee = computed(() => store.state.admin.authorization.permissions['employee'] || {}    )
watch(per, (newVal) => {
  if (!newVal) return

  for (const module in permissions) {
    const actions = newVal[module] || []
    // Giữ reactivity của mảng
    selectedPermissions[module].splice(0, selectedPermissions[module].length, 
      ...actions.filter(a => permissions[module]?.includes(a))
    )
  }
})
</script>

<template>
    <div class="p-6 bg-white rounded-xl shadow mt-6">
        <h2 class="text-2xl font-bold mb-4">Role Permissions</h2>
        <div class="mb-4">
            <div class="flex-1">
                <label for="role" class="block text-lg font-medium text-gray-700 mb-1">Nhập mã nhân viên</label>
                <input type="text" v-model="employee_id" id="role" class="w-full border border-gray-300 rounded-ssm px-3 py-2 focus:outline-none" placeholder="Nhập mã nhân viên..." />
            </div>

            <div v-show="Object.keys(employee).length > 0" class="text-lg italic">
                <p>Thông tin nhân viên tương ứng</p>
                <p>Name: {{ employee?.name }}</p>
                <p>Email: {{ employee?.email }}</p>
                <p>Chức vụ: {{ employee?.position }}</p>
            </div>
        </div>
        <div @click="fetchGetPermissions" class="text-base bg-green-500 w-50 rounded-sm cursor-pointer py-2 text-center uppercase font-bold"> Lấy quyền  </div>

        <div class="overflow-x-auto">
            <div class="mt-2 text-lg flex">
                <p class="w-30 font-bold text-center flex-none block py-2 border">Module</p>
                <p v-for="action in allActions" :key="action"  class="flex-none w-45 text-center py-2 font-bold border capitalize" >
                    {{ action }} 
                </p>
            </div>
            <div>
                <div v-for="(actions, module) in permissions" :key="module" class="flex">
                    <p class="w-30 flex-none block py-2 border font-semibold capitalize text-center">
                        {{ module }}
                    </p>

                    <div v-for="action in allActions" :key="action" class="w-45 flex-none text-center py-2 border">
                        <input type="checkbox"  v-model="selectedPermissions[module]" :value="action" :disabled="selectedPermissions[module].includes('all') && action !== 'all'" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer transition duration-200 ease-in-out transform hover:scale-125 hover:ring-2 hover:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4 flex justify-end gap-2">
            <button v-if="!isUnSelectAll" @click="selectAll" class="bg-gray-200 px-4 py-2 rounded-lg" >
                Select All
            </button>
            <button v-else @click="unselectAll" class="bg-gray-200 px-4 py-2 rounded-lg" >
                Unselect All
            </button>
            <button @click="savePermissions" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Save Permissions
            </button>
        </div>
    </div>
</template>
