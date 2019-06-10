<template>
  <div class="disputes-by-submitters-badge top-submitter-by-rejection-rate">
    <span class="block title-block">{{ $t('top.sumbitter.by.rejection.rate') }}</span>
    <span class="block name-block">{{ data.submitterName || '-' }}</span>
    <span class="block percent-block" v-if="data.rate">{{ data.rate }}%</span>
    <span class="block percent-block percent-block-empty" v-else>-</span>
  </div>
</template>

<script>
export default {
  name: 'TopSubmitterByRejectionRate',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.top-submitter-by-rejection-rate {
  background-color: #f6ccd1;
}
</style>
