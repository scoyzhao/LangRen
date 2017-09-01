<template>
  <div>
    <!-- <div class="block">房间信息</div> -->
    <span class="shijianduan0">{{ this.formatTime }}</span>
    <mt-button class="picker" @click="openPicker" type="primary" size="small">日期选择</mt-button>
    </br>
    <span class="shijianduan1">{{ this.shijianduan }}</span>
    <mt-button class="time" type="primary" size="small" @click.native="change">时间段选择</mt-button>
    <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" @confirm="handleConfirm">
    </mt-datetime-picker>
    <p class="roomTitle">整租房：</p>
    <ul class="fangjian">
      <li v-for="fangjian in zhengzuRoom" @click="push">
        <span class="roomInfo">
          <img class="picture" :src="fangjian.picUrl">
          <p class="room">房间{{ fangjian.no }}</p>
          <p class="numbers">{{ fangjian.current }}/{{ fangjian.total }}</p>
        </span>
      </li>
    </ul>
    <p class="roomTitle">散租房：</p>
    <ul class="fangjian">
      <li v-for="fangjian in sanzuRoom" @click="push">
        <span class="roomInfo">
          <img class="picture" :src="fangjian.picUrl">
          <p class="room">房间{{ fangjian.no }}</p>
          <p class="numbers">{{ fangjian.current }}/{{ fangjian.total }}</p>
        </span>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { DatetimePicker } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'

export default {
  name: 'fangjian',
  data() {
    return {
      shijianduan: '13:00-16:00',
      shijianduanId: 1,
      zhengzuRoom: [],
      sanzuRoom: [],
      pickerValue: new Date(),
      startDate: new Date(),
    }
  },
  computed: {
    formatTime() {
      return `${this.pickerValue.getFullYear()}-${this.pickerValue.getMonth() + 1}-${this.pickerValue.getDate()}`
    }
  },
  created() {
    // type = 0, 散房, 时间段默认查第一个
    axios.post('http://shine.tunnel.qydev.com/user/room', {
        date: this.formatTime,
        phase: this.shijianduanId,
        type: 0,
      })
      .then(response => {
        console.log(response)
        this.sanzuRoom = response.data
      })
      .catch(error => {
        alert(error)
      })

    // type = 1, 整租房
    axios.post('http://shine.tunnel.qydev.com/user/room', {
        date: this.formatTime,
        phase: this.shijianduanId,
        type: 1,
      })
      .then(response => {
        // console.log(response)
        this.zhengzuRoom = response.data
      })
      .catch(error => {
        alert(error)
      })
  },
  methods: {
    // 设置时间段id
    change() {
      if (this.shijianduan == '13:00-16:00') {
        this.shijianduan = '16:00-19:00'
        this.shijianduanId = 2
        // alert(this.shijianduanId)
      } else if (this.shijianduan == '16:00-19:00') {
        this.shijianduan = '19:00-22:00'
        this.shijianduanId = 3
      } else if (this.shijianduan == '19:00-22:00') {
        this.shijianduan = '22:00-24:00'
        this.shijianduanId = 4
      } else if (this.shijianduan == '22:00-24:00') {
        this.shijianduan = '13:00-16:00'
        this.shijianduanId = 1
      }
      this.getRoomInfo()
    },
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm() {
      // console.log(typeof(this.formatTime))
      this.getRoomInfo()
    },
    // 转到房间页面，需要的参数有房间id，时间段，日期
    push() {
      Toast({
        message: '只有会员可以预定房间，请您先注册^^'
      })
    },
    // 获取房间信息函数，每次点击时间段和改变日期都会触发
    getRoomInfo() {
      // alert('getRoomInfo')
      axios.post('http://shine.tunnel.qydev.com/user/room', {
          date: this.formatTime,
          phase: this.shijianduanId,
          type: 0,
        })
        .then(response => {
          console.log(this.formatTime)
          console.log(this.shijianduanId)
          this.sanzuRoom = response.data
        })
        .catch(error => {
          alert(error)
        })

      // type = 1, 整租房
      axios.post('http://shine.tunnel.qydev.com/user/room', {
          date: this.formatTime,
          phase: this.shijianduanId,
          type: 1,
        })
        .then(response => {
          // console.log(response)
          console.log(this.formatTime)
          console.log(this.shijianduanId)
          this.zhengzuRoom = response.data
        })
        .catch(error => {
          alert(error)
        })
    },
  }
}

</script>
<style type="text/css">
* {
  margin: 0;
  padding: 0
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

.chang {
  margin: 20px;
}

ul {
  list-style: none;
  margin-top: 10px;
  /*text-align: center;*/
  font-size: 15px;
}

.fangjian li {
  /*height: 40px;*/
  /*line-height: 40px;*/
  margin: 10px 15px;
  /*border-bottom: 1px solid #708090;*/
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
}

.picture {
  height: 40px;
  widows: 40px;
  line-height: 40px;
  border-radius: 5px;
  padding: 5% 0 0 10%;
  float: left;
  position: relative;
}

.roomInfo {
  display: inline-block;
}

.room {
  padding: 10px 0 0 100px;
  font-size: 15px;
}

.numbers {
  padding: 5% 5% 0 200px;
  color: #9C9C9C;
}

.picker {
  margin: 10px 0 0 70px;
}

.time {
  margin: 10px 0 0 50px;
}

.shijianduan0 {
  margin: 30% 0 20% 15%;
}

.shijianduan1 {
  margin: 50% 0 20% 15%;
}

.roomTitle {
  margin: 10px 0 0 5%;
  font-size: 18px;
}

</style>
