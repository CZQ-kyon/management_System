<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.1s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.1s;
}
</style>
