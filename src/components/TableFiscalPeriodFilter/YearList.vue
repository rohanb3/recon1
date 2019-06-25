<template>
  <div class="year-list">
    <div class="navigation-years" v-show="listOfYears.length">
      <v-icon class="nav-btn" @click="onPrevSlide">arrow_left</v-icon>
      <span class="displayed-range-of-years">{{ minDisplayedYear }} – {{ maxDisplayedYear }}</span>
      <v-icon class="nav-btn" @click="onNextSlide">arrow_right</v-icon>
    </div>
    <slider
      :autoplay="false"
      :control-btn="false"
      :indicators="false"
      height="230px"
      v-model="sliderIndex"
    >
      <slider-item class="list-of-years years" v-for="(years, index) in allYears" :key="index">
        <span
          class="year"
          :class="{ 'future-year': isFutureYear(year), 'selected-year': isSelectedYear(year) }"
          v-for="year in years"
          :key="year"
          @click="onSelectYear(year)"
          >{{ year }}</span
        >
      </slider-item>
    </slider>
  </div>
</template>

<script>
import moment from 'moment';
import chunk from 'lodash.chunk';
import { Slider, SliderItem } from 'vue-easy-slider';
import { range } from '@/services/numberHelper';

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
    Slider,
    SliderItem,
  },
  data() {
    return {
      sliderIndex: 0,
    };
  },
  mounted() {
    this.initSlider();
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
    maxDisplayedYear() {
      return Math.max.apply(null, this.allYears[this.sliderIndex]);
    },
    minDisplayedYear() {
      return Math.min.apply(null, this.allYears[this.sliderIndex]);
    },
  },
  methods: {
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
    initSlider() {
      if (this.indexSlideWhereSelectedYear >= 0) {
        this.sliderIndex = this.indexSlideWhereSelectedYear;
      } else {
        this.sliderIndex = this.numberOfSlides - 1;
      }
    },
    onNextSlide() {
      if (this.sliderIndex < this.numberOfSlides - 1) {
        this.sliderIndex += 1;
      }
    },
    onPrevSlide() {
      if (this.sliderIndex > 0) {
        this.sliderIndex -= 1;
      }
    },
  },
  watch: {
    listOfYears() {
      this.initSlider();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.year-list {
  user-select: none;
}

.list-of-years {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
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
    margin: 5px 10px;
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
