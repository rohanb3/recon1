<template>
  <div class="app-header">
    <v-toolbar class="header-toolbar" flat>
      <div class="image-wrapper">
        <img src="../assets/icons/logo.png" class="logo" />
      </div>
      <v-icon class="toggle-menu-button" @click="toggleSidebar">menu</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down header-toolbar">
        <header-user-menu />
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import HeaderUserMenu from '@/containers/HeaderUserMenu';
import { SET_TINY_SIDEBAR_STATUS } from '@/store/ui-state/mutationTypes';
import { mapState } from 'vuex';

export default {
  name: 'AppHeader',
  components: {
    HeaderUserMenu,
  },
  computed: {
    ...mapState({
      isTinySidebar: state => state.uiState.tinySidebarStatus,
    }),
  },
  methods: {
    toggleSidebar() {
      this.$store.commit(SET_TINY_SIDEBAR_STATUS, !this.isTinySidebar);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/popover.scss';
</style>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.toggle-menu-button {
  color: $base-blue;

  &:hover {
    color: $base-black;
  }
}

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
