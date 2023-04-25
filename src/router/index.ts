import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import type {App} from 'vue'
import {Layout} from '@/utils/routerHelper'
import {useI18n} from '@/hooks/web/useI18n'

const {t} = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard/analysis',
        name: 'Root',
        meta: {
            hidden: true
        }
    },
    {
        path: '/redirect',
        component: Layout,
        name: 'Redirect',
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import('@/views/Redirect/Redirect.vue'),
                meta: {}
            }
        ],
        meta: {
            hidden: true,
            noTagsView: true
        }
    },
    {
        path: '/login',
        component: () => import('@/views/Login/Login.vue'),
        name: 'Login',
        meta: {
            hidden: true,
            title: t('router.login'),
            noTagsView: true
        }
    },
    {
        path: '/404',
        component: () => import('@/views/Error/404.vue'),
        name: 'NoFind',
        meta: {
            hidden: true,
            title: '404',
            noTagsView: true
        }
    }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/analysis',
        name: 'Dashboard',
        meta: {
            title: t('router.dashboard'),
            icon: 'ant-design:dashboard-filled',
            alwaysShow: true
        },
        children: [
            {
                path: 'analysis',
                component: () => import('@/views/Dashboard/Analysis.vue'),
                name: 'Analysis',
                meta: {
                    title: t('router.analysis'),
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'workplace',
                component: () => import('@/views/Dashboard/Workplace.vue'),
                name: 'Workplace',
                meta: {
                    title: t('router.workplace'),
                    noCache: true
                }
            }
        ]
    },
    /* Демонтаж */
    {
        path: '/dismantling',
        component: Layout,
        redirect: '/dismantling/production',
        name: 'Dismantling',
        meta: {
            title: t('router.dismantling'),
            icon: 'ic:outline-webhook',
            alwaysShow: true
        },
        children: [
            /* Выработка */
            {
                path: 'production',
                component: () => import('@/views/Dismantling/Production.vue'),
                name: 'Production',
                meta: {
                    title: t('router.production'),
                    icon: 'svg-icon:car-crane'
                }
            },
            /* Вывоз */
            {
                path: 'export',
                component: () => import('@/views/Dismantling/Export.vue'),
                name: 'Export',
                meta: {
                    title: t('router.export'),
                    icon: 'svg-icon:lorry-fast'
                }
            },
            /* Остатки */
            {
                path: 'remains',
                component: () => import('@/views/Dismantling/Remains.vue'),
                name: 'RemainsDismantling',
                meta: {
                    title: t('router.remains'),
                    icon: 'svg-icon:abacus'
                }
            }
        ]
    },
    /* Склад */
    {
        path: '/warehouse',
        component: Layout,
        redirect: '/warehouse/warehouses',
        name: 'Warehouse',
        meta: {
            title: t('router.warehouse'),
            icon: 'svg-icon:warehouse-outline',
            alwaysShow: true
        },
        children: [
            /* Поступление */
            {
                path: 'incoming',
                component: () => import('@/views/Warehouse/Incoming.vue'),
                name: 'Incoming',
                meta: {
                    title: t('router.incoming'),
                    icon: 'svg-icon:pipeline-add-20-regular'
                }
            },
            /* Отгрузки */
            {
                path: 'shipments',
                component: () => import('@/views/Warehouse/Shipments.vue'),
                name: 'Shipments',
                meta: {
                    title: t('router.shipments'),
                    icon: 'svg-icon:lorry-delivery'
                }
            },
            /* Остатки */
            {
                path: 'remains',
                component: () => import('@/views/Warehouse/Remains.vue'),
                name: 'RemainsWarehouse',
                meta: {
                    title: t('router.remains'),
                    icon: 'svg-icon:abacus'
                }
            },
            /* Обработка */
            {
                path: 'processing',
                component: () => import('@/views/Warehouse/Processing.vue'),
                name: 'Processing',
                meta: {
                    title: t('router.processing'),
                    icon: 'svg-icon:processing'
                }
            }
        ]
    },
    /* Продажи */
    {
        path: '/',
        component: Layout,
        name: 'Sales',
        meta: {},
        children: [
            {
                path: 'sales',
                component: () => import('@/views/Sales/Sales.vue'),
                name: 'Sales',
                meta: {
                    title: t('router.sales'),
                    icon: 'svg-icon:sales-report'
                }
            }
        ]
    },
    /* Справочники */
    {
        path: '/',
        component: Layout,
        name: 'References',
        meta: {},
        children: [
            {
                path: 'references',
                component: () => import('@/views/References/References.vue'),
                name: 'References',
                meta: {
                    title: t('router.references'),
                    icon: 'svg-icon:outline-room-preferences'
                }
            }
        ]
    },
    // {
    //   path: '/authorization',
    //   component: Layout,
    //   redirect: '/authorization/user',
    //   name: 'Authorization',
    //   meta: {
    //     title: t('router.authorization'),
    //     icon: 'eos-icons:role-binding',
    //     alwaysShow: true
    //   },
    //   children: [
    //     {
    //       path: 'user',
    //       component: () => import('@/views/Authorization/User.vue'),
    //       name: 'User',
    //       meta: {
    //         title: t('router.user')
    //       }
    //     },
    //     {
    //       path: 'role',
    //       component: () => import('@/views/Authorization/Role.vue'),
    //       name: 'Role',
    //       meta: {
    //         title: t('router.role')
    //       }
    //     }
    //   ]
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    strict: true,
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({left: 0, top: 0})
})

export const resetRouter = (): void => {
    const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
    router.getRoutes().forEach((route) => {
        const {name} = route
        if (name && !resetWhiteNameList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name)
        }
    })
}

export const setupRouter = (app: App<Element>) => {
    app.use(router)
}

export default router
