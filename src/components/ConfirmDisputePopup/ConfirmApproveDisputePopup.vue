<template>
  <confirm-popup
    :visible-popup="visiblePopup"
    :title="$t('resubmission.table.approve.description')"
    @close="onClose"
  >
    <v-form ref="form" @submit.prevent>
      <comment-field
        :label="$t('resubmission.table.enter.approve.comment.below')"
        v-model="comment"
      />
    </v-form>

    <template v-slot:buttons>
      <v-btn small depressed class="button button-save" @click="onSave">{{ $t('save') }}</v-btn>
      <v-btn small depressed class="button button-cancel" @click="onClose">
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </confirm-popup>
</template>

<script>
import ConfirmPopup from '@/components/ConfirmPopup';
import CommentField from './CommentField';

export default {
  name: 'ConfirmApproveDisputePopup',
  props: {
    visiblePopup: {
      type: Boolean,
      required: true,
    },
    disputeInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    ConfirmPopup,
    CommentField,
  },
  data() {
    return {
      comment: '',
    };
  },
  methods: {
    onSave() {
      if (this.$refs.form.validate()) {
        this.$emit('save', { ...this.disputeInfo, comments: this.comment });
        this.comment = '';
      }
    },
    onClose() {
      this.$emit('close', false);
      this.comment = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import './ConfirmDisputePopup.scss';
</style>
