<template>
  <v-form class="additional-info-block-form">
    <v-layout row mb-2>
      <v-flex md6>
        <select-dispute-type v-model="disputeInfo" />
        <textarea-submitter-comment v-model="disputeInfo" ref="textareaSubmitterComment" />
      </v-flex>
      <v-flex md6 ml-5>
        <browse-files
          :attachments="attachments"
          :linkPreview="linkPreview"
          :loadingStatus="loadingFilesStatus"
          @removeFile="filename => $emit('removeFile', filename)"
          @selectedFiles="files => $emit('selectedFiles', files)"
        />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import BrowseFiles from '@/components/BrowseFiles/BrowseFiles';
import SelectDisputeType from '@/components/SelectDisputeType';
import TextareaSubmitterComment from '@/components/TextareaSubmitterComment';

const PATH_TO_ATTACHMENT_FILES = '/api/disputs/disputeattachment/';

export default {
  name: 'AdditionalInfoBlockForm',
  components: {
    SelectDisputeType,
    BrowseFiles,
    TextareaSubmitterComment,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    loadingFilesStatus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attachments() {
      return this.value.attachments || [];
    },
    disputeInfo: {
      get() {
        return this.value;
      },
      set(disputeInfo) {
        this.$emit('input', disputeInfo);
      },
    },
    linkPreview() {
      return `${PATH_TO_ATTACHMENT_FILES + this.value.id}?fileName=`;
    },
  },
  methods: {
    validate() {
      return this.$refs.textareaSubmitterComment.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.additional-info-block-form {
  padding: 20px 40px 0 24px;
  border-right: 2px solid $content-background-color;
}
</style>
