<template>
  <export-to-csv-file-button
    :tableName="tableName"
    :filters="filters"
    :repository="handlerCsvFile()"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import ExportToCsvFileButton from './ExportToCsvFileButton';
import { getDisputesClaimsCsvFile } from '@/services/disputesRepository';

export default {
  name: 'ExportToCvsDisputesClaims',
  components: { ExportToCsvFileButton },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['tableData', 'storageData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
  },
  methods: {
    handlerCsvFile() {
      return getDisputesClaimsCsvFile;
    },
  },
};
</script>
