<template>
  <tabs :tabs="options" :active-tab="activeTab" @changeTab="changeTab" />
</template>

<script>
import isEqual from 'lodash.isequal';
import Tabs from '@/components/Tabs';

export default {
  name: 'TypesSwitcher',
  components: { Tabs },
  props: ['options'],
  data() {
    return {
      activeTab: this.getActiveTab(),
    };
  },

  methods: {
    getActiveTab() {
      return this.options.find(option => option.name === this.$router.currentRoute.name);
    },
    changeTab(tab) {
      if (!isEqual(tab, this.activeTab)) {
        this.activeTab = tab;
        this.$router.push({ name: tab.name });
      }
    },
  },
};
</script>
