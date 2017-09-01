<template>
  <div>
    <!-- <div class="block">关于他／她的评论</div> -->
    <div class="teacherInfo">
      <img class="timg" :src=teacher.img>
      <ul class="teacher">
        <li>
          <p>姓名：{{ teacher.name }}</p>
        </li>
        <li>
          <p>性别：{{ teacher.sex }}</p>
        </li>
        <li>
          <p>年龄：{{ teacher.age }}</p>
        </li>
        <li>
          <p>介绍：{{ teacher.profile }}</p>
        </li>
        <li>
          <p>电话：{{ teacher.phone }}</p>
        </li>
      </ul>
    </div>
    <mt-button class="bCommit" size="small" type="primary" @click="commit">你想对他／她说</mt-button>
    <ul class="commit">
      <li v-for="commit in commits">
        <span class="commitInfo">
          <img class="picture" :src="commit.member.headImgUrl" alt="">
          <p class="name">{{ commit.member.name }}:</p>
          <p class="content">{{ commit.comment }}</p>
        </span>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import axios from 'axios'
import store from '@/vuex/store'

export default {
  name: 'commit',
  data() {
    return {
      teacher: {
        img: '',
        name: '',
        phone: 0,
        sex: '',
        age: 0,
        profile: '',
      },
      commits: [],
      openId: ''
    }
  },
  created() {
    axios.get(`http://shine.tunnel.qydev.com/user/comment/${this.$route.params.id}`)
      .then(response => {
        console.log(response.data)
        this.commits = response.data
      })
      .catch(error => {
        alert(error)
      })

    axios.get(`http://shine.tunnel.qydev.com/user/teacher/${this.$route.params.id}`)
      .then(response => {
        // console.log(response)
        this.teacher.img = response.data.imgUrl
        this.teacher.name = response.data.name
        this.teacher.phone = response.data.phoneNo
        this.teacher.sex = response.data.sex
        this.teacher.age = response.data.age
        this.teacher.profile = response.data.profile
        if (this.teacher.profile == null) {
          this.teacher.profile = '暂无介绍'
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  mounted() {
    this.openId = this.$store.state.openId || ''
  },
  methods: {
    commit() {
      if (this.openId == '') {
        Toast({
          message: '非会员无法注评论，请您先注册／会员请在会员中心评论^^'
        })
      } else {
        MessageBox.prompt(' ', '评论', { inputPlaceholder: '你想对他／她说' })
          .then(({ value, action }) => {
            // console.log(value)
            axios.post('http://shine.tunnel.qydev.com/user/comment', {
                'comment': value,
                'openId': this.openId,
                'teacherId': this.$route.params.id,
              })
              .then(() => {
                axios.get(`http://shine.tunnel.qydev.com/user/comment/${this.$route.params.id}`)
                  .then(response => {
                    console.log(response)
                    this.commits = response.data
                  })
                  .catch(error => {
                    alert(error)
                  })

                Toast({
                  message: '评论成功'
                })
              })
              .catch(error => {
                alert(error)
              })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  store
}

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  margin: 5% 0;
  /*text-align: center;*/
  overflow: hidden;
  display: block;
}

.commit li {
  /*height: 40px;*/
  width: 100%;
  margin-top: 5px;
  /*border-bottom: 1px solid #708090;*/
  border-radius: 10px;
  background-color: white;
  /*word-wrap: break-word;*/
  word-break: break-all;
}

.picture {
  height: 40px;
  widows: 40px;
  line-height: 40px;
  border-radius: 15px;
  margin: 3% 0 5% 20%;
  float: left;
  position: relative;
}

.teacherInfo {
  height: 100px;
  width: 90%;
  margin: 20px 5% 0 5%;
}

.teacherInfo li {
  font-size: 13px;
  margin: 0 0 0 20px;
}

.timg {
  height: 90px;
  width: 80px;
  margin: 0 10px 10px 40px;
  float: left;
  border-radius: 10px;
}

.commitInfo {
  display: inline-block;
}

.name {
  margin: 10px 0 0 80px;
  font-size: 15px;
}

.content {
  margin: 0 0 0 80px;
  font-size: 10px;
  color: #9C9C9C;
}

.bCommit {
  margin: 10px 20px 0 200px;
  font-size: 10px;
}

</style>
