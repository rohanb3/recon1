<template>
  <v-form ref="form">
    <field-date-editor boundaries-selector=".disput-creation-date" v-model="createdOn">
      <v-text-field
        class="disput-creation-date date-field"
        :value="prettifyDate(this.createdOn)"
        :rules="creationDateRules"
        :label="$t('dispute.creation.date')"
        readonly
      ></v-text-field>
    </field-date-editor>
  </v-form>
</template>

<script>
import FieldDateEditor from '@/components/FieldDateEditor';
import { validateFieldCantBeEmpty } from '@/services/validators';
import dateFormating from '@/mixins/dateFormating';

export default {
  name: 'FieldDisputCreationDate',
  mixins: [dateFormating],
  components: {
    FieldDateEditor,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      creationDateRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    createdOn: {
      get() {
        return this.value.createdOn || '';
      },
      set(createdOn) {
        this.$emit('input', { ...this.value, createdOn });
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
