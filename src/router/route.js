export default {
  path: '/',
  name: 'Home',
  redirect: '/a',
  component: () => import('@/views/Layout.vue'),
  children: [
    {
      path: '/a',
      name: 'ada',
      meta: {
        title: '打算'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a1',
      name: 'qa',
      meta: {
        title: '订单'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a2',
      name: 'qqq',
      meta: {
        title: '用户管理'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a2-1',
      name: 'qqqadd',
      meta: {
        title: '用户管理新增',
        newTab: false,
        related: 'qqq'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a3',
      name: 'qa1',
      meta: {
        title: '信息'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a3-1',
      name: 'q3a',
      meta: {
        title: '店铺管理'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a3-2',
      name: 'sas',
      meta: {
        title: '供应商管理'
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/a3-3',
      name: 'we',
      meta: {
        title: '不知道叫什么'
      },
      component: () => import('@/views/Home.vue')
    }
  ]
}
