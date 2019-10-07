<template>
  <v-form class="additional-info-block-form">
    <v-layout row mb-2>
      <v-flex md6>
        <dispute-types-select v-model="disputeInfo" />
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
    <v-layout row mb-2>
      <v-flex>
        <dispute-comment-table v-model="disputeInfo" />
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <textarea-submitter-comment v-model="disputeInfo" ref="textareaSubmitterComment" />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import BrowseFiles from '@/components/BrowseFiles/BrowseFiles';
import TextareaSubmitterComment from '@/components/TextareaSubmitterComment';
import DisputeTypesSelect from '../containers/DisputeTypesSelect';
import DisputeCommentTable from '../containers/DisputeCommentTable';

const PATH_TO_ATTACHMENT_FILES = '/api/disputs/attachment/dispute/';

export default {
  name: 'AdditionalInfoBlockFormDisputes',
  components: {
    DisputeCommentTable,
    DisputeTypesSelect,
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
