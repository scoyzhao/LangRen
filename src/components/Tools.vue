<template>
  <div class="self">
    <!-- <div class="block">实用工具</div> -->
    <div class="self-header">
      <span>
        <img class="self-picture" :src=user.picture alt="">
        <h4 class="self-nickname">{{ user.nickname }}</h4>
      </span>
    </div>
    <router-link to="/fangjianjieshao" class="self-seat self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zuowei"></use>
      </svg>
      <span class="item-name">座位预定</span>
    </router-link>
    <!-- <router-link to="/choujiang" class="self-choujiang self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-choujiang"></use>
      </svg>
      <span class="item-name">幸运转盘</span>
    </router-link>
    <router-link to="/meiri" class="self-choujiang self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-timuliebiao"></use>
      </svg>
      <span class="item-name">每日一题</span>
    </router-link> -->
    <router-link to="/player" class="self-wanjia self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-player"></use>
      </svg>
      <span class="item-name">玩家工具</span>
    </router-link>
    <router-link to="/caipan" class="self-caipan self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caipan"></use>
      </svg>
      <span class="item-name">裁判工具</span>
    </router-link>
    <router-link to="/jiaolian" class="self-jiaolian self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jiaolian"></use>
      </svg>
      <span class="item-name">教练介绍</span>
    </router-link>
    <router-link to="/about" class="self-dizhi self-row">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guanyuwomen"></use>
      </svg>
      <span class="item-name">关于我们</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      user: {
        picture: 'http://123.206.218.163/picture/1.jpg',
        nickname: 'Tools'
      }
    }
  }
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

.block {
  width: 100%;
  height: 35px;
  background-color: #50BFFF;
  text-align: center;
  /*color: #5da9ff;*/
  font-size: 25px;
  /*position: fixed;*/
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


</style>
