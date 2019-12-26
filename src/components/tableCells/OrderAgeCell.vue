<template>
  <div class="order-age-cell">
    <div v-if="value">
      <span
        class="status"
        :class="{
          black,
          orange,
          red,
          green,
        }"
      ></span>
      <span class="conversion">{{ value }}</span>
    </div>
    <div v-else>
      <span>-</span>
    </div>
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

const GREEN = 15;
const ORANGE = 30;
const RED = 45;

export default {
  name: 'OrderAgeCell',
  mixins: [nestedFieldCell],
  computed: {
    green() {
      return this.value <= GREEN;
    },
    orange() {
      return this.value > GREEN && this.value <= ORANGE;
    },
    red() {
      return this.value > ORANGE && this.value <= RED;
    },
    black() {
      return this.value > RED;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.order-age-cell {
  .status {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 3px;
  }

  .black {
    background-color: #000000;
  }

  .red {
    background: $base-red;
  }

  .orange {
    background: $base-orange;
  }

  .green {
    background: $base-green;
  }
}
</style>
