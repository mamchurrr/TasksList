import Vue from 'vue'
import Router from 'vue-router'
import WelcomePage from './components/welcome/welcome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage
    },
    {
      path: '/task/:taskId',
      name: 'task.show',
      props: true,
      component: () => import('./components/tasks/task.vue')
    },
  ]
})