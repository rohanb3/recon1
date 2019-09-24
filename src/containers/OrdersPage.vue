<template>
  <claims-orders v-if="isClaims" />
  <disputes-orders v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import DisputesOrders from './DisputesOrders';
import ClaimsOrders from './ClaimsOrders';

export default {
  name: 'OrdersPage',
  components: { ClaimsOrders, DisputesOrders },
  computed: {
    ...mapGetters({
      isClaims: 'isClaims',
    }),
  },
};
</script>
