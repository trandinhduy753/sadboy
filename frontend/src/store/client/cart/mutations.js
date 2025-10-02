export default {
    CHANGE_CARTS (state, data) {
        state.carts = data
    },
    ADD_CARTS_TO_LIST (state, data) {
        state.carts= [...state.carts, ...data]
    },
    DELETE_PRODUCT_IN_CART (state, id) {
        const index = state.carts.findIndex(cart => cart.id === id);
        if (index !== -1) {
            state.carts.splice(index, 1);
        }
       
    },
    ADD_COUNT_PRODUCT(state, index) {
        state.carts[index].count++;
    },
    EXCEPT_COUNT_PRODUCT (state, index) {
        if(state.carts[index].count >1 ){
            state.carts[index].count--;
        }
    },
    TOGGLE_SELECT_CART (state, index) {
        
        if (state.selected_cart_index.indexOf(index) != -1) {
            state.selected_cart_index.splice(index, 1)
        } 
        else {
            state.selected_cart_index.push(index);
        }
    },
    GET_CART_CHECKED (state) {
        state.carts_checked = state.carts.filter((cart, index) =>
            state.selected_cart_index.includes(index)
        );
    },
    ADD_PRODUCT_TO_CART (state, data) {
        const index = state.carts.findIndex(cart => cart.id === data.id)
        if(index !== -1) {
            if(state.carts[index].size == data.size) {
                state.carts[index].count = state.carts[index].count + data.count
            }
            else {
                state.carts.unshift(data)
            }
        }
        else {
            state.carts.unshift(data)
        }
    },
    ADD_PRODUCT_CART_CHECKED (state, data) {
        state.carts_checked.push(data)
    },
    CHANGE_IS_CALL_API (state, opt){
        state.isCallApiCart = opt;
    },
    RESET_CART_CHECKED (state) {
        state.carts_checked = [];
    }
}