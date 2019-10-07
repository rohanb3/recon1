<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      :class="{ active: tab.name === activeTab.name }"
      @click="$emit('changeTab', tab)"
      class="tab"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    activeTab: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.tabs {
  align-items: center;
  border: 1px solid $base-blue;
  border-radius: 5px;
  display: flex;
  font-size: 12px;
  max-width: 200px;
  margin: auto auto 10px auto;

  .tab {
    border-radius: 3px;
    color: $base-blue;
    cursor: pointer;
    padding: 5px 20px;
    text-align: center;
    text-transform: capitalize;
    width: 100%;

    &.active {
      background-color: $base-blue;
      color: $base-white;
    }
  }
}
</style>
