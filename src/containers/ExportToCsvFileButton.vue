<template>
  <table-button
    :title="$t('export')"
    :disabled="loading"
    :preloader="loading"
    @click="onExportToCsvFile"
  />
</template>

<script>
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
