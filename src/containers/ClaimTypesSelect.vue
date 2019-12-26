<template>
  <type-select
    v-model="disputeInfo"
    title="claim.type"
    :translation-keys="translationKeys"
    :types="types"
  />
</template>

<script>
import { getClaimTypes } from '@/services/disputesRepository';
import { CLAIMS_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';
import TypeSelect from './TypeSelect';

export default {
  name: 'ClaimTypesSelect',
  components: { TypeSelect },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    translationKeys() {
      return CLAIMS_STATUS_NAME_TRANSLATION_KEYS;
    },
    disputeInfo: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
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
      getClaimTypes().then(data => {
        this.types = data;
      });
    },
  },
};
</script>
