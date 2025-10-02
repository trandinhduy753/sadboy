<script setup lang="ts">


const props = defineProps({
    blog: {
        type: Object,
        default: {}
    }
});

const descript = computed(() => {
    const lengthDesc = props.blog.description.length;

    if (lengthDesc >= 92) {
        for (let i = 92; i < lengthDesc; i++) {
            if (props.blog.description[i] === ' ') {
                return `${props.blog.description.substring(0, i)}...`;
            }
        }
    }
    return props.blog.description;
});
</script>

<template>
    <div class="dark:bg-gray-800 dark:text-gray-100 p-2 rounded-md">
        <!-- Image -->
        <div class="w-full h-40">
            <img :src="blog.img" class="w-full h-full rounded-ssm dark:opacity-90" alt="">
        </div>
        <!-- Description -->
        <div class="h-20 mt-2 text-gray-800 dark:text-gray-200">
            {{ descript }}
        </div>
    </div>
</template>

<style scoped>
</style>
