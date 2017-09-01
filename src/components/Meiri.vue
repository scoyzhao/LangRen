<template>
  <div>
    <!-- <div class="block">每日一题</div> -->
    <p class="jieshao">今日剩余答题次数：{{ this.cishu }}</p>
    <h3 class="timu">题目：{{ this.title }}</h3>
    <mt-radio class="xuanxiang" v-model="value" :options="optionInfos" @change.once="check">
      {{ value }}
    </mt-radio>
  </div>
</template>
<script type="text/javascript">
import { Radio } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'
import store from '@/vuex/store'

export default {
  name: 'meiri',
  data() {
    return {
      value: '',
      answer: '',
      title: '',
      optionInfos: [],
      cishu: 0,
      id: 0,
    }
  },
  created() {
    axios.get(`http://shine.tunnel.qydev.com/user/question/count?openId=${this.$store.state.openId}`)
      .then(response => {
        this.cishu = response.data
      })
      .catch(error => {
        alert(err)
      })
    // console.log(this.$store.state.openId)
    axios.get(`http://shine.tunnel.qydev.com/user/question/random`)
      .then(response => {
        // console.log(response.data.id)
        this.title = response.data.title
        this.optionInfos = response.data.optionInfos
        this.answer = response.data.answer
        this.id = response.data.id
      })
      .catch(error => {
        alert(err)
      })
  },
  methods: {
    check() {
      // console.log(this.value)
      if (this.cishu == 0) {
        Toast({
          message: '今日您已完成答题^^'
        })
      } else {
        if (this.value == this.answer) {
          Toast({
            message: '回答正确'
          })
          axios.post(`http://shine.tunnel.qydev.com/user/question/answer`, {
              'result': 1,
              'openId': this.$store.state.openId,
            })
            .catch(error => {
              alert(error)
            })
        } else {
          // alert()
          Toast({
            message: `回答错误,正确答案是${this.answer}`
          })
          axios.post(`http://shine.tunnel.qydev.com/user/question/answer`, {
              'result': 0,
              'openId': this.$store.state.openId,
            })
            .catch(error => {
              alert(error)
            })
        }
      }
    }
  },
  store
}

</script>
<style type="text/css">
.block {
  width: 100%;
  height: 35px;
  background-color: #50BFFF;
  text-align: center;
  /*color: #5da9ff;*/
  font-size: 25px;
}

.timu {
  margin: 20% 0 20% 10%;
}

.jieshao {
  margin: 6% 10%;
}

.xuanxiang {
  width: 90%;
  margin: 5%;
}

</style>
