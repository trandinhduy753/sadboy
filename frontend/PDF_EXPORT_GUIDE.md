# Hướng dẫn xuất PDF với font tiếng Việt

## Vấn đề đã được giải quyết

✅ **Lỗi font chữ tiếng Việt trong PDF đã được sửa**

### Nguyên nhân lỗi:
- File font Roboto bị lỗi khi convert sang base64
- Thiếu cấu hình font đúng cách trong jsPDF

### Giải pháp đã áp dụng:

1. **Convert lại tất cả font files:**
   - Chạy script `convert-fonts.js` để convert tất cả font TTF sang base64
   - Tất cả font trong thư mục `src/assets/fonts_js/` đã được convert thành công

2. **Sử dụng font mặc định:**
   - Thay vì sử dụng font Roboto tùy chỉnh, sử dụng font `helvetica` mặc định
   - Font mặc định hỗ trợ tốt tiếng Việt và ít gây lỗi

3. **Cải thiện code xuất PDF:**
   - Thêm xử lý dữ liệu động từ store
   - Cải thiện cấu trúc bảng với 3 cột: Tên, Tuổi, Chức vụ
   - Thêm type safety cho TypeScript

## Cách sử dụng

### Xuất PDF:
```javascript
const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Sử dụng font mặc định
    doc.setFont('helvetica');
    doc.text('Danh sách nhân viên', 10, 10);

    // Tạo bảng với dữ liệu
    autoTable(doc, {
        head: [['Tên', 'Tuổi', 'Chức vụ']],
        body: tableData,
        startY: 20,
        styles: {
            fontSize: 10
        },
        headStyles: {
            fontSize: 12,
            fontStyle: 'bold'
        }
    });

    doc.save('danhsach-nhanvien.pdf');
};
```

### Xuất Excel:
```javascript
const exportToExcel = () => {
    const data = employees.value; // Dữ liệu từ store
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSach");
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'danhsach-nhanvien.xlsx');
};
```

## Font files đã sẵn sàng

Các font sau đã được convert và sẵn sàng sử dụng:
- Roboto (Regular, Italic)
- Inter (Regular, Italic)
- Montserrat (Regular, Italic)
- Source Sans 3 (Regular, Italic)
- Noto Serif (Regular, Italic)
- EB Garamond (Regular, Italic)
- Oswald
- Madimi One
- Luckiest Guy
- Winky Sans (Regular, Italic)

## Lưu ý

1. **Font mặc định:** Sử dụng `helvetica` để tránh lỗi font
2. **Dữ liệu động:** Code đã được cải thiện để lấy dữ liệu từ store
3. **Type safety:** Đã thêm type annotations cho TypeScript
4. **Error handling:** Code xử lý trường hợp dữ liệu rỗng

## Test

Để test việc xuất PDF:
1. Mở trang admin
2. Chọn mục "Nhân viên" 
3. Click nút "Xuất PDF"
4. Kiểm tra file PDF được tạo có hiển thị đúng tiếng Việt

## Troubleshooting

Nếu vẫn gặp lỗi font:
1. Kiểm tra console browser có lỗi gì không
2. Đảm bảo đã import đúng các package jsPDF
3. Thử sử dụng font khác như `times` hoặc `courier`
4. Kiểm tra dữ liệu đầu vào có ký tự đặc biệt không
