<script setup>
import {ref} from "vue";
import AddShowsView from "../components/AddShowsView.vue";
import AddTheaterView from "../components/AddTheaterView.vue";
import BuyTicket from "../components/BuyTicket.vue";
import CartView from "../components/CartView.vue";
import PreviousShowsView from "../components/PreviousShowsView.vue";
import PreviousTheaterView from "../components/PreviousTheaterView.vue";
import ReportView from "../components/ReportView.vue";
import request from "../request";
import router from "../router";

const job = ref(0);
const user = ref(localStorage.getItem("is_admin"));
console.log(localStorage.getItem("is_admin"));

const toggleNavBar = () => {
  const toggle = document.getElementById("header-toggle");
  const nav = document.getElementById("nav-bar");
  const bodypd = document.getElementById("body-pd");
  const headerpd = document.getElementById("header");
  if (toggle && nav && headerpd) {
    nav.classList.toggle("show");
    toggle.classList.toggle("bx-x");
    bodypd.classList.toggle("body-pd");
    headerpd.classList.toggle("body-pd");
  }
};

const logout = async () => {
  const {data, status} = await request("GET", "logout");
  if (status === 200) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    router.push({path: "login"});
  }
};
</script>
<template>
  <div id="body-pd">
    <header class="header" id="header">
      <div class="header_toggle">
        <i class="fas fa-bars" id="header-toggle" @click="toggleNavBar"></i>
      </div>
      <div style="margin-left: auto; margin-right: 40px">
        <button type="button" class="btn btn-primary" @click="logout">
          Logout
        </button>
      </div>
      <div class="header_img">
        <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
      </div>
    </header>
    <div class="l-navbar" id="nav-bar">
      <nav class="nav">
        <div>
          <span class="nav_logo">
            <i class="bx bx-layer nav_logo-icon"></i>
            <span class="nav_logo-name">Ticket-Show</span>
          </span>
          <div class="nav_list" v-if="user === 'true'">
            <span class="nav_link" @click="() => (job = 0)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">Add Theater</span>
            </span>
            <span class="nav_link" @click="() => (job = 1)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">Add Shows</span>
            </span>
            <span class="nav_link" @click="() => (job = 2)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">Previous Theater</span>
            </span>
            <span class="nav_link" @click="() => (job = 3)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">Previous Shows</span>
            </span>
            <span class="nav_link" @click="() => (job = 4)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">Reports</span>
            </span>
          </div>
          <div class="nav_list" v-else>
            <span class="nav_link" @click="() => (job = 0)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">book show</span>
            </span>
            <span class="nav_link" @click="() => (job = 1)">
              <i class="fas fa-tachometer-alt fa-fw me-3"></i>
              <span class="nav_name">Cart</span>
            </span>
          </div>
        </div>
      </nav>
    </div>

    <div class="height-100" v-if="user === 'true'">
      <div v-if="job === 0">
        <AddTheaterView />
      </div>
      <div v-if="job === 1">
        <AddShowsView />
      </div>
      <div v-if="job === 2">
        <PreviousTheaterView />
      </div>
      <div v-if="job === 3">
        <PreviousShowsView />
      </div>
      <div v-if="job === 4">
        <ReportView />
      </div>
    </div>
    <div class="height-100" v-else>
      <div v-if="job === 0">
        <BuyTicket />
      </div>
      <div v-if="job === 1">
        <CartView />
      </div>
    </div>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap");
:root {
  --nav-width: 68px;
  --first-color: #4723d9;
  --first-color-light: #afa5d9;
  --white-color: #f7f6fb;
  --body-font: "Nunito", sans-serif;
  --normal-font-size: 1rem;
  /* --z-fixed: 100; */
}
/* *,
::before,
::after {
  box-sizing: border-box;
} */
/* body {
  position: relative;
  margin: var(--header-height) 0 0 0;
  padding: 0 1rem;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  transition: 0.5s;
} */
a {
  text-decoration: none;
}
.header {
  width: 100%;
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: var(--white-color);
  /* z-index: var(--z-fixed); */
  transition: 0.5s;
}
.header_toggle {
  color: var(--first-color);
  font-size: 1.5rem;
  cursor: pointer;
}
.header_img {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}
.header_img img {
  width: 40px;
}
.l-navbar {
  position: fixed;
  top: 0;
  left: -30%;
  width: var(--nav-width);
  height: 100vh;
  background-color: var(--first-color);
  padding: 0.5rem 1rem 0 0;
  transition: 0.5s;
  /* z-index: var(--z-fixed); */
}
.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.nav_logo,
.nav_link {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 0 0.5rem 1.5rem;
}
.nav_logo {
  margin-bottom: 2rem;
}
.nav_logo-icon {
  font-size: 1.25rem;
  color: var(--white-color);
}
.nav_logo-name {
  color: var(--white-color);
  font-weight: 700;
}
.nav_link {
  position: relative;
  color: var(--first-color-light);
  margin-bottom: 1.5rem;
  transition: 0.3s;
}
.nav_link:hover {
  color: var(--white-color);
}
.nav_icon {
  font-size: 1.25rem;
}
.show {
  left: 0;
}
.body-pd {
  padding-left: calc(var(--nav-width) + 1rem);
}
.active {
  color: var(--white-color);
}
.active::before {
  content: "";
  position: absolute;
  left: 0;
  width: 2px;
  height: 32px;
  background-color: var(--white-color);
}
.height-100 {
  height: 100vh;
}
@media screen and (min-width: 768px) {
  body {
    margin: calc(var(--header-height) + 1rem) 0 0 0;
    padding-left: calc(var(--nav-width) + 2rem);
  }
  .header {
    height: calc(var(--header-height) + 1rem);
    padding: 0 2rem 0 calc(var(--nav-width) + 2rem);
  }
  .header_img {
    width: 40px;
    height: 40px;
  }
  .header_img img {
    width: 45px;
  }
  .l-navbar {
    left: 0;
    padding: 1rem 1rem 0 0;
  }
  .show {
    width: calc(var(--nav-width) + 156px);
  }
  .body-pd {
    padding-left: calc(var(--nav-width) + 188px);
  }
}
</style>
