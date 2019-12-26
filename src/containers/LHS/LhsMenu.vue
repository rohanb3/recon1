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
          <lhs-item
            class="navigation-link"
            :class="{ active: item.routeName === routeName }"
            :item="item"
          ></lhs-item>
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

export default {
  name: 'lhs-menu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  mixins: [LHS],
};
</script>

<style lang="scss">
@import '~@/assets/styles/LHS.scss';
</style>
