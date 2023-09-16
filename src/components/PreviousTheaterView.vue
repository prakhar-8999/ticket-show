<script setup>
import {reactive, ref} from "vue";
import request from "../request";

const allTheaters = ref([]);
const idForEdit = ref(0);

const editData = reactive({name: "", address: "", image: "", description: ""});

const isEdit = ref(false);

const getTheater = async () => {
  const {data, status} = await request("GET", "addTheater");
  if (status === 200) {
    allTheaters.value = data;
  }
};
getTheater();

const openEditTheater = (id) => {
  console.log(id);
  idForEdit.value = id;
  const data = allTheaters.value.find((each) => each.id === id);
  console.log(JSON.parse(JSON.stringify(data)));
  editData.name = data.name;
  editData.image = data.image;
  editData.address = data.address;
  editData.description = data.description;
  isEdit.value = true;
};
const deleteTheater = async (id) => {
  const {data, status} = await request("DELETE", "addTheater", {id: id}, {});
  if (status === 200) {
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.msg,
      showConfirmButton: false,
      timer: 1500,
    });
    getTheater();
  }
};

const editheater = async (event) => {
  event.preventDefault();
  const {data, status} = await request(
    "PUT",
    "editTheater",
    {},
    {id: idForEdit.value, ...editData}
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
  isEdit.value = false;
  idForEdit.value = 0;
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
            :src="t.image"
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
                @click="() => openEditTheater(t.id)"
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

  <div v-if="isEdit" style="padding-right: 30px; padding-bottom: 2cm">
    <div
      style="display: flex; justify-content: end; margin-top: 5cm"
      @click="isEdit = false"
    >
      <button type="button" class="btn btn-danger">Cancel</button>
    </div>
    <form name="editTheater" @submit="editheater">
      <div class="mb-3">
        <label for="name" class="form-label">Theater Name</label>
        <input
          type="text"
          name="name"
          class="form-control"
          v-model="editData.name"
          id="name"
          :required="true"
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Theater Image Url</label>
        <textarea
          type="text"
          name="image"
          class="form-control"
          v-model="editData.image"
          id="image"
          :required="true"
          rows="4"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Theater Description</label>
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
        <label for="address" class="form-label">Theater Address</label>
        <textarea
          type="text"
          name="address"
          v-model="editData.address"
          :required="true"
          class="form-control"
          id="address"
          rows="4"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        style="width: 100%; margin-top: 50px"
      >
        Edit Theater
      </button>
    </form>
  </div>
</template>
