<template>
  <tabs :tabs="tabs" :active-tab="activeTab" @changeTab="changeTab" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Tabs from '../components/Tabs';

export default {
  name: 'TypesSwitcher',
  components: { Tabs },
  computed: {
    ...mapGetters({
      tabs: 'tabs',
      activeTab: 'activeTab',
    }),
  },
  methods: {
    ...mapActions({
      changeTab: 'changeTab',
    }),
  },
};
</script>
