<script setup>
import request from "../request";
const generateReport = async () => {
  const {data, status} = await request("GET", "report");
  if (status === 200) {
    console.log(data);
  }
};
</script>
<template>
  <div style="margin-top: 100px; padding-right: 40px">
    <div class="card">
      <div class="card-header">REPORT</div>
      <div class="card-body">
        <h5 class="card-title">Ticket Report</h5>
        <p class="card-text">
          Kindly click the button below to generate the report.
        </p>
        <button type="button" class="btn btn-primary" @click="generateReport">
          Generate Report
        </button>
      </div>
    </div>
  </div>
</template>
