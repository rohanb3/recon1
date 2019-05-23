<template>
  <div class="table-filter table-custom-filter" @click="showFilter">
    <div
      class="table-custom-filter-editor"
      ref="tableFilter"
      :style="{ minWidth: minWidthFilterEditor }"
    >
      {{ title }}
      <span v-if="!error">{{ range | boundaries({ prefix: ': ' }) }}</span>
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
          @input="debounceInput"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="toValueEntered"
          class="number-field"
          :placeholder="toPlaceholder"
          outline
          @input="debounceInput"
        ></v-text-field>
        <div class="messages-wrapper" v-show="error">{{ error }}</div>
      </div>
      <div slot="reference" class="datepicker-toggler">
        <div class="caret"></div>
      </div>
    </popper>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import filters, { OPERATORS } from '@/services/customFilters/index';
import boundaries from '@/filters/boundaries';

const filter = filters.range.get(OPERATORS.BETWEEN);
const INPUT_DELAY = 500;

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
  },
  watch: {
    selected() {
      this.fromValueEntered = this.getInitialOperation();
      this.toValueEntered = this.getInitialValue();
    },
  },
  methods: {
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
    debounceInput: debounce(function onInput() {
      if (this.error) {
        return;
      }

      const data = filter.apply(this.range);
      this.$emit('input', data);
    }, INPUT_DELAY),
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/popper.scss';

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
