<template>
  <div class="table__header">
    <div class="table-toolbar">
      <div class="table-title">{{ title }}</div>
      <slot name="filters"></slot>
    </div>
    <selected-range-filter :tableName="tableName" />
  </div>
</template>

<script>
import SelectedRangeFilter from '@/components/SelectedRangeFilter';

export default {
  name: 'TableToolbar',
  components: { SelectedRangeFilter },
  props: {
    title: {
      type: String,
      required: true,
    },
    tableName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.table-toolbar {
  @include table-base-toolbar;
}

.table-title {
  @include table-base-title;
}

.table__header {
  @include table__header;
}
</style>
