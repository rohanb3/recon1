<template>
  <type-select
    v-model="value"
    title="dispute.dispute.type"
    :translation-keys="translationKeys"
    :types="types"
  />
</template>

<script>
import { getDisputeTypes } from '@/services/disputesRepository';
import { DISPUTES_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import TypeSelect from './TypeSelect';

export default {
  name: 'DisputeTypesSelect',
  components: { TypeSelect },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    translationKeys() {
      return DISPUTES_STATUS_NAME_TRANSLATION_KEYS;
    },
  },
  data() {
    return {
      types: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getDisputeTypes().then(data => {
        this.types = data;
      });
    },
  },
};
</script>
