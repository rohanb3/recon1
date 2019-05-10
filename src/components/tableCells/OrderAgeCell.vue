<template>
  <div class="order-age-cell">
    <div v-if="value">
      <span
        class="status"
        :class="{
          bad: isOverdueOrder,
          average: isWaitingOrder,
          good: isNewOrder,
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

const NEWLY_CREATED_ORDER = 10;
const WAITING_ORDER = 34;

export default {
  name: 'OrderAgeCell',
  mixins: [nestedFieldCell],
  computed: {
    isNewOrder() {
      return this.value <= NEWLY_CREATED_ORDER;
    },
    isWaitingOrder() {
      return this.value > NEWLY_CREATED_ORDER && this.value <= WAITING_ORDER;
    },
    isOverdueOrder() {
      return this.value > WAITING_ORDER;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.order-age-cell {
  text-align: center;

  .status {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 3px;
  }

  .bad {
    background: $base-red;
  }

  .average {
    background: $base-orange;
  }

  .good {
    background: $base-green;
  }
}
</style>
