import Vue from 'vue'
import VueRouter from 'vue-router'

import MyLogin from '../components/MyLogin.vue'
import MyDashboard from '../components/MyDashboard.vue'

//USER
import MyIndexUser from '../components/User/MyIndex.vue'
import MyTambahUser from '../components/User/MyTambah.vue'
import MyEditUser from '../components/User/MyEdit.vue'

//MEMBER
import MyIndexMember from '../components/Member/MyIndex.vue'
import MyDetailMember from '../components/Member/MyDetail.vue'
import MyTambahMember from '../components/Member/MyTambah.vue'
import MyEditMember from '../components/Member/MyEdit.vue'

//PAKET
import MyIndexPaket from '../components/Paket/MyIndex.vue'
import MyEditPaket from '../components/Paket/MyEdit.vue'

//OUTLET
import MyIndexOutlet from '../components/Outlet/MyIndex.vue'
import MyTambahOutlet from '../components/Outlet/MyTambah.vue'
import MyEditOutlet from '../components/Outlet/MyEdit.vue'

//TRANSAKSI
import MyIndexTransaksi from '../components/Transaksi/MyIndex.vue'
import MyTambahTransaksi from '../components/Transaksi/MyTambah.vue'
import MyDetailTransaksi from '../components/Transaksi/MyDetail.vue'
import MyTambahDetailTransaksi from '../components/Transaksi/TambahDetail.vue'

//REPORT
import MyReport from '../components/Report/MyIndex.vue'



Vue.use(VueRouter)

const routes = [
    {
    path: '/login',
    name: 'login',
    component: MyLogin
    },
    {
    path: '/',
    name: 'dashboard',
    component: MyDashboard,
    },
    {
      path: '/user',
      name: 'indexuser',
      component: MyIndexUser,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/user/tambah',
      name: 'tambahuser',
      component: MyTambahUser,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/user/edit/:id',
      name: 'edituser',
      component: MyEditUser,
      meta : {
        requiresAuth : true
      }
    },
    {
        path: '/member',
        name: 'indexmember',
        component: MyIndexMember,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/member/detail/:id',
        name: 'detailmember',
        component: MyDetailMember,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/member/tambah',
        name: 'tambahmember',
        component: MyTambahMember,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/member/edit/:id',
        name: 'editmember',
        component: MyEditMember,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/paket',
        name: 'indexpaket',
        component: MyIndexPaket,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/paket/edit/:id',
        name: 'editpaket',
        component: MyEditPaket,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/outlet',
        name: 'indexoutlet',
        component: MyIndexOutlet,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/outlet/tambah',
        name: 'tambahoutlet',
        component: MyTambahOutlet,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/outlet/edit/:id',
        name: 'editoutlet',
        component: MyEditOutlet,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/transaksi',
        name: 'indextransaksi',
        component: MyIndexTransaksi,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/transaksi/tambah',
        name: 'tambahtransaksi',
        component: MyTambahTransaksi,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/transaksi/detail/:id',
        name: 'detailtransaksi',
        component: MyDetailTransaksi,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/transaksi/detail/tambah/:id',
        name: 'tambahdetail',
        component: MyTambahDetailTransaksi,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/report',
        name: 'report',
        component: MyReport,
        meta : {
          requiresAuth: true
        }
      },
    ]
    

    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
  })
  router.beforeEach((to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
      if(localStorage.getItem('auth')) {
      next()
      } else {
      next('/login')
      }
      }
      next()
      })
  export default router