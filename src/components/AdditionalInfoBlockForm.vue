<template>
  <v-form class="additional-info-block-form" ref="form">
    <v-layout row mb-2>
      <v-flex md6>
        <select-dispute-type v-model="disputeType" />
        <v-textarea
          :label="$t('dispute.submitter.comment')"
          v-model="submiterContent"
          :rules="submiterContentRules"
          :validate-on-blur="true"
        ></v-textarea>
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

import { validateMaxTextLength } from '@/services/validators';

const SUBMITER_CONTENT_MAX_LENGTH = 250;

const PATH_TO_ATTACHMENT_FILES = '/api/disputs/disputeattachment/';

export default {
  name: 'AdditionalInfoBlockForm',
  components: {
    SelectDisputeType,
    BrowseFiles,
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
  data() {
    return {
      submiterContentRules: [validateMaxTextLength(SUBMITER_CONTENT_MAX_LENGTH)],
    };
  },
  computed: {
    attachments() {
      return this.value.attachments || [];
    },
    disputeType: {
      get() {
        return this.value.disputeType || null;
      },
      set(disputeType) {
        this.$emit('input', {
          ...this.value,
          disputeType,
        });
      },
    },
    submiterContent: {
      get() {
        return this.value.submiterContent;
      },
      set(submiterContent) {
        this.$emit('input', { ...this.value, submiterContent });
      },
    },
    linkPreview() {
      return `${PATH_TO_ATTACHMENT_FILES + this.value.id}?fileName=`;
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
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
