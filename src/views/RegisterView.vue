<script setup>
import request from "../request";
import { RouterLink } from "vue-router";

const register = async (event) => {
  event.preventDefault();
  const forms = document.forms;

  const form = forms.registerForm;

  if (form.password.value !== form.cpassword.value) {
    Swal.fire({
      icon: "warning",
      title: "Password mismatch!",
    });
    return;
  }

  const formData = {
    name: form.name.value,
    email: form.email.value,
    username: form.username.value,
    password: form.password.value,
  };

  const { data, status } = await request("POST", "signup", {}, formData);
  if (status === 200) {
    console.log(data);
    Swal.fire({
      icon: "success",
      title: data.msg,
    });
    form.reset();
  }
};
</script>
<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>

                  <form
                    class="mx-1 mx-md-4"
                    name="registerForm"
                    @submit="register"
                  >
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw" style="margin-top: 30px;"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="name">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          class="form-control"
                          :required="true"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="username"
                          >Username</label
                        >
                        <input
                          type="text"
                          id="username"
                          name="username"
                          class="form-control"
                          :required="true"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="email">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          class="form-control"
                          :required="true"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="password"
                          >Password</label
                        >
                        <input
                          type="password"
                          id="password"
                          name="password"
                          class="form-control"
                          :required="true"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="cpassword"
                          >Confirm Password</label
                        >
                        <input
                          type="password"
                          id="cpassword"
                          name="cpassword"
                          class="form-control"
                          :required="true"
                        />
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button type="submit" class="btn btn-primary btn-lg">
                        Register
                      </button>
                    </div>
                  </form>
                  <p class="text-muted mt-5 mb-0" style="margin-left: 40px">
                    Have already an account?
                    <RouterLink to="/login" class="fw-bold text-body"
                      ><u>Login here</u></RouterLink
                    >
                  </p>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
