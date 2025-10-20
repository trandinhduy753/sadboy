<script setup>
    const store=useStore()
    const isDark=computed(() => store.state.isDark)
</script>

<template>
    <div class="grid grid-cols-14 gap-5 mt-10 max-w-7xl m-auto px-5 max-lg:hidden">
        <div class="col-span-4">
            <div class="h-70">
                <img src="/public/images/img_decorate/deco_main_pro_1.webp" class="h-full w-full rounded-ssm main-image animate-image-float" alt="">
            </div>
        </div>
        <div class="col-span-6">
            <div class="text-center text-white animate-content-block mb-5">
                <p :class="isDark ? 'shine-text' : 'shine-text1'" class="-mt-5 font-(family-name:--font-Luckiest_Guy) text-7xl dark:text-[var(--dark_maincolor)] ">
                    SADBOYSOYEU
                </p>
                <p class="text-lg font-(family-name:--font-noto) tagline-text">Ngọt ngào tự nhiên, tươi ngon mỗi ngày.</p>
                <div class="description-text ">Hoa quả là món quà thiên nhiên ban tặng, không chỉ mang đến hương vị ngọt ngào, chua thanh hay giòn mát mà còn chứa nhiều dưỡng chất tốt cho sức khỏe. Với màu sắc rực rỡ và hương thơm quyến rũ</div>
                <div class="flex justify-center items-center gap-5 mt-5">
                    <div class="animated-border-button">
                        <div class="fourth">Mua ngay</div>
                    </div>
                    <div class="animated-border-button">
                        <div class="fourth">Khám phá</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-4">
            <div class="h-70">
                <img src="/public/images/img_decorate/deco_main_pro_2.jpg" class="h-full w-full main-image animate-image-float rounded-ssm hover:scale-105 transition-transform duration-300 animate-image-float-delay-1" alt="">
            </div>
        </div>
        <div class="col-span-5">
            <div class="h-70">
                <img src="/public/images/img_decorate/deco_main_pro_5.jpg" class="h-full w-full main-image animate-image-float rounded-ssm hover:scale-105 transition-transform duration-300 animate-image-float-delay-2" alt="">
            </div>
        </div>
        <div class="col-span-4">
            <div class="h-70">
                <img src="/public/images/img_decorate/deco_main_pro_4.webp" class="h-full w-full main-image animate-image-float rounded-ssm hover:scale-105 transition-transform duration-300 animate-image-float-delay-3" alt="">
            </div>
        </div>
        <div class="col-span-5">
            <div class="h-70">
                <img src="/public/images/img_decorate/deco_main_pro_3.jpg" class="h-full w-full main-image animate-image-float rounded-ssm hover:scale-105 transition-transform duration-300 animate-image-float-delay-4" alt="">
            </div>
        </div>
        <div class="col-span-3 mt-5">
            <div class="h-50">
                <img src="/public/images/img_decorate/deco_main_pro_1.webp" class="h-full w-full main-image animate-image-float rounded-ssm hover:scale-105 transition-transform duration-300 animate-image-float-delay-5" alt="">
            </div>
        </div>
        <div class="col-span-8 mt-5">
            <div class="flex flex-wrap mt-2 gap-10 justify-center">
                <div class="flex gap-1">
                    <img src="/public/images/img_decorate/deco_main_pro_7.png" class="h-15 w-15 main-image animate-image-float " alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_8.jpg" class="h-15 w-15 main-image animate-image-float" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_9.webp" class="h-15 w-15 main-image animate-image-float" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_10.webp" class="h-15 w-15 main-image animate-image-float" alt="">
                </div>
                <div class="flex gap-1 animate-fade-in">
                    <img src="/public/images/img_decorate/deco_main_pro_11.jpg" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_12.jpeg" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_13.jpg" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_14.jpg" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                </div>
                <div class="flex gap-1 animate-fade-in">
                    <img src="/public/images/img_decorate/deco_main_pro_15.webp" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_16.avif" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_17.jpg" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_18.webp" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                </div>
                <div class="flex gap-1 animate-fade-in">
                    <img src="/public/images/img_decorate/deco_main_pro_19.jpeg" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_20.webp" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_21.webp" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                    <img src="/public/images/img_decorate/deco_main_pro_22.webp" class="h-15 w-15 main-image animate-image-float hover:scale-110 transition-transform duration-300 animate-zoom-in" alt="">
                </div>
            </div>
            <div class="text-center mt-2 text-white font-(family-name:--font-noto) text-sm animate-fade-in text-glow">
                Nước ép tươi mát từ thiên nhiên – Đong đầy hương vị, bùng nổ sức sống.
            </div>
        </div>
        <div class="col-span-3 mt-5">
            <div class="h-50">
                <img src="/public/images/img_decorate/deco_main_pro_6.jpg" class="h-full w-full main-image animate-image-float rounded-ssm hover:scale-105 transition-transform duration-300 animate-image-float-delay-6" alt="">
            </div>
        </div>
    </div>
  
</template>

<style scoped>
.fourth {
  border-color: white; 
  color: #fff;
  background-image: linear-gradient(45deg, white 50%, transparent 50%);
  background-position: 100%;
  background-size: 400%;
  transition: all 0.5s ease;
}

.fourth:hover {
  background-position: 0;
  color: orange;
}



.typing-text {
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid;
    animation: typing 3.5s steps(40, end),
               blink .75s step-end infinite;
}

@keyframes shine1 {
    0% {
        background-position: 200% center;
    }
    100% {
        background-position: -200% center;
    }
}

.shine-text1 {
    position: relative;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shine1 3s linear infinite;
}

@keyframes shine {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

.shine-text {
  background: linear-gradient(
    90deg,
    orange 0%,
    orange 35%,
    white 50%,
    orange 65%,
    orange 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shine 2.5s linear infinite;
}

@keyframes titleBlockAnimation {
    0% {
        opacity: 0;
        transform: translateY(-30px) scale(0.8);
        filter: blur(10px);
    }
    50% {
        opacity: 0.5;
        transform: translateY(15px) scale(1.1);
        filter: blur(5px);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

.animate-title-block {
    animation: titleBlockAnimation 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes contentBlockAnimation {
    0% {
        opacity: 0;
        transform: perspective(1000px) rotateX(-30deg) translateY(-50px);
        filter: blur(20px);
    }
    60% {
        opacity: 0.8;
        transform: perspective(1000px) rotateX(10deg) translateY(20px);
        filter: blur(5px);
    }
    100% {
        opacity: 1;
        transform: perspective(1000px) rotateX(0) translateY(0);
        filter: blur(0);
    }
}

.animate-content-block {
    animation: contentBlockAnimation 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    transform-origin: center center;
    backface-visibility: hidden;
}

@keyframes imageFloat {
    0% {
        opacity: 0;
        transform: scale(0.8) rotate(-5deg);
        filter: blur(10px);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.1) rotate(2deg);
        filter: blur(2px);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0);
        filter: blur(0);
    }
}

@keyframes imagePop {
    0% {
        opacity: 0;
        transform: scale(0.5) translateY(20px);
    }
    70% {
        opacity: 0.8;
        transform: scale(1.2) translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-image-float {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-image-float-delay-1 {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

.animate-image-float-delay-2 {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
}

.animate-image-float-delay-3 {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards;
}

.animate-image-float-delay-4 {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards;
}

.animate-image-float-delay-5 {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1s forwards;
}

.animate-image-float-delay-6 {
    animation: imageFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s forwards;
}

.animate-image-pop {
    animation: imagePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animate-image-pop-delay-1 {
    animation: imagePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
}

.animate-image-pop-delay-2 {
    animation: imagePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

.animate-image-pop-delay-3 {
    animation: imagePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
}

.image-container {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    cursor: pointer;
}

.main-image {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    filter: brightness(1) contrast(1);
}

.main-image:hover {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 15px rgba(255, 165, 0, 0.3);
    filter: brightness(1.1) contrast(1.1) saturate(1.2);
    animation: glowPulse 2s infinite;
}

@keyframes glowPulse {
    0% {
        box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 15px rgba(255, 165, 0, 0.3);
    }
    50% {
        box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 25px rgba(255, 165, 0, 0.5);
    }
    100% {
        box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04),
            0 0 15px rgba(255, 165, 0, 0.3);
    }
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
    opacity: 0;
    transition: all 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container:hover .image-overlay {
    opacity: 1;
}

.overlay-content {
    transform: translateY(20px);
    transition: all 0.4s ease;
}

.image-container:hover .overlay-content {
    transform: translateY(0);
}

.overlay-text {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    padding: 0.5rem 1rem;
    border: 2px solid white;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
}

.overlay-text:hover {
    background: white;
    color: black;
}

.small-image-container {
    position: relative;
    overflow: hidden;
    border-radius: 0.25rem;
    cursor: pointer;
}

.small-image {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
    filter: brightness(1) contrast(1);
}

.small-image:hover {
    transform: scale(1.2) rotate(3deg);
    box-shadow: 
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05),
        0 0 10px rgba(255, 165, 0, 0.3);
    filter: brightness(1.15) contrast(1.1) saturate(1.3);
    z-index: 10;
    animation: smallGlowPulse 1.5s infinite;
}

@keyframes smallGlowPulse {
    0% {
        box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 0 10px rgba(255, 165, 0, 0.3);
    }
    50% {
        box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 0 20px rgba(255, 165, 0, 0.5);
    }
    100% {
        box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 0 10px rgba(255, 165, 0, 0.3);
    }
}

.small-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    opacity: 0;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.small-image-container:hover .small-image-overlay {
    opacity: 1;
}

.small-overlay-text {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    transform: scale(0.5);
    transition: all 0.3s ease;
}

.small-image-container:hover .small-overlay-text {
    transform: scale(1);
}

.animated-border-button {
    position: relative;
    padding: 1px;
    border-radius: 0.5rem;
    cursor: pointer;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7, #ff6b6b);
    background-size: 300% 300%;
    animation: gradientBorder 3s ease infinite;
    transition: all 0.3s ease;
}

.animated-border-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 165, 0, 0.3);
}

.animated-border-button .fourth {
    background: #000;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    transition: all 0.3s ease;
}

.animated-border-button:hover .fourth {
    background: transparent;
    color: #fff;
}

@keyframes gradientBorder {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.tagline-text {
    position: relative;
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradientText 3s ease infinite;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.tagline-text::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7);
    background-size: 200% 200%;
    opacity: 0.1;
    border-radius: 0.5rem;
    z-index: -1;
    animation: gradientBg 3s ease infinite;
}

.tagline-text:hover {
    transform: scale(1.05);
    letter-spacing: 1px;
}

@keyframes gradientText {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes gradientBg {
    0% {
        background-position: 0% 50%;
        filter: blur(5px);
    }
    50% {
        background-position: 100% 50%;
        filter: blur(8px);
    }
    100% {
        background-position: 0% 50%;
        filter: blur(5px);
    }
}

.description-text {
    position: relative;
    display: inline-block;
    padding: 1rem 2rem;
   
    font-size: 1.1rem;
    line-height: 1.6;
    color: #fff;
    background: linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(255, 217, 61, 0.1), rgba(108, 92, 231, 0.1));
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    animation: fadeInUp 1s ease-out forwards;
    transition: all 0.3s ease;
}

.description-text::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6c5ce7);
    background-size: 200% 200%;
    border-radius: 1rem;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: gradientBorder 3s ease infinite;
}

.description-text:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.description-text:hover::before {
    opacity: 0.5;
}

@keyframes gradientBorder {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.title-container {
    position: relative;
    display: inline-block;
    padding: 1rem 2rem;
    margin: -2rem 0 1rem 0;
}

.title-text {
    font-family: var(--font-Luckiest_Guy);
    font-size: 4.5rem;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #ff6b6b);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: titleGradient 3s ease infinite;
    text-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
    position: relative;
    z-index: 1;
}

.title-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #ff6b6b);
    background-size: 200% 200%;
    border-radius: 1rem;
    z-index: -1;
    opacity: 0.1;
    animation: titleBg 3s ease infinite;
    filter: blur(10px);
}

.title-container::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(45deg, #ff6b6b, #ffd93d, #ff6b6b);
    background-size: 200% 200%;
    border-radius: 1.5rem;
    z-index: -2;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: titleBorder 3s ease infinite;
}

.title-container:hover::after {
    opacity: 0.3;
}

.title-container:hover .title-text {
    transform: scale(1.05);
    text-shadow: 0 0 30px rgba(255, 165, 0, 0.5);
}

@keyframes titleGradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

@keyframes titleBg {
    0% {
        background-position: 0% 50%;
        filter: blur(10px);
    }
    50% {
        background-position: 100% 50%;
        filter: blur(15px);
    }
    100% {
        background-position: 0% 50%;
        filter: blur(10px);
    }
}

@keyframes titleBorder {
    0% {
        background-position: 0% 50%;
        transform: scale(1);
    }
    50% {
        background-position: 100% 50%;
        transform: scale(1.02);
    }
    100% {
        background-position: 0% 50%;
        transform: scale(1);
    }
}

</style>