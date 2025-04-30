<template>
  <div style="text-align: center; margin-top: 1.5rem; margin-bottom: 1.5rem">
    <h1>Mini-Projet 3</h1>
    <p style="font-weight: bold; font-size: large">
      RÖTHLIN Gaël - BERNARD Elena
    </p>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>
<style>
body {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f7fa;
  min-height: 100vh;
}
</style>
