<template>
  <v-container fluid class="dispute-bar-chart" @wheel.stop="onWheel">
    <v-layout row>
      <v-flex>
        <p class="table-name">{{ $t('disputes.dashboard.total.created.disputes') }}</p>
      </v-flex>
    </v-layout>
    <lazy-load-bar-chart :datasets="days"/>
  </v-container>
</template>

<script>
import moment from 'moment';
import debounce from 'lodash.debounce';
import LazyLoadBarChart from '@/components/charts/BarChart/LazyLoadBarChart';
import slidingWindow from '@/services/slidingWindow';

const NUMBER_DAYS = 31;
const LOAD_DATE_TIMEOUT = 1000;

export default {
  name: 'TotalCreatedDisputesChart',
  components: {
    LazyLoadBarChart,
  },
  props: {
    statistics: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: -1,
    };
  },
  computed: {
    days() {
      return slidingWindow(this.statistics, this.initialIndex, NUMBER_DAYS);
    },
    initialIndex() {
      if (this.index === -1) return this.maxIndex;
      return this.index;
    },
    maxIndex() {
      return this.statistics.length - NUMBER_DAYS;
    },
  },
  methods: {
    onWheel(e) {
      if (this.index === this.maxIndex && this.isScrollingRight(e.deltaY))
        return false;
      if (this.index === 0 && !this.isScrollingRight(e.deltaY)) {
        this.debounceLoadDate();
        return false;
      }

      if (this.isScrollingRight(e.deltaY)) {
        this.index += 1;
      } else {
        this.index -= 1;
      }
    },
    isScrollingRight(value) {
      return value > 0;
    },
    debounceLoadDate: debounce(function debounceLoadDate(selectedItems) {
      this.$emit('loadDate');
    }, LOAD_DATE_TIMEOUT),
  },
  watch: {
    statistics() {
      if (this.index === -1) this.index = this.maxIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.dispute-bar-chart {
  @include table-base-container;

  background-color: $base-white;
  margin-bottom: 8px;
  padding: 12px 20px;
  max-height: 323px;

  .table-name {
    font-size: 14px;
    color: $table-statistic-header-color;
    margin-bottom: 32px;
  }
}
</style>
