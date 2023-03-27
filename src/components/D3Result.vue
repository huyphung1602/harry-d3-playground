<template>
  <div id="d3-content" />
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onUpdated } from 'vue';

const props = defineProps({
  userScript: { type: String, default: '' },
})
const applyD3 = (d3 : any) => {
  d3.select("#d3-content").html(null);
  eval(props.userScript);
}

onUpdated(() => {
  applyD3(d3);
})
</script>
