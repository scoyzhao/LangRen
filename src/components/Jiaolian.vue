<template>
  <div>
    <!-- <div class="block">教练介绍</div> -->
    <p class="jieshao">点击图片评论他／她</p>
    <div class="box">
      <button class="btn prev" @click="prev"><</button>
      <button class="btn next" @click="next ">></button>
        <img :src=teacher.imgUrl class="pic" @click="push" alt="加载中。。。">
        <p class="name">{{ this.teacher.name }}</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
import store from '@/vuex/store'

export default {
  name: 'jiaolian',
  data() {
    return {
      teachers: [],
      teacher: {},
    }
  },
  created() {
    axios.get('http://shine.tunnel.qydev.com/user/teacher')
      .then(response => {
        // console.log(response.data)
        this.teachers = response.data
        this.teacher = this.teachers[0]
        this.loadPic()
      })
      .catch(error => {
        alert(error)
      })
    // this.teachers = [{
    //   'pic': 'http://123.206.218.163/picture/1.jpg',
    //   'name': 'a',
    //   'id': 1,
    // }, {
    //   'pic': 'http://123.206.218.163/picture/2.jpg',
    //   'name': 'b',
    //   'id': '2',
    // }, {
    //   'pic': 'http://123.206.218.163/picture/3.jpg',
    //   'name': 'c',
    //   'id': 3,
    // }]
  },
  methods: {
    prev() {
      console.log(this.teacher)
      let index
      for (var i = 0; i < this.teachers.length; i++) {
        if(this.teacher == this.teachers[i]) {
          index = i
        }
      }
      if (index == 0) {
        index = this.teachers.length - 1
        this.teacher = this.teachers[index]
        this.loadPic()
      } else {
        index -= 1
        this.teacher = this.teachers[index]
        this.loadPic()
      }
    },
    next() {
      let index
      for (var i = 0; i < this.teachers.length; i++) {
        if(this.teacher == this.teachers[i]) {
          index = i
        }
      }
      // console.log(index)
      if (index == this.teachers.length - 1) {
        index = 0
        this.teacher = this.teachers[index]
        this.loadPic()
      } else {
        index += 1
        this.teacher = this.teachers[index]
        // console.log(index)
        this.loadPic()
      }
    },
    // 跳转到评论区
    push() {
      this.$router.push({name: 'commit', params: { id: this.teacher.id }})
    },
    // 加载默认图片
    loadPic() {
      if (this.teacher.imgUrl == null ) {
          this.teacher.imgUrl = "http://123.206.218.163/picture/1.jpg"
        }
    }
  },
  store
}

</script>
<style type="text/css">
.box {
  width: 100%;
  height: 500px;
  margin: 3% auto;
  border-radius: 15px;
}

.btn {
  height: 100px;
  width: 50px;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
}

.pic {
  width: 90%;
  height: 90%;
  margin: 5%;
  border-radius: 20px;
}

.name {
  font-size: 20px;
  margin: 0 0 20px 40%;
}

.prev {
  position: absolute;
  left: 0;
  top: 40%;
}

.next {
  position: absolute;
  right: 0;
  top: 40%;
}

.jieshao {
  margin: 5px 0 0 20px;
}

</style>
