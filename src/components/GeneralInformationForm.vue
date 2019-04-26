<template>
  <div class="general-information-from">
    <div class="general-information-title">{{ $t('dispute.general.information') }}</div>
    <v-form @input="isValid => $emit('input', isValid)">
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field value="465" disabled :label="$t('dispute.affiliate.name')"></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field value="132" disabled :label="$t('dispute.affiliate.id')"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="84483000000354"
            class="required"
            required
            :label="$t('dispute.account.number')"
            :rules="fieldCantBeEmptyRule"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            value="#8899"
            class="required"
            required
            :rules="fieldCantBeEmptyRule"
            :label="$t('dispute.order.confirmation')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="39290-91777"
            class="required"
            required
            :rules="fieldCantBeEmptyRule"
            :label="$t('dispute.wo.number')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field value="132" disabled :label="$t('dispute.fiscal.period')"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <field-date-editor boundaries-selector=".disput-creation-date" v-model="creationDate">
            <v-text-field
              class="disput-creation-date date-field"
              :value="prettifyDate(this.creationDate)"
              disabled
              :label="$t('dispute.creation.date')"
            ></v-text-field>
          </field-date-editor>
        </v-flex>
        <v-flex md6 ml-5>
          <field-date-editor
            boundaries-selector=".disput-installation-date"
            v-model="installationDate"
          >
            <v-text-field
              class="disput-installation-date date-field required"
              required
              :value="prettifyDate(this.installationDate)"
              disabled
              :label="$t('dispute.installation.date')"
            ></v-text-field>
          </field-date-editor>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="465"
            disabled
            :label="$t('dispute.age.by.creation.date')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            value="132"
            disabled
            :label="$t('dispute.age.by.instalation.date')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="465"
            disabled
            :label="$t('dispute.expected.comission')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            value="$ 0.25"
            disabled
            :label="$t('dispute.recived.comission.difference')"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import FieldDateEditor from '@/components/FieldDateEditor';
import { SHORT_DAY_MONTH_FULL_YEAR } from '@/constants/dateFormats';
import moment from 'moment';

export default {
  name: 'GeneralInformationForm',
  components: {
    FieldDateEditor,
  },
  data() {
    return {
      creationDate: '2019-02-06',
      installationDate: '',
      fieldCantBeEmptyRule: [v => !!v || this.$t('field.cant.be.empty')],
    };
  },
  methods: {
    prettifyDate(date) {
      if (date === '') return '';
      return moment.utc(date).format(SHORT_DAY_MONTH_FULL_YEAR);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.general-information-from {
  padding: 0 40px 0 24px;
  border-right: 2px solid $content-background-color;
  border-bottom: 2px solid $content-background-color;
}

.general-information-title {
  font-size: 16px;
  font-weight: bold;
  color: $base-text-color;
  margin-bottom: 20px;
}

.v-input /deep/ {
  .v-input__slot:before {
    display: none;
  }

  .v-input__slot {
    border-bottom: 2px solid $base-grey;
  }
}
</style>
