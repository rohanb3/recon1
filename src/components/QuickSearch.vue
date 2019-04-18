<template>
  <v-text-field
    v-model.trim="textValue"
    class="mx-3"
    solo
    prepend-inner-icon="search"
    :placeholder="placeholder || $t('quick.search')"
    @input="debounceInput"
  ></v-text-field>
</template>

<script>
import debounce from "lodash.debounce";

const DEBOUNCE_TIME = 500;

function debounceInput(value) {
  this.$emit("input", value.trim());
}

export default {
  name: "QuickSearch",
  props: {
    placeholder: {
      type: String
    },
    initialPhrase: {
      default: "",
      validator(value) {
        return typeof value === "string" || typeof value === "number";
      }
    }
  },
  data() {
    return {
      textValue: ""
    };
  },
  mounted() {
    if (this.initialPhrase) {
      this.textValue = this.initialPhrase;
    }
  },
  methods: {
    debounceInput: debounce(debounceInput, DEBOUNCE_TIME)
  }
};
</script>
