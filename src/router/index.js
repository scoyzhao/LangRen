import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Tools from '@/components/Tools'
import Player from '@/components/Player'
import Caipan from '@/components/Caipan'
import About from '@/components/About'
import Meiri from '@/components/Meiri'
import Choujiang from '@/components/Choujiang'
import Wodejiangpin from '@/components/Wodejiangpin'
import Fangjian from '@/components/Fangjian'
import Jiaolian from '@/components/Jiaolian'
import Commit from '@/components/Commit'
import Signup from '@/components/Signup'
import Fangjianjieshao from '@/components/Fangjianjieshao'
import Xiugai from '@/components/Xiugai'
import MyOrder from '@/components/MyOrder'
import Zuowei_sanjian from '@/components/Zuowei_sanjian'
import Zuowei_zheng from '@/components/Zuowei_zheng'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    meta: {
      title: '会员中心'
    },
    component: Index,
  }, {
    path: '/tools',
    name: 'tools',
    meta: {
      title: '实用工具'
    },
    component: Tools
  }, {
    path: '/player',
    name: 'player',
    meta: {
      title: '玩家工具'
    },
    component: Player
  }, {
    path: '/caipan',
    name: 'caipan',
    meta: {
      title: '裁判工具'
    },
    component: Caipan
  }, {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于我们'
    },
    component: About
  }, {
    path: '/meiri',
    name: 'meiri',
    meta: {
      title: '每日一题'
    },
    component: Meiri
  }, {
    path: '/choujiang',
    name: 'choujiang',
    meta: {
      title: '幸运转盘'
    },
    component: Choujiang
  }, {
    path: '/wodejiangpin',
    name: 'wodejiangpin',
    meta: {
      title: '我的奖品'
    },
    component: Wodejiangpin
  }, {
    path: '/fangjian',
    name: 'fangjian',
    meta: {
      title: '房间信息'
    },
    component: Fangjian
  }, {
    path: '/jiaolian',
    name: 'jiaolian',
    meta: {
      title: '教练介绍'
    },
    component: Jiaolian
  }, {
    path: '/commit/:id',
    name: 'commit',
    meta: {
      title: '关于他／她的评论'
    },
    component: Commit
  }, {
    path: '/signup',
    name: 'signup',
    meta: {
      title: '注 册'
    },
    component: Signup
  }, {
    path: '/fangjianjieshao',
    name: 'fangjianjieshao',
    meta: {
      title: '房间信息'
    },
    component: Fangjianjieshao
  }, {
    path: '/xiugai',
    name: 'xiugai',
    meta: {
      title: '修改个人信息'
    },
    component: Xiugai
  }, {
    path: '/zuowei_sanjian/:roomId',
    name: 'zuowei_sanjian',
    meta: {
      title: '散房预定'
    },
    component: Zuowei_sanjian
  }, {
    path: '/zuowei_zheng/:roomId',
    name: 'zuowei_zheng',
    meta: {
      title: '整房预定'
    },
    component: Zuowei_zheng
  }, {
    path: '/myorder',
    name: 'myorder',
    meta: {
      title: '我的预定'
    },
    component: MyOrder
  }]
})
