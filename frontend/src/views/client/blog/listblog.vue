<script setup>
import blog from '@/views/client/blog/blog.vue';

const blogs= reactive([
    {
        img: '/public/images/img_blog/list_blog_1.webp',
        description: 'Dâu tây - ngọt ngào, mọng nước, giàu vitamin C, là lựa chọn tuyệt vời cho sức khỏe và sắc đẹp.'
    },
    {
        img: '/public/images/img_blog/list_blog_2.webp',
        description: 'Cam - mọng nước, giàu vitamin C, mang đến vị ngọt thanh mát và sức khỏe dồi dào!'
    },
    {
        img: '/public/images/img_blog/list_blog_3.jpg',
        description: 'Mâm xôi - ngọt dịu, chua thanh, giàu dinh dưỡng, tươi ngon trong từng quả!'
    },
    {
        img: '/public/images/img_blog/list_blog_4.jpg',
        description: 'Kem trái cây - sự kết hợp hoàn hảo giữa vị mát lạnh của kem và hương vị tự nhiên từ các loại trái cây tươi ngon, mang đến cảm giác sảng khoái và ngọt ngào trong từng muỗng!'
    },
    {
        img: '/public/images/img_blog/list_blog_5.jpg',
        description: 'Kiwi - trái cây nhỏ nhưng giàu dinh dưỡng, với vị chua ngọt đặc trưng, giàu vitamin C và chất xơ, mang lại cảm giác tươi mát và sảng khoái!'
    },
    {
        img: '/public/images/img_blog/list_blog_6.jpg',
        description: 'Nho sữa - quả nhỏ ngọt ngào, mọng nước, vị ngọt thanh pha chút chua nhẹ, mang đến cảm giác tươi mát và bổ dưỡng!'
    },
    {
        img: '/public/images/img_blog/list_blog_7.webp',
        description: 'Quả roi - giòn, mọng nước, vị ngọt nhẹ pha chút chua, mang đến cảm giác tươi mát và sảng khoái trong từng miếng!'
    },
    {
        img: '/public/images/img_blog/list_blog_8.jpg',
        description: 'Quả đào thơm ngọt, thịt mềm mịn, vị thanh mát, là món trái cây yêu thích mùa hè.'
    },{
        img: '/public/images/img_blog/list_blog_9.jpg',
        description: 'Cherry nhỏ xinh, màu đỏ tươi, vị ngọt thanh mát, giàu vitamin và chống oxy hóa.'
    },
    {
        img: '/public/images/img_blog/list_blog_10.webp',
        description: 'Mận giòn, ngọt dịu, có vị chua nhẹ, giàu vitamin C và chất xơ, giúp giải nhiệt và tốt cho sức khỏe.'
    },
    {
        img: '/public/images/img_blog/list_blog_11.jpg',
        description: 'Dứa thơm ngọt, giàu vitamin C và enzyme bromelain, giúp tăng cường tiêu hóa và mang lại cảm giác sảng khoái.'
    },
    {
        img: '/public/images/img_blog/list_blog_12.jpg',
        description: 'Nước dừa thanh mát, giàu điện giải tự nhiên, giúp giải khát và bổ sung năng lượng tức thì.'
    },
    {
        img: '/public/images/img_blog/list_blog_13.jpg',
        description: 'Quả táo giòn ngọt, giàu vitamin và chất xơ, giúp tăng cường sức khỏe và làm đẹp da.'
    },
    {
        img: '/public/images/img_blog/list_blog_14.webp',
        description: 'Nước ép đào thơm mát, ngọt dịu, giàu vitamin và khoáng chất, giúp thanh lọc cơ thể và làm đẹp da.'
    },
    {
        img: '/public/images/img_blog/list_blog_15.gif',
        description: 'Nước ép cherry đỏ mọng, ngọt thanh, giàu chất chống oxy hóa, giúp tăng cường sức khỏe và làm đẹp da.'
    },
    {
        img: '/public/images/img_blog/list_blog_16.jpg',
        description: 'Quả lê mọng nước, vị ngọt dịu, giàu vitamin và chất xơ, giúp thanh nhiệt và hỗ trợ tiêu hóa.'
    },
    {
        img: '/public/images/img_blog/list_blog_17.webp',
        description: 'Quả ổi giòn ngọt, giàu vitamin C, chất xơ và chất chống oxy hóa, tốt cho sức khỏe và hệ tiêu hóa.'
    },
    {
        img: '/public/images/img_blog/list_blog_18.jpg',
        description: 'Nước ép dưa hấu tươi mát, ngọt lịm, giàu vitamin C, giúp giải nhiệt và cung cấp năng lượng tức thì.'
    },
    {
        img: '/public/images/img_blog/list_blog_19.jpg',
        description: 'Nước ép táo thanh ngọt, giàu vitamin, giúp thanh lọc cơ thể và mang lại cảm giác sảng khoái.'
    },
    {
        img: '/public/images/img_blog/list_blog_20.jpg',
        description: 'Nước ép nho thơm ngon, giàu chất chống oxy hóa, giúp tăng cường sức khỏe và làm đẹp da.'
    }
])
</script>

<template>
    <div class="grid xl:grid-cols-15 lg:grid-cols-12 max-lg:grid-cols-12 gap-5 mt-10">
        <div v-for="(blog, index) in blogs" :key="index" class="col-span-3 max-lg:col-span-6">
            <blog :blog="blog" />
        </div>
        
    </div>
</template>

<style scoped>

</style>
