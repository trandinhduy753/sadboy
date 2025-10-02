<template>
    <div>
      <p v-if="timeLeft > 0">
        Thời gian còn lại: 
        <strong>{{ minutes }}:{{ seconds }}</strong>
      </p>
      <p v-else class="text-red-500">❌ Hết hạn thanh toán</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  
  const props = defineProps({
    startTime: { type: String, required: true }, // "2025-08-26 16:43:35"
    durationMinutes: { type: Number, default: 5 }, // cộng thêm 5 phút
  });
  
  const timeLeft = ref(0);
  let timer = null;
  
  const minutes = computed(() =>
    String(Math.floor(timeLeft.value / 60)).padStart(2, "0")
  );
  const seconds = computed(() =>
    String(timeLeft.value % 60).padStart(2, "0")
  );
  
  function calculateTime() {
    const now = new Date().getTime();
    const start = new Date(props.startTime).getTime();
    const end = start + props.durationMinutes * 60 * 1000; // cộng thêm X phút
  
    const diff = Math.floor((end - now) / 1000); // còn bao nhiêu giây
    timeLeft.value = diff > 0 ? diff : 0;
  
    if (diff <= 0) {
      clearInterval(timer);
    }
  }
  
  onMounted(() => {
    calculateTime(); // chạy ngay lần đầu
    timer = setInterval(calculateTime, 1000);
  });
  
  onUnmounted(() => {
    clearInterval(timer);
  });
  </script>
  