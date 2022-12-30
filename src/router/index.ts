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
    meta: { title: 'Element Plus', icon: 'example' },
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
    meta: { title: 'Mybatis Plus', icon: 'eye' },
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
      },
      {
        path: 'config-save-list',
        component: () => import('@/views/template-file/config-save-list.vue'),
        name: 'ConfigSaveList',
        meta: { title: '模板配置列表' }
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
  },

  {
    path: '/permission-center',
    component: Layout,
    meta: { title: 'RBAC', icon: 'education' },
    alwaysShow: true,
    children: [
      {
        path: 'user-table-query',
        component: () => import('@/views/permission-center/user/UserTableQuery.vue'),
        name: 'UserTableQuery',
        meta: { title: '用户列表' }
      },
      {
        path: 'user-add-edit',
        component: () => import('@/views/permission-center/user/UserAddEdit.vue'),
        name: 'UserAddEdit',
        hidden: true,
        meta: { title: '用户列表-新增编辑', activeMenu: '/permission-center/user-table-query' }
      },
      {
        path: 'role-table-query',
        component: () => import('@/views/permission-center/role/RoleTableQuery.vue'),
        name: 'RoleTableQuery',
        meta: { title: '角色列表' }
      },
      {
        path: 'role-add-edit',
        component: () => import('@/views/permission-center/role/RoleAddEdit.vue'),
        name: 'RoleAddEdit',
        hidden: true,
        meta: { title: '角色列表-新增编辑', activeMenu: '/permission-center/role-table-query' }
      },
      {
        path: 'permission-table-query',
        component: () => import('@/views/permission-center/permission/PermissionTableQuery.vue'),
        name: 'PermissionTableQuery',
        meta: { title: '菜单权限' }
      },
      {
        path: 'permission-add-edit',
        component: () => import('@/views/permission-center/permission/PermissionAddEdit.vue'),
        name: 'PermissionAddEdit',
        hidden: true,
        meta: { title: '菜单权限-新增编辑', activeMenu: '/permission-center/permission-table-query' }
      },
      {
        path: 'plateForm-table-query',
        component: () => import('@/views/permission-center/plateForm/PlateFormTableQuery.vue'),
        name: 'PlateFormTableQuery',
        meta: { title: '平台列表' }
      },
      {
        path: 'plateForm-add-edit',
        component: () => import('@/views/permission-center/plateForm/PlateFormAddEdit.vue'),
        name: 'PlateFormAddEdit',
        hidden: true,
        meta: { title: '新增编辑', activeMenu: '/permission-center/plateForm-table-query' }
      }
    ]
  },
  {
    path: '/template-demo',
    component: Layout,
    meta: { title: '模板生成例子', elSvgIcon: 'Fold' },
    alwaysShow: true,
    children: [
      {
        path: 'brand-list',
        component: () => import('@/views/template-demo/brand/brand-list.vue'),
        name: 'BrandList',
        meta: { title: 'brand列表', cacheGroup: ['BrandList', 'BrandDetail'] }
      },
      {
        path: 'brand-add-edit',
        component: () => import('@/views/template-demo/brand/brand-add-edit.vue'),
        name: 'BrandAddEdit',
        hidden: true,
        meta: { title: '新增编辑', activeMenu: '/template-demo/brand-list' }
      },
      {
        path: 'brand-detail',
        component: () => import('@/views/template-demo/brand/brand-detail.vue'),
        name: 'BrandDetail',
        hidden: true,
        meta: { title: '详情', activeMenu: '/template-demo/brand-list' }
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
