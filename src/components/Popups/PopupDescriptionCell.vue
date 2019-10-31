<template>
  <div>
    <v-menu
      v-if="disputeComment"
      v-model="value"
      offset-x
      left
      close-on-click
      nudge-left="10"
      max-width="200"
      min-width="200"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <div v-on="on" class="cell">
          <slot name="comment"></slot>
        </div>
      </template>
      <div @click.stop>
        <v-list class="pa-3 word-wrap">{{ disputeComment }}</v-list>
      </div>
    </v-menu>
    <div v-else class="empty-comment">
      {{ disputeComment | dashForEmptyValue }}
    </div>
  </div>
</template>

<script>
import { addCardBackground, removeCardBackground } from '@/services/background';
import dashForEmptyValue from '@/filters/dashForEmptyValue';

export default {
  name: 'PopupDescriptionCell',
  props: {
    disputeComment: String,
  },
  data: () => ({
    value: false,
  }),
  watch: {
    value(value) {
      if (value) {
        addCardBackground();
      } else {
        removeCardBackground();
      }
    },
  },
  beforeDestroy() {
    if (this.value) {
      removeCardBackground();
      this.value = false;
    }
  },
  filters: {
    dashForEmptyValue,
  },
};
</script>

<style scoped>
.word-wrap {
  word-wrap: break-word;
}

.cell {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.empty-comment {
  text-align: center;
  cursor: default;
}
</style>
