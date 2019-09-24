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
import LHS from '../../mixins/LHS';
import { ROUTE_NAMES } from '@/constants';

export default {
  name: 'disputes',
  mixins: [LHS],
  computed: {
    items() {
      return [
        {
          action: 'dashboard',
          title: this.$t('disputes.dashboard'),
          routeName: ROUTE_NAMES.DISPUTES_DASHBOARD,
        },
        {
          action: 'play_arrow',
          title: this.$t('orders'),
          routeName: ROUTE_NAMES.SELECT_ORDER,
          visible:
            this.isShowOrderWithoutExpectedComission || this.isShowOrderWithExpectedComission,
        },
        {
          action: 'list_alt',
          title: this.$t('disputes'),
          routeName: ROUTE_NAMES.DISPUTE_LIST,
          visible: this.isShowDispute,
        },
        {
          action: 'view_list',
          title: this.$t('resubmission.table.title'),
          routeName: ROUTE_NAMES.RESUBMISSION_TABLE,
          visible: this.isShowResubmissionTable,
        },
        {
          action: 'face',
          title: this.$t('disputes.by.submitters'),
          routeName: ROUTE_NAMES.DISPUTES_BY_SUBMITTERS,
        },
        {
          action: 'build',
          title: 'System',
          items: [],
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/LHS.scss';
</style>
