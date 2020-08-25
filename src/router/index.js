import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from "@/module-frame/pages/Layout";

import NProgress from "nprogress";
import 'nprogress/nprogress.css'// progress bar style


Vue.use(VueRouter);
const _import = require('./import_' + process.env.NODE_ENV);

export const constantRouterMap = [
    {
        path: '/login',
        component: _import('frame/pages/Login'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: _import('frame/pages/Index')
            }
        ]
    }
];

let router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

NProgress.configure({showSpinner: false});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
});

/**
 *  导出基础路由
 */
export default router;

/**
 * 导出业务路由
 */
export let asyncRouterMap = [
    {path: '*', redirect: '/404', hidden: true}
];

