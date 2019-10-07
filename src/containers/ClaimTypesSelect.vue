<template>
  <v-select
    append-icon="expand_more"
    :label="$t('claim.type')"
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
import { getClaimTypes } from '@/services/disputesRepository';
import { validateFieldCantBeEmpty } from '@/services/validators';
import { CLAIMS_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';

export default {
  name: 'ClaimTypesSelect',
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
      return CLAIMS_STATUS_NAME_TRANSLATION_KEYS;
    },
    claimType: {
      get() {
        return (this.value.type || {}).id || null;
      },
      set(value) {
        this.$emit('input', {
          ...this.value,
          type: this.typesList.find(claim => claim.id === value),
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
    this.getClaimTypes();
  },
  methods: {
    getClaimTypes() {
      getClaimTypes().then(data => {
        this.types = data;
      });
    },
  },
};
</script>
