import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/registro-personas',
    name: 'registro-personas',
    component: () => import('../views/security/PersonView.vue')
  },
  {
    path: '/registro-usuarios',
    name: 'registro-usuarios',
    component: () => import('../views/security/UserView.vue')
  },
  {
    path: '/registro-clientes',
    name: 'registro-clientes',
    component: () => import('../views/security/ClientView.vue')
  },
  {
    path: '/registro-roles',
    name: 'registro-roles',
    component: () => import('../views/security/RoleView.vue')
  },
  {
    path: '/registro-vistas',
    name: 'registro-vistas',
    component: () => import('../views/security/ViewView.vue')
  },
  {
    path: '/asignar-roles-usuarios',
    name: 'asignar-roles-usuarios',
    component: () => import('../views/security/RolePermissionUser.vue')
  },
  {
    path: '/asignar-vistas-roles',
    name: 'asignar-vistas-roles',
    component: () => import('../views/security/RolePermissionView.vue')
  },
  {
    path: '/registro-continentes',
    name: 'registro-contientes',
    component: () => import('../views/parameters/ContinentesView.vue')
  },
  {
    path: '/registro-paises',
    name: 'registro-paises',
    component: () => import('../views/parameters/PaisesView.vue')
  },
  {
    path: '/registro-departamentos',
    name: 'registro-departamentos',
    component: () => import('../views/parameters/DepartamentosView.vue')
  },
  {
    path: '/registro-ciudades',
    name: 'registro-ciudades',
    component: () => import('../views/parameters/CiudadesView.vue')
  },
  {
    path: '/registro-bodegas',
    name: 'registro-bodegas',
    component: () => import('../views/inventory/WarehouseView.vue')
  },
  {
    path: '/registro-productos',
    name: 'registro-productos',
    component: () => import('../views/inventory/ProductView.vue')
  },
  {
    path: '/registro-invetarios',
    name: 'registro-inventarios',
    component: () => import('../views/inventory/InventoryView.vue')
  },
  {
    path: '/registro-marcas',
    name: 'registro-marcas',
    component: () => import('../views/inventory/BrandView.vue')
  },
  {
    path: '/registro-categorias',
    name: 'registro-categorias',
    component: () => import('../views/inventory/CategoriesView.vue')
  },
  {
    path: '/registro-unidadMedida',
    name: 'registro-unidadMedida',
    component: () => import('../views/inventory/UnitmeasureView.vue')
  },
  {
    path: '/registro-facturas',
    name: 'registro-facturas',
    component: () => import('../views/sale/InvoiceView.vue')
  },
  {
    path: '/registro-detalle-factura',
    name: 'registro-detalle-factura',
    component: () => import('../views/sale/InvoiceDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
