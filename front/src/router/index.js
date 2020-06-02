import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import { loadView, loadComponent } from '@/utils/loadPage.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'Main',
      component: loadComponent('Main', 'Main'),
    },
    {
      path: '/about',
      component: loadView('AboutPage'),
    },
    {
      path : '/code',
      component : loadView('CodePage'),
      children: [
        { path: '', name: 'CodeList', component: loadComponent('Code', 'CodeList') },
        { path: 'form', name: 'CodeForm', component: loadComponent('Code', 'CodeMain') },
      ]
    },
    {
      path: '/game',
      component: loadView('GamePage'),
      children: [
        { path: '', name: 'GameList', component: loadComponent('CodeGame', 'GameList') },
        // { path: '', name: 'CodeGame', component: loadComponent('CodeGame', 'GameMain') },
        { path: 'flex/:id', name: 'FlexGame', component: loadComponent('CodeGame', 'FlexGame'), props : true},
        { path: 'text/:id', name : 'TextGame', component: loadComponent('CodeGame', 'TextGame'), props: true},
      ]
    },
    {
      path: '/login',
      component: loadView('LoginPage'),
      beforeEnter: checkNoLoginUser,
      children: [
        { path: '', name: 'Login', component: loadComponent('Login', 'LoginForm') },
        { path: 'findaccount', name: 'FindPassword', component: loadComponent('Login', 'FindPassword') }
      ]
    },
    {
      path: '/signup',
      component: loadComponent('Login', 'SignupForm'),
      beforeEnter: checkNoLoginUser,
    },
    {
      path: '/clan',
      component: loadView('ClanPage'),
      children: [
        { path: '', name: 'ClanMain', component: loadComponent('Clan', 'ClanMain') }, // 백엔드와 user 관련 데이터 연동 후 beforeEnter: checkRegisteredClan 추가
        { path: 'addform', name: 'ClanForm', component: loadComponent('Clan', 'ClanForm') }, // 백엔드와 user 관련 데이터 연동 후 beforeEnter: checkRegisteredClan 추가
        { path: 'detail/:id', name: 'ClanDetail', component: loadComponent('Clan', 'ClanDetail'), props: true },
        { path: 'edit/:id', name: 'ClanEdit', component: loadComponent('Clan', 'ClanForm'), props: true },
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: loadView('NotFoundPage'),  // 등록된 URL 주소가 아닌 곳으로 접근할 때 Not Found Page
    },
    {
      path: '/mypage',
      component: loadView('MyPage'),
      // beforeEnter: checkLoginUser,
      children: [
        { path: 'dashboard', name: 'DashBoard', component: loadComponent('MyPage', 'DashBoard') },
        { path: 'profile', name: 'Profile', component: loadComponent('MyPage', 'Profile') },
        { path: 'account', name: 'Account', component: loadComponent('MyPage', 'Account') }
      ]
    }
  ]
})

function checkNoLoginUser(to, from, next) {  // 로그인이 안 된 경우에 로그인창, 회원가입창 접근 가능
  store.state.user.isLogin ? next('/') : next()
}

// function checkLoginUser(to, from, next) { // 로그인이 된 경우에 mypage 접근 가능
//   !store.state.user.isLogin ? next('/') : next()
// }

// function checkRegisteredClan(to, from, next) { // 로그인한 유저 중 가입된 클랜이 없는 경우에만 클랜 리스트, 클랜 생성 페이지 접근 가능
//   if (!store.state.user.isLogin) { // 비로그인 상태이면 로그인을 먼저 하라는 문구 표시 후 로그인 페이지로 이동
//     alert('로그인을 먼저 해주세요.')
//     next('/login')
//     return
//   }
//   store.getters.info.clanid !== undefined && store.getters.info.clanid === 0 ? next() : next(`/clan/detail/${store.getters.info.clanid}`)
// }