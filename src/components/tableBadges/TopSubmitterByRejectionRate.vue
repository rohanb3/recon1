<template>
  <div class="disputes-by-submitters-badge top-submitter-by-rejection-rate">
    <span class="block title-block">{{ $t('top.sumbitter.by.rejection.rate') }}</span>
    <span class="block name-block" v-if="data.submitterName">{{ data.submitterName }}</span>
    <span class="block name-block" v-else>{{ $t('dispute.creator.name') }}</span>
    <span class="block percent-block">{{ data.rate | percents }}</span>
  </div>
</template>

<script>
import dashForEmptyValue from '@/filters/dashForEmptyValue';
import { percents } from '@/filters/numberFormat';

export default {
  name: 'TopSubmitterByRejectionRate',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    dashForEmptyValue,
    percents,
  },
};
</script>

<style scoped lang="scss">
.top-submitter-by-rejection-rate {
  background-color: #f6ccd1;
}
</style>
