import { createRouter, createWebHashHistory } from "vue-router"
import Layout from "@/components/layout/index.vue"
import { loginStatus } from "@/oauth"

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
        children: [{
            path: '/xxx',
            name: 'xxx',
            meta: {
                title: 'xxx'
            },
        }]
    },
    {
        path: '/',
        name: 'home',
        redirect: '/home',
        component: Layout,
        meta: {
            title: 'NullMore',
            menu: true,
        },
        children: [{
            path: '/home',
            name: 'homeindex',
            meta: {
                title: 'HOME'
            },
            component: () => import('@/views/home/index.vue')
        }, {
            path: '/testLorem',
            name: 'testLorem',
            meta: {
                title: '测试乱数假文'
            },
            component: () => import('@/views/testLorem/index.vue')
        }, {
            path: '/testDemo',
            name: 'testDemo',
            meta: {
                title: '测试实例'
            },
            component: () => import('@/views/testDemo/index.vue')
        }]
    },
    {
        path: '/NM-GPT',
        name: 'NM-GPT',
        component: Layout,
        meta: {
            title: 'NullMoreGPT',
            menu: true,
        },
        children: [{
            path: '/EVENT-SOURCE',
            name: 'EVENT-SOURCE',
            meta: {
                title: 'EventSource'
            },
            component: () => import('@/views/NM-GPT/index.vue')
        },
        {
            path: '/XHR',
            name: 'XHR',
            meta: {
                title: 'xhr'
            },
            component: () => import('@/views/NM-GPT/index.vue')
        },
        {
            path: '/FETCH',
            name: 'FETCH',
            meta: {
                title: 'fetch'
            },
            component: () => import('@/views/NM-GPT/index.vue')
        }]
    },
    {
        path: '/i-can-use',
        name: 'ICanUse',
        component: Layout,
        meta: {
            title: 'ICanUse',
            menu: true,
        },
        children: [{
            path: '/null-more-border',
            name: 'null-more-border',
            meta: {
                title: 'null-more-border'
            },
            component: () => import('@/views/i-can-use/index.vue')
        },]
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || loginStatus()) {
        next()
    } else {
        next('/login');
    }
})

export default router