<template>
  <div class="browse-files">
    <div class="browse-files-header">
      <span>{{ $t('browse.files.or.images') }}</span>
      <table-button
        :title="$t('choose.file')"
        :disabled="loadingStatus"
        :preloader="loadingStatus"
        @click="onChangePhoto"
      />
      <input
        class="field-file-hidden"
        multiple
        ref="attachedFileField"
        type="file"
        accept="image/*, video/*, audio/*, text/*, application/*"
        @change="onSelectedFile"
      />
    </div>
    <vue-perfect-scrollbar :settings="scrollSettings">
      <div class="browse-files-content" v-if="attachments.length">
        <file-info
          v-for="attachment of attachments"
          :key="attachment"
          :filename="attachment"
          :fileSize="filesize"
          :linkPreview="linkPreview"
          @removeFile="filename => $emit('removeFile', filename)"
        />
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import TableButton from '@/components/TableButton';
import FileInfo from './FileInfo';

export default {
  name: 'BrowseFiles',
  props: {
    attachments: {
      type: Array,
      required: true,
    },
    linkPreview: {
      type: String,
    },
    loadingStatus: {
      type: Boolean,
      default: false,
    },
  },
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
  computed: {
    filesize() {
      return (this.attachment || {}).filesize || '';
    },
  },
  methods: {
    onChangePhoto() {
      this.$refs.attachedFileField.click();
    },
    onSelectedFile(event) {
      this.$emit('selectedFiles', event.target.files);
    },
  },
  watch: {
    loadingStatus(newStatus, oldStatus) {
      if (!newStatus && oldStatus) {
        this.$refs.attachedFileField.value = null;
      }
    },
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

  .field-file-hidden {
    display: none;
  }
}

.browse-files-content {
  max-height: 160px;
  padding-right: 21px;
}

.ps /deep/ {
  .ps__scrollbar-y-rail {
    opacity: 1;
  }
}
</style>
