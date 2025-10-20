<script setup>
import { ref, reactive, watch } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const currentSlide = ref(0)
const carousel = ref(null)

const imgRefs = ref([])
const scrollImg = ref(null)
var props = defineProps({
    imgs: {
        type: Array,
        default: []
    },
})

watch(currentSlide, (newVal) => {
  const el = imgRefs.value[newVal]
  if (el && scrollImg.value) {
    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    })
  }
})


function goNext() {
  carousel.value?.next()
}

function goPrev() {
  carousel.value?.prev()
}


</script>

<template>
    <div class="flex items-center px-5 max-md:px-0">
        <button
            @click="goPrev"
            class="px-4 py-3 dark:text-white text-4xl hover:scale-[1.5]  cursor-pointer transition-all duration-300 "
        >
            <font-awesome-icon :icon="['fas', 'angle-left']" class="text-[var(--text_color-gray)]" />
        </button>
        <Carousel
            ref="carousel"
            :model-value="currentSlide"
            @update:modelValue="currentSlide = $event"
            :items-to-show="1"
            :wrap-around="true"
            :mouse-drag="true"
            class="rounded-lg overflow-hidden"
        >
        
            <Slide v-for="(imga, index) in imgs" :key="index" class="">
                <div class="flex-1 px-5 max-md:px-0 h-100 max-md:h-80">
                    <img :src="imga" alt="" class="w-full h-full rounded-sm">
                </div>
            </Slide>
        </Carousel>
        
        <button
            @click="goNext"
            class="px-4 py-3 text-4xl dark:text-white hover:scale-[1.5] cursor-pointer transition-all duration-300"
        >
            <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>

    </div>
    <div class="flex mt-5 max-md:mt-5 scrollbar-hide max-lg:justify-between overflow-x-scroll" ref="scrollImg" >
        <img v-for="(img, index) in imgs" 
            v-on:click="currentSlide=index" 
            :key="index"
            :ref="el => imgRefs[index] = el" 
            :class="index==currentSlide ? 'border-2 border-[var(--color_border)]' : 'border-1 border-[var(--color_border)]'" 
            class="w-25 h-25 mr-3 max-lg:mr-0 p-1 rounded-sm  cursor-pointer" 
            :src="img" 
        alt="">
        
    </div>
</template>

<style scoped>

</style>
