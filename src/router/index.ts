import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterTypes } from '~/basic'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouterTypes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', icon: 'skill', affix: true }
      }
    ]
  },
  {
    path: '/element-plus',
    component: Layout,
    meta: { title: '前端Element-Plus', icon: 'example' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'ElementPlusIndex',
        component: () => import('@/views/element-plus/list/index.vue'),
        meta: { title: '查询配置' }
      },
      {
        path: 'add-edit',
        name: 'ElementPlusAddEdit',
        component: () => import('@/views/element-plus/add-edit/index.vue'),
        meta: { title: '新增编辑配置' }
      },
      {
        path: 'detail',
        name: 'ElementPlusDetail',
        component: () => import('@/views/element-plus/detail/index.vue'),
        meta: { title: '详情页配置' }
      }
    ]
  },
  {
    path: '/mybatis-plus',
    component: Layout,
    redirect: '/mybatis-plus/index',
    meta: { title: '后端Mybatis-Plus', icon: 'eye' },
    alwaysShow: true,
    children: [
      {
        path: 'basic',
        name: 'MybatisPlus',
        component: () => import('@/views/mybatis-plus/index.vue'),
        meta: { title: '单表生成配置' }
      },
      {
        path: 'multi',
        name: 'MybatisPlusMulti',
        component: () => import('@/views/mybatis-plus/mybits-plus-multi.vue'),
        meta: { title: '多表生成配置' }
      }
    ]
  },
  {
    path: '/template-file',
    component: Layout,
    meta: { title: '模板文件配置', icon: 'lock' },
    alwaysShow: true,
    children: [
      {
        path: 'template-file-list',
        component: () => import('@/views/template-file/template-file-list.vue'),
        name: 'TemplateFileList',
        meta: { title: '模板文件列表' }
      },
      {
        path: 'template-file-add-edit',
        component: () => import('@/views/template-file/template-file-add-edit.vue'),
        name: 'TemplateFileAddEdit',
        hidden: true,
        meta: { title: '模板文件新增编辑', activeMenu: '/template-file-list' }
      }
    ]
  },
  {
    path: '/template-date',
    component: Layout,
    meta: { title: '数据模块', icon: 'language' },
    alwaysShow: true,
    children: [
      {
        path: 'config-save-list',
        component: () => import('@/views/template-file/config-save-list.vue'),
        name: 'ConfigSaveList',
        meta: { title: '数据列表' }
      }
    ]
  },

  {
    path: '/template-edit',
    component: Layout,
    meta: { title: '模板调试', icon: 'nested' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'TemplateEditQuery',
        component: () => import('@/views/template-edit/template-edit.vue'),
        meta: { title: '模板实时测试' }
      }
    ]
  }
]

//角色和code数组动态路由
export const roleCodeRoutes: RouterTypes = []
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouterTypes = [
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', name: 'CatchAll', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
