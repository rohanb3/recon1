<template>
  <div class="app-header">
    <v-toolbar class="header-toolbar" flat color="primary">
      <div class="image-wrapper">
        <img src="../assets/icons/logo.png" class="logo" />
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down header-toolbar"></v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.app-header {
  font-family: 'Roboto', sans-serif;
  color: $base-white;
  height: 66px;
  border-bottom: 1px solid #333;
}

.header-toolbar {
  background-color: $base-white;
}

.v-toolbar__content {
  justify-content: space-between;
}

.image-wrapper {
  padding: 15px;
}

.logo {
  max-width: 168px;
  max-height: 50px;
  width: 100%;
  height: 100%;
}
</style>
