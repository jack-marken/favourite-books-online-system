import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../components/HomePage.vue'
import BookPage from '../components/Book.vue'
import SearchPage from '../components/Search.vue'
import CartPage from '../components/Cart.vue'
import CheckoutPage from '../components/Checkout.vue'
import CheckoutSuccessPage from '../components/CheckoutSuccess.vue'
import AccountPage from '../components/Account.vue'
import OrderManagementPage from '../components/OrderManagement.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/book/:id', component: BookPage },
  { path: '/search', component: SearchPage },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/checkout/success', component: CheckoutSuccessPage },
  { path: '/account', component: AccountPage },
  { path: '/staff/orders', component: OrderManagementPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router