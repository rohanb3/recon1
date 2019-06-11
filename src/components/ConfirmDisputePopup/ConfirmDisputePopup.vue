<template>
  <confirm-popup
    :visible-popup="visiblePopup"
    :title="$t('disputes.rejection.approve.description')"
    :persistent="false"
    @close="onClose"
  >
    <v-form ref="form" @submit.prevent>
      <comment-field :label="$t('disputes.enter.comment.for.dispute')" v-model="comment" />
    </v-form>

    <template v-slot:buttons>
      <v-btn
        small
        depressed
        class="button button-save"
        :disabled="isEmptyComment"
        @click="onSave"
        >{{ $t('save') }}</v-btn
      >
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
  name: 'ConfirmResubmitDisputePopup',
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
  computed: {
    isEmptyComment() {
      return !this.comment.length;
    },
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
