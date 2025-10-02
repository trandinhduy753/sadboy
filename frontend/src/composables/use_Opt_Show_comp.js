import {ref, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router'

export const user_opt_show_admin = () => {
    const router = useRouter()
    const route = useRoute()

    const navigateTo= () => {
        if (route.query.showopt=='shop_ad_t'){
            return true;
        }
        return false;
    }
    
    return { navigateTo };

}
export const show_get_opt = () => {
    const type_or_status = ref({})
    const get_opt = (arr, opt, add) => {
        if (!arr || !Array.isArray(arr)) return {};
        
        if (opt === "") {
            if(add) {
                return {
                    describe: add
                }
            }else {
                const selected = arr.find(item => item.selected === true);
                if (selected) {
                    type_or_status.value = selected;
                    return selected;
                }
                else {
                    return {
                        code: '',
                        describe: ''
                    };
                }
            }
            
        } else {
            const matched = arr.find(item => item.code === opt);
            if (matched) {
                type_or_status.value = matched;
                return matched;
            }
        }
        return {};
    }
    return {get_opt, type_or_status}
}

