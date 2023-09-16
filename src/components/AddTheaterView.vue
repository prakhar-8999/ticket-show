<script setup>
import request from "../request";

const addTheater = async (event) => {
  event.preventDefault();
  const forms = document.forms;
  const form = forms.addTheater;
  const formData = {
    name: form.name.value,
    image: form.image.value,
    description: form.description.value,
    address: form.address.value,
  };
  console.log(formData);

  const {data, status} = await request("POST", "addTheater", {}, formData);
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
    <h1>Add Theater</h1>
    <br /><br />
    <form name="addTheater" @submit="addTheater">
      <div class="mb-3">
        <label for="name" class="form-label">Theater Name</label>
        <input
          type="text"
          name="name"
          class="form-control"
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
        Add Theater
      </button>
    </form>
  </div>
</template>
