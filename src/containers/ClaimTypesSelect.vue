<template>
  <v-select
    append-icon="expand_more"
    :label="$t('claim.type')"
    item-text="name"
    item-value="id"
    :items="typesList"
    v-model="type"
    required
    :rules="fieldCantBeEmptyRule"
    class="required"
    :validate-on-blur="true"
  ></v-select>
</template>

<script>
import { getClaimTypes } from '@/services/disputesRepository';
import { CLAIMS_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import typeSelect from '@/mixins/typeSelect';

export default {
  name: 'ClaimTypesSelect',
  computed: {
    translationKeys() {
      return CLAIMS_STATUS_NAME_TRANSLATION_KEYS;
    },
  },
  mixins: [typeSelect],
  methods: {
    getData() {
      getClaimTypes().then(data => {
        this.types = data;
      });
    },
  },
};
</script>
