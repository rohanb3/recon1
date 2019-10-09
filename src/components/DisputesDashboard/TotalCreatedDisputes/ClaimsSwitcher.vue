<template>
  <div class="disputes-switcher">
    <table-button
      :class="{ active: countCreated }"
      :title="$t('disputes.dashboard.total.created.claims')"
      @click="toggleDisputeStatistic(true)"
    />
    <table-button
      :class="{ active: !countCreated }"
      :title="$t('disputes.dashboard.total.closed.claims')"
      @click="toggleDisputeStatistic(false)"
    />
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

export default {
  name: 'DisputesSwitcher',
  components: {
    TableButton,
  },
  props: {
    countCreated: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleDisputeStatistic(disputeType) {
      this.$emit('select', { countCreated: disputeType });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.disputes-switcher {
  display: flex;
  .table-button {
    margin: 0;
    border-radius: 0;
    text-transform: lowercase;

    &::first-letter {
      text-transform: uppercase;
    }

    &:first-child {
      border-radius: 3px 0 0 3px;
    }

    &:last-child {
      border-radius: 0 3px 3px 0;
    }

    &.active {
      background: $base-blue;
      color: $base-white;
    }
  }
}
</style>
