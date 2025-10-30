<script setup>
    const store = useStore();
    const isLoading = computed(() => store.state.client.isLoading )
</script>

<template>
  <div 
    v-show="isLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-60 backdrop-blur-sm"
  >
    <div class="flex flex-col items-center space-y-4">
      <!-- Gradient Spinner -->
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-color: #ccc #0000;
  animation: l16 1s infinite linear;
}
.loader::before,
.loader::after {    
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
}
.loader::before {
  border-color: #f03355 #0000;
  animation: inherit; 
  animation-duration: .5s;
  animation-direction: reverse;
}
.loader::after {
  margin: 8px;
}
@keyframes l16 { 
  100%{transform: rotate(1turn)}
}
</style>
