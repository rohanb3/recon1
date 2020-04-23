<template>
  <div class="main-layout">
    <router-view class="app-header" name="header" />
    <div class="content-and-lhs-wrapper">
      <router-view class="lhs" name="lhs" />
      <router-view class="app-content" name="main" />
    </div>
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
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/basePage.scss';
.main-layout {
  display: flex;
  flex-flow: column;
  min-width: 1300px;
}
.content-and-lhs-wrapper {
  display: flex;
  flex-flow: row;
}
.lhs,
.app-content {
  height: calc(100vh - #{$header-height});
}
.lhs {
  flex-grow: 0;
  flex-shrink: 1;
  z-index: 1;
}
.app-content {
  flex-grow: 1;
  flex-shrink: 1;
  background-color: $content-background-color;
}
</style>
