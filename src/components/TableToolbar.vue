<template>
  <div class="table__header">
    <div class="table-toolbar">
      <div class="table-title">{{ title }}</div>
      <slot name="filters"></slot>
    </div>
    <div class="table-toolbar-info">
      <slot name="toolbar-info"></slot>
      <v-spacer />
      <clear-all-filters :tableName="tableName" />
    </div>
  </div>
</template>

<script>
import ClearAllFilters from '@/containers/ClearAllFilters';

export default {
  name: 'TableToolbar',
  components: { ClearAllFilters },
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

.table-toolbar-info {
  display: flex;
}
</style>
