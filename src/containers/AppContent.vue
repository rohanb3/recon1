<template>
  <div class="app-content">
    <types-switcher />
    <router-view></router-view>
  </div>
</template>

<script>
import TypesSwitcher from './TypesSwitcher';

export default {
  name: 'AppContent',
  components: { TypesSwitcher },
};
</script>

<style scoped>
.app-content {
  overflow: hidden;
  padding: 20px;
}
</style>
