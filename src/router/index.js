import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  //系统页面
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/authredirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },



  //首页
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },

  {
    path: '/SubjectKnowledgeBase',
    component: Layout,
    redirect: '/SubjectKnowledgeBase/querySubject',
    name: 'Subject',
    meta: { title: '题目知识库', icon: 'table' },
    children: [
      {
        path: 'querySubject',
        name: 'QuerySubject',
        component: () => import('@/views/querySubject/index'),
        meta: { title: '知识库信息列表'}
      },
      {
        path: 'subjectAdd',
        name: 'subjectAdd',
        component: () => import('@/views/subjectAdd/index'),
        meta: { title: '入库题目'}
      },
      {
        path: 'subjectStatistics',
        name: 'SubjectStatistics',
        component: () => import('@/views/subjectStatistics/index'),
        meta: { title: '知识库统计'}
      }
    ]
  },
  {
    path: '/TagBase',
    component: Layout,
    redirect: '/TagBase/queryTag',
    name: 'Tag',
    meta: { title: "标签库", icon: 'clipboard' },
    children: [
      {
        path: 'queryTag',
        name: 'QueryTag',
        component: () => import('@/views/queryTag/index'),
        meta: { title: '标签信息列表'}
      },
      {
        path: 'configureTag',
        name: 'ConfigureTag',
        component: () => import('@/views/configureTag/index'),
        meta: { title: '标签配置'}
      },
      {
        path: 'tagStatistics',
        name: 'TagStatistics',
        component: () => import('@/views/tagStatistics/index'),
        meta: { title: '标签统计'}
      }
    ]
  },

  {
    path: '/Examination',
    component: Layout,
    redirect: '/Examination/queryExamination',
    name: 'Examination',
    meta: { title: "试卷库", icon: 'documentation' },
    children: [
      {
        path: 'queryExamination',
        name: 'QueryExamination',
        component: () => import('@/views/queryExamination/index'),
        meta: { title: '试卷信息列表'}
      },
      {
        path: 'generatingExamination',
        name: 'GeneratingExamination',
        component: () => import('@/views/generatingExamination/index'),
        meta: { title: '生成试卷'}
      },
      {
        path: 'examinationStatistics',
        name: 'ExaminationStatistics',
        component: () => import('@/views/examinationStatistics/index'),
        meta: { title: '试卷统计'}
      }
    ]
  },

  {
    path: '/Authority',
    component: Layout,
    redirect: '/Authority/queryAuthority',
    name: 'Authority',
    meta: { title: "权限管理", icon: 'user' },
    children: [
      {
        path: 'queryAuthority',
        name: 'QueryAuthority',
        component: () => import('@/views/queryAuthority/index'),
        meta: { title: '权限信息列表'}
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '文本处理实力', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'examination',
        name: 'Examination',
        component: () => import('@/views/examination/index'),
        meta: { title: 'Examination', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
