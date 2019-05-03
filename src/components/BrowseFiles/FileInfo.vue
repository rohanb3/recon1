<template>
  <div class="file-info">
    <div class="file-info-preview">
      <img v-if="pictureLink" :src="pictureLink" />
      <v-icon class="file-icon" v-if="!pictureLink">attach_file</v-icon>
    </div>
    <div class="file-info-describe">
      <span class="file-info-describe-name">{{ filename }}</span>
      <span class="file-info-describe-size" v-show="fileSize">{{ fileSize }}</span>
    </div>
    <v-icon
      v-if="!isRemoving"
      class="file-info-remove"
      size="20"
      color="#ec9aa4"
      @click="onRemoveFile"
      >remove_circle</v-icon
    >
  </div>
</template>

<script>
export default {
  name: 'FileInfo',
  props: {
    linkPreview: {
      type: String,
    },
    filename: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isRemoving: false,
    };
  },
  computed: {
    isPicture() {
      if (this.filename.includes('.')) {
        return ['jpg', 'png', 'bmp', 'jpeg'].includes(this.filename.split('.').pop());
      }
      return false;
    },
    pictureLink() {
      if (this.isPicture) {
        return this.linkPreview + this.filename;
      }
      return '';
    },
  },
  methods: {
    onRemoveFile() {
      this.isRemoving = true;
      this.$emit('removeFile', this.filename);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.file-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: $bright-grey;
  border-top: 1px solid #eeeeef;
  padding: 8px 5px;
  margin-top: 8px;
}

.file-info-preview {
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 4px;
  border: solid 1px #979797;
  overflow: hidden;
  text-align: center;

  .file-icon {
    padding-top: 2px;
  }

  img {
    max-width: 30px;
    max-height: 30px;
  }
}

.file-info-describe {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 9px;
  justify-content: center;
}

.file-info-remove {
  align-self: center;
}

.file-info-describe-name {
  margin-bottom: 4px;
}
</style>
