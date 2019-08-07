<template>
  <nav class="lhs" :class="{ 'tiny-lhs-menu': isTinySidebar }">
    <div class="lhs-header"></div>
    <v-icon class="tiny-sidebar" v-show="isTinySidebar">more_horiz</v-icon>
    <v-list>
      <template v-for="item in navigationLinks">
        <a v-if="item.url" :href="item.url" :key="item.title">
          <lhs-item class="navigation-link" :item="item"></lhs-item>
        </a>
        <router-link
          v-if="item.visible !== false && item.routeName"
          :key="item.title"
          :to="{ name: item.routeName }"
        >
          <lhs-item class="navigation-link" :item="item"></lhs-item>
        </router-link>
      </template>

      <v-list-group
        v-for="item in groupOfItems"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <lhs-item-header :item="item"></lhs-item-header>
        </template>
        <div v-if="item.items">
          <lhs-item v-for="subItem in item.items" :item="subItem" :key="subItem.title"></lhs-item>
        </div>
      </v-list-group>
    </v-list>
  </nav>
</template>

<script>
import LhsItemHeader from '@/components/LHS/LHSItemHeader';
import LhsItem from '@/components/LHS/LHSItem';
import { ROUTE_NAMES } from '@/constants';
import { mapState } from 'vuex';

export default {
  name: 'lhs',
  components: {
    LhsItemHeader,
    LhsItem,
  },
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          action: 'dashboard',
          title: this.$t('disputes.dashboard'),
          routeName: ROUTE_NAMES.DISPUTES_DASHBOARD,
          visible: false,
        },
        {
          action: 'play_arrow',
          title: this.$t('orders'),
          routeName: ROUTE_NAMES.SELECT_ORDER,
        },
        {
          action: 'list_alt',
          title: this.$t('disputes'),
          routeName: ROUTE_NAMES.DISPUTE_LIST,
        },
        {
          action: 'view_list',
          title: this.$t('resubmission.table.title'),
          routeName: ROUTE_NAMES.RESUBMISSION_TABLE,
          visible: false,
        },
        {
          action: 'build',
          title: 'System',
          items: [],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      isTinySidebar: state => state.uiState.tinySidebarStatus,
    }),
    navigationLinks() {
      return this.items.filter(item => item.url || item.routeName);
    },
    groupOfItems() {
      return this.items.filter(item => item.items && item.items.length);
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

$lhs-background-color: #297fb8;
$lhs-text: rgba(255, 255, 255, 0.75);
$lhs-active-group-header-color: #26a69a;
$lhs-active-group-background-color: rgba(0, 0, 0, 0.15);

.lhs {
  .v-list {
    width: 100%;
    background-color: transparent;
    color: $lhs-text;
    padding: 0 10px;
  }

  .tiny-sidebar {
    opacity: 0.6;
  }

  .v-icon {
    color: $lhs-text;
  }

  .v-list__group--active,
  .navigation-link:hover {
    background-color: $lhs-active-group-background-color;
  }

  .v-list__group__header:hover,
  .v-list__group__items .v-list__tile:hover,
  .navigation-link:hover {
    color: $base-white !important;

    .v-icon {
      color: $base-white !important;
    }
  }

  .v-list__group__header--active {
    background-color: $lhs-active-group-header-color;
  }

  .v-list__group__header--active:hover {
    background-color: $lhs-active-group-header-color !important;
  }

  .v-list__group__header__append-icon .v-icon {
    font-size: 16px;
  }

  .v-list__group__header--active .v-list__group__header__append-icon .v-icon {
    transform: rotate(360deg);
  }

  .v-list__group__header__append-icon .v-icon {
    transform: rotate(270deg);
  }

  .v-list__group--active:after,
  .v-list__group--active:before {
    background-color: transparent !important;
  }

  .v-list__group__items--no-action .v-list__tile {
    padding-left: 51px !important;
  }

  .v-list__tile {
    padding: 0 10px;
  }

  .v-list__tile__title {
    font-weight: 500;
    font-size: 13px;
  }
}
</style>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

$lhs-background-color: #297fb8;
$lhs-text: rgba(255, 255, 255, 0.75);
$lhs-active-group-backgound-color: #26a69a;

.lhs {
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: $lhs-width;
  min-width: $lhs-width;

  &.tiny-lhs-menu {
    max-width: $lhs-tiny-width;
    min-width: $lhs-tiny-width;

    .lhs-item-action {
      min-width: 0;
    }

    .list-tile-content {
      display: none;
    }
  }

  a {
    text-decoration: none;
  }
  background-color: $lhs-background-color;
  font-weight: 500;

  .navigation-link {
    color: $lhs-text;

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
}

.lhs-header {
  height: 30px;
}
</style>
