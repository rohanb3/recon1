<template>
  <div>
    <v-dialog v-model="visiblePopup" persistent max-width="370">
      <v-card class="dialog-delete-dispute">
        <v-icon class="close-dialog" @click="onClosePopup">close</v-icon>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text class="description">
          <slot></slot>
        </v-card-text>
        <v-card-actions class="card-buttons">
          <slot name="buttons"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPopup',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    visiblePopup: {
      get() {
        return this.value;
      },
      set(status) {
        this.$emit('input', status);
      },
    },
  },
  methods: {
    onClosePopup() {
      this.$emit('close', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.dialog-delete-dispute {
  padding: 12px;
  max-width: 370px;

  .headline {
    font-weight: 500;
    font-size: 20px !important;
    padding-bottom: 0;
  }

  .close-dialog {
    position: absolute;
    top: 21px;
    right: 21px;
    cursor: pointer;
    opacity: 0.2;
    color: $base-text-color;
  }

  .card-buttons {
    padding: 10px 17px 28px 17px;
  }

  .description {
    color: $base-text-color;
    font-size: 14px;
    line-height: 1.36;
    font-weight: normal;
  }

  .button-save-draft {
    height: 28px;
    font-size: 14px;
    font-weight: normal;
    padding: 0 12px;
    margin-right: 24px;
  }

  .remove-draft {
    font-size: 14px;
    cursor: pointer;
    color: $base-red;
  }
}
</style>
