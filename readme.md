![Laravel](https://img.shields.io/badge/Laravel-v8.82-red)
![Vue.js](https://img.shields.io/badge/Vue.js-v3.5-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

## Giới thiệu

Đây là dự án web được phát triển bằng **Laravel**, **Vue.js**, và **Docker**.  
Mục tiêu của dự án là xây dựng **một nền tảng thương mại điện tử hiện đại** cho phép người dùng **xem, mua và thanh toán sản phẩm trực tiếp hoặc online**, đồng thời cung cấp hệ thống **quản lý toàn diện cho quản trị viên**.

---

### Đối tượng sử dụng & Tính năng chính

#### Người dùng
- Duyệt, tìm kiếm và xem chi tiết sản phẩm theo danh mục hoặc từ khóa.
- Thêm vào giỏ hàng, đặt hàng và thanh toán trực tiếp hoặc online (qua cổng thanh toán).
- Theo dõi đơn hàng theo trạng thái (đang xử lý, vận chuyển, hoàn tất...).  
- Quản lý thông tin tài khoản cá nhân, địa chỉ giao hàng, và lịch sử mua hàng.
- Trò chuyện trực tiếp với người bán hoặc nhân viên hỗ trợ qua hệ thống chat real-time.
- Đánh giá và bình luận sản phẩm sau khi mua.
- Nhập và sử dụng mã giảm giá (voucher) khi thanh toán.

#### Quản trị viên (Admin)
- Quản lý người dùng: khách hàng, nhân viên, và nhà cung cấp.
- Quản lý sản phẩm: thêm, sửa, xóa, phân loại và theo dõi tồn kho.
- Xử lý và duyệt đơn hàng, cập nhật trạng thái hoặc hủy đơn hàng.
- Quản lý phiếu giảm giá, doanh thu, và sổ sách thu chi.
- Trao đổi và hỗ trợ khách hàng trực tiếp qua hệ thống chat.
- Phân quyền nhân viên theo vai trò (quản lý, nhân viên, kế toán...).
- Xem báo cáo thống kê doanh số, lượt truy cập, và hiệu quả kinh doanh theo thời gian.
- Quản lý cấu hình hệ thống, thông báo, và tùy chỉnh nội dung website.
---

### Kiến trúc hệ thống

- **Backend (Laravel):**  
  - Cung cấp RESTful API và xử lý toàn bộ logic nghiệp vụ.  
  - Tích hợp xác thực bảo mật bằng JWT.  
  - Quản lý dữ liệu bằng MySQL và Redis cache.  
  - Thiết lập hệ thống phần quyền.  
  - Hỗ trợ real-time chat qua hoặc Pusher.

- **Frontend (Vue.js 3 + Tailwind CSS):**  
  - Giao diện thân thiện, tối ưu trải nghiệm người dùng.  
  - Sử dụng Vue Router cho điều hướng trang và Pinia/Vuex để quản lý trạng thái.  
  - Kết nối API qua Axios, cập nhật dữ liệu theo thời gian thực.

- **Docker & Nginx:**  
  - Cấu hình đồng bộ môi trường phát triển (PHP-FPM, Node, MySQL, Redis, Nginx).  
  - Dễ dàng triển khai bằng `docker-compose up -d`.  

---

## Cấu trúc thư mục
```bash
project/
├── backend/ (Laravel)
│   ├── app/
│   ├── bootstrap
│   ├── config/
│   ├── database/
│   ├── modules/
│   │   ├── admin/
│   │   ├── client/
│   │   │── ModulesServiceProvider.php
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── tests/
└── frontend/ (Vue.js)
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── axios/
    │   ├── components/
    │   ├── composables/
    │   ├── constant/
    │   ├── layout/
    │   ├── lib/
    │   ├── plugins/
    │   ├── router/
    │   ├── store/
    │   ├── utils/
    │   ├── view
    ├── public/
    ├── vite.config.js
```

# Hướng dẫn cài đặt

Bạn có thể theo 2 cách như sau:  
1. **Cài đặt thủ công** trên môi trường máy local.  
2. **Cài đặt tự động bằng Docker**.

---
## Cách 1 – Cài đặt thủ công (Manual Setup)

### 🔹 Yêu cầu môi trường
Đảm bảo máy của bạn đã cài:

- **PHP** >= 8.2  
- **Composer**  
- **Node.js** >= 18  
- **MySQL** hoặc **MariaDB**  
- **Redis** *(tùy chọn, nếu dùng cache hoặc queue)*  
- **Pusher account** *(để chat real-time)*  
- **Sepay account** *(tích hợp thanh toán)*  

---

### 🔹 Các bước thực hiện

#### 1. Clone dự án
git clone https://github.com/username/project-name.git
cd project-name


2. Cài đặt Backend (Laravel)
cd backend
composer install
cp .env.example .env
php artisan key:generate
