<template>
  <v-btn class="button" :loading="loading" :disabled="isButtonDisabled" @click="$emit('click')">{{
    $t(title)
  }}</v-btn>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isButtonDisabled() {
      return this.disabled || this.loading;
    },
  },
};
</script>
