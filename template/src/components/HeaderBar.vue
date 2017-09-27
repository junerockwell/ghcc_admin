<template>
<div class="header header-stable">
  <div class="header-title">
    <h1>A GHCC Admin</h1>
  </div>
  <nav role="main">
    <router-link
      to="/userslist"
      exact
      :class="{ 'router-link-active': subIsActive('/page1') }">
      Page1
    </router-link>
    <router-link
      to="/userslist"
      exact
      :class="{ 'router-link-active': subIsActive('/page2') }">
      Page2
    </router-link>
  </nav>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0
      })
    }
  }
}
</script>

<style>
.header {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;

  height: 44px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
}

.header .header-title {
  text-align: center;
  flex: 0 0 auto;
  align-self: center;
  padding: 0 15px;
}
.header .header-title h1 {
  /*font-family: 'Roboto Slab', serif;*/
  /*font-family: 'Slabo 27px', serif;*/
  /*font-family: 'Sanchez', serif;*/
  /*font-family: 'Copse', serif;*/
  /*font-family: 'Sura', serif;*/
  /*font-family: 'Bree Serif', serif;*/
  font-family: 'Comfortaa', cursive;
  /*font-family: 'Antic Slab', serif;*/
  letter-spacing: 1.5px;
  /*font-style: italic;*/
  font-size: 25px;
  font-weight: 700;
}

.header-stable {
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
}

nav[role="main"],
.header .nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: space-between;
  height: 100%;
  line-height: 43px; /* height of the .header */
}

nav[role="main"] .nav-item,
.header .nav .nav-item,
nav[role="main"] a {
  align-self: center;

  border-right: 1px solid #ccc;
  flex: 0 0 auto;
  padding: 0 15px;
  text-decoration: none !important;
  color: #337ab7;
}
nav[role="main"] .nav-item:first-child,
.header .nav .nav-item:first-child,
nav[role="main"] a:first-child {
  border-left: 1px solid #ccc;
}
nav[role="main"] .nav-item a,
.header .nav .nav-item a {
  /*flex: 1 1 auto;
  align-self: center;*/
  /*padding-top: 16px;*/
}

nav[role="main"] a.main-active,
nav[role="main"] a.router-link-active {
  background-color: #fff;
  color: #DB6719;
  border-bottom: 1px solid #fff;
  font-weight: bold;
  height: 45px; /* 1px taller than its container pushes it down*/
}
</style>
