import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Account from '@/components/Account'
import Transaction from '@/components/Transaction'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/account/:name',
      name: 'account',
      component: Account,
      props: true
    },
    {
      path: '/tx/:id',
      name: 'transaction',
      component: Transaction,
      props: true
    },
    {
      path: '/*',
      name: 'pagenotfound',
      component: PageNotFound,
    }
  ]
})
