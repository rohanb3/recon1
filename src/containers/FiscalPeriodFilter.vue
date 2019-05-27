<template>
  <div class="fiscal-period-filter">
    <table-fiscal-period-filter
      :title="$t('choose.fiscal.period')"
      :items="fiscalPeriodList"
      :loading-status="loading"
      boundariesSelector=".disputes-table"
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
