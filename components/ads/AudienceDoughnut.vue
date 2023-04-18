<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

const props = defineProps(['data', 'options']);

const donutData = {
  labels:
    props.data.length > 0
      ? props.data.map((el: any) => el._id.gender)
      : ['No Content'],
  datasets: [
    {
      backgroundColor:
        props.data.length > 0
          ? ['#673692', '#9a79b6', '#00D8FF', '#DD1B16']
          : ['grey'],
      data: props.data.length > 0 ? props.data.map((el: any) => el.count) : [1]
    }
  ]
};

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false
};

ChartJS.register(ArcElement, Tooltip, Legend);
</script>

<template>
  <Doughnut :data="donutData" :options="donutOptions" />
</template>

<style lang="scss"></style>
