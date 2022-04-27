import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Tags from '@/views/Tags.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditTag from '@/views/EditTag.vue';
import IncomeTagList from '@/views/IncomeTagList.vue';
import OutgoTagList from '@/views/OutgoTagList.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'money',
    component: Money
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/tags',
    component: Tags
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path:'/incomeTagList',
    component:IncomeTagList,
  },
  {
    path:'/outgoTagList',
    component:OutgoTagList
  },
  {
    path: '/labels/edit/:id',
    component: EditTag,
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
