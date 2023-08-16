<script setup>
import { RouterLink } from "vue-router";
import request from "../request";
import router from "../router";

const login = async (event) => {
  event.preventDefault();
  const forms = document.forms;
  const form = forms.loginForm;
  const formData = {
    username: form.username.value,
    password: form.password.value,
  };
  const { data, status } = await request("POST", "signin", {}, formData);
  if (status === 200) {
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.setItem("access", data.token);
    router.push({ path: "dashboard" });

    // form.reset();
  }
};
</script>
<template>
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 text-black">
          <div class="px-5 ms-xl-4" style="margin-top: 3cm">
            <i
              class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
              style="color: #709085"
            ></i>
          </div>

          <div
            class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
          >
            <form style="width: 23rem" name="loginForm" @submit="login">
              <h3 class="h1 fw-bold mb-3 pb-3" style="letter-spacing: 1px">
                Log in
              </h3>

              <div class="form-outline mb-4">
                <label class="form-label" for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  class="form-control form-control-lg"
                  :required="true"
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control form-control-lg"
                  :required="true"
                />
              </div>

              <div class="pt-1 mb-4">
                <button
                  class="btn btn-info btn-lg btn-block"
                  type="submit"
                  style="width: 100%"
                >
                  Login
                </button>
              </div>

              <p class="small mb-5 pb-lg-2">
                <a class="text-muted" href="#!"></a>
              </p>
              <p>
                Don't have an account?
                <RouterLink class="link-info" to="/register"
                  >Register here</RouterLink
                >
              </p>
            </form>
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image"
            class="w-100 vh-100"
            style="object-fit: cover; object-position: left"
          />
        </div>
      </div>
    </div>
  </section>
</template>
