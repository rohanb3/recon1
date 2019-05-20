<template>
  <confirm-popup :visible-popup="visiblePopup" :title="titlePopup" @close="$emit('close', false)">
    <v-form ref="form">
      <v-text-field
        v-model="comment"
        :label="labelFieldPopup"
        class="required"
        :rules="commentRules"
        :validate-on-blur="true"
        required
      ></v-text-field>
    </v-form>

    <template v-slot:buttons>
      <v-btn small depressed class="button button-save" @click="onSave">{{ $t('save') }}</v-btn>
      <v-btn small depressed class="button button-cancel" @click="$emit('close', false)">{{
        $t('cancel')
      }}</v-btn>
    </template>
  </confirm-popup>
</template>

<script>
import { validateFieldCantBeEmpty, validateMaxTextLength } from '@/services/validators';
import ConfirmPopup from '@/components/ConfirmPopup';

import { DISPUTE_STATUSES_ID } from '@/constants';

const COMMENT_MAX_LENGTH = 155;

export default {
  name: 'ConfirmDisputePopup',
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
  },
  data() {
    return {
      comment: '',
      commentRules: [validateFieldCantBeEmpty(), validateMaxTextLength(COMMENT_MAX_LENGTH)],
    };
  },
  computed: {
    statusId() {
      return this.disputeInfo.statusId || null;
    },
    isApprovedDisputeStatus() {
      return this.statusId === DISPUTE_STATUSES_ID.APPROVED;
    },
    titlePopup() {
      if (this.isApprovedDisputeStatus) {
        return this.$t('resubmission.table.approve.description');
      }
      return this.$t('resubmission.table.reject.description');
    },
    labelFieldPopup() {
      if (this.isApprovedDisputeStatus) {
        return this.$t('resubmission.table.enter.approve.comment.below');
      }
      return this.$t('resubmission.table.enter.reject.comment.below');
    },
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
@import '~@/assets/styles/variables.scss';

.button {
  font-size: 14px;
  text-transform: capitalize;
}

.button-save {
  color: $base-white;
  background-color: $base-green !important;
}

.button-cancel {
  font-size: 14px;
  opacity: 0.5;
  background-color: transparent !important;
  color: $base-text-color;
}
</style>
