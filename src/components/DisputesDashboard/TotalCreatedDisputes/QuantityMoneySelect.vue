<template>
  <div class="quantity-money-select">
    <table-filter
      title
      boundaries-selector=".dispute-bar-chart"
      :items="options"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="onSelect"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';

export default {
  name: 'QuantityMoneySelect',
  components: {
    TableFilter,
  },
  data() {
    return {
      options: [
        {
          id: true,
          name: this.$t('quantity'),
          selected: true,
        },
        {
          id: false,
          name: this.$t('money'),
        },
      ],
    };
  },
  methods: {
    onSelect(option) {
      this.toggleOptions(option.itemKeyVal);
      this.$emit('select', { countQyt: option.itemKeyVal });
    },
    toggleOptions(optionId) {
      this.options = this.options.map(option => {
        if (optionId === option.id) {
          return { ...option, selected: true };
        }
        return { ...option, selected: false };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.quantity-money-select /deep/ {
  .table-filter {
    border-radius: 3px;
    margin-right: 26px;
  }
}
</style>
