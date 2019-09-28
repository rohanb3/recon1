<template>
  <div class="main-layout">
    <router-view class="app-header" name="header" />
    <router-view class="app-content" name="main" />
    <router-view name="syncNotifier" />
    <notifications group="notifications" />
  </div>
</template>

<script>
export default {
  name: 'Base',
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/basePage.scss';
.main-layout {
  display: flex;
  flex-flow: column;
  min-width: 1300px;
}
.app-content {
  display: flex;
  flex-flow: row;
}
</style>
