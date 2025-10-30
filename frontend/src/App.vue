<script setup>
import Loading from '@/views/client/loading.vue'
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Chat from '@/views/client/chat/chat.vue'
const store = useStore();

const route = useRoute();
const layout = computed(() => route.meta.layout);
const showChat = computed(() => store.state.client.showChat )

</script>

<template>
    <div class="">
        <Loading />
        <Chat v-if="showChat" />
        <component  :is="layout">
            <router-view v-slot="{ Component }">
                <transition>
                    <component :is="Component"  />
                </transition>
            </router-view>
        </component>
    </div>
    
    
    
</template>

<style scoped>

</style>
