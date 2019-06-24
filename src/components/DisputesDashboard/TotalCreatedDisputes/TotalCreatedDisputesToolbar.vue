<template>
  <div class="total-created-disputes-toolbar">
    <quantity-money-select @select="onSelect" />
    <disputes-switcher :count-created="filters.countCreated" @select="onSelect" />
  </div>
</template>

<script>
import QuantityMoneySelect from './QuantityMoneySelect';
import DisputesSwitcher from './DisputesSwitcher';

export default {
  name: 'TotalCreatedDisputesToolbar',
  components: {
    QuantityMoneySelect,
    DisputesSwitcher,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onSelect(option) {
      this.$emit('select', { ...this.filters, ...option });
    },
  },
};
</script>

<style lang="scss" scoped>
.total-created-disputes-toolbar {
  display: flex;
}
</style>
