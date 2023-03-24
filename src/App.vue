<template>
  <div>
    <!-- Header section -->
    <header class="app-container">
      <nav class="navbar">
        <div>
          <img src="@/assets/images/ips-logo.svg" />
        </div>
      </nav>
    </header>

    <!-- Wait list section  -->
    <div class="app-container wait-list-wrapper row">
      <div class="wait-list-form-wrapper col-md-6 col-sm-12 col-xs-12 col-lg-6">
        <div class="wait-list-badge">New course</div>
        <div>
          <h2 class="wait-list-header">iPhone Photo Academy</h2>
          <p class="wait-list-para">
            Sign up now to get notified <br />
            when this course is available!
          </p>
        </div>
        <div class="wait-list-form">
          <div
            class="wait-list-input-wrapper"
            :class="[emailError ? 'form-input-error' : null]"
          >
            <div class="wait-list-input-container">
              <input
                class="wait-list-input"
                type="text"
                placeholder=" "
                v-model="email"
              />
              <label
                for="wait-list-input"
                :class="[emailError ? 'form-text-error' : null]"
                >{{
                  emailError ? emailError : "Enter your Email Address"
                }}</label
              >
            </div>
            <div class="wait-list-form-placeholder--icon">
              <img src="@/assets/images/mail-icon.svg" />
            </div>
          </div>
          <div>
            <button class="ips-btn" @click="submitForm">
              Please Notify Me
            </button>
          </div>
        </div>
      </div>
      <div class="ips-carousel-wrapper col-md-6 col-md-6 col-sm-12 col-xs-12 col-lg-6">
        <div class="ips-carousel-mockup-wrapper">
          <img src="@/assets/images/iPhone-mokup.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, watch } from "vue";

export default {
  setup() {
    const state = reactive({
      email: "",
      emailError: "",
      formValid: false,
    });

    const validateEmail = () => {
      const isValid = /\S+@\S+\.\S+/.test(state.email);
      if (!state.email) {
        state.emailError = "Enter your Email Address";
        state.formValid = false;
      } else if (!isValid) {
        state.emailError = "Please enter a valid email";
        state.formValid = false;
      } else {
        state.emailError = "";
        state.formValid = true;
      }
    };

    const submitForm = () => {
      validateEmail()
      if (!state.formValid) {
        console.log("Form Error");
      } else {
        console.log("Form submitted");
      }
    };

    watch(() => state.email, validateEmail);

    return {
      submitForm,
      ...toRefs(state),
    };
  },
};
</script>

<style>
@import "@/assets/styles/styles.css";
</style>
