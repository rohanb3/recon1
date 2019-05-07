<template>
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
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';
import { DISPUTE_TYPES_ID } from '@/constants';

export default {
  name: 'SelectDisputeType',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.selectDefaultDisputType();
  },
  data() {
    return {
      fieldCantBeEmptyRule: [validateFieldCantBeEmpty()],
      disputeTypeList: [
        {
          id: DISPUTE_TYPES_ID.MISSING_TRANSACTION,
          name: this.$t('dispute.missing.transaction'),
        },
        {
          id: DISPUTE_TYPES_ID.EXPECTED_COMMISION,
          name: this.$t('dispute.expected.commision'),
        },
        {
          id: DISPUTE_TYPES_ID.ORDER_INSTALLED,
          name: this.$t('dispute.order.installed'),
        },
      ],
    };
  },
  computed: {
    disputeType: {
      get() {
        return (this.value || {}).id || null;
      },
      set(disputeType) {
        this.$emit('input', this.disputeTypeList.find(dispute => dispute.id === disputeType));
      },
    },
  },
  methods: {
    selectDefaultDisputType() {
      if (this.disputeType === null) {
        this.$emit('input', this.disputeTypeList[0]);
      }
    },
  },
};
</script>
