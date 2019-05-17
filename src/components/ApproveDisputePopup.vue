<template>
  <confirmation-popup
    v-model="confirmationPopup"
    :title="$t('resubmission.table.approve.description')"
    @close="onCloseConfirmationPopup"
  >
    <v-text-field
      v-model="comment"
      :label="$t('resubmission.table.enter.approve.comment.below')"
      required
    ></v-text-field>
    <template v-slot:buttons>
      <v-btn small depressed class="button-save">{{ $t('save') }}</v-btn>
      <v-btn small depressed class="button-cancel">{{ $t('cancel') }}</v-btn>
    </template>
  </confirmation-popup>
</template>

<script>
import ConfirmationPopup from '@/components/ConfirmationPopup';
import { addBackgroundBlur, removeBackgroundBlur } from '@/services/utils';

export default {
  name: 'ApproveDisputePopup',
  props: {
    show: {},
  },
  components: {
    ConfirmationPopup,
  },
  data() {
    return {};
  },
  methods: {
    onShowConfirmationPopup() {
      addBackgroundBlur();
      this.confirmationPopup = true;
    },
    onCloseConfirmationPopup() {
      removeBackgroundBlur();
      this.confirmationPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.button-save {
  background-color: #7ed321;
}
</style>
