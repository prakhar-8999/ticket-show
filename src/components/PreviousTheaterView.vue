<script setup>
import request from "../request";
import { ref } from "vue";

const allTheaters = ref([{}]);

const getTheater = async () => {
  const { data, status } = await request("GET", "getTheaters");
  if (status === 200) {
    allTheaters.value = data;
  }
};

const editTheater = (id) => {
  console.log(id);
};
const deleteTheater = async (id) => {
  const { data, status } = await request(
    "POST",
    "deleteTheater",
    {},
    { id: id }
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
  }
};
</script>

<template>
  <div style="margin-top: 2cm; padding-left: 40px; padding-right: 40px">
    <h1>Previous Theater</h1>
    <div class="input-group input-group-lg" style="margin-top: 40px">
      <input
        type="text"
        class="form-control"
        placeholder="Search for theater..."
      />
    </div>
    <div style="margin-top: 40px" class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="t in allTheaters">
        <div class="card">
          <img
            :src="t.url"
            class="card-img-top"
            alt="theater image"
            style="width: 100%; height: 5cm"
          />
          <div class="card-body">
            <h5 class="card-title">{{ t.name }}</h5>
            <p class="card-text">
              {{ t.description }}
            </p>
            <div style="display: flex; justify-content: space-between">
              <button
                type="button"
                class="btn btn-primary"
                @click="() => editTheater(t.id)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="() => deleteTheater(t.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
