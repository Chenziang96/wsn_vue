import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import login from '../components/index/login.vue'
import developer from '../components/index/developer'
import description from '../components/index/description'
import index from '../components/index/index'
import testIndex from '../components/test/testIndex'
import network from '../components/test/network'
import testinformation from '../components/test/testinformation'
import perceiveindex from '../components/perceiveData/perceiveindex'
import testifm from '../components/test/testifm'
import testarrangement1 from '../components/test/testarrangement1'
import netSelf from '../components/test/netSelf'
import testperformance from '../components/test/testperformance'
import nodetable from '../components/test/nodeTable'
import networklossrate from '../components/test/networkLossRate'
import networkthroughput from '../components/test/networkThroughput'
import networkconnectivity from '../components/test/networkConnectivity'
import networkdelay from '../components/test/networkDelay'
import networklength from '../components/test/networkLength'
import performancecomparison from '../components/test/performanceComparison'
import netdelay from '../components/test/netDelay'
import netloss from '../components/test/netLoss'
import instruction from '../components/test/instruction'
import topology from '../components/test/topology'
import netDelayGraph from '../components/test/netDelayGraph'
import netLossGraph from '../components/test/netLossGraph'
import register from '../components/index/register'
import error404 from '../components/error/404'
import error500 from '../components/error/500'
import historyInquiry from '../components/test/historyInquiry'
import historyGraph from '../components/test/historyGraph'
import systemTopology from '../components/perceiveData/systemTopology'
import application1 from '../components/perceiveData/application1'
import application2 from '../components/perceiveData/application2'
import systemPresent from '../components/index/systemPresent'


Vue.use(Router);

export const router1 = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {path: '/login', component: login},
        {path: '/description', component: description, meta: {requireAuth: true}},
        {path: '/developer', component: developer},
        {path: '/register', component: register},
      ]
    },
    {path:'/systempresent', component:systemPresent,children:[{path: '/systemtopology', component: systemTopology},]},
    {
      path: '/testindex',
      component: testIndex,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [

        {path: '/network', component: network, meta: {requireAuth: true}},
        {path: '/testinformation', component: testinformation, meta: {requireAuth: true},children:[{path: '/childtopology', component: systemTopology}]},
        {path: '/testifm', component: testifm},
        {path: '/testarrangement', component: testarrangement1,
          children: [
            {path: '/topology', component: topology},
            {path: '/secondtopology', component: systemTopology},
          ]},
        {path: '/netSelf', component: netSelf,children:[{path: '/nettopology', component: systemTopology},]},
        {
          path: '/testperformance', component: testperformance, children: [
            {path: '/testtopology', component: systemTopology},
            {path: '/networklossrate', component: networklossrate},
            {path: '/networkthroughput', component: networkthroughput},
            {path: '/networkconnectivity', component: networkconnectivity},
            {path: '/networkdelay', component: networkdelay},
            {path: '/networklength', component: networklength},
          ]
        },
        {
          path: '/performancecomparison', component: performancecomparison, children: [
            {path: '/netdelay', component: netdelay, children: [{path: '/netdelaydraph', component: netDelayGraph}]},
            {path: '/netloss', component: netloss, children: [{path: '/netlossgraph', component: netLossGraph}]}
          ]
        },
        {path: '/instruction', component: instruction},
        {
          path: '/historyinquiry',
          component: historyInquiry,
          children: [{path: '/historygraph', component: historyGraph}]
        }
      ]
    },
    {
      path: '/perceiveindex',
      component: perceiveindex,
      children: [
        {path: '/sensetopology', component: systemTopology},
        {path: '/application1', component: application1},
        {path: '/application2', component: application2},
      ],
    },
    {
      path: '/404',
      component: error404,
    },
    {
      path: '/500',
      component: error500,
    }
  ]
});
//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
console.log('isLogin', store.state.isLogin);
router1.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.isLogin === true) {  //检测token是否存在
      next();
    }
    else {
      next({
        // path: '/login',
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router1;
