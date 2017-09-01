<template>
  <div>
    <!-- <div class="block">注 册</div> -->
    <p class="signupTips">首次登陆用户中心，需要您先进行注册，<strong>姓名、身份证</strong>一旦注册完成将无法自主修改，请您谨慎填写</p>
    <div class="form">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
      <mt-field label="身份证" placeholder="请输入身份证" type="number" v-model="id_card"></mt-field>
      <mt-field label="手机号" placeholder="请输入正确的手机号码" type="number" v-model="phoneNo"></mt-field>
    </div>
    <!-- {{this.username}} - {{ this.shenfenzheng }} - {{ this.phone }} -->
    <mt-button class="post" type="primary" size="small" @click.native="post">注册</mt-button>
  </div>
</template>
<script type="text/javascript">
import { Field } from 'mint-ui'
import axios from 'axios'

export default {
  name: 'signup',
  data() {
    return {
      name: '',
      id_card: '',
      phoneNo: '',
      openId: '',
    }
  },
  methods: {
    post() {
      if (this.name == '') {
        alert('用户名不能为空')
      } else if (this.shenfengzheng == '') {
        alert('身份证不能为空')
      } else if (this.phoneNo == '') {
        alert('电话号码不能为空')
      } else {
        var url = location.href; //获取url中"?"符后的字串
        var strs = []
        if (url.indexOf("?") != -1) { //判断是否有参数
          var str = url.substr(1) //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
          strs = str.split("=") //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
          // 如果没有openid这个参数，则不会输出
          // console.log(strs[1])
          // alert(strs[1]); //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
          this.openId = strs[1]
        }
        let Data = {
          'name': this.name,
          'idCard': this.id_card,
          'phoneNo': this.phoneNo,
          'openId': this.openId
        }
        // console.log(Data)
        axios.post('http://shine.tunnel.qydev.com/user/member', Data)
          .then(response => {
            window.location = "http://shine.tunnel.qydev.com/wechat/authorize?returnUrl=http://shine.tunnel.qydev.com/"
          })
          .catch(error => {
            alert(error)
            // window.location = "http://shine.tunnel.qydev.com/authorize?returnUrl=http://shine.tunnel.qydev.com/"
          })
      }
    }
  }
}

</script>
<style type="text/css">
.signupTips {
  font-size: 5px;
  margin: 10%;
}

.form {
  margin-top: 50px;
}

.post {
  margin: 50px 0 0 200px;
}

</style>
