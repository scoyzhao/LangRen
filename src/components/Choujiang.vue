<template>
  <div>
    <!-- <div class="block">幸运转盘</div> -->
    <!--幸运大转盘抽奖-->
    <div class="cishu">今日剩余抽奖次数：{{ this.cishu }}</div>
    <div id="box">
      <div id="zhizhen"></div>
    </div>
    <div class="jiangpin">
      <ul>
        <li v-for="jiangpin in jiangpins">
          {{ jiangpin.prize }} - {{ jiangpin.name }}
        </li>
      </ul>
    </div>
    <router-link to="/wodejiangpin">
      <mt-button class="history" type="primary" size="small">我的奖品</mt-button>
    </router-link>
  </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui'
import axios from 'axios'
import store from '@/vuex/store'

export default {
  name: 'choujiang',
  data() {
    return {
      cishu: 0,
      jiangpins: [],
      aword: 0,
    }
  },
  created() {
    // this.cishu = 3
    axios.get(`http://shine.tunnel.qydev.com/user/member/${this.$store.state.openId}`)
      .then(response => {
        // console.log(response.data.awardCount)
        this.cishu = response.data.awardCount
      })
      .catch(error => {
        alert(error)
      })

    axios.get('http://shine.tunnel.qydev.com/user/luckyDraw')
      .then(response => {
        console.log(response)
        this.jiangpins = response.data
      })
      .catch(error => {
        alert(error)
      })

      this.openId = this.$store.state.openId
  },
  mounted() {
    // 避免作用域的问题
    let that = this
    //幸运大转盘抽奖
    //获得指针元素
    let zhizhen = document.getElementById("zhizhen");
    //存放间隔动画id，用来清除运动
    let dbox = null;
    //间隔动画所用时间，表示转动快慢
    let dtime = 1;
    //角度，和css设置对应,初始为0
    let deg = null;
    //初始角度
    let sdeg = 0;
    //由js设置默认角度
    zhizhen.style.transform = "rotate(" + sdeg + "deg)";
    //变化增量
    let cc = 5;
    //旋转基本圈数
    let quan = 6;
    //多余角度
    let odeg = null;
    //停止时的角度
    let stopdeg = null;
    let alltime = 0;
    //区间奖项
    let jiang = [
      [1, 51, 0], //未中奖
      [52, 102, 6], //6等奖
      [103, 153, 5], //5等奖
      [154, 203, 4], //4等奖
      [204, 251, 3], //3等奖
      [252, 307, 2], //2等奖
      [307, 360, 1] //1等奖
    ];
    //可用次数
    // let cishu = this.cishu;
    //奖项判定函数
    function is(deg) {
      let res = "未中奖";
      for (let i = 0; i < jiang.length; i++) {
        if (deg >= jiang[i][0] && deg <= jiang[i][1]) {
          res = jiang[i][2];
        };
      };
      return res;
    };
    //是否在动画中
    let able = false;
    //概率
    let gailv = [
      [838, 0],
      [118, 6],
      [14, 5],
      [12, 4],
      [8, 3],
      [6, 2],
      [4, 1]
    ];
    //开始到结束总时间
    let xq = 0;
    //通过奖项设置额外角度的表现
    function set(real) {
      let mindeg, maxdeg;
      for (let i = 0; i < jiang.length; i++) {
        if (real == jiang[i][2]) {
          mindeg = jiang[i][0];
          maxdeg = jiang[i][1];
        };
      };
      return mindeg + Math.floor(Math.random() * (maxdeg - mindeg + 1)); //生成min-max的随机数
    };
    //监听点击事件
    zhizhen.onclick = function() {
      // that.test()
      // console.log(that.openId)
      if (!able) {
        if (that.cishu == 0) { //可用次数处理
          // alert("次数耗光，等待次啊次机会！");
          Toast({
            message: '今日次数耗光，请明天再来吧^^'
          })
        } else {
          // this.cishu -= 1; //次数减少
          that.jian()
          deg = sdeg;
          cc = 5;
          xq = 0;
          let allarr = []; //长度1000，存放0-6 表示奖项
          for (let i = 0; i < gailv.length; i++) {
            for (let j = 0; j < gailv[i][0]; j++) {
              allarr.push(gailv[i][1]);
            };
          };
          let real = allarr[Math.floor(Math.random() * 1000)];
          odeg = set(real);
          stopdeg = quan * 360 + odeg;
          alltime = stopdeg / cc * dtime;
          dbox = setInterval(dong, dtime);
        };
      };

    };
    //大转盘转动函数
    function dong() {
      able = true;
      deg += cc;
      if (deg > stopdeg) {
        clearInterval(dbox);
        setTimeout(function() {
          able = false;
          // alert(is(odeg));
          if (is(odeg) == 0) {
            // alert(is(odeg))
            axios.post('http://shine.tunnel.qydev.com/user/luckyDraw', {
                openId: that.openId,
                prizeId: 0,
                status: 0,
              })
              .then((response) => {
                Toast({
                  message: `很遗憾，您没有中奖。。。`
                })
              })
              .catch(error => {
                // console.log(this.$store.state.openId)
                alert(error)
              })
          } else {
            // alert(is(odeg))
            // console.log(this.$store.state.openId)
            that.aword = is(odeg)
            axios.post('http://shine.tunnel.qydev.com/user/luckyDraw', {
                openId: that.openId,
                prizeId: that.aword,
                status: 1,
              })
              .then(() => {
                Toast({
                  message: `恭喜您获得${that.aword}等奖,请联系工作人员及时领取！`
                })
              })
              .catch(error => {
                // console.log(this.$store.state.openId)
                alert(error)
              })
          }
        }, 500)
      } else {
        if (deg % 360 == 0) { //判断第几圈
          xq += 1;
          if (xq == quan - 1) { //到最后一圈
            cc = 1; //增量变为1 变慢旋转
          };
          zhizhen.style.transform = "rotate(" + deg + "deg)";
        } else {
          zhizhen.style.transform = "rotate(" + deg + "deg)";
        };
      };
    }
  },
  methods: {
    // 次数-1
    jian() {
      this.cishu--
    }
  },
  store
}

</script>
<style type="text/css">
/*demo*/

.block {
  width: 100%;
  height: 35px;
  background-color: #50BFFF;
  text-align: center;
  /*color: #5da9ff;*/
  font-size: 25px;
}

.cishu {
  margin: 6% 10%;
}

#box {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: relative;
  background: url(http://123.206.218.163/picture/back.png) no-repeat left top;
}

#zhizhen {
  width: 80px;
  height: 104px;
  position: absolute;
  background: url(http://123.206.218.163/picture/pointer.png) no-repeat left top;
  left: 110px;
  z-index: 999;
  cursor: pointer;
  top: 86px;
  transform-origin: 40px 64px;
}

.jiangpin ul {
  list-style: none;
}

.jiangpin li {
  /*float: left;*/
  margin-left: 25%;
}

.history {
  margin: 5% 0 5% 60%;
}

</style>
