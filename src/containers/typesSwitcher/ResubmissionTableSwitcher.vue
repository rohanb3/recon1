<template>
  <types-switcher :options="options" />
</template>

<script>
import { ROUTE_NAMES } from '@/constants';
import TypesSwitcher from '@/containers/typesSwitcher/TypesSwitcher';

export default {
  name: 'ResubmissionTableSwitcher',
  components: { TypesSwitcher },
  data() {
    return {
      options: [
        {
          name: ROUTE_NAMES.CLAIMS_RESUBMISSION,
          label: 'Claims',
        },
        {
          name: ROUTE_NAMES.DISPUTES_RESUBMISSION,
          label: 'Disputes',
        },
      ],
    };
  },
};
</script>
