<template>
  <div class="dispute-comment-table">
    <h1 class="title">{{ $t('dispute.comment') }}</h1>
    <table class="comment-table">
      <thead>
        <tr>
          <td v-for="(cell, index) in tableHeader" :key="index">{{ $t(cell) }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.carierOrderNumber }}</td>
          <td>{{ item.installationDate | dateYearMonthDay }}</td>
          <td>${{ item.reseivedCommission }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { dateYearMonthDay } from '@/filters/dateFormat';

export default {
  name: 'DisputeCommentTable',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tableHeader: ['order', 'dispute.installation.date', 'disputes.recieved.comisson'],
    };
  },
  filters: {
    dateYearMonthDay,
  },
  computed: {
    items() {
      return this.value.baseCommissionDetailModel || [];
    },
  },
};
</script>

<style scoped lang="scss">
.dispute-comment-table {
  .title {
    margin-bottom: 20px;
  }

  .comment-table {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
