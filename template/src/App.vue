<template>
<div id="wrapper">
  <header-bar></header-bar>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
import Hello from './components/Hello'
import store from './vuex/store';
import HeaderBar from './components/HeaderBar';

export default {
  name: 'app',
  components: {
    Hello,
    HeaderBar
  }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Comfortaa:300,400,700';

html, body {
  padding: 0;
  margin: 0;

  font-family: arial, sans-serif;
  color: #000;
}

body {
  overflow: hidden;
}

#wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.scrollable-content {
  flex: 1 1 auto;
  position: relative;
}

.scroll-content-y {
  overflow-y: auto;
}
.scroll-content-x {
  overflow-x: auto;
}
</style>
