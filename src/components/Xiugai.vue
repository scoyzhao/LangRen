<template>
  <div>
    <!-- <div class="block">注 册</div> -->
    <div class="form">
      <mt-field label="手机号" placeholder="请输入正确的手机号码" type="number" v-model="phoneNo"></mt-field>
    </div>
    <!-- {{this.username}} - {{ this.shenfenzheng }} - {{ this.phone }} -->
    <mt-button class="post" type="primary" size="small" @click.native="post">修改</mt-button>
  </div>
</template>
<script type="text/javascript">
import { Field } from 'mint-ui'
import { Toast } from 'mint-ui'
import store from '@/vuex/store'
import axios from 'axios'

export default {
  name: 'signup',
  data() {
    return {
      // name: '',
      // id_card: '',
      phoneNo: '',
      openId: '',
    }
  },
  methods: {
    post() {
      if (this.phoneNo == '') {
        alert('电话号码不能为空')
      } else {
        this.openId = this.$store.state.openId

        axios.put('http://shine.tunnel.qydev.com/user/member', {
            openId: this.openId,
            phoneNo: this.phoneNo
          })
          .then(() => {
            Toast({
              message: '修改成功'
            })
            this.$router.go(-1)
          })
          .catch(error => {
            alert(error)
          })
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
  /*position: fixed;*/
}

.form {
  margin-top: 50px;
}

.post {
  margin: 50px 0 0 200px;
}

</style>
