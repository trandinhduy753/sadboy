import store from '@/store'
import { accountClient, account } from '@/constant'
export function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function toMySQLTimestampLocal(date) {
    const pad = n => n.toString().padStart(2, '0')
    const yyyy = date.getFullYear()
    const MM = pad(date.getMonth() + 1)
    const dd = pad(date.getDate())
    const hh = pad(date.getHours())
    const mm = pad(date.getMinutes())
    const ss = pad(date.getSeconds())
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}

export function toMySQLDate(date) {
    const pad = n => n.toString().padStart(2, '0')
    const yyyy = date.getFullYear()
    const MM = pad(date.getMonth() + 1)
    const dd = pad(date.getDate())
    return `${yyyy}-${MM}-${dd}`
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}

export const formatMoney = (value) => {
  if(!value){
    return '0 đ'
  }
  return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
  }).format(value);
};

export function truncateString(str, maxLength) {
  if (!str) return ""; // Trường hợp null hoặc undefined
  if (str.length <= maxLength) return str; // Không vượt quá thì trả nguyên
  return str.slice(0, maxLength) + "..."; // Cắt và thêm ...
}

export function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return "";
  const [datePart, timePart] = dateTimeStr.split(" ");
  const [year, month, day] = datePart.split("-");
  if(timePart) {
    return `${day}-${month}-${year} ${timePart}`;
  }
  return `${day}-${month}-${year}`;
}

export function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng từ 0-11
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getFutureDate(daysToAdd = 0) {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);

  // format YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function replaceStringRange(str, replacementChar, start, end) {
  const replacement = replacementChar.repeat(end - start);
  return str.slice(0, start) + replacement + str.slice(end);
}

export function groupMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  const groupedItems = [];

  messages.forEach(msg => {
    const msgDate = new Date(msg.date);

    if (msg.type === 'text') {
      groupedItems.push({ 
        type: 'text', 
        content: msg.content, 
        date: msgDate, 
        sender_type: msg.sender_type 
      });
    }
    else if (msg.type === 'order') {
      groupedItems.push({ 
        type: 'order', 
        meta_data: msg.meta_data, 
        date: msgDate, 
        sender_type: msg.sender_type 
      });
    }
    else if (msg.type === 'product') {
      groupedItems.push({ 
        type: 'product', 
        meta_data: msg.meta_data, 
        date: msgDate, 
        sender_type: msg.sender_type 
      });
    }
    else if (msg.type === 'image' || msg.type === 'video') {
      let last = groupedItems[groupedItems.length - 1];
      if (
        last &&
        last.type === msg.type &&
        last.sender_type === msg.sender_type
      ) {
        // kiểm tra trong 1 phút
        const lastDate = new Date(last.date);
        const diff = Math.abs(msgDate - lastDate) / 1000; // giây
        if (diff <= 60) {
          last.files.push(msg.file_path);
          return; // đã gộp rồi, không push mới
        }
      }
      // nếu chưa có group hoặc khác loại/thời gian xa -> tạo mới
      groupedItems.push({ 
        type: msg.type, 
        files: [msg.file_path], 
        date: msgDate, 
        sender_type: msg.sender_type 
      });
    }
  });

  return groupedItems;
}


export async function isUserLogin (to, from, next) {
  try {
    let user = store.state.client.account.user;
    if (!user || Object.keys(user).length === 0) {
        await store.dispatch('client/account/' + accountClient.get_infor_user)
        user = store.state.client.account.user;
    }
    if (!user || Object.keys(store.state.client.account.user).length === 0) {
        return next({ name: "form", query: { opt: "login" } });
    }
    next();
  } 
  catch (error) {
   return next({ name: "form", query: { opt: "login" } });
  }
  
}
export async function isAdminLogin(to, from, next) {
  try {
    let employee = store.state.admin.account.employee;
    if (!employee || Object.keys(employee).length === 0) {
      const res = await store.dispatch('admin/account/' + account.get_info_admin);
      employee = store.state.admin.account.employee;
    }
    if (!employee || Object.keys(employee).length === 0) {
      return next({ name: "admin.formlog" });
    }
    next(); 
  } catch (error) {
    return next({ name: "admin.formlog" });
  }
}