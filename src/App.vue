<script setup>
import { RouterView } from "vue-router";
import router from "./router";

if (localStorage.getItem("access")) router.push({ path: "dashboard" });
</script>

<template>
  <RouterView />
</template>
