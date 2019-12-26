<template>
  <div class="content-and-lhs-wrapper">
    <router-view class="lhs" name="lhs" />
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContent',
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.app-main {
  overflow: hidden;
  padding: 20px;
  flex: 1;
}

.lhs {
  flex-grow: 0;
  flex-shrink: 1;
  z-index: 1;
}
.content-and-lhs-wrapper {
  flex-grow: 1;
  flex-shrink: 1;
  background-color: $content-background-color;
}
</style>
