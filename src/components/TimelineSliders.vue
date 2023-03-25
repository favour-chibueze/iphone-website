<template>
  <div class="ips-mockup-slide-wrapper">
    <div class="row justify-content-around align-items-center mt-4">
      <div class="progress--container">
        <div
          class="progress-bar"
          v-for="(slide, index) in sliders"
          :key="index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sliders: {
      type: Array,
      default: () => [],
      required: true,
    },
  }
};
</script>