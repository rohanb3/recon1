<template>
  <v-text-field
    v-model="comment"
    :label="label"
    class="required"
    :rules="commentRules"
    :validate-on-blur="true"
    required
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty, validateMaxTextLength } from '@/services/validators';

const COMMENT_MAX_LENGTH = 155;

export default {
  name: 'CommentField',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commentRules: [validateFieldCantBeEmpty(), validateMaxTextLength(COMMENT_MAX_LENGTH)],
    };
  },
  computed: {
    comment: {
      get() {
        return this.value;
      },
      set(comment) {
        this.$emit('input', comment);
      },
    },
  },
};
</script>
