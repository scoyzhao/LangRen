<template>
  <div>
    <h3 class="myordersTitle">我所有的订单：</h3>
    <ul class="myorderInfo">
    	<li v-for="myorder in myorders">
    		{{ myorder.date }} - {{ myorder.room.name }} - {{ myorder.room.price }}元 - {{ myorder.status }}
    	</li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import store from '@/vuex/store'
import axios from 'axios'

export default {
  name: 'myorders',
  data() {
    return {
      myorders: [],
    }
  },
  created() {
    axios.get(`http://shine.tunnel.qydev.com/user/order/${this.$store.state.openId}`)
      .then(response => {
        // console.log(response)
        this.myorders = response.data
        for (var i = 0; i < this.myorders.length; i++) {
          // 改状态
          if (this.myorders[i].status == 1) {
            this.myorders[i].status = '处理中。'
          } else if (this.myorders[i].status == 2) {
            this.myorders[i].status = '处理完成'
          }
          // 改价格（针对包间）
          if (this.myorders[i].room.type == 1) {
            if(this.myorders[i].type == 0) {
            	this.myorders[i].room.price = 0
            }
          }
          // 改时间段
          if (this.myorders[i].phase == 1) {
            this.myorders[i].phase = '13:00-16:00'
          } else if (this.myorders[i].phase == 2) {
            this.myorders[i].phase = '16:00-19:00'
          } else if (this.myorders[i].phase == 3) {
            this.myorders[i].phase = '19:00-22:00'
          } else if (this.myorders[i].phase == 4) {
            this.myorders[i].phase = '22:00-24:00'
          }
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  store

}

</script>
<style type="text/css">
.myordersTitle {
	margin: 5%;
}

.myorderInfo {
	list-style: none;
  /*text-align:center;*/
}

.myorderInfo li {
  border: 1px solid black;
  margin: 0 6%;
}

</style>
