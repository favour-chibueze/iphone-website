<template>
  <div class="ips-carousel-mockup-wrapper">
    <img
      src="@/assets/images/FE-test-assets.svg"
      class="ips-camera-pointers img-fluid"
    />
    <img src="@/assets/images/iPhone-mokup.png" />
    <div
      v-for="(slider, index) in slides"
      :key="index"
      :class="`slide-${index} ips-slider-photo`"
    >
      <img
        :src="getPic(slider.largeImg)"
        :alt="slide"
        :class="[`slide-${index}`]"
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      slides: {
        type: Array,
        default: () => [],
        required: true,
      },
    },
    setup() {
      const getPic = (src) => {
        return require(`@/assets/images/${src}`);
      };

      return {
        getPic,
      };
    },
  };
</script>

