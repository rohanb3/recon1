<template>
  <div class="table-filter table-custom-filter" @click="showFilter">
    <div
      class="table-custom-filter-editor"
      ref="tableFilter"
      :style="{ minWidth: minWidthFilterEditor }"
    >
      {{ title }}
      <span v-if="!error">{{ selected | boundaries({ prefix: ': ' }) }}</span>
    </div>
    <popper
      trigger="click"
      ref="popper"
      :options="options"
      :boundaries-selector="boundariesSelector"
      @show="onShow"
      @hide="hideFilter"
    >
      <div class="popper">
        <span class="title-rule">{{ titleRule }}</span>
        <v-text-field
          type="text"
          v-model="fromValueEntered"
          class="number-field"
          :placeholder="fromPlaceholder"
          outline
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="toValueEntered"
          class="number-field"
          :placeholder="toPlaceholder"
          outline
        ></v-text-field>
        <div class="messages-wrapper" v-show="error">{{ error }}</div>
        <v-btn
          small
          depressed
          class="button button-apply"
          :disabled="isSelectedRangeDisabled"
          @click.stop="onApplyRange"
          >{{ $t('apply') }}</v-btn
        >
        <v-btn
          small
          depressed
          :disabled="isClearButtonDisabled"
          class="button button-clear"
          @click.stop="onClearRange"
          >{{ $t('clear.fields') }}</v-btn
        >
      </div>
      <div slot="reference" class="datepicker-toggler">
        <div class="caret"></div>
      </div>
    </popper>
  </div>
</template>

<script>
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import filters, { OPERATORS } from '@/services/customFilters/index';
import boundaries from '@/filters/boundaries';
import { notEmpty } from '@/services/utils';

const filter = filters.range.get(OPERATORS.BETWEEN);

export default {
  name: 'TableBoundariesFilter',
  mixins: [tableToolbarBalloon],
  filters: {
    boundaries,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    titleRule: {
      type: String,
    },
    fromPlaceholder: {
      type: String,
      default: '',
    },
    toPlaceholder: {
      type: String,
      default: '',
    },
    selected: {
      type: Object,
      default: () => ({
        from: null,
        to: null,
      }),
    },
    min: {
      type: Number,
    },
  },
  data() {
    return {
      minWidthFilterEditor: 'auto',
      fromValueEntered: this.getInitialFromValue(),
      toValueEntered: this.getInitialToValue(),
    };
  },
  computed: {
    range() {
      return { from: this.fromValueEntered, to: this.toValueEntered };
    },
    error() {
      return filter.validate(this.range, { min: this.min });
    },
    isClearButtonDisabled() {
      return !(notEmpty(this.fromValueEntered) || notEmpty(this.toValueEntered));
    },
    isSelectedRangeDisabled() {
      const { from, to } = this.range;
      return !!this.error || (!notEmpty(from) && !notEmpty(to));
    },
  },
  watch: {
    selected() {
      this.fromValueEntered = this.getInitialFromValue();
      this.toValueEntered = this.getInitialToValue();
    },
  },
  methods: {
    onApplyRange() {
      if (this.error) {
        return;
      }

      const data = filter.apply(this.range);
      this.$emit('input', data);
      this.hide();
    },
    onClearRange() {
      this.fromValueEntered = '';
      this.toValueEntered = '';
      this.$emit('clearRange');
    },
    getInitialFromValue() {
      return this.selected.from;
    },
    getInitialToValue() {
      return this.selected.to;
    },
    showFilter() {
      this.minWidthFilterEditor = `${this.$refs.tableFilter.offsetWidth}px`;
      this.checkAndShow();
    },
    hideFilter() {
      this.minWidthFilterEditor = 'auto';
      this.onHide();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/popper.scss';
@import '@/assets/styles/mixins.scss';

.title-rule {
  text-align: left;
  padding: 10px 10px 0 10px;
  font-size: 16px;
}
.table-custom-filter {
  height: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  border: 1px solid $table-toolbar-section-border-color;
  font-size: 12px;
  color: $table-toolbar-section-color;
  font-weight: 500;

  .button {
    @include button;

    &.button-apply {
      margin: 5px 0;
    }

    &.button-clear {
      margin: 5px 0 10px 0;
    }
  }
}
.messages-wrapper {
  color: $base-red;
}
#app .popper {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 12px;
}
.caret {
  border: 1px solid $base-blue;
  width: 7px;
  height: 7px;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  margin: -4px 0 0 5px;
}
.number-field /deep/ {
  font-size: 14px;
  .v-input__slot,
  .v-input__slot:hover {
    min-height: 0;
    border: 1px solid $base-grey !important;
  }
  .v-text-field__slot {
    align-items: center;
    input {
      margin-top: 0;
      &::placeholder {
        color: $table-filter-search-field-placeholder;
      }
    }
  }
  .v-text-field__details {
    display: none;
  }
}
</style>
