<script setup>
import {ref} from "vue";
import request from "../request";

const allTheaters = ref([]);
const shows = ref([]);
const searchData = ref([]);
const selectedTheater = ref("Select Theater");

const getTheater = async () => {
  const {data, status} = await request("GET", "addTheater");
  if (status === 200) {
    allTheaters.value = data;
  }
};
getTheater();

const getshows = async (id) => {
  const {data, status} = await request("GET", "addShow", {id: id});
  if (status === 200) {
    shows.value = data;
    searchData.value = data;
  }
};

const performSearch = (value) => {
  const data = shows.value.filter(
    (each) => !each.name.toLowerCase().indexOf(value.toLowerCase())
  );
  searchData.value = data;
};

const addToCart = async (id) => {
  const {data, status} = await request(
    "POST",
    "addTicketToCart",
    {},
    {show_id: id}
  );
  if (status === 200) {
    getshows(selectedTheater.value);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
</script>
<template>
  <div style="margin-top: 2cm; padding-left: 40px; padding-right: 40px">
    <h1>Buy Ticket</h1>
    <div class="input-group input-group-lg" style="margin-top: 40px">
      <select
        class="form-select"
        name="name"
        v-model="selectedTheater"
        @change="(e) => getshows(e.target.value)"
      >
        <option selected disabled>Select Theater</option>
        <option :value="op.id" v-for="op in allTheaters">
          {{ op.name }}
        </option>
      </select>
    </div>
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
            <div style="display: flex; justify-content: space-between">
              <h5 class="card-title">{{ s.name }}</h5>
              <h5 class="card-title">price : {{ s.price }}/p</h5>
            </div>

            <p class="card-text">
              {{ s.description }}
            </p>
            <p class="card-text">Capacity : {{ s.capacity }}</p>
            <p class="card-text">Date : {{ s.date }}</p>
            <p class="card-text">Time : {{ s.show_time }}</p>

            <div style="margin-top: 30px">
              <button
                type="button"
                style="width: 100%"
                class="btn btn-primary"
                @click="() => addToCart(s.id)"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      style="display: flex; justify-content: center"
      v-if="selectedTheater !== 'Select Theater' && searchData.length === 0"
    >
      <p style="color: red; font-size: xx-large; font-weight: 600">
        No Shows Available
      </p>
    </div>
  </div>

  <div style="margin-top: 40px" v-if="selectedTheater !== 'Select Theater'">
    <div style="display: flex; justify-content: end; padding-right: 40px">
      <button type="button" class="btn btn-primary">
        Show Theater Preview
      </button>
    </div>
  </div>
</template>
