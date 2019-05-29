<template>
  <div v-hotkey="keymap" :class="[balloonClass]">
    <div v-if="closeIcon" class="close-icon-wrapper">
      <v-icon class="close-icon" @click="close">
        clear
      </v-icon>
    </div>
    <slot></slot>
  </div>
</template>

<script>
const BALLOON_CLASS = 'table-full-height-balloon';
export default {
  name: 'TableFullHeightBalloon',
  props: {
    closeIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      balloonClass: BALLOON_CLASS,
      keymap: {
        esc: this.close,
      },
    };
  },
  mounted() {
    this.subscribeToClickOut();
  },
  beforeDestroy() {
    this.unsubscribeFromClickOut();
  },
  methods: {
    subscribeToClickOut() {
      document.addEventListener('click', this.onClick);
    },
    unsubscribeFromClickOut() {
      document.removeEventListener('click', this.onClick);
    },
    onClick(ev) {
      const isClickout = !ev.target.closest(`.${BALLOON_CLASS}`);
      if (isClickout) {
        this.close();
      }
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.table-full-height-balloon {
  position: absolute;
  top: $header-height;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 4px 0 rgba(184, 184, 184, 0.5);
}

.close-icon-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
