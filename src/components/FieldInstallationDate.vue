<template>
  <v-form ref="form">
    <field-date-editor boundaries-selector=".disput-installation-date" v-model="installationDate">
      <v-text-field
        class="disput-installation-date date-field required"
        required
        :value="this.installationDate | dateShortDayMonthYear"
        :label="$t('dispute.installation.date')"
        :rules="installationDateRules"
        readonly
      ></v-text-field>
    </field-date-editor>
  </v-form>
</template>

<script>
import FieldDateEditor from '@/components/FieldDateEditor';
import { validateFieldCantBeEmpty } from '@/services/validators';
import { dateShortDayMonthYear } from '@/filters/dateFormat';

export default {
  name: 'FieldInstallationDate',
  components: {
    FieldDateEditor,
  },
  filters: {
    dateShortDayMonthYear,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      installationDateRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    installationDate: {
      get() {
        return this.value.installationDate || '';
      },
      set(installationDate) {
        this.$emit('input', { ...this.value, installationDate });
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
