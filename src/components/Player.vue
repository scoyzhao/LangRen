<template>
  <div class="player">
    <!-- <div class="block">玩家工具</div> -->
    <p class="tips">用法：单击头像切换玩家角色，单击号码切换玩家存货状态，单击下一天按钮在笔记栏中增加分界线</p>
    <ul class="playList">
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">01号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">02号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">03号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">04号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">05号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">06号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">07号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">08号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">09号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">10号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">11号</div>
      </li>
      <li>
        <img class="player-picture" src="../../static/picture/1.jpg">
        <div class="player-character">12号</div>
      </li>
    </ul>
    <textarea class="player-note"></textarea>
    <p class="button">
      <mt-button class="player-flash" type="primary" size="small" @click.native="flash">初始化</mt-button>
      <mt-button class="player-nextDay" type="primary" size="small" @click.native="next">下一天</mt-button>
    </p>
  </div>
</template>
<script type="text/javascript">
import { Indicator } from 'mint-ui'

export default {
  name: 'player',
  data() {
    return {
      day: 0
    }
  },
  mounted() {
    this.load()
    this.view()
    this.changeCharacter()
    this.death()
  },
  methods: {
    // 伪加载
    load() {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      setTimeout(() => {
        Indicator.close()
      }, 1500)
    },
    // 视图初始化
    view() {
      let aImg = document.getElementsByTagName('img')
      for (let i = 0; i < aImg.length; i++) {
        aImg[i].src = 'http://123.206.218.163/picture/1.jpg'
      }
      // alert(this.duyao)
    },
    // 下一天
    next() {
      let oTxt = document.getElementsByTagName('textarea')[0]

      oTxt.value = `${ oTxt.value }\n     -------------- 第${ this.day }天 ----------- \n `
      this.day++
    },
    // 转换身份
    changeCharacter() {
      let aImg = document.getElementsByTagName('img')
      for (let i = 0; i < aImg.length; i++) {
        aImg[i].onclick = function() {
          // alert(aImg[i].src)
          // if (aImg[i].src == 'http://localhost:8080/static/img/1.25f1a81.jpg') {
          //   aImg[i].src = '../../static/picture/2.jpg'
          if (aImg[i].src == 'http://123.206.218.163/picture/1.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/2.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/2.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/3.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/3.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/4.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/4.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/5.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/5.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/6.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/6.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/7.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/7.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/8.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/8.jpg') {
            aImg[i].src = 'http://123.206.218.163/picture/9.jpg'
          } else if (aImg[i].src == 'http://123.206.218.163/picture/9.jpg') {
            // aImg[i].src = '../../static/img/1.25f1a81.jpg'
            aImg[i].src = 'http://123.206.218.163/picture/1.jpg'
          }
        }
      }
    },
    // 死亡
    death() {
      let aDiv = document.getElementsByClassName('player-character')
      for (let i = 0; i < aDiv.length; i++) {
        let oldCharacter = aDiv[i].innerHTML
        aDiv[i].onclick = function() {
          if (aDiv[i].innerHTML != '死亡') {
            aDiv[i].innerHTML = '死亡'
            aDiv[i].style.color = 'red'
          } else {
            aDiv[i].innerHTML = oldCharacter
            aDiv[i].style.color = 'black'
          }
        }
      }
    },
    // 刷新页面
    flash() {
      this.$router.go('/player')
    }
  }
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

.playList {
  margin: 2% 5%;
}

.playList li {
  list-style-type: none;
  float: left;
  margin: 2%;
  cursor: pointer;
}

.player-picture {
  width: 40px;
  height: 40px;
  background-color: black;
}

.player-character {
  font-size: 20px;
  padding-left: 0px;
}

.player-note {
  height: 250px;
  width: 90%;
  margin: 2% 5%;
  font-size: 16px;
}

.button {
  margin: 5% 0 10% 50%;
}

.player-flash {
  margin-right: 10%;
}

.tips {
  margin: 2px 10px 0 10px;
  font-size: 1px;
  color: #666666;
}

</style>
