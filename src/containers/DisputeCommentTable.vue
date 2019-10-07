<template>
  <div class="comment-table">
    <p>{{ $t('dispute.comment') }}</p>
    <table>
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
.comment-table {
  p {
    font-size: 20px;
    margin-bottom: 20px;
  }

  table {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
