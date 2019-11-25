<template>
  <div @wheel="onWheel">
    <slot :pieceOfData="pieceOfData" />
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import slidingWindow from '@/services/slidingWindow';

const MIN_OFFSET = 1;
const NUMBER_DISPLAYED_ITEMS = 31; // maximum days in month
const LOAD_DATA_TIMEOUT = 1000;

export default {
  name: 'LazyLoadForChart',
  props: {
    dataSets: {
      type: Array,
      required: true,
    },
    minOffset: {
      type: Number,
      default: MIN_OFFSET,
    },
    numberDisplayedItems: {
      type: Number,
      default: NUMBER_DISPLAYED_ITEMS,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      offset: this.minOffset,
    };
  },
  computed: {
    pieceOfData() {
      function processDataSet(data) {
        let newData = data;
        if (Number.isNaN(Number(data.yValue))) {
          newData = Object.assign({}, data, { yValue: 0 });
        }
        return newData;
      }
      const processedDataSet = this.dataSets
        .map(data => (data === null || data === undefined ? {} : data))
        .map(processDataSet);
      return slidingWindow(processedDataSet, this.offset, this.numberDisplayedItems);
    },
    maxWindowOffset() {
      return this.dataSets.length - this.numberDisplayedItems;
    },
  },
  methods: {
    onWheel(e) {
      e.preventDefault();

      if (this.isSlidingWindowHasReachedRightEdge(e.deltaY)) return false;

      if (this.isSlidingWindowHasReachedLeftEdge(e.deltaY)) {
        if (!this.loading) {
          this.throttleLoadDate();
        }
        return false;
      }

      if (this.isScrollingRight(e.deltaY)) {
        this.offset += 1;
      } else {
        this.offset -= 1;
      }
      return true;
    },
    isSlidingWindowHasReachedLeftEdge(value) {
      return this.offset <= this.minOffset && !this.isScrollingRight(value);
    },
    isSlidingWindowHasReachedRightEdge(value) {
      return this.offset >= this.maxWindowOffset && this.isScrollingRight(value);
    },
    isScrollingRight(value) {
      return value > 0;
    },
    throttleLoadDate: throttle(function throttleLoadDate() {
      this.$emit('loadData');
    }, LOAD_DATA_TIMEOUT),
  },
  watch: {
    maxWindowOffset(newOffset, oldOffset) {
      if (oldOffset > 0 && newOffset > oldOffset) {
        this.offset = newOffset - oldOffset;
      }
    },
    dataSets(newData, oldData) {
      if (newData.length < oldData.length) this.offset = this.minOffset;
    },
  },
};
</script>
