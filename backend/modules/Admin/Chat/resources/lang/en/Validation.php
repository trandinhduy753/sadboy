<?php
return [
    'required' => ':attribute không được phép để trống',
    'integer' => ':attribute phải làm một số',
    'exists' => ':attribute không tồn tại trong hệ thống',
    'in' => ':attribute phải có giá trị admin hoặc user',
    'json' => ':attribute phải có kiểu dữ liệu JSON',
    'array' => ':attribute phải là một danh sách',
    'string' => ':attribute phải là chuỗi',
    'attributes' => [
        'conversation_id' => 'Mã trò chuyện',
        'sender_id' => 'Mã người gửi',
        'sender_type' => 'Kiểu người gửi',
        'type' => 'Loại tin nhắn',
        'content' => 'Nội dung tin nhắn',
        'file_path' => 'Đường dẫn',
        'meta_data' => 'meta'
    ],
];
