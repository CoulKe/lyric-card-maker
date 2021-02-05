<template>
  <canvas :width="width" :height="height"></canvas>
</template>

<script>
export default {
  name: "Canvas",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  }
};
</script>

<style>
canvas {
  background-color: red;
}
</style>