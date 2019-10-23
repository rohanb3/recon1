import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import InfiniteLoading from 'vue-infinite-loading';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

import WombatHeader from '../Header';
import WombatRow from '../Row';
import WombatFooter from '../Footer';

export default {
  name: 'wombat-table',
  components: {
    WombatRow,
    WombatHeader,
    WombatFooter,
    InfiniteLoading,
    PerfectScrollbar,
    RecycleScroller,
    VuePerfectScrollbar,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemKeyName: {
      type: String,
      default: 'id',
    },
    itemHeight: {
      default: 50,
    },
    resize: {
      type: Boolean,
      default: true,
    },
    columnsReorder: {
      type: Boolean,
      default: true,
    },
    itemsChunkSize: {
      type: Number,
    },
    infiniteLoading: {
      type: Boolean,
      default: false,
    },
    scrollOnItemsAdding: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: null,
    },
    loadingItems: {
      type: Boolean,
      required: true,
    },
    horisontalScroll: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      rowWidth: '100%',
      lastScrollTop: 0,
      lastScrollHeight: 0,
      isBottomReached: true,
      verticalScroll: null,
    };
  },
  computed: {
    rowCellStotPresent() {
      return !!this.$scopedSlots['row-cell'] || !!this.$slots['row-cell'];
    },
    headerCellStotPresent() {
      return !!this.$scopedSlots['header-cell'] || !!this.$slots['header-cell'];
    },
    footerCellStotPresent() {
      return !!this.$scopedSlots['footer-cell'] || !!this.$slots['footer-cell'];
    },
    itemsLength() {
      return this.items.length;
    },
    scrollbarShown() {
      return this.items.length || this.infiniteLoading;
    },
    classHorisontalScroll() {
      return {
        'horisontal-scroll': this.horisontalScroll,
      };
    },
    classWombatTable() {
      return {
        'horisontal-scroll-width': this.horisontalScroll,
      };
    },
  },
  methods: {
    updateScrollBar() {
      this.$nextTick(() => {
        if (this.scrollbar) {
          this.scrollbar.update();
        } else {
          const el = document.querySelector(`.virtual-list.table-${this.name}`);
          this.scrollbar = new PerfectScrollbar(el);
          el.addEventListener('ps-y-reach-end', () => {
            if (!this.loadingItems && !this.isBottomReached) {
              this.isBottomReached = true;
              this.$emit('bottomReached');
            }
          });
          el.addEventListener('ps-scroll-down', () => {
            this.isBottomReached = false;
          });
        }
      });
    },
    scrollToFirstInsertedtem() {
      const scrollTop = this.lastScrollTop + this.lastScrollHeight - this.itemHeight;
      this.scrollToPosition(scrollTop);
    },
    scrollToPrependedItem() {
      this.scrollToPosition(0);
    },
    infiniteHandler() {
      const { scrollTop, clientHeight } = this.$refs.scroller.$el;
      this.lastScrollTop = scrollTop;
      this.lastScrollHeight = clientHeight;
    },
    scrollToPosition(position) {
      this.$refs.scroller.$el.scrollTop = position;
    },
    setVerticalScrollPosition() {
      const { offsetWidth: tableVisibleWidth, scrollLeft } = this.$refs.horisontalScroll.$el;

      const verticalScrollPosition = tableVisibleWidth + scrollLeft - 15;

      this.verticalScroll.style.left = `${verticalScrollPosition}px`;
    },
  },
  watch: {
    items(next, old) {
      const oldLength = old && old.length;
      const nextLength = next && next.length;
      const itemsPrepended =
        !!oldLength && !!nextLength && old[0][this.itemKeyName] !== next[0][this.itemKeyName];
      const itemsAppended = !!oldLength && !!nextLength && nextLength > oldLength;

      if (this.scrollOnItemsAdding && itemsPrepended) {
        this.$nextTick(this.scrollToPrependedItem);
      } else if (this.scrollOnItemsAdding && itemsAppended) {
        // $nextTick calls scrolling too early, scroll-list is not updated correctly
        setTimeout(() => this.scrollToFirstInsertedtem());
      }

      this.updateScrollBar();
    },
  },
  mounted() {
    this.updateScrollBar();
  },
  updated() {
    if (!this.horisontalScroll) return;

    this.verticalScroll = this.$el.querySelector('.ps__rail-y');

    if (this.verticalScroll) {
      this.setVerticalScrollPosition();
    }
  },
};
