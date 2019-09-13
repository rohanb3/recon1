<template>
  <div class="app-content">
    <switcher />
    <router-view></router-view>
  </div>
</template>

<script>
import Switcher from './Switcher';

export default {
  name: 'AppContent',
  components: { Switcher },
};
</script>

<style scoped>
.app-content {
  overflow: hidden;
  padding: 20px;
}
</style>
