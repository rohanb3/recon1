export default {
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
    filter: {
      type: Function,
      default: value => value,
    },
  },
  computed: {
    filteredValue() {
      return this.filter(this.value);
    },
    fields() {
      if (typeof this.column.field === 'string') {
        return this.column.field.split('.');
      }
      return [];
    },
    value() {
      try {
        return this.fields.reduce((acc, curr) => acc[curr], this.item);
      } catch (err) {
        return null;
      }
    },
  },
};
