<template>
  <div class="dispute-status-description-cell" :title="disputeComment">
    <v-menu
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
        <a @click.prevent v-on="on">{{ disputeComment | dashForEmptyValue }}</a>
      </template>
      <div @click.stop>
        <v-list class="pa-3 word-wrap">
          {{ item.statusDescription }}
        </v-list>
      </div>
    </v-menu>
  </div>
</template>

<script>
import dashForEmptyValue from '@/filters/dashForEmptyValue';
import { addBackgroundShadow, removeBackgroundShadow } from '@/services/background';

export default {
  name: 'DisputeStatusDescriptionCell',
  props: {
    item: {
      type: Object,
    },
  },
  filters: {
    dashForEmptyValue,
  },
  computed: {
    disputeComment() {
      return this.item.submitterComment || this.item.statusDescription;
    },
  },
  data: () => ({
    value: false,
  }),
  watch: {
    value(value) {
      if (value) {
        addBackgroundShadow();
      } else {
        removeBackgroundShadow();
      }
    },
  },
  beforeDestroy() {
    if (this.value) {
      removeBackgroundShadow();
      this.value = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.dispute-status-description-cell {
  font-style: italic;
}

.word-wrap {
  word-wrap: break-word;
}
</style>
