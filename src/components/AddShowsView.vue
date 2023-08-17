<script setup>
import { ref } from "vue";
import request from "../request";

const theaterDropdown = ref([]);

const getTheaterDropDown = async () => {
  const { data, status } = await request("GET", "getTheaters");
  if (status === 200) {
    theaterDropdown.value = data;
  }
};

const addShows = async (event) => {
  event.preventDefault();
  const forms = document.forms;
  const form = forms.addShows;
  const formData = {
    name: form.name.value,
    image: form.image.value,
    description: form.description.value,
    capacity: form.capacity.value,
  };
  console.log(formData);

  const { data, status } = await request("POST", "addShows", {}, formData);
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
        <label for="name" class="form-label">Select Theater</label>
        <select class="form-select" name="name">
          <option selected>Select Theater</option>
          <option :value="op.id" v-for="op in theaterDropdown">
            {{ op.name }}
          </option>
        </select>
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
      <button
        type="submit"
        class="btn btn-primary"
        style="width: 100%; margin-top: 50px"
      >
        Add Show
      </button>
    </form>
  </div>
</template>
