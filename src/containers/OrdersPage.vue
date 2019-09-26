<template>
  <router-view name="content" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OrdersPage',
  computed: {
    ...mapGetters({
      isClaims: 'isClaims',
    }),
  },
};
</script>
