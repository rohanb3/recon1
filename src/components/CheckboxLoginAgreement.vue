<template>
  <div class="checkbox-login-agreement" :class="{ 'required-agreement': isNotValid }">
    <v-checkbox v-model="agreement" hide-details></v-checkbox>
    <div>
      <span>{{ $t('i.agree.to.the') }}</span>
      <a class="link" target="_blank" :href="linkPrivacyPolicy">
        {{ $t('terms.and.conditions') }}
      </a>
    </div>
  </div>
</template>

<script>
const LINK_PRIVACY_POLICY = 'https://xyzreviews.com/privacy-policy/';

export default {
  name: 'CheckboxLoginAgreement',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isNotValid: false,
      linkPrivacyPolicy: LINK_PRIVACY_POLICY,
    };
  },
  computed: {
    agreement: {
      get() {
        return this.value;
      },
      set(status) {
        this.isNotValid = this.agreement;
        this.$emit('input', status);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.checkbox-login-agreement {
  margin-bottom: 23px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0;
    flex: 0 0 auto;
  }

  &.required-agreement /deep/ {
    .material-icons {
      color: $base-red;
    }

    color: $base-red;
  }

  .link {
    text-decoration: underline;
  }
}
</style>
