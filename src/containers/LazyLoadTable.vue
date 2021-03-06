<template>
  <div>
    <wombat-table
      :items="tableRows"
      :columns="tableColumns"
      :infinite-loading="!allItemsLoaded"
      :item-key-name="itemKeyName"
      :loading-items="loading"
      :name="tableNameLowerCase"
      @bottomReached="checkAndLoadItems"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
      horisontalScroll
    >
      <component
        slot="header-cell"
        slot-scope="headerCell"
        class="header-cell"
        :is="
          headerComponentsHash[headerCell.column.fieldHeaderType] || headerComponentsHash.default
        "
        :column="headerCell.column"
        :sortingField="sortingField"
        :sortDirection="sortDirection"
        :table-name="tableName"
        @sortDirectionChanged="onSortDirectionChanged"
      />
      <div slot="row" slot-scope="row" :class="{ blurred: applyingFilters }">
        <wombat-row :item="row.item" :columns="row.columns" :height="row.item.height">
          <slot
            name="row-cell"
            slot="row-cell"
            slot-scope="rowCell"
            :column="rowCell.column"
            :item="rowCell.item"
          />
        </wombat-row>
      </div>
      <table-loader v-if="loading" slot="loader" />
    </wombat-table>
    <v-progress-circular
      v-if="applyingFilters"
      class="big-spinner"
      :size="70"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';

import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';

import CommissionHeaderCell from '@/containers/CommissionHeaderCell';

export default {
  name: 'LazyLoadTable',
  components: {
    WombatTable,
    WombatRow,
    TableLoader,
    DefaultHeaderCell,
    SortingHeaderCell,
    CommissionHeaderCell,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  props: {
    tableName: {
      type: String,
      required: true,
    },
    itemKeyName: {
      type: String,
      default: 'id',
    },
    initialLoad: {
      type: Boolean,
      default: true,
    },
    resetDataBeforeLeave: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
        sortingHeader: 'SortingHeaderCell',
        commissionHeader: 'CommissionHeaderCell',
      },
    };
  },
};
</script>
