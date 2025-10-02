import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'

export const opt_show_img = () => {
    const img = ref("");
    const preview_img = ref("");
    const error_img = ref("");
    
    const show_img = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return; // Return early if no file is selected
        }
        
        // Kiểm tra loại file
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            error_img.value = 'Chỉ chấp nhận file JPEG hoặc PNG';
            return;
        }
        
        // Kiểm tra kích thước file (5MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            error_img.value = 'File phải nhỏ hơn 5MB';
            return;
        }
        
        // Xóa lỗi trước đó nếu có
        error_img.value = '';
        
        const tempURL = URL.createObjectURL(file);
        img.value = file;
        preview_img.value = tempURL;
    }
    
    const clear_img = () => {
        if (preview_img.value) {
            URL.revokeObjectURL(preview_img.value);
        }
        img.value = "";
        preview_img.value = "";
        error_img.value = "";
    }

    return { show_img, img, preview_img, error_img, clear_img }
}

export const opt_show_multiple_img = () => {
    const images = ref([]);
    const preview_images = ref([]);
    const error_img = ref('');

    const allowedTypes = ['image/jpeg', 'image/png'];

    const show_multiple_img = (event) => {
        const files = Array.from(event.target.files);
        error_img.value = '';

        // lọc file hợp lệ
        const validFiles = files.filter(file => allowedTypes.includes(file.type));

        // nếu có file không hợp lệ
        if (validFiles.length < files.length) {
            error_img.value = 'Chỉ chấp nhận ảnh JPEG hoặc PNG';
        }

        // clear preview cũ
        preview_images.value.forEach(url => URL.revokeObjectURL(url));
        preview_images.value = [];
        images.value = [];

        // gán lại file hợp lệ
        images.value = validFiles;
        preview_images.value = validFiles.map(file => URL.createObjectURL(file));
    }

    const remove_image = (index) => {
        images.value.splice(index, 1);
        URL.revokeObjectURL(preview_images.value[index]);
        preview_images.value.splice(index, 1);
    }

    const clear_images = () => {
        preview_images.value.forEach(url => URL.revokeObjectURL(url));
        images.value = [];
        preview_images.value = [];
        error_img.value = '';
    }

    return {
        show_multiple_img,
        remove_image,
        clear_images,
        images,
        preview_images,
        error_img
    }
}

export const opt_show_video = () => {
    const video = ref("")
    const preview_video = ref("")
    const error_video = ref("")

    const show_video = (event) => {
        const file = event.target.files[0]
        if (!file) return

        // Kiểm tra loại file video
        const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg']
        if (!allowedTypes.includes(file.type)) {
            error_video.value = 'Chỉ chấp nhận file MP4, WebM hoặc OGG'
            return
        }

        // Giới hạn dung lượng file (ví dụ: 20MB)
        const maxSize = 20 * 1024 * 1024
        if (file.size > maxSize) {
            error_video.value = 'File phải nhỏ hơn 20MB'
            return
        }

        // Xóa lỗi trước đó nếu có
        error_video.value = ''

        // Tạo URL tạm để preview
        const tempURL = URL.createObjectURL(file)
        video.value = file
        preview_video.value = tempURL
    }

    const clear_video = () => {
        if (preview_video.value) {
            URL.revokeObjectURL(preview_video.value)
        }
        video.value = ""
        preview_video.value = ""
        error_video.value = ""
    }

    return { show_video, video, preview_video, error_video, clear_video }
}

export const opt_show_multiple_video = () => {
    const videos = ref([])
    const preview_videos = ref([])
    const error_video = ref('')

    // Loại file cho phép
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']

    const show_multiple_video = (event) => {
        const files = Array.from(event.target.files)
        error_video.value = ''

        // lọc file hợp lệ
        const validFiles = files.filter(file => allowedTypes.includes(file.type))

        if (validFiles.length < files.length) {
            error_video.value = 'Chỉ chấp nhận file MP4, WebM, OGG, MOV'
        }

        // clear preview cũ
        preview_videos.value.forEach(url => URL.revokeObjectURL(url))
        preview_videos.value = []
        videos.value = []

        // gán lại file hợp lệ
        videos.value = validFiles
        preview_videos.value = validFiles.map(file => URL.createObjectURL(file))
    }

    const remove_video = (index) => {
        videos.value.splice(index, 1)
        URL.revokeObjectURL(preview_videos.value[index])
        preview_videos.value.splice(index, 1)
    }

    const clear_videos = () => {
        preview_videos.value.forEach(url => URL.revokeObjectURL(url))
        videos.value = []
        preview_videos.value = []
        error_video.value = ''
    }

    return {
        show_multiple_video,
        remove_video,
        clear_videos,
        videos,
        preview_videos,
        error_video
    }
}
