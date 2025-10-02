<script setup lang="ts">
    import Decorate_Blog from '@/views/client/blog/decorate_blog.vue';
    import Title_Blog from '@/views/client/blog/titleblog.vue';
    import List_Blog from '@/views/client/blog/listblog.vue'
</script>

<template>
    <div class="dark:bg-gray-900 pb-10 transition-all duration-500">
        <div class="grid grid-cols-12 pt-5 max-w-7xl m-auto px-5">
            <div class="col-span-12">
                <Decorate_Blog />
            </div>
            <div class="col-span-12">
                <Title_Blog />
            </div>
            <div class="col-span-12">
                <List_Blog  />
            </div>
        </div>
    </div>
   
</template>

<style scoped>

</style>
