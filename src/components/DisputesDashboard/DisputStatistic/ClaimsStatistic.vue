<template>
  <v-container fluid class="disput-statistic">
    <v-layout row>
      <v-flex>
        <p class="table-name">{{ title }}</p>
      </v-flex>
    </v-layout>
    <v-layout class="statistic" fluid>
      <div class="table-wrapper">
        <div class="table-header">
          <v-layout row>
            <v-flex>{{ $t(subTitle) }}</v-flex>
            <v-flex>
              <div class="table-header-label">{{ $t('total.quantity') }}</div>
              <p>{{ totalStatistics.totalQuantity }}</p>
            </v-flex>
            <v-flex>
              <div class="table-header-label">{{ $t('percentage') }}</div>
              <p>{{ totalStatistics.percent | percents }}</p>
            </v-flex>
          </v-layout>
        </div>
        <claims-section-statistics :statistics="statistics" />
      </div>
      <div class="pie-chart-wrapper">
        <claims-chart :statistics="statistics" />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { percents } from '@/filters/numberFormat';
import ClaimsSectionStatistics from './ClaimsSectionStatistics';
import ClaimsChart from './ClaimsChart';

export default {
  name: 'ClaimsStatistic',
  components: {
    ClaimsChart,
    ClaimsSectionStatistics,
  },
  filters: {
    percents,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    totalStatistics: {
      type: Object,
      required: true,
    },
    statistics: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.disput-statistic {
  @include table-base-container;

  background-color: $base-white;
  margin-bottom: 8px;
  padding: 12px 20px;

  .table-name {
    font-size: 14px;
    color: $table-statistic-header-color;
  }
}

.statistic {
  border: 2px solid $table-statistic-border-color;
  border-radius: 4px;
  margin: 3px 0 17px;
  min-height: 190px;
}

.table-wrapper {
  padding: 0 26px 0 26px;
  flex-grow: 1;
}

.table-header {
  .flex {
    align-self: flex-end;
    color: $table-statistic-header-color;
    font-size: 14px;
    font-weight: bold;

    & > div {
      color: $table-statistic-subtitle-color;
      font-size: 10px;
    }

    &:not(:first-child) {
      border-left: 1px solid $table-statistic-separator-color;
      border-right: 1px solid $table-statistic-separator-color;
      text-align: center;
      width: 20%;
    }

    &:first-child {
      font-weight: bold;
      width: 30%;
    }
  }
}

.table-header-label {
  font-weight: normal;
  font-style: italic;
  margin-bottom: 5px;
}

.pie-chart-wrapper {
  display: flex;
  width: 250px;
  justify-content: center;
  align-items: center;
}
</style>
