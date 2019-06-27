<template>
  <v-btn
    small
    depressed
    :disabled="disabled"
    class="button button-clear"
    @click="$emit('clearSelected')"
    >{{ $t('clear.selected') }}</v-btn
  >
</template>

<script>
export default {
  name: 'ClearButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.button {
  @include button;
  margin: 0 10px 10px;
}
</style>
