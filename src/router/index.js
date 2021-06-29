import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/front',
    component: () => import('@/views/frontData/Front.vue'),
    // 巢狀路由
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/frontData/Home.vue')
      },
      {
        path: 'products',
        component: () => import('@/views/frontData/Products.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/frontData/Cart.vue')
      }
    ]
  },
  { // 登入
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  { // 後台
    path: '/admin',
    component: () => import('@/views/admin/DashBoard.vue'),
    // 巢狀路由
    children: [
      {
        path: 'products',
        component: () => import('@/views/admin/DashBoardProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/admin/Coupons.vue')
      }
    ]
  },
  // 404頁面
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('../views/NotFound.vue')
  // }
  // 重新導向
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
  // linkActiveClass: 'active',
  // scrollBehavior (to, from, savePosition) {
  //   console.log(to, from, savePosition)
  //   // `to` 和 `from` 都是路由地址
  //   // `savedPosition` 可以為空 ，如果沒有的話
  //   if (to.fullPath.match('about')) {
  //     return {
  //       top: 0
  //     }
  //   }
  //   return {}
  // }
})

export default router
