<template>
  <div class="top-submitter-by-approve-rate disputes-by-submitters-badge">
    <span class="block title-block">{{ $t('top.sumbitter.by.approve.rate') }}</span>
    <span class="block name-block">{{ data.submitterName || '-' }}</span>
    <span class="block percent-block" v-if="data.rate">{{ data.rate }}%</span>
    <span class="block percent-block percent-block-empty" v-else>-</span>
  </div>
</template>

<script>
export default {
  name: 'TopSubmitterByApproveRate',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.top-submitter-by-approve-rate {
  background-color: #d0f0ae;
}
</style>
