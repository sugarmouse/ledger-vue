import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Detail from '@/views/Detail.vue';
import NotFound from '@/views/NotFound.vue';
import IncomeTagList from '@/views/IncomeTagList.vue';
import OutgoTagList from '@/views/OutgoTagList.vue';
import Statistics from '@/views/Statistics.vue';
import Home from '@/views/Home.vue';
import EditRecord from '@/views/EditRecord.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path: '/money',
    name:'money',
    component: Money
  },
  {
    path: '/detail',
    name:'/detail',
    component: Detail
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path:'/incomeTagList',
    name:'incomeTagList',
    component:IncomeTagList,
  },
  {
    path:'/outgoTagList',
    name:'outgoTagList',
    component:OutgoTagList
  },
  {
    path: '/detail/edit/:id',
    component: EditRecord,
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
