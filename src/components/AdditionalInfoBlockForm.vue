<template>
  <v-form class="additional-info-block-form" ref="form">
    <v-layout row mb-2>
      <v-flex md6>
        <select-dispute-type v-model="disputeType" />
        <v-textarea
          name="input-7-1"
          :label="$t('dispute.submitter.comment')"
          v-model="submiterContent"
          :rules="submiterContentRules"
          :validate-on-blur="true"
        ></v-textarea>
      </v-flex>
      <v-flex md6 ml-5>
        <browse-files />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import BrowseFiles from '@/components/BrowseFiles/BrowseFiles';
import SelectDisputeType from '@/components/SelectDisputeType';

import { validateMaxTextLength } from '@/services/validators';

const SUBMITER_CONTENT_MAX_LENGTH = 250;

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
  },
  data() {
    return {
      submiterContentRules: [validateMaxTextLength(SUBMITER_CONTENT_MAX_LENGTH)],
    };
  },
  computed: {
    submiterContent: {
      get() {
        return this.value.submiterContent;
      },
      set(submiterContent) {
        this.$emit('input', { ...this.value, submiterContent });
      },
    },
    disputeType: {
      get() {
        return this.value.disputeType || {};
      },
      set(disputeType) {
        this.$emit('input', {
          ...this.value,
          disputeType,
        });
      },
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
