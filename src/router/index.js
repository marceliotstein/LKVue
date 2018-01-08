import Vue from 'vue'
import Router from 'vue-router'
import OperaList from '@/components/OperaList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Operas',
      component: OperaList
    }
  ]
})
