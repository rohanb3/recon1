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

const DISPUTE_TYPE_MISSING_TRANSACTION_ID = 'e0e82612-96d7-4602-bc24-56436a25240c';
const DISPUTE_TYPE_EXPECTED_COMMISION_ID = 'f8893af0-33af-4d14-9437-726f995b6677';
const DISPUTE_TYPE_ORDER_INSTALLED_ID = '89d17606-d69d-46bb-a5b3-c388fe44d235';

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
