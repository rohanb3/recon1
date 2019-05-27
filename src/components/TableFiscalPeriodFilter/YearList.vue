<template>
  <div class="year-list">
    <div class="navigation-years" v-show="listOfYears.length">
      <v-icon class="nav-btn swiper-prev-years">arrow_left</v-icon>
      <span class="displayed-range-of-years"
        >{{ minDisplayedYear() }} – {{ maxDisplayedYear() }}</span
      >
      <v-icon class="nav-btn swiper-next-years">arrow_right</v-icon>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="list-of-years years" v-for="(years, index) in allYears" :key="index">
        <span
          class="year"
          :class="{ 'future-year': isFutureYear(year), 'selected-year': isSelectedYear(year) }"
          v-for="year in years"
          :key="year"
          @click="onSelectYear(year)"
          >{{ year }}</span
        >
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import moment from 'moment';
import chunk from 'lodash.chunk';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { range } from '@/services/numberHelper';
import { setTimeout } from 'timers';

export default {
  name: 'YearList',
  props: {
    value: {
      type: Number,
      required: true,
    },
    listOfYears: {
      type: Array,
      required: true,
    },
    displayedYears: {
      type: Number,
      default: 35,
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  mounted() {
    setTimeout(() => {
      this.initSwiper();
    }, 1000);
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-next-years',
          prevEl: '.swiper-prev-years',
        },
      },
    };
  },
  computed: {
    allYears() {
      if (!this.listOfYears.length) return [];

      return chunk(this.listOfYears.concat(this.futureYears), this.displayedYears);
    },
    futureYears() {
      return range(moment().year() + 1, moment().year() + this.numberOfExtraYears);
    },
    numberOfSlides() {
      return Math.ceil(this.listOfYears.length / this.displayedYears);
    },
    numberListOfYears() {
      return this.listOfYears.length;
    },
    numberOfExtraYears() {
      return this.totalYears - this.numberListOfYears;
    },
    totalYears() {
      return this.numberOfSlides * this.displayedYears;
    },
    indexSlideWhereSelectedYear() {
      return this.allYears.findIndex(years => years.find(year => year === this.value));
    },
  },
  methods: {
    maxDisplayedYear() {
      return Math.max.apply(null, this.allYears[this.indexDisplayedSlide()]);
    },
    minDisplayedYear() {
      return Math.min.apply(null, this.allYears[this.indexDisplayedSlide()]);
    },
    indexDisplayedSlide() {
      return ((this.$refs.mySwiper || {}).swiper || {}).activeIndex || 0;
    },
    isFutureYear(year) {
      return moment().year() < year;
    },
    isSelectedYear(year) {
      return this.value === year;
    },
    onSelectYear(year) {
      if (!this.isFutureYear(year)) {
        this.$emit('input', year);
      }
    },
    initSwiper() {
      console.log('ff');
      this.$refs.mySwiper.swiper.update();
      if (this.indexSlideWhereSelectedYear >= 0) {
        this.$refs.mySwiper.swiper.slideTo(this.indexSlideWhereSelectedYear);
      } else {
        this.$refs.mySwiper.swiper.slideTo(this.numberOfSlides);
      }
    },
  },
  watch: {
    listOfYears() {
      this.initSwiper();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '~swiper/dist/css/swiper.css';

.year-list {
  min-height: 220px;
  user-select: none;
}

.list-of-years {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 220px;
}

.navigation-years {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;

  .displayed-range-of-years {
    font-weight: bold;
  }

  .nav-btn {
    color: $base-blue;
    outline: none;
    cursor: pointer;
  }
}

.years {
  display: flex;
  flex-wrap: wrap;

  .year {
    margin: 5px;
    cursor: pointer;
    color: $base-text-color;

    &.selected-year {
      color: $base-blue;
    }

    &.future-year {
      color: $base-red;
      opacity: 0.6;
      cursor: default;
    }
  }
}
</style>
