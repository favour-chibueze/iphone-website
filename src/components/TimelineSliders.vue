<template>
  <div class="ips-mockup-slide-wrapper">
      <div class="progress--container">
        <div
          class="progress-bar"
          :class="[`progress-bar-${index}`]"
          v-for="(slide, index) in sliders"
          :key="index"
        ></div>
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