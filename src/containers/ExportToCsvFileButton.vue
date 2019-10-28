<template>
  <table-button
    :title="$t('export')"
    :disabled="disabled"
    :preloader="loading"
    @click="onExportToCsvFile"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import TableButton from '@/components/TableButton';
import { errorMessage } from '@/services/notifications';
import { generateCSVFile } from '@/services/utils';

export default {
  name: 'ExportToCsvFileButton',
  components: {
    TableButton,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    repository: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['storageData']),
    isEmptyTable() {
      return !this.storageData(this.tableName).items.length;
    },
    disabled() {
      return this.loading || this.isEmptyTable;
    },
  },
  methods: {
    async onExportToCsvFile() {
      this.loading = true;
      try {
        const CSVFile = await this.repository(this.filters);
        generateCSVFile(CSVFile, this.tableName);
      } catch {
        errorMessage();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
