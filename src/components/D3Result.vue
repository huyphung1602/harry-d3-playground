<template>
  <div class="d3-content h-full" />
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onUpdated } from 'vue';

const props = defineProps({
  userScript: { type: String, default: '' },
})
const applyD3 = (d3 : any) => {
  try {
    d3.select(".d3-content").html(null);
    eval(props.userScript);
  } catch (error) {
    console.log(error);
  }
}

onUpdated(() => {
  applyD3(d3);
})
</script>
