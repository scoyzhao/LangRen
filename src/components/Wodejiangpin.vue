<template>
  <div>
    <!-- <div class="block">我的奖品</div> -->
    <h4 class="header">未领取的奖品：</h4>
    <ul class="wodejiangpin">
      <li v-for="jiangpin in jiangpins">
        {{ jiangpin.createTime }} - {{ jiangpin.prize.prize }} - {{ jiangpin.prize.name }}
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import store from '@/vuex/store'
import axios from 'axios'

export default {
  name: 'wodejiangpin',
  data() {
    return {
      jiangpins: []
    }
  },
  created() {
    axios.get(`http://shine.tunnel.qydev.com/user/luckyDraw/record?id=${this.$store.state.openId}`)
      .then(response => {
        // console.log(response)
        this.jiangpins = response.data
        for (var i = 0; i < this.jiangpins.length; i++) {
          // alert(this.jiangpins[i])
          this.jiangpins[i].createTime = this.formTime(this.jiangpins[i].createTime)
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    formTime(n) {
      let dTime = new Date(n)
      let fTime = `${dTime.getFullYear()}-${dTime.getMonth() + 1}-${dTime.getDate()}`
      return fTime
    }
  },
  store
}

</script>
<style type="text/css">
* {
  margin: 0;
  padding: 0
}

.header {
  margin: 5%;
}

.wodejiangpin {
  list-style: none;
  text-align:center;
}

.wodejiangpin li {
  border: 1px solid black;
  margin: 0 6%;
}

</style>
