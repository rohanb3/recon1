<template>
  <div class="dispute-button-cell">
    <table-button class="disput-button brown-blue" :title="$t('confirm')" />
    <table-button class="disput-button" :title="$t('resubmit')" />
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

export default {
  name: 'XYZStatusCell',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    TableButton,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.dispute-button-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .approved-dispute {
    color: $base-red;
    font-weight: 500;
  }

  .disput-button {
    line-height: 0;
    &.brown-blue {
      color: $base-white;
      background: $base-blue;
    }
  }
}
</style>
