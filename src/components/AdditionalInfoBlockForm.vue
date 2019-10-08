<template>
  <v-form class="additional-info-block-form">
    <v-layout row mb-2>
      <v-flex md6>
        <slot name="typeSelect"></slot>
        <!--<claim-types-select v-model="disputeInfo" />-->
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
    <slot name="commentTable"></slot>
    <textarea-submitter-comment v-model="disputeInfo" ref="textareaSubmitterComment" />
  </v-form>
</template>

<script>
import BrowseFiles from '@/components/BrowseFiles/BrowseFiles';
import TextareaSubmitterComment from '@/components/TextareaSubmitterComment';

export default {
  name: 'AdditionalInfoBlockForm',
  components: {
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
    pathToAttachmentFiles: {
      type: String,
      required: true,
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
      return `${this.pathToAttachmentFiles + this.value.id}?fileName=`;
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
