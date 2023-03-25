<template>
  <div
    class="wait-list-input-wrapper"
    :class="[emailError ? 'form-input-error' : null]"
  >
    <div class="wait-list-input-container">
      <input
        class="wait-list-input"
        type="email"
        placeholder=" "
        :value="modelValue"
        @input="updateValue"
      />
      <label
        for="wait-list-input"
        :class="[emailError ? 'form-text-error' : null]"
        >{{ emailError ? emailError : "Enter your Email Address" }}</label
      >
    </div>
    <div class="wait-list-form-placeholder--icon">
      <img src="@/assets/images/mail-icon.svg" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    emailError: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const inputValue = ref(props.value);

    const updateValue = (event) => {
      emit("update:modelValue", event.target.value);
    };

    return {
      inputValue,
      updateValue,
    };
  },
};
</script>
