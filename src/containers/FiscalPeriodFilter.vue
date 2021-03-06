<template>
  <div class="fiscal-period-filter">
    <table-fiscal-period-filter
      :title="$t('choose.fiscal.period')"
      :items="fiscalPeriodListWithSelected"
      :loading-status="loading"
      :boundariesSelector="`.${getTableName}-table`"
      @selectFiscalPeriod="handleFiscalPeriod"
      @clearFiscalPeriod="onClearFiscalPeriod"
    />
  </div>
</template>

<script>
import TableFiscalPeriodFilter from '@/components/TableFiscalPeriodFilter/TableFiscalPeriodFilter';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { FILTER_NAMES } from '@/constants';
import { getFiscalPeriods } from '@/services/ordersRepository';
import contextRageFilterData from '@/mixins/contextRageFilterData';

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
  },
  mixins: [contextRageFilterData],
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
    getTableName() {
      return this.tableName.toLowerCase();
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
      const fiscalPeriod = this.fiscalPeriodList.find(fp => fp.id === fiscalPeriodId);
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: this.fromFilterName,
            value: '',
          },
          {
            name: this.toFilterName,
            value: '',
          },
          {
            name: FILTER_NAMES.FISCAL_PERIOD_ID,
            value: fiscalPeriodId,
          },
          {
            name: FILTER_NAMES.FISCAL_PERIOD_TO,
            value: fiscalPeriod.name,
          },
        ],
      };

      this.$store.dispatch(APPLY_FILTERS, data);
    },
    onClearFiscalPeriod() {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.FISCAL_PERIOD_ID,
            value: null,
          },
          {
            name: FILTER_NAMES.FISCAL_PERIOD_TO,
            value: '',
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
