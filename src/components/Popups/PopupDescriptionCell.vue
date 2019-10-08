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
      <div v-on="on">
        <slot name="comment"></slot>
      </div>
    </template>
    <div @click.stop>
      <v-list class="pa-3 word-wrap">{{ statusDescription }}</v-list>
    </div>
  </v-menu>
</template>

<script>
import { addCardBackground, removeCardBackground } from '@/services/background';

export default {
  name: 'PopupDescriptionCell',
  props: {
    statusDescription: String,
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
};
</script>

<style scoped>
.word-wrap {
  word-wrap: break-word;
}
</style>
