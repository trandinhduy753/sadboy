<script setup lang="ts">



const isOpen = ref(false)
const isClosing = ref(false)

const openDialog = () => {
  isOpen.value = true
  isClosing.value = false
}

const closeDialog = () => {
  isClosing.value = true
  setTimeout(() => {
    isOpen.value = false
  }, 300) // Thời gian trùng với transition
}
</script>

<template>

    <div class="relative z-9 " >
        <div>
            <button @click="openDialog">
                <slot></slot>
            </button>

            <div
                v-if="isOpen"
                class="absolute top-[20%]"

                @click.self="closeDialog"
            >
                <div 
                    :class="[
                            'bg-white rounded-lg shadow-xl border-1 border-[var(--color_border)] p-5 transform transition-all duration-300',
                            isClosing ? 'opacity-0 scale-90' : 'animate-show'
                    ]">
                    <div class=" w-200 h-120  overflow-x-auto custom-scrollbar scrollbar-hide">
                        <div class=" h-190" >
                            <div class="mt-2">
                                <div class="text-[1.1rem]">A</div>
                                <div class="flex items-center">
                                    <input type="checkbox" class="w-4 h-4" value="An Giang">
                                    <label for="An Giang" class="ml-3">An Giang</label>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">B</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mb-2 mr-3 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bình Thuận">
                                        <label for="Bình Thuận" class="ml-3">Bình Thuận</label>
                                    </div>
                                    <div class="flex items-center w-47 mb-2 mr-3 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bà Rịa-Vũng Tàu">
                                        <label for="Bà Rịa-Vũng Tàu" class="ml-3">Bà Rịa-Vũng Tàu</label>
                                    </div>
                                    <div class="flex items-center w-47 mb-2 mr-3 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bình Dương">
                                        <label for="Bình Dương" class="ml-3">Bình Dương</label>
                                    </div>
                                    <div class="flex items-center w-47 mb-2 mr-3 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bình Phước">
                                        <label for="Bình Phước" class="ml-3">Bình Phước</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bình Định">
                                        <label for="Bình Định" class="ml-3">Bình Định</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bạc Liêu">
                                        <label for="Bạc Liêu"  class="ml-3">Bạc Liêu</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bắc Giang">
                                        <label for="Bắc Giang"  class="ml-3">Bắc Giang</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bắc Kạn">
                                        <label for="Bắc Kạn" class="ml-3">Bắc Kạn</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bắc Ninh">
                                        <label for="Bắc Ninh" class="ml-3">Bắc Ninh</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Bến Tre">
                                        <label for="Bến Tre" class="ml-3">Bến Tre</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">C</div>
                                <div class="flex items-center flex-wrap mt-1">
                                    <div class="w-47 mr-3">
                                        <input type="checkbox" class="w-4 h-4" name="Cao Bằng" id="Cao Bằng" value="Cao Bằng">
                                        <label for="Cao Bằng" class="ml-3"> Cao Bằng</label>
                                    </div>
                                    <div class="w-47 mr-3">
                                        <input type="checkbox" class="w-4 h-4" name="Cà Mau" id="Cà Mau" value="Cà Mau">
                                        <label for="Cà Mau" class="ml-3">Cà Mau</label>
                                    </div>
                                    <div class="w-47 mr-3">
                                        <input type="checkbox" class="w-4 h-4" name="Cần Thơ" id="Cần Thơ" value="Cần Thơ">
                                        <label for="Cần Thơ" class="ml-3"> Cần Thơ</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">G</div>
                                <div class="flex items-center mt-1">
                                    <div class="flex items-center">
                                        <input type="checkbox" class="w-4 h-4" value="Gia Lai">
                                        <label for="Gia Lai" class="ml-3">Gia Lai</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">H</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Bình Chánh">
                                        <label class="ml-3" for="Huyện Bình Chánh">Huyện Bình Chánh</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Gia Lâm">
                                        <label class="ml-3" for="Huyện Gia Lâm">Huyện Gia Lâm</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Hoài Đức">
                                        <label class="ml-3" for="Huyện Hoài Đức">Huyện Hoài Đức</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Thanh Oai">
                                        <label class="ml-3" for="Huyện Thanh Oai">Huyện Thanh Oai</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Thanh Trì">
                                        <label class="ml-3" for="Huyện Thanh Trì">Huyện Thanh Trì</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Thường Tín">
                                        <label class="ml-3" for="Huyện Thường Tín">Huyện Thường Tín</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Huyện Đông Anh">
                                        <label class="ml-3" for="Huyện Đông Anh">Huyện Đông Anh</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hà Giang">
                                        <label class="ml-3" for="Hà Giang">Hà Giang</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hà Nam">
                                        <label class="ml-3" for="Hà Nam">Hà Nam</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hà Nội">
                                        <label class="ml-3" for="Hà Nội">Hà Nội</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hà Tĩnh">
                                        <label class="ml-3" for="Hà Tĩnh">Hà Tĩnh</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hòa Bình">
                                        <label class="ml-3" for="Hòa Bình">Hòa Bình</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hưng Yên">
                                        <label class="ml-3" for="Hưng Yên">Hưng Yên</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hải Dương">
                                        <label class="ml-3" for="Hải Dương">Hải Dương</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hải Phòng">
                                        <label class="ml-3" for="Hải Phòng">Hải Phòng</label>
                                    </div>
                                    <div class="flex items-center mr-3 mb-2 w-47 shrink-0">
                                        <input type="checkbox" class="w-4 h-4" value="Hậu Giang">
                                        <label class="ml-3" for="Hậu Giang">Hậu Giang</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">K</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mr-3">
                                        <input type="checkbox" class="w-4 h-4" name="Khánh Hòa" id="Khánh Hòa" value="Khánh Hòa">
                                        <label class="ml-3" for="Khánh Hòa">Khánh Hòa</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3">
                                        <input type="checkbox" class="w-4 h-4" name="Kiên Giang" id="Kiên Giang" value="Kiên Giang">
                                        <label class="ml-3" for="Kiên Giang">Kiên Giang</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3">
                                        <input type="checkbox" class="w-4 h-4" name="Kon Tum" id="Kon Tum" value="Kon Tum">
                                        <label class="ml-3" for="Kon Tum">Kon Tum</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">L</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Lai Châu" id="Lai Châu" value="Lai Châu">
                                        <label class="ml-3" for="Lai Châu">Lai Châu</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Long An" id="Long An" value="Long An">
                                        <label class="ml-3" for="Long An">Long An</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Lào Cai" id="Lào Cai" value="Lào Cai">
                                        <label class="ml-3" for="Lào Cai">Lào Cai</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Lâm Đồng" id="Lâm Đồng" value="Lâm Đồng">
                                        <label class="ml-3" for="Lâm Đồng">Lâm Đồng</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Lạng Sơn" id="Lạng Sơn" value="Lạng Sơn">
                                        <label class="ml-3" for="Lạng Sơn">Lạng Sơn</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">N</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Nam Định" id="Nam Định" value="Nam Định">
                                        <label class="ml-3" for="Nam Định">Nam Định</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Nghệ An" id="Nghệ An" value="Nghệ An">
                                        <label class="ml-3" for="Nghệ An">Nghệ An</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Ninh Bình" id="Ninh Bình" value="Ninh Bình">
                                        <label class="ml-3" for="Ninh Bình">Ninh Bình</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Ninh Thuận" id="Ninh Thuận" value="Ninh Thuận">
                                        <label class="ml-3" for="Ninh Thuận">Ninh Thuận</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Nước Ngoài" id="Nước Ngoài" value="Nước Ngoài">
                                        <label class="ml-3" for="Nước Ngoài">Nước Ngoài</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">P</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                    <input class="w-4 h-4" type="checkbox" name="Phú Thọ" id="Phú Thọ" value="Phú Thọ">
                                    <label class="ml-3" for="Phú Thọ">Phú Thọ</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2">
                                    <input class="w-4 h-4" type="checkbox" name="Phú Yên" id="Phú Yên" value="Phú Yên">
                                    <label class="ml-3" for="Phú Yên">Phú Yên</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">Q</div>
                                <div class="flex items-center flex-wrap mt-1">
                                    <div class="flex items-center mb-2 w-47 shrink-0">
                                        <input class="w-4 h-4" type="checkbox" name="Quảng Bình" id="Quảng Bình" value="Quảng Bình">
                                        <label class="ml-3" for="Quảng Bình">Quảng Bình</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quảng Nam" id="Quảng Nam" value="Quảng Nam">
                                        <label class="ml-3" for="Quảng Nam">Quảng Nam</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quảng Ngãi" id="Quảng Ngãi" value="Quảng Ngãi">
                                        <label class="ml-3" for="Quảng Ngãi">Quảng Ngãi</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quảng Ninh" id="Quảng Ninh" value="Quảng Ninh">
                                        <label class="ml-3" for="Quảng Ninh">Quảng Ninh</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quảng Trị" id="Quảng Trị" value="Quảng Trị">
                                        <label class="ml-3" for="Quảng Trị">Quảng Trị</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 1" id="Quận 1" value="Quận 1">
                                        <label class="ml-3" for="Quận 1">Quận 1</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 10" id="Quận 10" value="Quận 10">
                                        <label class="ml-3" for="Quận 10">Quận 10</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 11" id="Quận 11" value="Quận 11">
                                        <label class="ml-3" for="Quận 11">Quận 11</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 12" id="Quận 12" value="Quận 12">
                                        <label class="ml-3" for="Quận 12">Quận 12</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 3" id="Quận 3" value="Quận 3">
                                        <label class="ml-3" for="Quận 3">Quận 3</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 6" id="Quận 6" value="Quận 6">
                                        <label class="ml-3" for="Quận 6">Quận 6</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 7" id="Quận 7" value="Quận 7">
                                        <label class="ml-3" for="Quận 7">Quận 7</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận 8" id="Quận 8" value="Quận 8">
                                        <label class="ml-3" for="Quận 8">Quận 8</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Ba Đình" id="Quận Ba Đình" value="Quận Ba Đình">
                                        <label class="ml-3" for="Quận Ba Đình">Quận Ba Đình</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Bình Thạnh" id="Quận Bình Thạnh" value="Quận Bình Thạnh">
                                        <label class="ml-3" for="Quận Bình Thạnh">Quận Bình Thạnh</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Bình Tân" id="Quận Bình Tân" value="Quận Bình Tân">
                                        <label class="ml-3" for="Quận Bình Tân">Quận Bình Tân</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Bắc Từ Liêm" id="Quận Bắc Từ Liêm" value="Quận Bắc Từ Liêm">
                                        <label class="ml-3" for="Quận Bắc Từ Liêm">Quận Bắc Từ Liêm</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Cầu Giấy" id="Quận Cầu Giấy" value="Quận Cầu Giấy">
                                        <label class="ml-3" for="Quận Cầu Giấy">Quận Cầu Giấy</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Gò Vấp" id="Quận Gò Vấp" value="Quận Gò Vấp">
                                        <label class="ml-3" for="Quận Gò Vấp">Quận Gò Vấp</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Hai Bà Trưng" id="Quận Hai Bà Trưng" value="Quận Hai Bà Trưng">
                                        <label class="ml-3" for="Quận Hai Bà Trưng">Quận Hai Bà Trưng</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Hoàn Kiếm" id="Quận Hoàn Kiếm" value="Quận Hoàn Kiếm">
                                        <label class="ml-3" for="Quận Hoàn Kiếm">Quận Hoàn Kiếm</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Hoàng Mai" id="Quận Hoàng Mai" value="Quận Hoàng Mai">
                                        <label class="ml-3" for="Quận Hoàng Mai">Quận Hoàng Mai</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Hà Đông" id="Quận Hà Đông" value="Quận Hà Đông">
                                        <label class="ml-3" for="Quận Hà Đông">Quận Hà Đông</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Long Biên" id="Quận Long Biên" value="Quận Long Biên">
                                        <label class="ml-3" for="Quận Long Biên">Quận Long Biên</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Nam Từ Liên" id="Quận Nam Từ Liên" value="Quận Nam Từ Liên">
                                        <label class="ml-3" for="Quận Nam Từ Liên">Quận Nam Từ Liên</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Phú Nhuận" id="Quận Phú Nhuận" value="Quận Phú Nhuận">
                                        <label class="ml-3" for="Quận Phú Nhuận">Quận Phú Nhuận</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Thanh Xuân" id="Quận Thanh Xuân" value="Quận Thanh Xuân">
                                        <label class="ml-3" for="Quận Thanh Xuân">Quận Thanh Xuân</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Tân Bình" id="Quận Tân Bình" value="Quận Tân Bình">
                                        <label class="ml-3" for="Quận Tân Bình">Quận Tân Bình</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Tân Phú" id="Quận Tân Phú" value="Quận Tân Phú">
                                        <label class="ml-3" for="Quận Tân Phú">Quận Tân Phú</label>
                                    </div>
                                    <div class="flex items-center mb-2 w-47 shrink-0 ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Tây Hồ" id="Quận Tây Hồ" value="Quận Tây Hồ">
                                        <label class="ml-3" for="Quận Tây Hồ">Quận Tây Hồ</label>
                                    </div>
                                    <div class="flex items-center ">
                                        <input class="w-4 h-4" type="checkbox" name="Quận Đống Đa" id="Quận Đống Đa" value="Quận Đống Đa">
                                        <label class="ml-3" for="Quận Đống Đa">Quận Đống Đa</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">S</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input class="w-4 h-4" type="checkbox" name="Sóc Trăng" id="Sóc Trăng" value="Sóc Trăng">
                                        <label class="ml-3" for="Sóc Trăng">Sóc Trăng</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 mb-2 shrink-0">
                                        <input class="w-4 h-4" type="checkbox" name="Sơn La" id="Sơn La" value="Sơn La">
                                        <label class="ml-3" for="Sơn La">Sơn La</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">T</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Thanh Hóa" id="Thanh Hóa" value="Thanh Hóa">
                                        <label class="ml-3" for="Thanh Hóa">Thanh Hóa</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Thành Phố Thủ Đức" id="Thành Phố Thủ Đức" value="Thành Phố Thủ Đức">
                                        <label class="ml-3" for="Thành Phố Thủ Đức">TP. Thủ Đức</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Thái Bình" id="Thái Bình" value="Thái Bình">
                                        <label class="ml-3" for="Thái Bình">Thái Bình</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Thái Nguyên" id="Thái Nguyên" value="Thái Nguyên">
                                        <label class="ml-3" for="Thái Nguyên">Thái Nguyên</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Thừa Thiên Huế" id="Thừa Thiên Huế" value="Thừa Thiên Huế">
                                        <label class="ml-3" for="Thừa Thiên Huế">Thừa Thiên Huế</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Tiền Giang" id="Tiền Giang" value="Tiền Giang">
                                        <label class="ml-3" for="Tiền Giang">Tiền Giang</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="TP. Hồ Chính Minh" id="TP. Hồ Chính Minh" value="TP. Hồ Chính Minh">
                                        <label class="ml-3" for="TP. Hồ Chính Minh">TP. Hồ Chính Minh</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Trà Vinh" id="Trà Vinh" value="Trà Vinh">
                                        <label class="ml-3" for="Trà Vinh">Trà Vinh</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Tuyên Quang" id="Tuyên Quang" value="Tuyên Quang">
                                        <label class="ml-3" for="Tuyên Quang">Tuyên Quang</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Tây Ninh" id="Tây Ninh" value="Tây Ninh">
                                        <label class="ml-3" for="Tây Ninh">Tây Ninh</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">V</div>
                                <div class="flex items-center ">
                                    <div class="flex items-center w-47 mr-3 shrink-0">
                                    <input class="w-4 h-4" type="checkbox" name="Vĩnh Long" id="Vĩnh Long" value="Vĩnh Long">
                                    <label class="ml-3" for="Vĩnh Long">Vĩnh Long</label>
                                    </div>
                                    <div class="flex items-center w-47 mr-3 shrink-0">
                                    <input class="w-4 h-4" type="checkbox" name="Vĩnh Phúc" id="Vĩnh Phúc" value="Vĩnh Phúc">
                                    <label class="ml-3" for="Vĩnh Phúc">Vĩnh Phúc</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">Y</div>
                                <div class="flex items-center">
                                    <div class="flex items-center w-47 mr-3 shrink-0">
                                        <input class="w-4 h-4" type="checkbox" name="Yên Bái" id="Yên Bái" value="Yên Bái">
                                        <label class="ml-3" for="Yên Bái">Yên Bái</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="text-[1.1rem]">Đ</div>
                                <div class="flex items-center flex-wrap">
                                    <div class="flex items-center w-47 shrink-0 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Điện Biên" id="Điện Biên" value="Điện Biên">
                                        <label class="ml-3" for="Điện Biên">Điện Biên</label>
                                    </div>
                                    <div class="flex items-center w-47 shrink-0 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Đà Nẵng" id="Đà Nẵng" value="Đà Nẵng">
                                        <label class="ml-3" for="Đà Nẵng">Đà Nẵng</label>
                                    </div>
                                    <div class="flex items-center w-47 shrink-0 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Đắk Lắk" id="Đắk Lắk" value="Đắk Lắk">
                                        <label class="ml-3" for="Đắk Lắk">Đắk Lắk</label>
                                    </div>
                                    <div class="flex items-center w-47 shrink-0 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Đắk Nông" id="Đắk Nông" value="Đắk Nông">
                                        <label class="ml-3" for="Đắk Nông">Đắk Nông</label>
                                    </div>
                                    <div class="flex items-center w-47 shrink-0 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Đồng Nai" id="Đồng Nai" value="Đồng Nai">
                                        <label class="ml-3" for="Đồng Nai">Đồng Nai</label>
                                    </div>
                                    <div class="flex items-center w-47 shrink-0 mr-3 mb-2">
                                        <input class="w-4 h-4" type="checkbox" name="Đồng Tháp" id="Đồng Tháp" value="Đồng Tháp">
                                        <label class="ml-3" for="Đồng Tháp">Đồng Tháp</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    

                    <div class="bg-white static right-0 left-0 bottom-0 flex justify-end pt-5 ">
                        <button
                            @click="closeDialog"
                            class=" bg-[var(--maincolor)] bottom-0 px-15 py-2 text-white rounded-sm p-1  hover:text-red-500 hover:scale-[1.05] transition-all duration-300 text-base"
                        >Xác nhận</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  
</template>

<style scoped>

</style>
