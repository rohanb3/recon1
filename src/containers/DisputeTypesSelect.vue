<template>
  <v-select
    append-icon="expand_more"
    :label="$t('dispute.dispute.type')"
    item-text="name"
    item-value="id"
    :items="typesList"
    v-model="claimType"
    required
    :rules="fieldCantBeEmptyRule"
    class="required"
    :validate-on-blur="true"
  ></v-select>
</template>

<script>
import { getDisputeTypes } from '@/services/disputesRepository';
import { validateFieldCantBeEmpty } from '@/services/validators';
import { DISPUTES_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';

export default {
  name: 'DisputeTypesSelect',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldCantBeEmptyRule: [validateFieldCantBeEmpty()],
      types: [],
    };
  },
  computed: {
    translationKeys() {
      return DISPUTES_STATUS_NAME_TRANSLATION_KEYS;
    },
    claimType: {
      get() {
        return (this.value.type || {}).id || null;
      },
      set(value) {
        this.$emit('input', {
          ...this.value,
          type: this.typesList.find(dispute => dispute.id === value),
        });
      },
    },
    typesList() {
      return this.types.map(({ id, name, selected }) => {
        const translationKey = [this.translationKeys][name];
        return {
          id,
          name: translationKey ? this.$t(translationKey) : name,
          selected,
        };
      });
    },
  },
  mounted() {
    this.getDisputeTypes();
  },
  methods: {
    getDisputeTypes() {
      getDisputeTypes().then(data => {
        this.types = data;
      });
    },
  },
};
</script>
