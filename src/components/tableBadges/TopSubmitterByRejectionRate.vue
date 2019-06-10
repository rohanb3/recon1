<template>
  <div class="disputes-by-submitters-badge top-submitter-by-rejection-rate">
    <span class="block title-block">{{ $t('top.sumbitter.by.rejection.rate') }}</span>
    <span class="block name-block">{{ data.submitterName }}</span>
    <span class="block percent-block">{{ data.rate }}%</span>
  </div>
</template>

<script>
export default {
  name: 'TopSubmitterByApproveRate',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.top-submitter-by-rejection-rate {
  background-color: #f6ccd1;
}
</style>
