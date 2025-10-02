E-Commerce Website

#Giới thiệu
Dự án là một website bán hàng được phát triển bằng Laravel (backend) và Vue.js(frontend).  
Hệ thống được xây dựng với mục tiêu mang lại trải nghiệm mua sắm trực tuyến tiện lợi cho khách hàng, đồng thời cung cấp công cụ quản lý hiệu quả cho nhà quản trị.  
Toàn bộ quá trình xác thực và bảo mật người dùng được xử lý thông qua **JWT (JSON Web Token)**. 


#Chức năng chính
Đối với khách hàng (User)
- Xem danh sách sản phẩm theo danh mục.
- Thêm sản phẩm vào giỏ hàng.
- Đặt hàng và theo dõi trạng thái đơn hàng.
- Quản lý và chỉnh sửa thông tin tài khoản cá nhân.
Đối với quản trị viên (Admin)
- Quản lý sản phẩm: thêm, sửa, xóa.
- Quản lý nhà cung cấp.
- Quản lý nhân viên.
- Quản lý mã giảm giá.
- Quản lý và duyệt/bỏ duyệt bình luận sản phẩm.
- Theo dõi sổ sách, báo cáo nhập/xuất đơn hàng.

Công nghệ sử dụng
- Backend: Laravel  
- Frontend: Vue.js  
- Cơ sở dữ liệu: MySQL  
- Xác thực: JWT  

## Khởi chạy dự án
Backend (Laravel)
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

Frontend (Vue.js)
cd frontend
cp .env.example .env
npm install
npm run dev
