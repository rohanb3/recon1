<template>
  <v-select
    append-icon="expand_more"
    :label="$t('dispute.dispute.type')"
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
import { getDisputeTypes } from '@/services/disputesRepository';
import { DISPUTES_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import typeSelect from '@/mixins/typeSelect';

export default {
  name: 'DisputeTypesSelect',
  computed: {
    translationKeys() {
      return DISPUTES_STATUS_NAME_TRANSLATION_KEYS;
    },
  },
  mixins: [typeSelect],
  methods: {
    getData() {
      getDisputeTypes().then(data => {
        this.types = data;
      });
    },
  },
};
</script>
