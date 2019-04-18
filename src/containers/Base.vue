<template>
  <div class="main-layout">
    <div class="content-wrapper">
      <router-view class="app-content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.main-layout {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex-flow: row;
}

.app-content {
  height: calc(100vh);
}

.app-content {
  flex-grow: 1;
  flex-shrink: 1;
  background-color: $content-background-color;
}
</style>
