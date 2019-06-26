<template>
  <v-text-field
    v-model.trim="textValue"
    class="mx-3 quick-search"
    solo
    prepend-inner-icon="search"
    :placeholder="placeholder || $t('quick.search')"
  ></v-text-field>
</template>

<script>
export default {
  name: 'QuickSearch',
  props: {
    placeholder: {
      type: String,
    },
    initialPhrase: {
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
  },
  computed: {
    textValue: {
      get() {
        return this.initialPhrase;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.quick-search /deep/ {
  .v-input__control {
    min-height: 20px;
    height: 20px;

    .v-input__slot {
      width: 140px;
      box-shadow: none !important;
      margin-bottom: 0;
      padding-left: 4px;
      border: solid 1px $quick-search-border-color;
      border-radius: 3px;
      font-size: 12px;

      input::placeholder {
        opacity: 0.8;
        color: $base-text-color;
      }

      .v-input__icon {
        min-width: 16px;
        width: 16px;
        height: 16px;
      }
    }

    .v-icon.material-icons {
      font-size: 14px;
      opacity: 0.8;
      color: $base-text-color;
    }

    .v-text-field__details {
      display: none;
    }
  }
}
</style>
