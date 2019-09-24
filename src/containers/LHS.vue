<template>
  <lhs-claims v-if="isClaims" />
  <lhs-disputes v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import LhsClaims from '@/containers/LHS-Claims';
import LhsDisputes from '@/containers/LHS-Disputes';

export default {
  name: 'lhs',
  components: { LhsDisputes, LhsClaims },
  computed: {
    ...mapGetters(['isClaims']),
  },
};
</script>
