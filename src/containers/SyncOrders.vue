<template>
  <table-button
    :disabled="isOrdersSyncing"
    :preloader="isOrdersSyncing"
    :title="$t('sync.orders')"
    @click="onSyncOrders"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import TableButton from '../components/TableButton';

import { successMessage } from '@/services/notifications';
import { ORDER_SYNC_STATUS } from '@/constants';
import { START_SYNC_ORDERS } from '@/store/storage/actionTypes';

export default {
  name: 'SyncOrders',
  components: { TableButton },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['tableData', 'storageData']),
    isOrdersSyncing() {
      return this.storageData(this.tableName).syncOrdersStatus === ORDER_SYNC_STATUS.WORKING;
    },
  },
  methods: {
    onSyncOrders() {
      this.$store.dispatch(START_SYNC_ORDERS, { tableName: this.tableName });
      successMessage('sync.started', 'sync.info');
    },
  },
};
</script>
