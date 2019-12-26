<template>
  <div class="control-buttons">
    <v-btn
      small
      depressed
      class="button button-apply"
      :disabled="isSelectedRangeDisabled"
      @click.stop="$emit('applyRange')"
      >{{ $t('apply') }}</v-btn
    >
    <v-btn
      small
      depressed
      :disabled="isClearButtonDisabled"
      class="button button-clear"
      @click.stop="$emit('clearRange')"
      >{{ $t('clear.fields') }}</v-btn
    >
  </div>
</template>

<script>
import { notEmpty } from '@/services/utils';

export default {
  name: 'ControlButtons',
  props: {
    from: {
      required: true,
    },
    to: {
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isClearButtonDisabled() {
      return (
        !(notEmpty(this.from) || notEmpty(this.to)) &&
        !(notEmpty(this.selected.from) || notEmpty(this.selected.to))
      );
    },
    isSelectedRangeDisabled() {
      return !!this.error || (!notEmpty(this.from) && !notEmpty(this.to));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.control-buttons {
  display: flex;
  flex-direction: column;

  .button {
    @include button;

    &.button-apply {
      margin: 5px 0;
    }

    &.button-clear {
      margin: 5px 0 10px 0;
    }
  }
}
</style>
