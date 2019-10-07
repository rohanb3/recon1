<template>
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
      <a @click.prevent v-on="on">{{ disputeComment }}</a>
    </template>
    <div @click.stop>
      <v-list class="pa-3 word-wrap">
        {{ statusDescription }}
      </v-list>
    </div>
  </v-menu>
</template>

<script>
import { addBackgroundShadow, removeBackgroundShadow } from '@/services/background';

export default {
  name: 'PopupDescriptionCell',
  props: {
    disputeComment: String,
    statusDescription: String,
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

<style scoped>
.word-wrap {
  word-wrap: break-word;
}
</style>
