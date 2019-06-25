<template>
  <div class="top-submitter-by-approve-rate disputes-by-submitters-badge">
    <span class="block title-block">{{ $t('top.sumbitter.by.approve.rate') }}</span>
    <span class="block name-block" v-if="data.submitterName">{{ data.submitterName }}</span>
    <span class="block name-block" v-else>{{ $t('dispute.creator.name') }}</span>
    <span class="block percent-block">{{ data.rate | percents }}</span>
  </div>
</template>

<script>
import dashForEmptyValue from '@/filters/dashForEmptyValue';
import { percents } from '@/filters/numberFormat';

export default {
  name: 'TopSubmitterByApproveRate',
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
.top-submitter-by-approve-rate {
  background-color: #d0f0ae;
}
</style>
