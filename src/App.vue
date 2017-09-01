<template>
  <div id="app">
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view v-wechat-title="$route.meta.title"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app'
}

</script>
<style>
#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
}

.main {
  width: 100%;
  height: 100%;
  background-color: #EFF2F7;
  overflow: auto;
}

.fade-enter {
  opacity: 0;
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity .5s;
}

</style>
