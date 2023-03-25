
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
          <base-input
            v-model:modelValue="email"
            type="text"
            label="Enmail"
            :formError="formError"
          />
          <div>
            <button class="ips-btn" @click="submitForm">
              Please Notify Me
            </button>
          </div>
        </div>
      </div>
      <div
        class="ips-carousel-wrapper position-relative col-md-6 col-md-6 col-sm-12 col-xs-12 col-lg-6"
      >
        <div class="ips-carousel-mockup-wrapper">
          <img
            src="@/assets/images/FE-test-assets.svg"
            class="ips-camera-pointers img-fluid"
          />
          <img src="@/assets/images/iPhone-mokup.png" />
          <div
            v-for="(slider, index) in carouselSlider"
            :key="index"
            :class="`slide-${index} ips-slider-photo`"
          >
            <img
              :src="getPic(slider.largeImg)"
              alt="slide"
              :class="[`slide-${index}`]"
            />
          </div>
        </div>
        <div class="ips-mockup-small">
          <img
            :src="
              getPrevSlidePic(
                sliders?.[previousSlideIndex - 1]?.largeImg ||
                  'carousel-photo-02.jpg'
              )
            "
          />
        </div>
        <div class="ips-mockup-slide-wrapper">
          <div class="row justify-content-around align-items-center mt-4">
            <div
              class="ips-mockup-slide position-relative"
             
              v-for="(slide, index) in sliders"
              :key="index"
            >
              <div class="w-full" :class="[`slide_${index}`]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import BaseInput from "@/components/BaseInput.vue";

export default {
  components: {
    BaseInput,
  },
  setup() {
    const state = reactive({
      email: "",
      formError: "",
      formValid: false,

      sliders: [
        {
          largeImg: "carousel-photo-03@2x.jpg",
          active: true,
        },
        {
          largeImg: "carousel-photo-04.jpg",
          active: false,
        },
        {
          largeImg: "carousel-photo-01@2x.jpg",
          active: false,
        },
        {
          largeImg: "carousel-photo-02.jpg",
          active: false,
        },
      ],
      activeIndex: 0,
    });

    const router = useRouter();

    const previousSlideIndex = computed(() => {
      return state.activeIndex - 1 < 0
        ? state.sliders.length - 1
        : state.activeIndex - 1;
    });

    const carouselSlider = computed(() => {
      return state.sliders.filter((slider) => !!slider.active);
    });

    const validateEmail = () => {
      const isValid = /\S+@\S+\.\S+/.test(state.email);
      if (!state.email) {
        state.formError = "Enter your Email Address";
        state.formValid = false;
      } else if (!isValid) {
        state.formError = "Please enter a valid email";
        state.formValid = false;
      } else {
        state.formError = "";
        state.formValid = true;
      }
    };

    watch(() => state.email, validateEmail);

    const submitForm = () => {
      validateEmail();
      if (!state.formValid) {
        return;
      }
      router.push({ path: "/success-page", query: { email: state.email } });
    };

    const playSlideshow = () => {
      state.sliders.forEach((slider, index) => {
        if (index === state.activeIndex) {
          slider.active = true;
        } else {
          slider.active = false;
        }
      });

      gsap.to(`.slide-${state.activeIndex}`, {
        duration: 1,
        opacity: 1,
        onComplete: () => {
          state.activeIndex = (state.activeIndex + 1) % state.sliders.length;
        },
      });
      gsap.to(`.slide-${state.activeIndex}`, {
        duration: 8,
        delay: 0,
        opacity: 1,
      });
      gsap.to(".progress", {
        duration: 8,
        width: "100%",
        onComplete: () => {
          gsap.set(".progress", { width: 0 });
          playSlideshow();
        },
      });
    };

    const getPic = (src) => {
      return require(`@/assets/images/${src}`);
    };

    const getPrevSlidePic = (src) => {
      return require(`@/assets/images/${src}`);
    };

    onMounted(() => {
      playSlideshow();
    });

    return {
      submitForm,
      getPic,
      getPrevSlidePic,
      carouselSlider,
      previousSlideIndex,
      ...toRefs(state),
    };
  },
};
</script>

<style>
@import "@/assets/styles/home.css";
</style>



