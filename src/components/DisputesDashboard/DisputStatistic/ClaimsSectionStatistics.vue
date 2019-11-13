<template>
  <div class="table-body">
    <v-layout row v-for="statistic in statistics" :key="statistic.sectionName">
      <v-flex>
        <span class="mark-status" :style="{ background: statistic.color }"></span>
        {{ statistic.sectionName }}
      </v-flex>
      <v-flex>
        <section-value :link="statistic.link" :value="statistic.totalQuantity"></section-value>
      </v-flex>
      <v-flex>
        <section-value :link="statistic.link" :value="statistic.percent | percents"></section-value>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { percents } from '@/filters/numberFormat';
import currency from '@/filters/currency';
import SectionValue from './SectionValue';

export default {
  name: 'ClaimsSectionStatistics',
  components: {
    SectionValue,
  },
  props: {
    statistics: {
      type: Array,
      required: true,
    },
  },
  filters: {
    percents,
    currency,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.table-body {
  .flex {
    color: $table-statistic-body-color;
    font-size: 14px;
    padding: 8px 0;

    &:not(:first-child) {
      border-left: 1px solid $table-statistic-separator-color;
      border-right: 1px solid $table-statistic-separator-color;
      text-align: center;
      width: 20%;
    }
    &:first-child {
      width: 30%;
    }

    .mark-status {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }

  .layout:last-child {
    height: 71px;
  }
}
</style>
