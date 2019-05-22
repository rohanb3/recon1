<template>
  <confirm-popup
    :visible-popup="visiblePopup"
    :title="$t('resubmission.table.reject.description')"
    @close="$emit('close', false)"
  >
    <v-form ref="form">
      <comment-field
        :label="$t('resubmission.table.enter.reject.comment.below')"
        v-model="comment"
      />
    </v-form>

    <template v-slot:buttons>
      <v-btn small depressed class="button button-save" @click="onSave">{{ $t('save') }}</v-btn>
      <v-btn small depressed class="button button-cancel" @click="$emit('close', false)">
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </confirm-popup>
</template>

<script>
import ConfirmPopup from '@/components/ConfirmPopup';
import CommentField from './CommentField';

export default {
  name: 'ConfirmRejectDisputePopup',
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
  },
};
</script>

<style lang="scss" scoped>
@import './ConfirmDisputePopup.scss';
</style>
