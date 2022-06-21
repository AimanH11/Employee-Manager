import Vue from 'vue'
import Router from 'vue-router'
import EmployeeDetail from '../views/Employee.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Employees',
      component: EmployeeDetail
    },
    {
      path: '/employees/create',
      name: 'Create',
      component: () => import('../views/EmployeeCreate.vue')
    },
    {
      path: '/employees/edit/:id',
      name: 'Edit',
      component: () => import('../views/EmployeeEdit.vue')
    }
  ]
})
