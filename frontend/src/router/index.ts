import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { accountClient, account } from '@/constant'
import { isUserLogin } from '@/composables'
// import HomeView from '@/components/body/product/compbody.vue'
const routes= 
    [
        {
            path: '/',
            name: 'home',
            meta: {
                layout: 'layout-home'
            },
            component: () => import('@/views/client/home.vue'),
        },
        {
            path: '/thong-tin-chi-tiet-san-pham/:slug',
            name: 'detail_product',
            meta: {
                layout: 'layout-header'
            },
            component: () => import('@/views/client/product/detail/Detailproduct.vue'),
            beforeEnter: isUserLogin

        },
        {
            path: '/search',
            name: 'find_product',
            meta: {
                layout: 'layout-header'
            },
            component: () => import('@/views/client/product/find/find_product.vue'),
        },
        {
            path: "/gio-hang-cua-ban",
            name: 'cart_product',
            meta: {
                layout: 'layout-header'
            },
            component: () => import('@/views/client/cart/Compcart.vue'),
            beforeEnter: isUserLogin
        },
        {
            path: "/xac-thuc-don-hang",
            name: 'bill_comfirm',
            meta: {
                layout: 'layout-header',
            },
            component: () => import('@/views/client/cart/Billconfirm.vue'),
            beforeEnter: isUserLogin
        },
        {
            path: "/hoan-thanh-don-hang",
            name: 'bill_finish',
            meta: {
                layout: 'default-layout',
            },
            component: () => import('@/views/client/cart/Billfinish.vue'),
            beforeEnter: isUserLogin
        },
        {
            path: "/tai-khoan",
            component: () => import('@/views/client/account/Compaccount.vue'),
            meta: {
                layout: 'layout-header',
            }, 
            name: "account",
            children: [
                {
                    path: '',
                    name: 'account.user',
                    component: () => import('@/views/client/account/account.vue'),
                },
                {
                    path: 'don-mua',
                    name: 'account.orders',
                    component: () => import('@/views/client/account/orders/comporder.vue'),
                    children: [
                        {
                            path: '',
                            name: 'account.orders.list',
                            component: () => import('@/views/client/account/orders/Listorder.vue'),
                        },
                        {
                            path: 'chi-tiet-don-hang/:code',
                            name: 'account.orders.detail',
                            component: () => import('@/views/client/account/orders/detailOrder.vue'),
                        }
                    ]
                },
                {
                    path: 'thong-bao',
                    name: 'account.announces',
                    component: () => import('@/views/client/account/announces/Listannounce.vue'),
                },
                {
                    path: 'ma-giam-gia',
                    name: 'account.vouchers',
                    component: () => import('@/views/client/account/voucher/Listvoucher.vue'),
                },
                {
                    path: 'tien-tai-khoan',
                    name: 'account.moneys',
                    component: () => import('@/views/client/account/money/Listmoney.vue'),
                },
            ],
            beforeEnter: isUserLogin
        },
        {
            path: "/tin-tuc",
            name: 'blog',
            meta: {
                layout: 'default-layout'
            },
            component: () => import('@/views/client/blog/compblog.vue'),
        },
        {
            path: '/form',
            name: 'form',
            meta: {
                layout: 'layout-blank'
            },
            component: () => import('@/views/client/form/complog.vue'),
        },
        {
            path: '/trang-quan-tri',
            meta: {
                layout: 'layout-admin'
            }, 
            name: 'admin_sadboizz',
            component: () => import('@/views/admin/Compadmin.vue'),
            children: [
                {
                    path: '',
                    name: 'admin_sadboizz.dashboard',
                    component: () => import('@/views/admin/dashboard/Compdash.vue'),
                },
                {
                    path: 'tro-chuyen',
                    name: 'admin_sadboizz.chat',
                    component: () => import('@/views/admin/chat/chat.vue'),
                },
                {
                    path: 'nhan-vien',
                    name: 'admin_sadboizz.employee',
                    component: () => import('@/views/admin/employee/Compemployee.vue'),
                    children: [
                        {
                            path: 'them-nhan-vien',
                            name: 'admin_sadboizz.employee.add',
                            component: () => import('@/views/admin/employee/addemployee.vue'),
                        },
                        {
                            path: 'thong-tin-chi-tiet',
                            name:  'admin_sadboizz.employee.detail',
                            component: () => import('@/views/admin/employee/Detailemployee_admin.vue'),
                        }
                    ]
                },
                {
                    path: 'khach-hang',
                    name: 'admin_sadboizz.customer',
                    component: () => import('@/views/admin/user/Compuser.vue'),
                    children: [
                        {
                            path: 'thong-tin-chi-tiet',
                            name: 'admin_sadboizz.customer.detail',
                            component: () => import('@/views/admin/user/Detailuser_admin.vue'),
                        }
                    ]
                },
                {
                    path: 'don-hang',
                    name: 'admin_sadboizz.order',
                    component: () => import('@/views/admin/order/Comporder.vue'),
                    children: [
                        {
                            path: 'thong-tin-chi-tiet',
                            name: 'admin_sadboizz.order.detail',
                            component: () => import('@/views/admin/order/Detailorder_admin.vue'),
                        }
                    ]
                },
                {
                    path: 'san-pham',
                    name: 'admin_sadboizz.product',
                    component: () => import('@/views/admin/product/Compproduct.vue'),
                    children: [
    
                        {
                            path: 'them-san-pham',
                            name: 'admin_sadboizz.product.add',
                            component: () => import('@/views/admin/product/addproduct.vue'),
                        },
                        {
                            path: 'thong-tin-chi-tiet',
                            name: 'admin_sadboizz.product.detail',
                            component: () => import('@/views/admin/product/Detailproduct_admin.vue'),
                        },
                        {
                            path: 'tao-phieu-nhap',
                            name: 'admin_sadboizz.product.import',
                            component: () => import('@/views/admin/product/goods_receipts.vue'),

                        }
                       
                    ]
                },
                {
                    path: 'binh-luan',
                    name: 'admin_sadboizz.comment',
                    component: () => import('@/views/admin/Comment/Compcomment.vue'),
                    children: [
                        {
                            path: 'thong-tin-chi-tiet',
                            name: 'admin_sadboizz.comment.detail',
                            component: () => import('@/views/admin/Comment/Detailcomment_admin.vue'),
                        }

                    ]

                },
                {
                    path: 'ma-giam-gia',
                    name: 'admin_sadboizz.voucher',
                    component: () => import('@/views/admin/voucher/Compvoucher.vue'),
                    children: [
                        {
                            path: 'them-ma-giam-gia',
                            name: 'admin_sadboizz.voucher.add',
                            component: () => import('@/views/admin/voucher/addvoucher.vue'),
                        },
                        {
                            path: 'thong-tin-chi-tiet',
                            name: 'admin_sadboizz.voucher.detail',
                            component: () => import('@/views/admin/voucher/Detailvoucher_admin.vue'),
                        }
                        
                       
                    ]

                },
                {
                    path: 'nha-cung-cap',
                    name: 'admin_sadboizz.provide',
                    component: () => import('@/views/admin/provide/compprovide.vue'),
                    children: [
                        {
                            path: 'them-nha-cung-cap',
                            name: 'admin_sadboizz.provide.add',
                            component: () => import('@/views/admin/provide/addprovide.vue'),
                        },
                        {
                            path: 'thong-tin-chi-tiet',
                            name: 'admin_sadboizz.provide.detail',
                            component: () => import('@/views/admin/provide/detailprovide_admin.vue'),
                        }
                        
                       
                    ]
                },
                {
                    path: 'so-sach',
                    name: 'admin_sadboizz.cashbook',
                    component: () => import('@/views/admin/Cash_book/Comp_cashbooks.vue'),
                    children: [
                        {
                            path: 'cong-no',
                            name: 'admin_sadboizz.cashbook.debt',
                            component: () => import('@/views/admin/Cash_book/debt/Comp_debt.vue'),
                            children: [
                                {
                                    path: 'nha-cung-cap',
                                    name: 'admin_sadboizz.cashbook.debt.detail.provide',
                                    component: () => import('@/views/admin/provide/detailprovide_admin.vue'),
                                },
                                {
                                    path: 'nha-van-chuyen',
                                    name: 'admin_sadboizz.cashbook.debt.detail.ship',
                                    component: () => import('@/views/admin/Cash_book/debt/debt_ship_detail.vue'),
                                }
                            ]
                            
                        },
                        {
                            path: 'thu-chi',
                            name: 'admin_sadboizz.cashbook.income_spend',
                            component: () => import('@/views/admin/Cash_book/income_spend/comp_income_spend.vue'),
                            children: [
                                {
                                    path: '',
                                    name: 'admin_sadboizz.cashbook.income_spend.cash_book',
                                    component: () => import('@/views/admin/Cash_book/income_spend/cash_books.vue')
                                },
                                {
                                    path: 'tao-phieu-thu',
                                    name: 'admin_sadboizz.cashbook.income_spend.add_bill_collect',
                                    component: () => import('@/views/admin/Cash_book/income_spend/bill_collect.vue'),
                                },
                                {
                                    path: 'tao-phieu-chi',
                                    name: 'admin_sadboizz.cashbook.income_spend.add_bill_spend',
                                    component: () => import('@/views/admin/Cash_book/income_spend/bill_spend.vue'),
                                }
                                
                            ]
                        },
                        {
                            path: 'don-hang-nha-cung-cap',
                            name: 'admin_sadboizz.cash_book.order_provider',
                            component: () => import('@/views/admin/Cash_book/order_provider/comp_ex_im.vue'),
                            children: [
                                {
                                    path: '',
                                    name: 'admin_sadboizz.cashbook.order_provider.list_import',
                                    component: () => import('@/views/admin/Cash_book/order_provider/order_import.vue')
                                },
                                {
                                    path: 'chi-tiet-phieu-dat-hang',
                                    name: 'admin_sadboizz.cashbook.order_provider.detail_import',
                                    component: () => import('@/views/admin/Cash_book/order_provider/order_import_detail.vue')
                                }
                                
                            ]
                        }      
                    ]
                }
            ],
            beforeEnter: async (to, from, next) => {
                try {
                    let employee = store.state.admin.account.employee;

                    if (!employee || Object.keys(employee).length === 0) {
                        await store.dispatch('admin/account/' + account.admin_login);
                        employee = store.state.admin.account.employee;
                    }

                    if (!employee || Object.keys(employee).length === 0) {
                        // Chưa có user thì chuyển sang trang login
                        return next({ name: "admin.formlog" });
                    }

                    next();
                } catch (error) {
                    return next({ name: "admin.formlog" });
                }
            }

        },
        {
            path: '/admin_sad/dang-nhap-tai-khoan',
            meta: {
                layout: 'layout-blank'
            },
            name:'admin.formlog',
            component: () =>import('@/views/admin/form/login.vue')
        }
        
    ]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, left: 0 };
        }
    },
})



export default router
