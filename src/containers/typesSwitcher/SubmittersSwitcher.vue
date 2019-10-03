<template>
  <types-switcher :options="options" />
</template>

<script>
import { ROUTE_NAMES } from '@/constants';
import TypesSwitcher from '@/containers/typesSwitcher/TypesSwitcher';

export default {
  name: 'OrdersSwitcher',
  components: { TypesSwitcher },
  data() {
    return {
      options: [
        {
          name: ROUTE_NAMES.CLAIMS_BY_SUBMITTERS,
          label: 'Claims',
        },
        {
          name: ROUTE_NAMES.DISPUTES_BY_SUBMITTERS,
          label: 'Disputes',
        },
      ],
    };
  },
};
</script>
