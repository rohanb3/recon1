<template>
  <v-form ref="form">
    <v-select
      append-icon="expand_more"
      :label="$t('dispute.service.name')"
      required
      class="required"
      item-value="id"
      item-text="bundleName"
      v-model="service"
      :items="serviceList"
      :rules="serviceNameRules"
      :validate-on-blur="true"
    ></v-select>
  </v-form>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'SelectServiceName',
  props: {
    value: {
      type: Object,
      required: true,
    },
    serviceList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      serviceNameRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    service: {
      get() {
        return this.value.service || null;
      },
      set(serviceId) {
        this.$emit('input', { ...this.value, serviceId });
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
