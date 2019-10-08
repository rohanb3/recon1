<template>
  <div class="total-created-claims-toolbar">
    <quantity-money-select @select="onSelect" />
    <claims-switcher :count-created="filters.countCreated" @select="onSelect" />
  </div>
</template>

<script>
import QuantityMoneySelect from './QuantityMoneySelect';
import ClaimsSwitcher from './ClaimsSwitcher';

export default {
  name: 'TotalCreatedDisputesToolbar',
  components: {
    QuantityMoneySelect,
    ClaimsSwitcher,
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
.total-created-claims-toolbar {
  display: flex;
}
</style>
