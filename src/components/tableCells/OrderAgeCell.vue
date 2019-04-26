<template>
  <div class="google-review-conversion-cell">
    <div v-if="item.status">
      <span
        class="status"
        :class="{
          bad: isOverdueOrder,
          average: isWaitingOrder,
          good: isNewOrder,
        }"
      ></span>
      <span class="conversion">{{ item.status }}</span>
    </div>
    <div v-else>
      <span>-</span>
    </div>
  </div>
</template>

<script>
const NEWLY_CREATED_ORDER_PERIOD = 10;
const WAITING_ORDER_PERIOD = 34;

export default {
  name: 'OrderAgeCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    isNewOrder() {
      return this.item.status <= NEWLY_CREATED_ORDER_PERIOD;
    },
    isWaitingOrder() {
      return (
        this.item.status > NEWLY_CREATED_ORDER_PERIOD && this.item.status <= WAITING_ORDER_PERIOD
      );
    },
    isOverdueOrder() {
      return this.item.status > WAITING_ORDER_PERIOD;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.google-review-conversion-cell {
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
