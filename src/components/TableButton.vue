<template>
  <button class="table-button" :class="{ 'disabled-button': disabled }" @click.prevent="onClick">
    {{ title }}
    <v-progress-circular
      v-show="preloader"
      size="14"
      class="preloader-button"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </button>
</template>

<script>
export default {
  name: 'TableButton',
  props: {
    title: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    preloader: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.table-button {
  font-size: 12px;
  font-weight: 500;
  background-color: $base-white;
  color: $base-blue;
  border-radius: 3px;
  border: 1px solid $base-button-border-color;
  padding: 0px 7px;
  margin: 0 9px 0 0;
  height: 20px;
}

.disabled-button {
  color: $base-grey;
  border: 1px solid $base-grey;
  cursor: default;
}

.preloader-button {
  position: relative;
}
</style>
