import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装router插件
Vue.use(VueRouter);

//路由相关组件懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () =>  import('views/cart/Cart')
const Profile = ()  => import('views/profile/Profile')


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

//2. 创建router对象
 const router = new VueRouter({
   routes,
   mode: 'history'
 })

//3. 导出router对象
export default router
