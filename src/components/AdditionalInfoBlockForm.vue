<template>
  <v-form class="additional-info-block-form" ref="form">
    <v-layout row mb-2>
      <v-flex md6>
        <v-select
          append-icon="expand_more"
          :label="$t('dispute.dispute.type')"
          item-text="name"
          item-value="id"
          :items="disputeTypeList"
          v-model="disputeType"
          required
          :rules="fieldCantBeEmptyRule"
          class="required"
          :validate-on-blur="true"
        ></v-select>
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

const DISPUTE_TYPE_MISSING_TRANSACTION_ID = 'e0e82612-96d7-4602-bc24-56436a25240c';
const DISPUTE_TYPE_EXPECTED_COMMISION_ID = 'f8893af0-33af-4d14-9437-726f995b6677';
const DISPUTE_TYPE_ORDER_INSTALLED_ID = '89d17606-d69d-46bb-a5b3-c388fe44d235';

const SUBMITER_CONTENT_MAX_LENGTH = 250;

const PATH_TO_ATTACHMENT_FILES = '/api/disputs/disputeattachment/';

export default {
  name: 'AdditionalInfoBlockForm',
  components: {
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
  mounted() {
    this.selectDefaultDisputType();
  },
  data() {
    return {
      disputeTypeList: [
        {
          id: DISPUTE_TYPE_MISSING_TRANSACTION_ID,
          name: this.$t('dispute.missing.transaction'),
        },
        {
          id: DISPUTE_TYPE_EXPECTED_COMMISION_ID,
          name: this.$t('dispute.expected.commision'),
        },
        {
          id: DISPUTE_TYPE_ORDER_INSTALLED_ID,
          name: this.$t('dispute.order.installed'),
        },
      ],
      fieldCantBeEmptyRule: [v => !!v || this.$t('field.cant.be.empty')],
      submiterContentRules: [
        v =>
          String(v).length <= SUBMITER_CONTENT_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: SUBMITER_CONTENT_MAX_LENGTH,
          }),
      ],
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
    selectDefaultDisputType() {
      if (this.disputeType === null) {
        this.$emit('input', {
          ...this.value,
          disputeType: this.disputeTypeList[0].id,
        });
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  watch: {
    disputeType() {
      this.selectDefaultDisputType();
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
