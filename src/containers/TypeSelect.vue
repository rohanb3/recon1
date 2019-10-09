<template>
  <v-select
    append-icon="expand_more"
    :label="$t(title)"
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
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'TypeSelect',
  props: {
    title: {
      type: String,
      required: true,
    },
    translationKeys: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fieldCantBeEmptyRule: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    type: {
      get() {
        return (this.value.type || {}).id || null;
      },
      set(value) {
        this.$emit('input', {
          ...this.value,
          type: this.typesList.find(type => type.id === value),
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
};
</script>
