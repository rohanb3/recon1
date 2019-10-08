import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
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
  mounted() {
    this.getData();
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
