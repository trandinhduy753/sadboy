<script setup>

</script>

<template>
    <div class="col-span-6 max-lg:hidden bg-[#cfecf0] dark:bg-gray-800 transition-all duration-500 flex items-center justify-center py-8">
        <img src="@/assets/images/img_decorate/product_season-removebg-preview.png" class="w-60 h-50" alt="">
        <div class="ml-10">
            <h3 class="text-2xl font-bold dark:text-white transition-all duration-500 -mt-15">SUMMER FRUIT</h3>
            <p class="text-sm text-[var(--colorborder)] dark:text-gray-300">100% Pure Natural Fruit Juicy</p>
            <div class="text-box ">
                <a href="#" class="btn btn-white btn-animate rounded-ssm bg-red-600 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-500 w-25 text-sm text-white py-2 mt-3 font-bold text-center">SHOW NOW</a>
            </div>
            <!-- <div class="bg-red-600 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-500 w-25 text-sm text-white py-2 mt-3 font-bold text-center">
                <a href="../html/shop_find_product.html">SHOP NOW</a>
            </div> -->
        </div>
    </div>
    <div class="col-span-6 max-lg:hidden bg-[#fbeace] dark:bg-gray-800 transition-all duration-500 flex items-center justify-center py-8">
        <img src="@/assets/images/img_decorate/product_fruit_season-removebg-preview.png" class="w-60 h-50" alt="">
        <div class="ml-10">
            <h3 class="text-2xl font-bold dark:text-white transition-all duration-500 -mt-15">DRINK FRUIT</h3>
            <p class="text-sm text-[var(--colorborder)] dark:text-gray-300">WITH 25% ALL OFF</p>
            <div class="text-box ">
                <a href="#" class="btn btn-white btn-animate rounded-ssm bg-red-600 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-500 w-25 text-sm text-white py-2 mt-3 font-bold text-center">SHOW NOW</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-box {
   
}

.btn:link,
.btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    transition: all .2s;
    position: absolute;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
}

.btn-white::after {
    background-color: red;
}

.btn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

.btn-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}

@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>
