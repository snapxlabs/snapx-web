import * as Vue from 'vue'
import * as VueRouter from 'vue-router'


/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: Vue.defineAsyncComponent(() => import('@/views/login/index')),
    hidden: true
  },

  {
    path: '/404',
    component: Vue.defineAsyncComponent(() => import('@/views/404')),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/member/member'
    // redirect: '/dashboard',
    // children: [{
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: 'Dashboard', icon: 'dashboard' }
    // }]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/member',
    name: 'Mamber',
    meta: { title: 'Member', icon: 'table' },
    children: [
      {
        path: 'member',
        name: 'member',
        component: Vue.defineAsyncComponent(
          () => import('@/views/member/member')
        ),
        meta: { title: 'Member', icon: 'table' }
      },
      {
        path: 'invite_code',
        name: 'invite_code',
        component: Vue.defineAsyncComponent(
          () => import('@/views/member/invite_code')
        ),
        meta: { title: 'Invite Code', icon: 'table' }
      },
      {
        path: 'month_access',
        name: 'month_access',
        component: Vue.defineAsyncComponent(
          () => import('@/views/member/access/per_month')
        ),
        meta: { title: 'Month Access Log', icon: 'table' }
      },
      {
        path: 'day_access',
        name: 'day_access',
        component: Vue.defineAsyncComponent(
          () => import('@/views/member/access/per_day')
        ),
        meta: { title: 'Day Access Log', icon: 'table' }
      },
      {
        path: 'hour_access',
        name: 'hour_access',
        component: Vue.defineAsyncComponent(
          () => import('@/views/member/access/per_hour')
        ),
        meta: { title: 'Hour Access Log', icon: 'table' }
      },
      {
        path: 'notification',
        name: 'notification',
        component: Vue.defineAsyncComponent(
          () => import('@/views/member/notification')
        ),
        meta: { title: 'Notification', icon: 'table' }
      },
    ]
  },

  {
    path: '/accounts',
    component: Layout,
    redirect: '/accounts/points',
    name: 'Accounts',
    meta: { title: 'Accounts', icon: 'table' },
    children: [
      {
        path: 'points',
        name: 'points',
        component: Vue.defineAsyncComponent(
          () => import('@/views/trade/accounts/points')
        ),
        meta: { title: 'Points', icon: 'table' }
      },
      {
        path: 'usdc',
        name: 'usdc',
        component: Vue.defineAsyncComponent(
          () => import('@/views/trade/accounts/usdc')
        ),
        meta: { title: 'USDC', icon: 'table' }
      },
    ]
  },

  {
    path: '/restaurant',
    component: Layout,
    redirect: '/restaurant/restaurant/index',
    name: 'Restaurant',
    meta: { title: 'Restaurant', icon: 'table' },
    children: [
      {
        path: 'restaurant',
        name: 'restaurant',
        component: Vue.defineAsyncComponent(
          () => import('@/views/restaurant/restaurant/index.vue')
        ),
        meta: { title: 'Restaurant', icon: 'table' }
      },
      {
        path: 'review',
        name: 'review',
        component: Vue.defineAsyncComponent(
          () => import('@/views/restaurant/review/index')
        ),
        meta: { title: 'Review', icon: 'table' }
      },
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/admin',
    name: 'System',
    meta: { title: 'System', icon: 'table' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: Vue.defineAsyncComponent(
          () => import('@/views/system/admin')
        ),
        meta: { title: 'Admin', icon: 'table' }
      },
      {
        path: 'avatar',
        name: 'Avatar',
        component: Vue.defineAsyncComponent(
          () => import('@/views/system/avatar')
        ),
        meta: { title: 'Avatar', icon: 'table' }
      },
      // {
      //   path: 'content',
      //   name: 'Content',
      //   component: Vue.defineAsyncComponent(
      //     () => import('@/views/system/content')
      //   ),
      //   meta: { title: 'Notice', icon: 'table' }
      // },
      {
        path: 'setting',
        name: 'Setting',
        component: Vue.defineAsyncComponent(
          () => import('@/views/system/setting')
        ),
        meta: { title: 'Setting', icon: 'table' }
      },
      {
        path: 'version',
        name: 'Version',
        component: Vue.defineAsyncComponent(
          () => import('@/views/system/version')
        ),
        meta: { title: 'Version', icon: 'table' }
      }
    ]
  },

  {
    path: '/camera',
    component: Layout,
    redirect: '/camera/camera',
    name: 'Camera & Film',
    meta: { title: 'Camera & Film', icon: 'table' },
    children: [
      {
        path: 'camera',
        name: 'Camera',
        component: Vue.defineAsyncComponent(
          () => import('@/views/camera/camera')
        ),
        meta: { title: 'Camera', icon: 'camera' }
      },
      {
        path: 'camera-member',
        name: 'Camera-Member',
        component: Vue.defineAsyncComponent(
          () => import('@/views/camera/camera-member')
        ),
        meta: { title: 'Member Camera', icon: 'camera-member' }
      },
      {
        path: 'film-member',
        name: 'Film-Member',
        component: Vue.defineAsyncComponent(
          () => import('@/views/camera/film-member')
        ),
        meta: { title: 'Member Film', icon: 'film' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activity',
    name: 'Activity',
    meta: { title: 'Activity', icon: 'table' },
    children: [
      {
        path: 'activity',
        name: 'Activity',
        component: Vue.defineAsyncComponent(
          () => import('@/views/activity/activity')
        ),
        meta: { title: 'Activity', icon: 'table' }
      },
      {
        path: 'activity-member',
        name: 'Activity-Member',
        component: Vue.defineAsyncComponent(
          () => import('@/views/activity/activity-member')
        ),
        meta: { title: 'Activity Member ', icon: 'table' }
      }
    ]
  },

  {
    path: '/infra',
    component: Layout,
    redirect: '/infra/country',
    name: 'geo',
    meta: {title: 'Geo', icon: 'table'},
    children: [
      {
        path: 'country',
        name: 'country',
        component: Vue.defineAsyncComponent(
          () => import('@/views/infra/country')
        ),
        meta: {title: 'Country', icon: 'table'}
      },
      {
        path: 'locality',
        name: 'locality',
        component: Vue.defineAsyncComponent(
          () => import('@/views/infra/locality')
        ),
        meta: {title: 'Locality', icon: 'table'}
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]

const createRouter = () =>
  VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
    routes: constantRoutes,
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      top: 0
    })
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
