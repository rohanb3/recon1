<template>
  <tabs :tabs="options" :active-tab="activeTab" @changeTab="changeTab" />
</template>

<script>
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
      this.activeTab = tab;
      this.$router.push({ name: tab.name });
    },
  },
};
</script>
