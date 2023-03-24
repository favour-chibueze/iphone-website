<template>
  <div>
    <!-- Header section -->
    <header class="container">
      <nav class="navbar">
        <div>
          <img src="@/assets/images/ips-logo.svg" />
        </div>
      </nav>
    </header>

    <!-- Wait list section  -->
    <div class="container wait-list-wrapper">
      <div class="wait-list-form-wrapper">
        <div class="wait-list-badge">New course</div>
        <div>
          <h2 class="wait-list-header">iPhone Photo Academy</h2>
          <p class="wait-list-para">
            Sign up now to get notified <br />
            when this course is available!
          </p>
        </div>
        <div class="wait-list-form">
          <div class="wait-list-input-wrapper">
            <div class="wait-list-input-container">
              <input
                class="wait-list-input"
                type="text"
                placeholder="Enter your Email Address"
              />
            </div>
            <div class="wait-list-form-placeholder--icon">
              <img src="@/assets/images/mail-icon.svg" />
            </div>
          </div>
          <div>
            <button class="ips-btn">Please Notify Me</button>
          </div>
        </div>
      </div>
      <div class="ips-carousel-wrapper">
        <div class="ips-carousel-mockup-wrapper">
          <img src="@/assets/images/iPhone-mokup.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
  @import "@/assets/styles/styles.css"
</style>
