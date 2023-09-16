<script setup>
import { ref } from "vue";
import request from "../request";

const theaterDropdown = ref([]);

const getTheaterDropDown = async () => {
  const { data, status } = await request("GET", "addTheater");
  if (status === 200) {
    theaterDropdown.value = data;
  }
};
getTheaterDropDown()

const addShows = async (event) => {
  event.preventDefault();
  const forms = document.forms;
  const form = forms.addShows;
  const formData = {
    theater_id: form.theater_id.value,
    name: form.name.value,
    image: form.image.value,
    description: form.description.value,
    capacity: Number(form.capacity.value),
    price: form.price.value,
    date: form.date.value,
    show_time: form.show_time.value
  };
  console.log(formData);

  const { data, status } = await request("POST", "addShow", {}, formData);
  if (status === 200) {
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
  }
};
</script>
<template>
  <div style="margin-top: 2cm; padding-left: 40px; padding-right: 40px">
    <h1>Add Shows</h1>
    <br /><br />
    <form name="addShows" @submit="addShows">
      <div class="mb-3">
        <label for="theater_id" class="form-label">Select Theater</label>
        <select class="form-select" name="theater_id">
          <option selected disabled>Select Theater</option>
          <option :value="op.id" v-for="op in theaterDropdown">
            {{ op.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Show Name</label>
        <input
          type="text"
          name="name"
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
          class="form-control"
          id="price"
        />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Show Date</label>
        <input
          type='date'
          name="date"
          :required="true"
          class="form-control"
          id="date"
        />
      </div>
      <div class="mb-3">
        <label for="show_time" class="form-label">Show Time</label>
        <input
          type='time'
          name="show_time"
          :required="true"
          class="form-control"
          id="show_time"
        />
      </div>
      
      <button
        type="submit"
        class="btn btn-primary"
        style="width: 100%; margin-top: 50px; margin-bottom: 50px;"
      >
        Add Show
      </button>
    </form>
  </div>
</template>
