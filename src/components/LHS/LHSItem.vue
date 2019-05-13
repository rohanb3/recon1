<template>
  <v-list-tile class="lhs-item" :title="item.title">
    <v-list-tile-action v-if="item.action" :class="{ 'lhs-item-action': !visibleTitle }">
      <v-icon>{{ item.action }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content v-show="visibleTitle">
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'lhs-item',
  props: {
    item: {
      type: Object,
      required: true,
    },
    visibleTitle: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.lhs-item-action {
  min-width: 0;
}
</style>
