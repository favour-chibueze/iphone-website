<template>
  <div class="content">
    <div class="wrapper-1">
      <div class="wrapper-2">
        <h1>Thank you!</h1>
        <p>Thanks for subscribing to our news letter.</p>
        <p>you should receive a confirmation email soon</p>
        <div class="mt-4">
            <router-link to="/" class="ips-btn" @click="submitForm">
              Please Notify Me
            </router-link>
        </div>
      </div>
      <div class="footer-like mt-3">
        <p>
          Email not received?
          <router-link to="/">Click here to send again</router-link>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const query = computed(() => route.query);

    return {
      query,
    };
  },
};
</script>
<style >
    @import "@/assets/styles/successPage.css";
</style>