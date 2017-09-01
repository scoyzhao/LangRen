<template>
  <div>
    <p class="sanjianJieshao">这里是散间，预约价格为{{ $route.params.price }}，房间提供：【{{ this.$route.params.profile }}】。您可以随意预定</p>
    <mt-button class="orderBtn" type="primary" size="small" @click.native="order">预定</mt-button>
    <h4 class="sanjianJieshao">预定成员：</h4>
    <ul class="seatSan">
      <li class="seatSan" v-for="member in members">
        <span class="seatInfo">
          <img class="picture" :src="member.member.headImgUrl">
          <p class="name">{{ member.member.name }}</p>
        </span>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui'
import store from '@/vuex/store'
import axios from 'axios'

export default {
  name: 'zuowei_sanjian',
  data() {
    return {
      orderData: {
        roomId: 0,
        phase: 0,
        date: '',
        openId: '',
        number: 1,
      },
      members: [],
      current: 0,
      total: 0,
      // 判断是否已预定本房间
      flag: 0,
    }
  },
  created() {
    this.orderData.roomId = this.$route.params.roomId
    this.orderData.phase = this.$route.params.phase
    this.orderData.date = this.$route.params.date
    this.orderData.openId = this.$store.state.openId
    this.orderData.type = 1
    // console.log(this.$route.params.profile)

    // 获取成员信息
    axios.post('http://shine.tunnel.qydev.com/user/room/seat', {
        date: this.orderData.date,
        phase: this.orderData.phase,
        roomId: this.orderData.roomId,
      })
      .then(response => {
        // console.log(response)
        this.members = response.data
      })
      .catch(error => {
        alert(error)
      })
  },
  mounted() {
    this.getMemberInfo()
  },
  methods: {
    // 获取现在的人数和房间总人数
    getMemberInfo() {
      // 获取当前人数是否已满
      axios.post('http://shine.tunnel.qydev.com/user/room', {
          date: this.orderData.date,
          phase: this.orderData.phase,
          type: 0,
        })
        .then(response => {
          // console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].no == this.orderData.roomId) {
              // console.log(i)
              this.current = response.data[i].current
              this.total = response.data[i].total
            }
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    // 预定
    order() {
      this.getMemberInfo()

      if (this.current == this.total) {
        Toast({
          message: '本房间人数已满，请您选择其他房间预定^^'
        })
      } else {
        for (var i = 0; i < this.members.length; i++) {
          if (this.members[i].member.openId == this.orderData.openId) {
            this.flag = 1
          }
        }
        if (this.flag == 1) {
          Toast({
            message: '您已经预约过本房间^^，不可重复预约'
          })
          this.flag = 0
        } else {
        	// console.log(this.orderData.roomId)
          axios.post('http://shine.tunnel.qydev.com/user/order', this.orderData)
            .then(() => {
              Toast({
                message: '您已经成功预约本房间^^,请及时付钱'
              })
              axios.post('http://shine.tunnel.qydev.com/user/room/seat', {
                  date: this.orderData.date,
                  phase: this.orderData.phase,
                  roomId: this.orderData.roomId,
                })
                .then(response => {
                  console.log(response)
                  this.members = response.data
                })
                .catch(error => {
                  alert('1')
                })
            })
            .catch(error => {
            	alert('2')
            })
        }
      }
    }
  },
  store
}

</script>
<style type="text/css" scoped>
.sanjianJieshao {
  margin: 5%;
  font-size: 15px;
}

.orderBtn {
  position: relative;
  left: 75%;
}

ul {
  list-style: none;
  margin-top: 10px;
  /*text-align: center;*/
  font-size: 15px;
}

.seatSan li {
  margin: 10px 15px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
}

.seatInfo {
  display: inline-block;
}

.picture {
  height: 40px;
  widows: 40px;
  line-height: 40px;
  border-radius: 5px;
  padding: 3% 0 3% 20%;
  float: left;
  position: relative;
}

.name {
  padding: 8% 0 5% 160px;
  font-size: 18px;
}

</style>
