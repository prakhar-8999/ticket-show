<script setup>
import {ref} from "vue";
import request from "../request";

const cart = ref([]);
const searchData = ref([]);
const loadingBtn = ref(false);

const getCart = async () => {
  const {data, status} = await request("GET", "cart");
  if (status === 200) {
    cart.value = data;
    searchData.value = data;
    console.log(JSON.parse(JSON.stringify(data)));
  }
};
getCart();

const performSearch = (value) => {
  const data = cart.value.filter(
    (each) => !each.show_name.toLowerCase().indexOf(value.toLowerCase())
  );
  searchData.value = data;
};

const deleteFromCart = async (id) => {
  const {data, status} = await request("POST", "cart", {}, {id: id});
  if (status === 200) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    getCart();
  }
};

const placeOrder = async () => {
  loadingBtn.value = true;
  const cartData = cart.value
    .filter((each) => each.quantity)
    .map((each) => ({
      cartId: each.cartId,
      showId: each.id,
      quantity: each.quantity,
    }));
  const {data, status} = await request(
    "POST",
    "buyCartTicket",
    {},
    {ticketData: cartData}
  );
  if (status === 200) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    getCart();
  }
  loadingBtn.value = false;
};
</script>

<template>
  <div style="margin-top: 2cm; padding-left: 40px; padding-right: 40px">
    <h1>Your Cart</h1>
    <div class="input-group input-group-lg" style="margin-top: 40px">
      <input
        type="text"
        class="form-control"
        placeholder="Search for shows..."
        v-on:input="(e) => performSearch(e.target.value)"
      />
    </div>

    <div style="margin-top: 40px" class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="s in searchData">
        <div class="card">
          <img
            :src="s.image"
            class="card-img-top"
            alt="theater image"
            style="width: 100%; height: 5cm"
          />
          <div class="card-body">
            <p class="card-title" style="font-size: large; font-weight: 600">
              {{ s.theater_name }}
            </p>
          </div>
          <div class="card-body" style="margin-top: -30px">
            <div style="display: flex; justify-content: space-between">
              <h5 class="card-title">{{ s.show_name }}</h5>
              <h5 class="card-title">price : {{ s.price }}/p</h5>
            </div>

            <p class="card-text">
              {{ s.description }}
            </p>
            <p class="card-text">Capacity : {{ s.capacity }}</p>
            <p class="card-text">Date : {{ s.date }}</p>
            <p class="card-text">Time : {{ s.show_time }}</p>
            <div>
              <input
                type="number"
                name="quantity"
                v-model="s.quantity"
                class="form-control"
                id="quantity"
              />
            </div>
            <div style="margin-top: 30px">
              <button
                type="button"
                style="width: 100%"
                class="btn btn-danger"
                @click="() => deleteFromCart(s.cartId)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 90px" v-if="cart.length">
      <div style="display: flex; justify-content: space-between">
        <p style="font-weight: 600">Show Name</p>
        <p style="font-weight: 600">Show price</p>
        <p style="font-weight: 600">Quantity Purchased</p>
      </div>
      <div
        v-for="d in cart"
        style="display: flex; justify-content: space-between"
      >
        <p v-if="d.quantity" style="font-weight: 600">{{ d.show_name }}</p>
        <p v-if="d.quantity" style="font-weight: 600">{{ d.price }}</p>
        <p v-if="d.quantity" style="font-weight: 600">{{ d.quantity }}</p>
      </div>
    </div>
    <div
      style="
        display: flex;
        justify-content: end;
        font-size: 20px;
        font-weight: 700;
      "
      v-if="cart.length"
    >
      Total: &nbsp;&nbsp;&nbsp;
      {{ cart.reduce((a, b) => a + Number(b.quantity) * Number(b.price), 0) }}
    </div>
    <div style="margin-top: 100px; padding-bottom: 30px" v-if="cart.length">
      <div style="display: flex; justify-content: center">
        <div class="spinner" v-if="loadingBtn"></div>
      </div>
      <button
        type="button"
        v-if="!loadingBtn"
        style="width: 100%"
        class="btn btn-primary"
        @click="placeOrder"
      >
        Place Order
      </button>
    </div>
  </div>
</template>

<style>
.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  animation: front-loader 4s infinite;
}

.spinner::before,
.spinner::after {
  content: "";
  grid-area: 1/1;
  border: 9px solid;
  border-radius: 50%;
  border-color: #474bff #474bff #0000 #0000;
  mix-blend-mode: darken;
  animation: front-loader 1s infinite linear;
}

.spinner::after {
  border-color: #0000 #0000 #dbdcef #dbdcef;
  animation-direction: reverse;
}

@keyframes front-loader {
  100% {
    transform: rotate(1turn);
  }
}
</style>
