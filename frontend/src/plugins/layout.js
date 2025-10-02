import { defineAsyncComponent } from "vue";

function register_layout(app){
    app.component(
        "default-layout", 
        defineAsyncComponent( () => import ('@/layout/Default_layout.vue') )
    )
    app.component(
        "layout-home", 
        defineAsyncComponent( () => import ('@/layout/layout_home.vue') )
    )
    app.component(
        "layout-footer", 
        defineAsyncComponent( () => import ('@/layout/layout_footer.vue') )
    )
    app.component(
        "layout-header", 
        defineAsyncComponent( () => import ('@/layout/layout_header.vue') )
    )
    app.component(
        "layout-blank",
        defineAsyncComponent( () => import ('@/layout/layout_blank.vue') )
    )
    app.component(
        "layout-admin",
        defineAsyncComponent( () => import ('@/layout/layout_admin.vue') )
    )
}

export default register_layout;