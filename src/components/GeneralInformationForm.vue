<template>
  <div class="general-information-from">
    <div class="general-information-title">{{ $t('dispute.general.information') }}</div>
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
          :label="$t('dispute.account.number')"
        ></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field value="#8899" :label="$t('dispute.order.confirmation')"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <v-text-field value="39290-91777" :label="$t('dispute.wo.number')"></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field value="132" disabled :label="$t('dispute.fiscal.period')"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <v-text-field value="31 September 2019" :label="$t('dispute.creation.date')"></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field
          value="10 October 2019"
          :label="$t('dispute.installation.date')"
        ></v-text-field>
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
        <v-text-field value="465" disabled :label="$t('dispute.expected.comission')"></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field
          value="$ 0.25"
          disabled
          :label="$t('dispute.recived.comission.difference')"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'GeneralInformationForm',
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
