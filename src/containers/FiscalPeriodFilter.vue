<template>
  <div class="fiscal-period-filter">
    <table-fiscal-period-filter
      :title="$t('choose.fiscal.period')"
      :items="fiscalPeriodListWithSelected"
      :loading-status="loading"
      :boundariesSelector="boundariesSelector"
      @selectFiscalPeriod="handleFiscalPeriod"
    />
  </div>
</template>

<script>
import TableFiscalPeriodFilter from '@/components/TableFiscalPeriodFilter/TableFiscalPeriodFilter';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { FILTER_NAMES } from '@/constants';
import { getFiscalPeriods } from '@/services/ordersRepository';

export default {
  name: 'FiscalPeriodFilter',
  components: {
    TableFiscalPeriodFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
    boundariesSelector: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.loadFiscalPeriodList();
  },
  data() {
    return {
      loading: false,
      fiscalPeriodList: [],
    };
  },
  computed: {
    fiscalPeriodListWithSelected() {
      return this.fiscalPeriodList.map(fiscalPeriod => {
        console.log(this.fiscalPeriodId, fiscalPeriod.id === this.fiscalPeriodId);
        if (fiscalPeriod.id === this.fiscalPeriodId) {
          return { ...fiscalPeriod, selected: true };
        }
        return fiscalPeriod;
      });
    },
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    fiscalPeriodId() {
      return this.filters[FILTER_NAMES.FISCAL_PERIOD_ID];
    },
  },
  methods: {
    loadFiscalPeriodList() {
      this.loading = true;
      getFiscalPeriods()
        .then(data => {
          this.fiscalPeriodList = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleFiscalPeriod(fiscalPeriodId) {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.CREATED_FROM,
            value: '',
          },
          {
            name: FILTER_NAMES.CREATED_TO,
            value: '',
          },
          {
            name: FILTER_NAMES.FISCAL_PERIOD_ID,
            value: fiscalPeriodId,
          },
        ],
      };

      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>

<style lang="scss" scoped>
.fiscal-period-filter {
  margin-right: 5px;
}
</style>
