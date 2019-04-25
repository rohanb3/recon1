<template>
  <div class="browse-files">
    <div class="browse-files-header">
      <span>{{ $t('browse.files.or.images') }}</span>
      <table-button :title="$t('choose.file')" />
    </div>
    <vue-perfect-scrollbar :settings="scrollSettings">
      <div class="browse-files-content">
        <file-info />
        <file-info />
        <file-info />
        <file-info />
        <file-info />
        <file-info />
        <file-info />
        <file-info />
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import FileInfo from './FileInfo';

export default {
  name: 'BrowseFiles',
  components: {
    TableButton,
    VuePerfectScrollbar,
    FileInfo,
  },
  data() {
    return {
      scrollSettings: {
        suppressScrollX: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.browse-files {
  font-size: 12px;
  color: $bright-grey;
}

.browse-files-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.browse-files-content {
  height: 160px;
  padding-right: 21px;
}
</style>
