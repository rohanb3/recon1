<template>
  <v-dialog v-model="value" persistent max-width="700">
    <v-card class="commission-popup">
      <div class="popup-header">
        <div class="information">
          <h1 class="title">{{ $t('received.commission.details') }}</h1>
          <div class="commission-popup-info">
            <p>{{ $t('orders.account.number') }}: {{ data.accountNumber }}</p>
            <p>{{ $t('dispute.customer.name') }}: {{ data.customerName }}</p>
          </div>
        </div>
        <v-btn :icon="true" @click="$emit('input', false)">
          <v-icon>close</v-icon>
        </v-btn>
      </div>

      <lazy-load-table :table-name="tableName" :initialLoad="false">
        <component
          slot="row-cell"
          slot-scope="rowCell"
          class="row-cell"
          :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
          :item="rowCell.item"
          :column="rowCell.column"
          :filter="rowCell.column.filter"
          :scopes="scopes"
        />
      </lazy-load-table>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import LazyLoadTable from '../containers/LazyLoadTable';
import { TABLE_NAMES } from '@/constants';

import DefaultCell from '@/components/tableCells/DefaultCell';
import OrderAgeCell from '@/components/tableCells/OrderAgeCell';
import OrderNumberCell from '@/components/tableCells/OrderNumberCell';
import DateYearMonthDayCell from '@/components/tableCells/DateYearMonthDayCell';
import PriceCell from '@/components/tableCells/PriceCell';
import InstallationAgeCell from '@/components/tableCells/InstallationAgeCell';

export default {
  name: 'CommissionPopup',
  components: {
    LazyLoadTable,
    DefaultCell,
    OrderAgeCell,
    OrderNumberCell,
    DateYearMonthDayCell,
    PriceCell,
    InstallationAgeCell,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      rowComponentsHash: {
        default: 'DefaultCell',
        creationAge: 'OrderAgeCell',
        orderNumber: 'OrderNumberCell',
        installationAgeCell: 'InstallationAgeCell',
        dateYearMonthDay: 'DateYearMonthDayCell',
        price: 'PriceCell',
      },
    };
  },
  computed: {
    ...mapGetters(['tableData', 'storageData', 'scopes']),
    tableName() {
      return TABLE_NAMES.RECEIVED_COMMISSION;
    },
    data() {
      return this.storageData(this.tableName);
    },
  },
};
</script>

<style lang="scss" scoped>
.commission-popup {
  padding: 20px;

  .popup-header {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-weight: bold;
    margin-bottom: 20px;
  }

  &-info {
    font-size: 14px;

    p {
      margin-bottom: 15px;
    }
  }
}
</style>
