<template>
  <div @wheel="onWheel">
    <slot :pieceOfData="pieceOfData"/>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import slidingWindow from '@/services/slidingWindow';

const MIN_OFFSET = 0;
const UNKNOWN_OFFSET = -1;
const NUMBER_DISPLAYED_ITEMS = 31;
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
    loadDataTimeout: {
      type: Number,
      default: LOAD_DATA_TIMEOUT,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      offset: UNKNOWN_OFFSET,
    };
  },
  computed: {
    pieceOfData() {
      return slidingWindow(
        this.dataSets,
        this.offset,
        this.numberDisplayedItems
      );
    },
    maxWindowOffset() {
      return this.dataSets.length - this.numberDisplayedItems;
    },
  },
  methods: {
    onWheel(e) {
      e.preventDefault();

      if (this.isSlidingWindowHasReachedRightEdge(e.deltaY)) return false;

      if (this.isSlidingWindowHasReachedLeftEdge(e.deltaY) && !this.loading) {
        this.debounceLoadDate();
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
      return this.offset === MIN_OFFSET && !this.isScrollingRight(value);
    },
    isSlidingWindowHasReachedRightEdge(value) {
      return (
        this.offset === this.maxWindowOffset && this.isScrollingRight(value)
      );
    },
    isScrollingRight(value) {
      return value > 0;
    },
    debounceLoadDate: debounce(function debounceLoadDate() {
      this.$emit('loadData');
    }, LOAD_DATA_TIMEOUT),
  },
  watch: {
    dataSets() {
      if (this.offset === UNKNOWN_OFFSET) this.offset = this.maxWindowOffset;
    },
    maxWindowOffset(newOffset, oldOffset) {
      console.log(newOffset > oldOffset, newOffset, oldOffset);
      
      if (newOffset > oldOffset) this.offset = newOffset - oldOffset;
    },
  },
};
</script>
