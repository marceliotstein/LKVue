import Vue from 'vue'
import Router from 'vue-router'
import LKPage from '@/components/LKPage'
import LKQuery from '@/components/LKQuery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LK Page',
      component: LKPage
    },
    {
      path: '/querier',
      name: 'LK Query',
      component: LKQuery
    },
  ]
})
