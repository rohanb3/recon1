<template>
  <v-form ref="form">
    <v-textarea
      :label="$t('dispute.submitter.comment')"
      v-model="submitterComment"
      :rules="submitterCommentRules"
      :validate-on-blur="true"
    ></v-textarea>
  </v-form>
</template>

<script>
import { validateMaxTextLength } from '@/services/validators';

const SUBMITER_CONTENT_MAX_LENGTH = 250;

export default {
  name: 'TextareaSubmitterComment',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      submitterCommentRules: [validateMaxTextLength(SUBMITER_CONTENT_MAX_LENGTH)],
    };
  },
  computed: {
    submitterComment: {
      get() {
        return ((this.lastStatus || {}).dispute || {}).submitterComment;
      },
      set(submitterComment) {
        this.$emit('input', { ...this.value, submitterComment });
      },
    },
    disputeStatusHistoryList() {
      return this.value.disputeStatusHistory || [];
    },
    lastStatus() {
      return this.disputeStatusHistoryList[this.disputeStatusHistoryList.length - 1] || {};
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
