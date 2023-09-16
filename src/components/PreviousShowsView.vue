<script setup>
import {reactive, ref} from "vue";
import request from "../request";

const allTheaters = ref([]);
const shows = ref([]);
const searchData = ref([]);
const selectedTheater = ref("Select Theater");
const isEdit = ref(false);
const editId = ref(0);

const editData = reactive({
  theater_id: "",
  name: "",
  image: "",
  description: "",
  capacity: 0,
  price: 0,
  date: null,
  show_time: null,
});

const performSearch = (value) => {
  const data = shows.value.filter(
    (each) => !each.name.toLowerCase().indexOf(value.toLowerCase())
  );
  searchData.value = data;
};

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

const editshow = async (event) => {
  event.preventDefault();
  const {data, status} = await request(
    "PUT",
    "editShow",
    {},
    {id: editId.value, ...editData}
  );
  if (status === 200) {
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    isEdit.value = false;
    getshows(selectedTheater.value);
  }
};
const deleteShow = async (id) => {
  const {data, status} = await request("DELETE", "addShow", {id: id}, {});
  if (status === 200) {
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    getshows(selectedTheater.value);
  }
};

const openEdit = (id) => {
  console.log(shows);
  const data = shows.value.find((each) => each.theater_id === id);
  editData.theater_id = data.theater_id;
  editData.capacity = data.capacity;
  editData.date = data.date;
  editData.description = data.description;
  editData.image = data.image;
  editData.name = data.name;
  editData.price = data.price;
  editData.show_time = data.show_time;
  isEdit.value = true;
  editId.value = id;
};
</script>

<template>
  <div style="margin-top: 2cm; padding-left: 40px; padding-right: 40px">
    <h1>Previous Shows</h1>
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
            <div style="display: flex; justify-content: space-between">
              <button
                type="button"
                class="btn btn-primary"
                @click="() => openEdit(s.id)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="() => deleteShow(s.id)"
              >
                Delete
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

  <div v-if="isEdit" style="padding-right: 30px; margin-top: 3cm">
    <div style="display: flex; justify-content: end">
      <button type="button" class="btn btn-danger" @click="isEdit = false">
        Cancel
      </button>
    </div>
    <form name="addShows" @submit="editshow">
      <div class="mb-3">
        <label for="theater_id" class="form-label">Select Theater</label>
        <select
          class="form-select"
          name="theater_id"
          v-model="editData.theater_id"
        >
          <option selected disabled>Select Theater</option>
          <option :value="op.id" v-for="op in allTheaters">
            {{ op.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Show Name</label>
        <input
          type="text"
          name="name"
          v-model="editData.name"
          :required="true"
          class="form-control"
          id="name"
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Show Banner Url</label>
        <textarea
          type="text"
          name="image"
          v-model="editData.image"
          class="form-control"
          id="image"
          :required="true"
          rows="4"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Show Description</label>
        <textarea
          type="text"
          name="description"
          v-model="editData.description"
          class="form-control"
          :required="true"
          id="description"
          rows="4"
        />
      </div>
      <div class="mb-3">
        <label for="capacity" class="form-label">Capacity</label>
        <input
          type="number"
          name="capacity"
          :required="true"
          v-model="editData.capacity"
          class="form-control"
          id="capacity"
        />
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Price / person</label>
        <input
          type="number"
          name="price"
          :required="true"
          v-model="editData.price"
          class="form-control"
          id="price"
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Show Date</label>
        <input
          type="date"
          name="date"
          :required="true"
          v-model="editData.date"
          class="form-control"
          id="date"
        />
      </div>
      <div class="mb-3">
        <label for="show_time" class="form-label">Show Time</label>
        <input
          type="time"
          name="show_time"
          v-model="editData.show_time"
          :required="true"
          class="form-control"
          id="show_time"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        style="width: 100%; margin-top: 50px; margin-bottom: 50px"
      >
        Edit Show
      </button>
    </form>
  </div>
</template>
