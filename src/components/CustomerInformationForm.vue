<template>
  <div class="customer-information-form">
    <div class="customer-information-title">{{ $t('dispute.customer.information') }}</div>
    <v-layout row mb-2>
      <v-flex md6>
        <v-text-field
          value="465"
          class="required"
          :label="$t('dispute.customer.name')"
        ></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field
          value="132"
          class="required"
          :label="$t('dispute.customer.phone')"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <v-text-field
          class="required"
          value="84483000000354"
          :label="$t('dispute.city')"
        ></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field class="required" value="#8899" :label="$t('dispute.state')"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <v-text-field
          value="465"
          class="required"
          :label="$t('dispute.customer.address')"
        ></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field value="132" class="required" :label="$t('dispute.zip')"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <v-text-field
          value="84483000000354"
          disabled
          class="required"
          :label="$t('dispute.ordered.units')"
        ></v-text-field>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field
          value="#8899"
          disabled
          class="required"
          :label="$t('dispute.installed.units')"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row mb-2>
      <v-flex md6>
        <v-select append-icon="expand_more" :label="$t('dispute.service.name')"></v-select>
      </v-flex>
      <v-flex md6 ml-5>
        <v-text-field
          value="#8899"
          class="required"
          :label="$t('dispute.legacy.company')"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'CustomerInformationForm',
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.customer-information-form {
  margin: 0 35px;
}

.customer-information-title {
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
