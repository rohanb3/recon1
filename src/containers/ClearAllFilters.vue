<template>
  <v-btn small depressed :disabled="false" class="button button-apply" @click="onClearAllFilters">{{
    $t('clear.all.filters')
  }}</v-btn>
</template>

<script>
import { RESET_FILTERS } from '@/store/tables/actionTypes';

export default {
  name: 'ClearAllFilters',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClearAllFilters() {
      this.$store.dispatch(RESET_FILTERS, this.tableName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.button {
  @include button;
  margin: 0;

  &.button-apply {
    margin-right: 40px;
  }
}
</style>
