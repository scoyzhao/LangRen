<template>
  <div class="self">
    <!-- <div class="block">会员中心</div> -->
    <!-- {{ $store.state.openId }} -->
    <div class="self-header" @click="xiugai">
      <span>
        <img class="self-picture" :src=user.picture alt="">
        <h4 class="self-nickname">{{ this.user.name }}</h4>
      </span>
    </div>
    <router-link to="/fangjian" class="self-seat self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zuowei"></use>
      </svg>
      <span class="item-name">座位预定</span>
    </router-link>
    <router-link to="/choujiang" class="self-choujiang self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-choujiang"></use>
      </svg>
      <span class="item-name">幸运转盘<mt-badge  class="badge awardCount" type="error" size="large">{{this.badge.choujiang}}</mt-badge></span>
    </router-link>
    <router-link to="/meiri" class="self-choujiang self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-timuliebiao"></use>
      </svg>
      <span class="item-name">每日一题<mt-badge class="badge meiri" type="error" size="large">{{ this.badge.meiri }}</mt-badge></span>
    </router-link>
    <router-link to="jiaolian" class="self-jiaolian self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jiaolian"></use>
      </svg>
      <span class="item-name">教练介绍</span>
    </router-link>
  </div>
</template>
<script>
import store from '@/vuex/store'
import axios from 'axios'
import { Badge } from 'mint-ui'

export default {
  name: 'index',
  data() {
    return {
      user: {
        picture: '',
        name: '',
      },
      badge: {
        choujiang: 0,
        meiri: 0,
      }
    }
  },
  created() {
    this.$store.state.openId = this.getOpenId().slice(0, 28)
    axios.get(`http://shine.tunnel.qydev.com/user/member/${this.$store.state.openId}`)
      .then(response => {
        // console.log(response)
        this.user.picture = response.data.headImgUrl
        this.user.name = response.data.name
        this.badge.choujiang = response.data.awardCount

        // if (this.badge.choujiang == 0) {
        //   document.getElementByClass('awardCount').display = 'none'
        // }
      })
      .catch(error => {
        alert(error)
      })

    axios.get(`http://shine.tunnel.qydev.com/user/question/count?openId=${this.$store.state.openId}`)
      .then(response => {
        this.badge.meiri = response.data

        // if (this.badge.meiri == 0) {
        //   document.getElementByClass('meiri').style.display = 'none'
        // }
      })
      .catch(error => {
        alert(err)
      })
  },
  // mounted() {
  //   if (this.badge.meiri == 0) {
  //     document.getElementByClass('meiri').style.display = 'none'
  //   }
  // },
  methods: {
    getOpenId() {
      var url = location.href; //获取url中"?"符后的字串
      var strs = []
      if (url.indexOf("?") != -1) { //判断是否有参数
        var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
        strs = str.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
        // 如果没有openid这个参数，则不会输出
        // console.log(strs[1])
        // alert(strs[1]); //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
        return strs[1]
      }
    },
    xiugai() {
      this.$router.push('/xiugai')
    }
  },
  store
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.icon {
  width: 30px;
  height: 30px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  padding: 4px 20px 4px 20px;
  float: left;
}

.item-name {
  float: left;
  color: black;
  padding: 5px 10px 10px 10px;
  font-size: 18px;
}

.self-row {
  width: 100%;
  height: 40px;
  background-color: white;
  margin: 3% 0;
  float: left;
  cursor: pointer;
}

.self-header {
  height: 80px;
  width: 100%;
  background-color: white;
  margin: 10% 0 5% 0;
  cursor: pointer;
}

.self-picture {
  height: 50px;
  width: 50px;
  padding: 20px;
  float: left;
}

.self-nickname {
  padding: 30px;
}

.badge {
  position: absolute;
  right: 5%;
}

</style>
