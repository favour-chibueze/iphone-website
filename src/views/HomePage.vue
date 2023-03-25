
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
            <IpsButton @submit-form="submitForm"> Please Notify Me </IpsButton>
          </div>
        </div>
      </div>
      <div
        class="ips-carousel-wrapper position-relative col-md-6 col-md-6 col-sm-12 col-xs-12 col-lg-6"
      >
        <caraousel-sliders :slides="carouselSlider" @get-pic="getPic" />

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
        <timeline-sliders :sliders="sliders" />
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import BaseInput from "@/components/BaseInput.vue";
import IpsButton from "@/components/IpsButton.vue";
import CaraouselSliders from "@/components/CaraouselSliders.vue";
import TimelineSliders from "@/components/TimelineSliders.vue";

export default {
  components: {
    BaseInput,
    IpsButton,
    CaraouselSliders,
    TimelineSliders,
  },
  setup() {
    const state = reactive({
      email: "",
      formError: "",
      formValid: false,

      sliders: [
        {
          largeImg: "slide-1-resized.jpeg",
          active: true,
        },
        {
          largeImg: "carousel-photo-04.jpg",
          active: false,
        },
        {
          largeImg: "slide-2.jpeg", //l
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
        duration: 0,
        opacity: 1,
        onComplete: () => {
          state.activeIndex = (state.activeIndex + 1) % state.sliders.length;
        },
      });
      gsap.to(".progress", {
        duration: 8,
        onComplete: () => {
          gsap.set(".progress", { width: 0 });
          playSlideshow();
        },
      });
    };

    const getPrevSlidePic = (src) => {
      return require(`@/assets/images/${src}`);
    };

    onMounted(() => {
      playSlideshow();

      const progress = Array.from(document.querySelectorAll(".progress-bar"));

      const playNext = (e) => {
        const current = e && e.target;
        let next;

        if (current) {
          const currentIndex = progress.indexOf(current);
          if (currentIndex < progress.length) {
            next = progress[currentIndex + 1];
          }
          current.classList.remove("active");
          current.classList.add("passed");
        }

        if (!next) {
          progress.map((el) => {
            el.classList.remove("active");
            el.classList.remove("passed");
          });
          next = progress[0];
        }
        next.classList.add("active");
      };

      progress.map((el) => {
        el.addEventListener("animationend", playNext, false);
      });

      playNext();
    });

    return {
      submitForm,
      getPrevSlidePic,
      carouselSlider,
      previousSlideIndex,
      ...toRefs(state),
    };
  },
};
</script>



