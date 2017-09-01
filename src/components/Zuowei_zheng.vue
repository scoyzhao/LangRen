<template>
  <div>
    <p class="zhengjianJieshao">这里是整租间，房东预约价格为{{ $route.params.price }}，其他人可以通过抢入按钮免费预约本房间。房间提供：【{{ this.$route.params.profile }}】。</p>
    <mt-button class="baochang" type="danger" size="small" @click="baochang">包场</mt-button>
    <mt-button class="qiangru" type="primary" size="small" @click="qiangru">抢入</mt-button>
    <h4 class="fangdong">房东：</h4>
    <div class="master">
      <span>
        <img class="masterPic" :src=member.headImgUrl>
        <h4 class="masterName">{{ member.name }}  <small class="small">带领{{ member.number - 1 }}名小伙伴</small></h4>
      </span>
    </div>
    <h4 class="fangdong">散客：</h4>
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
import { MessageBox } from 'mint-ui'
import store from '@/vuex/store'
import axios from 'axios'

export default {
  name: '/zuowei_zheng',
  data() {
    return {
      orderData: {
        roomId: 0,
        phase: 0,
        date: '',
        openId: '',
        number: 1,
        type: 0,
      },
      members: [],
      allMembers: [],
      master: {},
      member: {
        headImgUrl: '',
        name: '1',
        number: 1,
      },
      current: 0,
      total: 0,
      // 判断是否已预定本房间
      flag: 0,
      // 判断是否有人，抢入的时候用
      length: 0,
    }
  },
  created() {
    // console.log(this.$route.params)
    // 这里type字段提交的时候再赋值
    this.orderData.roomId = this.$route.params.roomId
    this.orderData.phase = this.$route.params.phase
    this.orderData.date = this.$route.params.date
    this.orderData.openId = this.$store.state.openId

    //获取成员信息
    axios.post('http://shine.tunnel.qydev.com/user/room/seat', {
        date: this.orderData.date,
        phase: this.orderData.phase,
        roomId: this.orderData.roomId,
      })
      .then(response => {
        this.allMembers = response.data
        if (response.data[0] === undefined) {
          this.member = {
            headImgUrl: 'http://123.206.218.163/picture/1.jpg',
            name: '暂无',
            number: 1,
          }
          this.length = 0
        } else {
          // console.log(response.data[0].member.headImgUrl)
          this.length = response.data[0].number + response.data.length - 1
          this.member = response.data[0].member
          this.member.number = response.data[0].number
          for (var i = 1; i < response.data.length; i++) {
            this.members.push(response.data[i])
          }
        }
      })
      .catch(error => {
        alert(error)
      })
    // this.fangdong()
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
          type: 1,
        })
        .then(response => {
          // console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].no == this.orderData.roomId) {
              // console.log(response.data[i].no)
              this.current = response.data[i].current
              this.total = response.data[i].total
            }
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    // 包场
    baochang() {
      this.getMemberInfo()
      if (this.current != 0) {
        Toast({
          message: '本房间已有人承包^^'
        })
      } else {
        this.orderData.type = 1
        MessageBox.prompt(' ', '你们一起来的人数', { inputPlaceholder: '包括你在内哦^^' })
          .then(({ value, action }) => {
            // console.log(value)
            this.orderData.number = parseInt(value)
            if (this.orderData.number > this.total) {
              Toast({
                message: '人数超过房间总人数，请重新填写'
              })
            } else {
              axios.post('http://shine.tunnel.qydev.com/user/order', this.orderData)
                .then(() => {
                  Toast({
                    message: '您已经成功预约本房间^^,请及时付钱'
                  })
                  //获取成员信息
                  axios.post('http://shine.tunnel.qydev.com/user/room/seat', {
                      date: this.orderData.date,
                      phase: this.orderData.phase,
                      roomId: this.orderData.roomId,
                    })
                    .then(response => {
                      if (response.data[0] === undefined) {
                        this.member = {
                          headImgUrl: 'http://123.206.218.163/picture/1.jpg',
                          name: '暂无',
                          number: 1,
                        }
                      } else {
                        // console.log(response.data[0].member.headImgUrl)
                        this.member = response.data[0].member
                        this.member.number = response.data[0].number
                        this.members = []
                        for (var i = 1; i < response.data.length; i++) {
                          this.members.push(response.data[i])
                        }
                      }
                    })
                    .catch(error => {
                      alert(error)
                    })
                })
                .catch(error => {
                  alert(error)
                })
            }
          })
      }
    },
    // 抢入
    qiangru() {
      // console.log(this.orderData.openId)
      // 得到人数
      this.getMemberInfo()
      //console.log(this.allMembers)
      // console.log(this.current)
      // console.log(this.total)
      if (this.length == 0) {
        Toast({
          message: '包场需要有房东才可以抢入^^'
        })
      } else if (this.current == this.total) {
        Toast({
          message: '本房间人数已满，请您选择其他房间预定^^'
        })
      } else {
        console.log(this.orderData.openId)
        for (var i = 0; i < this.allMembers.length; i++) {
          if (this.allMembers[i].member.openId == this.orderData.openId) {
            this.flag = 1
          }
        }
        if (this.flag == 1) {
          Toast({
            message: '您已经预约过本房间^^，不可重复预约'
          })
          this.flag = 0
        } else {
          this.orderData.type = 0
          axios.post('http://shine.tunnel.qydev.com/user/order', this.orderData)
            .then(() => {
              Toast({
                message: '您已经成功预约本房间^^,请及时付钱'
              })
              //获取成员信息
              axios.post('http://shine.tunnel.qydev.com/user/room/seat', {
                  date: this.orderData.date,
                  phase: this.orderData.phase,
                  roomId: this.orderData.roomId,
                })
                .then(response => {
                  if (response.data[0] === undefined) {
                    this.member = {
                      headImgUrl: 'http://123.206.218.163/picture/1.jpg',
                      name: '暂无',
                      number: 1,
                    }
                  } else {
                    // console.log(response.data[0].member.headImgUrl)
                    this.member = response.data[0].member
                    this.member.number = response.data[0].number
                    this.members = []
                    for (var i = 1; i < response.data.length; i++) {
                      this.members.push(response.data[i])
                    }
                  }
                })
                .catch(error => {
                  alert(error)
                })
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
<style type="text/css" scoped>
.zhengjianJieshao {
  margin: 5%;
  font-size: 15px;
}

.fangdong {
  margin-left: 20px;
}

.master {
  height: 60px;
  width: 100%;
  margin: 5% 0;
  cursor: pointer;
  background-color: white;
}

.masterPic {
  height: 50px;
  width: 50px;
  padding: 5px 0 5px 10%;
  float: left;
  border-radius: 5px;
}

.masterName {
  padding: 20px 0 20px 100px;
}

.baochang {
  margin: 0 0 5px 60%;
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
  padding: 8% 0 5% 100px;
  font-size: 18px;
}

.small {
  /*display: bloc;*/
}

</style>
